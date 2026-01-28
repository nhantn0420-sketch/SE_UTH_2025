@echo off
title CollabSphere Backend Server
color 0A

cd /d "%~dp0backend"

echo.
echo ========================================
echo   STARTING BACKEND SERVER
echo ========================================
echo.

set PYTHONPATH=%cd%
python start_server.py

pause
