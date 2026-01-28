@echo off
echo.
echo ========================================
echo   COLLABSPHERE - BACKEND SERVER
echo ========================================
echo.
cd /d "%~dp0"
set PYTHONPATH=%CD%
echo Starting backend on http://localhost:8001
echo API Docs: http://localhost:8001/docs
echo.
C:\Users\LENOVO\AppData\Local\Microsoft\WindowsApps\python3.13.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001
