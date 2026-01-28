@echo off
echo.
echo ============================================
echo   BACKEND SERVER - GUARANTEED START
echo ============================================
echo.

cd /d "%~dp0backend"

REM Kill any existing Python processes on port 8001
echo [1/4] Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8001.*LISTENING"') do (
    echo Killing process %%a on port 8001...
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

REM Set environment
echo [2/4] Setting environment...
set PYTHONPATH=%cd%
echo PYTHONPATH=%PYTHONPATH%

REM Clean database
echo [3/4] Cleaning database...
python -c "import sys; sys.path.insert(0, '.'); from app.database import create_db_and_tables, engine; from sqlmodel import Session, select; from app.models.user import User; create_db_and_tables(); session = Session(engine); existing = session.exec(select(User).where(User.email == 'jqk@gmail.com')).first(); session.delete(existing) if existing else None; session.commit() if existing else None; print('Database ready'); session.close()" 2>nul

REM Start server
echo [4/4] Starting server...
echo.
echo ============================================
echo   Backend URL: http://localhost:8001
echo   API Docs: http://localhost:8001/docs
echo ============================================
echo.
echo DO NOT CLOSE THIS WINDOW!
echo.

python -m uvicorn app.main:app --host 127.0.0.1 --port 8001

pause
