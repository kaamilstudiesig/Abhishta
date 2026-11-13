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
LOCAL = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")


def connect(password):
    try:
        ftp = ftplib.FTP_TLS(HOST, timeout=30)
        ftp.login(USER, password)
        ftp.prot_p()
        print(f"Connected to {HOST} (secure FTPS)")
        return ftp
    except ftplib.error_perm:
        raise
    except Exception:
        ftp = ftplib.FTP(HOST, timeout=30)
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


def main():
    if not os.path.isdir(LOCAL):
        sys.exit("No out/ folder. Run `npm run export` first.")
    password = os.environ.get("FTP_PASSWORD") or getpass.getpass(f"FTP password for {USER}@{HOST}: ")
    try:
        ftp = connect(password)
    except ftplib.error_perm as e:
        sys.exit(f"Login failed: {e}")
    ftp.voidcmd("TYPE I")
    if REMOTE:
        ftp.cwd(REMOTE)
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
        ensure_dir(ftp, os.path.dirname(rel), made)
        size = os.path.getsize(full)
        if not rel.endswith((".html", ".txt", ".xml", ".htaccess")) and remote_size(ftp, rel) == size:
            skipped += 1
            continue
        with open(full, "rb") as fh:
            ftp.storbinary(f"STOR {rel}", fh)
        sent += 1
        if sent % 25 == 0:
            print(f"  {i}/{len(files)} …")
    ftp.quit()
    print(f"Done: {sent} files uploaded, {skipped} unchanged. Open http://{HOST}/ to check.")


if __name__ == "__main__":
    main()
