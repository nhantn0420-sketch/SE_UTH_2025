@echo off
echo.
echo ========================================
echo   QUICK FIX - REGISTER ISSUE
echo ========================================
echo.

cd /d "%~dp0backend"

echo Step 1: Checking database...
echo.
python -c "import sys; sys.path.insert(0, '.'); from app.database import create_db_and_tables, engine; from sqlmodel import Session, select; from app.models.user import User; create_db_and_tables(); session = Session(engine); users = session.exec(select(User)).all(); print(f'Total users: {len(users)}'); email_check = session.exec(select(User).where(User.email == 'jqk@gmail.com')).first(); print(f\"Email jqk@gmail.com: {\"EXISTS\" if email_check else \"AVAILABLE\"}'); print(''); print('SOLUTION:' if email_check else 'OK TO PROCEED:'); print('  Use different email (ungchac2026@gmail.com)' if email_check else '  You can register with jqk@gmail.com'); session.close()"

echo.
echo Step 2: Starting backend...
echo.

set PYTHONPATH=%cd%
start "Backend" cmd /k "python -m uvicorn app.main:app --host 127.0.0.1 --port 8001"

echo Waiting for backend to start...
timeout /t 8 /nobreak > nul

echo.
echo ========================================
echo   DONE
echo ========================================
echo.
echo Backend is starting on http://localhost:8001
echo.
echo Go to http://localhost:3000/register
echo.
echo If email 'jqk@gmail.com' exists, use:
echo   - ungchac2026@gmail.com
echo   - ung.chac.test@gmail.com
echo.
pause
