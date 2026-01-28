@echo off
echo.
echo ========================================
echo   COLLABSPHERE - FRONTEND SERVER
echo ========================================
echo.
cd /d "%~dp0"
echo Starting frontend on http://localhost:3000
echo Backend API: http://localhost:8001
echo.
call npm start
