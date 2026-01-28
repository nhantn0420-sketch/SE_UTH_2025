@echo off
title CollabSphere - Project Launcher
color 0A
echo.
echo ========================================
echo   COLLABSPHERE PROJECT LAUNCHER
echo ========================================
echo.
echo Starting both Backend and Frontend...
echo.

REM Start Backend in new window
echo [1/2] Starting Backend (Port 8001)...
start "CollabSphere Backend" cmd /k "cd /d %~dp0backend && set PYTHONPATH=%cd% && echo Backend starting... && C:\Users\LENOVO\AppData\Local\Microsoft\WindowsApps\python3.13.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8001"

REM Wait 5 seconds for backend to start
timeout /t 5 /nobreak > nul

REM Start Frontend in new window
echo [2/2] Starting Frontend (Port 3000)...
start "CollabSphere Frontend" cmd /k "cd /d %~dp0frontend && echo Frontend starting... && npm start"

REM Wait and check
timeout /t 3 /nobreak > nul

echo.
echo ========================================
echo   SERVERS STARTING...
echo ========================================
echo.
echo Backend will be ready in ~10 seconds
echo Frontend will be ready in ~30 seconds
echo.
echo Once started:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8001
echo   API Docs: http://localhost:8001/docs
echo.
echo Check the opened terminal windows for logs.
echo Close those windows to stop the servers.
echo.
pause
