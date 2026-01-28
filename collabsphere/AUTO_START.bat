@echo off
echo.
echo ========================================
echo   AUTO-FIX AND START
echo ========================================
echo.

cd /d "%~dp0backend"

REM Step 1: Clean database
echo [1/3] Cleaning database...
python auto_fix.py

REM Step 2: Start backend
echo.
echo [2/3] Starting backend server...
set PYTHONPATH=%cd%
start "CollabSphere Backend" cmd /k "echo Backend running on http://localhost:8001 && echo API Docs: http://localhost:8001/docs && echo. && python -m uvicorn app.main:app --host 127.0.0.1 --port 8001"

timeout /t 10 /nobreak > nul

REM Step 3: Open browser
echo.
echo [3/3] Opening web app...
start http://localhost:3000/register

echo.
echo ========================================
echo   ALL DONE!
echo ========================================
echo.
echo Backend: http://localhost:8001 (check terminal window)
echo Frontend: http://localhost:3000 (opening in browser...)
echo.
echo You can now register with:
echo   Email: jqk@gmail.com
echo   Password: 123456
echo.
pause
