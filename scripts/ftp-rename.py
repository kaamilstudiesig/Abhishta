#!/usr/bin/env python3
"""Rename one file on the FTP account (asks for the password).

    python3 scripts/ftp-rename.py index.php index.php.bak
"""
import ftplib
import getpass
import os
import sys

HOST = os.environ.get("FTP_HOST", "13.201.236.189")
USER = os.environ.get("FTP_USER", "abhishtaagri-ftp")

if len(sys.argv) != 3:
    sys.exit("usage: ftp-rename.py OLD NEW")
old, new = sys.argv[1], sys.argv[2]
password = os.environ.get("FTP_PASSWORD") or getpass.getpass(f"FTP password for {USER}@{HOST}: ")
ftp = ftplib.FTP(HOST, timeout=60)
ftp.login(USER, password)
ftp.rename(old, new)
print(f"Renamed {old} -> {new}")
ftp.quit()
