@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================
echo   COLLABSPHERE - COMPLETE STARTUP
echo ========================================
echo.

cd /d "%~dp0"

REM Step 1: Check database
echo [1/4] Checking database...
cd backend
python check_users.py
echo.

REM Step 2: Start backend
echo [2/4] Starting Backend Server...
start "CollabSphere Backend" cmd /k "cd /d %~dp0backend && set PYTHONPATH=%cd% && echo Backend starting on http://localhost:8001 && python -m uvicorn app.main:app --host 127.0.0.1 --port 8001"
timeout /t 8 /nobreak > nul

REM Step 3: Test backend
echo [3/4] Testing Backend Connection...
cd backend
python test_register.py
cd ..
echo.

REM Step 4: Start frontend
echo [4/4] Starting Frontend Server...
start "CollabSphere Frontend" cmd /k "cd /d %~dp0frontend && echo Frontend starting on http://localhost:3000 && npm start"

echo.
echo ========================================
echo   STARTUP COMPLETE
echo ========================================
echo.
echo Backend:  http://localhost:8001
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8001/docs
echo.
echo Check the opened windows for logs.
echo.
pause
