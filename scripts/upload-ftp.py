#!/usr/bin/env python3
"""Upload the static site (out/) to the web server over FTP.

    npm run export          # build out/ first
    npm run upload          # asks for the FTP password, then uploads

Settings come from environment variables, with defaults for Abhishta's server:
    FTP_HOST (13.201.236.189)   FTP_USER (abhishtaagri-ftp)   FTP_DIR (the folder the login opens in)
    FTP_PASSWORD (asked for if not set; never stored in the project)

Only new or changed files are sent (same size on the server = skipped), so updates are quick.
It tries a secure connection (FTPS) first and falls back to plain FTP if the server doesn't offer it.
Nothing on the server is deleted.
"""
import ftplib
import getpass
import os
import sys

HOST = os.environ.get("FTP_HOST", "13.201.236.189")
USER = os.environ.get("FTP_USER", "abhishtaagri-ftp")
REMOTE = os.environ.get("FTP_DIR", "")
TIMEOUT = 300  # seconds to wait on the server; big files (the videos) take a while to confirm
RETRIES = 3
LOCAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")


def connect(password):
    # Secure FTP first; servers without it answer "AUTH not understood", then we use plain FTP.
    try:
        ftp = ftplib.FTP_TLS(HOST, timeout=TIMEOUT)
        ftp.auth()
    except Exception:
        ftp = None
    if ftp is not None:
        ftp.login(USER, password)
        ftp.prot_p()
        print(f"Connected to {HOST} (secure FTPS)")
        return ftp
    ftp = ftplib.FTP(HOST, timeout=TIMEOUT)
    ftp.login(USER, password)
    print(f"Connected to {HOST} (plain FTP)")
    return ftp


def ensure_dir(ftp, path, made):
    if not path or path in made:
        return
    parts = path.strip("/").split("/")
    cur = ""
    for p in parts:
        cur = f"{cur}/{p}" if cur else p
        if cur in made:
            continue
        try:
            ftp.mkd(cur)
        except ftplib.error_perm:
            pass  # already there
        made.add(cur)


def remote_size(ftp, path):
    try:
        return ftp.size(path)
    except Exception:
        return None


def open_session(password):
    ftp = connect(password)
    ftp.voidcmd("TYPE I")
    if REMOTE:
        ftp.cwd(REMOTE)
    return ftp


def main():
    if not os.path.isdir(LOCAL):
        sys.exit("No out/ folder. Run `npm run export` first.")
    password = os.environ.get("FTP_PASSWORD") or getpass.getpass(f"FTP password for {USER}@{HOST}: ")
    try:
        ftp = open_session(password)
    except ftplib.error_perm as e:
        sys.exit(f"Login failed: {e}")
    print(f"Uploading into: {ftp.pwd()}")

    files = []
    for root, _, names in os.walk(LOCAL):
        for n in names:
            full = os.path.join(root, n)
            files.append((full, os.path.relpath(full, LOCAL).replace(os.sep, "/")))
    # pages last, so a visitor never gets a new page whose assets aren't there yet
    files.sort(key=lambda f: (f[1].endswith(".html") or f[1].endswith(".txt"), f[1]))

    made, sent, skipped = set(), 0, 0
    for i, (full, rel) in enumerate(files, 1):
        size = os.path.getsize(full)
        for attempt in range(1, RETRIES + 1):
            try:
                ensure_dir(ftp, os.path.dirname(rel), made)
                if not rel.endswith((".html", ".txt", ".xml", ".htaccess")) and remote_size(ftp, rel) == size:
                    skipped += 1
                    break
                if size > 2_000_000:
                    print(f"  {rel} ({size / 1e6:.0f} MB) …")
                with open(full, "rb") as fh:
                    ftp.storbinary(f"STOR {rel}", fh)
                sent += 1
                break
            except (OSError, EOFError, ftplib.error_temp, ftplib.error_reply) as e:
                if attempt == RETRIES:
                    sys.exit(f"Gave up on {rel} after {RETRIES} tries ({e}). Run `npm run upload` again: it skips what's done.")
                print(f"  connection dropped on {rel} ({e.__class__.__name__}); reconnecting, try {attempt + 1} of {RETRIES} …")
                try:
                    ftp.close()
                except Exception:
                    pass
                ftp = open_session(password)
        if (sent + skipped) % 50 == 0:
            print(f"  {i}/{len(files)} …")
    try:
        ftp.quit()
    except Exception:
        pass
    print(f"Done: {sent} files uploaded, {skipped} already there. Open http://{HOST}/ to check.")


if __name__ == "__main__":
    main()
