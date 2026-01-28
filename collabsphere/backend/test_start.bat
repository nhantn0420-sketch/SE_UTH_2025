cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend
set PYTHONPATH=%cd%

echo Testing Python...
python --version

echo.
echo Testing uvicorn import...
python -c "import uvicorn; print('uvicorn OK')"

echo.
echo Testing app import...
python -c "from app.main import app; print('app OK')"

echo.
echo Starting server...
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001

pause
