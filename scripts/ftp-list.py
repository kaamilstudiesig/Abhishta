#!/usr/bin/env python3
"""List what's on the FTP account (read only): the folders two levels deep, and any index/html files in them,
so we can find the folder the web server actually serves.

    npm run ftp:list            # asks for the password
    FTP_LIST_PATH=/var/www npm run ftp:list   # start somewhere else
"""
import ftplib
import getpass
import os

HOST = os.environ.get("FTP_HOST", "13.201.236.189")
USER = os.environ.get("FTP_USER", "abhishtaagri-ftp")
START = os.environ.get("FTP_LIST_PATH", "")
DEPTH = int(os.environ.get("FTP_LIST_DEPTH", "2"))
# our own upload, so it isn't listed in full
OURS = {"_next", "images", "videos", "tour", "our-nests", "the-living-farm", "group-enquiries", "farm-to-table",
        "virtualtour", "gallery", "gau-seva", "404", "_not-found"}


def entries(ftp, path):
    try:
        return list(ftp.mlsd(path or ".", facts=["type", "size"]))
    except ftplib.error_perm:
        out = []
        for line in ftp.nlst(path or "."):
            name = line.rsplit("/", 1)[-1]
            try:
                ftp.cwd(f"{path}/{name}" if path else name)
                ftp.cwd("/" if not path else "/" + path.strip("/"))
                out.append((name, {"type": "dir"}))
            except ftplib.error_perm:
                out.append((name, {"type": "file"}))
        return out


def walk(ftp, path, depth):
    for name, facts in sorted(entries(ftp, path), key=lambda x: x[0]):
        if name in (".", ".."):
            continue
        full = f"{path}/{name}" if path else name
        pad = "  " * (DEPTH - depth)
        if facts.get("type") == "dir":
            note = "  (our upload)" if name in OURS and not path else ""
            print(f"{pad}{name}/{note}")
            if depth > 1 and not note:
                walk(ftp, full, depth - 1)
        elif depth == DEPTH or name.lower().startswith("index") or name.endswith((".html", ".php", ".htaccess")):
            print(f"{pad}{name}  {facts.get('size', '')}")


def main():
    password = os.environ.get("FTP_PASSWORD") or getpass.getpass(f"FTP password for {USER}@{HOST}: ")
    ftp = ftplib.FTP(HOST, timeout=60)
    ftp.login(USER, password)
    print(f"Logged in. FTP home: {ftp.pwd()}\n")
    walk(ftp, START, DEPTH)
    ftp.quit()


if __name__ == "__main__":
    main()
