# ============================================
# CollabSphere - Hybrid Mode Start Script
# DB + Redis in Docker, Backend + Frontend Manual
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE - HYBRID MODE STARTUP" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot

Write-Host "This mode runs:" -ForegroundColor White
Write-Host "  - DB + Redis in Docker (isolated)" -ForegroundColor Gray
Write-Host "  - Backend manual (hot reload)" -ForegroundColor Gray
Write-Host "  - Frontend manual (hot reload)" -ForegroundColor Gray
Write-Host ""

# Step 1: Check Docker
Write-Host "[1/5] Checking Docker..." -ForegroundColor Green
try {
    $dockerVersion = docker version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Docker is not running!" -ForegroundColor Red
        Write-Host "Please start Docker Desktop first." -ForegroundColor Yellow
        pause
        exit 1
    }
    Write-Host "   Docker is running!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Docker not found!" -ForegroundColor Red
    Write-Host "Please install Docker Desktop." -ForegroundColor Yellow
    pause
    exit 1
}

# Step 2: Check Python
Write-Host "`n[2/5] Checking Python..." -ForegroundColor Green
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python not found!" -ForegroundColor Red
    Write-Host "Please install Python 3.11+" -ForegroundColor Yellow
    pause
    exit 1
}

# Step 3: Check Node.js
Write-Host "`n[3/5] Checking Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version 2>&1
    Write-Host "   Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "Please install Node.js 18+" -ForegroundColor Yellow
    pause
    exit 1
}

# Step 4: Setup Backend Environment
Write-Host "`n[4/5] Setting up Backend environment..." -ForegroundColor Green
$backendPath = Join-Path $projectRoot "backend"

if (-not (Test-Path (Join-Path $backendPath "venv"))) {
    Write-Host "   Creating Python virtual environment..." -ForegroundColor Yellow
    Push-Location $backendPath
    python -m venv venv
    Pop-Location
    Write-Host "   Virtual environment created!" -ForegroundColor Green
}

Write-Host "   Installing/Updating Python packages..." -ForegroundColor Yellow
Push-Location $backendPath
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "   Python packages ready!" -ForegroundColor Green
} else {
    Write-Host "   Warning: Some packages may have issues" -ForegroundColor Yellow
}
Pop-Location

# Step 5: Setup Frontend Environment
Write-Host "`n[5/5] Setting up Frontend environment..." -ForegroundColor Green
$frontendPath = Join-Path $projectRoot "frontend"

if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "   Installing npm packages (this may take 2-3 minutes)..." -ForegroundColor Yellow
    Push-Location $frontendPath
    npm install
    Pop-Location
    Write-Host "   npm packages ready!" -ForegroundColor Green
} else {
    Write-Host "   npm packages already installed!" -ForegroundColor Green
}

# Step 6: Start DB + Redis in Docker
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   STARTING SERVICES..." -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "[Terminal 1] Starting DB + Redis in Docker..." -ForegroundColor Yellow
$dockerScript = @"
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   DOCKER SERVICES (DB + REDIS)' -ForegroundColor Green
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Starting PostgreSQL + Redis...' -ForegroundColor Yellow
Write-Host ''
cd '$projectRoot'
docker-compose up db redis
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $dockerScript

Write-Host "   Waiting for database to be ready..." -ForegroundColor Gray
Start-Sleep -Seconds 8

# Step 7: Start Backend with hot reload
Write-Host "`n[Terminal 2] Starting Backend with hot reload..." -ForegroundColor Yellow
$backendScript = @"
cd '$backendPath'
& '.\venv\Scripts\Activate.ps1'
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   BACKEND (HOT RELOAD ENABLED)' -ForegroundColor Green
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host '   URL: http://localhost:8000' -ForegroundColor White
Write-Host '   API Docs: http://localhost:8000/docs' -ForegroundColor White
Write-Host ''
Write-Host 'Hot reload: Edit .py files and save' -ForegroundColor Yellow
Write-Host 'Auto-restart: 1-2 seconds after save' -ForegroundColor Yellow
Write-Host ''
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Red
Write-Host ''
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

Start-Sleep -Seconds 3

# Step 8: Start Frontend with hot reload
Write-Host "`n[Terminal 3] Starting Frontend with hot reload..." -ForegroundColor Yellow
$frontendScript = @"
cd '$frontendPath'
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   FRONTEND (HOT RELOAD ENABLED)' -ForegroundColor Green
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host '   URL: http://localhost:3000' -ForegroundColor White
Write-Host ''
Write-Host 'Hot reload: Edit .js/.jsx/.css files and save' -ForegroundColor Yellow
Write-Host 'Auto-reload: <1 second in browser' -ForegroundColor Yellow
Write-Host ''
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Red
Write-Host ''
npm start
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

# Summary
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE HYBRID MODE STARTED!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "3 terminals opened:" -ForegroundColor White
Write-Host "  Terminal 1: DB + Redis (Docker)" -ForegroundColor Gray
Write-Host "  Terminal 2: Backend (http://localhost:8000)" -ForegroundColor Gray
Write-Host "  Terminal 3: Frontend (http://localhost:3000)" -ForegroundColor Gray
Write-Host ""
Write-Host "Hot Reload Enabled:" -ForegroundColor Yellow
Write-Host "  - Edit Python files → Backend auto-restarts" -ForegroundColor White
Write-Host "  - Edit React files → Frontend auto-reloads" -ForegroundColor White
Write-Host ""
Write-Host "Wait 10-15 seconds for all services to start..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Access:" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "To Stop: Run .\stop-hybrid.ps1 or close all terminals" -ForegroundColor Red
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
pause
