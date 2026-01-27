@echo off
chcp 65001 >nul
echo.
echo ================================================
echo    COLLABSPHERE - DOCKER COMPOSE STARTUP
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Docker...
docker version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop first.
    pause
    exit /b 1
)
echo    Docker is running!

echo.
echo [2/3] Stopping old containers...
docker-compose down >nul 2>&1

echo.
echo [3/3] Building and starting containers...
echo    This may take 5-10 minutes on first run...
echo.
docker-compose up --build -d

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start containers!
    echo Check logs with: docker-compose logs
    pause
    exit /b 1
)

echo.
echo ================================================
echo    COLLABSPHERE IS RUNNING!
echo ================================================
echo.
echo    Frontend:  http://localhost
echo    Backend:   http://localhost:8000
echo    API Docs:  http://localhost:8000/docs
echo.
echo ================================================
echo.
echo Press any key to view logs (or Ctrl+C to exit)...
pause >nul
docker-compose logs -f
