# ============================================
# CollabSphere - Manual Start Script (No Docker)
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE - MANUAL STARTUP" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot

# Kiểm tra Python
Write-Host "[1/6] Checking Python..." -ForegroundColor Green
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ERROR: Python not found!" -ForegroundColor Red
    Write-Host "   Please install Python 3.11+" -ForegroundColor Yellow
    pause
    exit 1
}

# Kiểm tra Node.js
Write-Host "`n[2/6] Checking Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version 2>&1
    Write-Host "   Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "   Please install Node.js 18+" -ForegroundColor Yellow
    pause
    exit 1
}

# Backend Setup
Write-Host "`n[3/6] Setting up Backend..." -ForegroundColor Green
$backendPath = Join-Path $projectRoot "backend"

if (-not (Test-Path (Join-Path $backendPath "venv"))) {
    Write-Host "   Creating virtual environment..." -ForegroundColor Yellow
    Push-Location $backendPath
    python -m venv venv
    Pop-Location
}

Write-Host "   Installing/Updating Python packages..." -ForegroundColor Yellow
Push-Location $backendPath
& ".\venv\Scripts\Activate.ps1"
pip install -r requirements.txt --quiet
Pop-Location

Write-Host "   Backend setup complete!" -ForegroundColor Green

# Frontend Setup
Write-Host "`n[4/6] Setting up Frontend..." -ForegroundColor Green
$frontendPath = Join-Path $projectRoot "frontend"

if (-not (Test-Path (Join-Path $frontendPath "node_modules"))) {
    Write-Host "   Installing npm packages (this may take a while)..." -ForegroundColor Yellow
    Push-Location $frontendPath
    npm install
    Pop-Location
} else {
    Write-Host "   Node modules already installed" -ForegroundColor Green
}

# Database Migration
Write-Host "`n[5/6] Running database migrations..." -ForegroundColor Green
Push-Location $backendPath
& ".\venv\Scripts\Activate.ps1"
alembic upgrade head 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   Migrations completed!" -ForegroundColor Green
} else {
    Write-Host "   Warning: Migration failed (may be first run)" -ForegroundColor Yellow
}
Pop-Location

# Start Services
Write-Host "`n[6/6] Starting services..." -ForegroundColor Green
Write-Host ""

# Start Backend in new window
Write-Host "   Starting Backend on http://localhost:8000..." -ForegroundColor Yellow
$backendScript = @"
cd '$backendPath'
& '.\venv\Scripts\Activate.ps1'
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   BACKEND IS RUNNING' -ForegroundColor Green
Write-Host '   URL: http://localhost:8000' -ForegroundColor White
Write-Host '   Docs: http://localhost:8000/docs' -ForegroundColor White
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Yellow
Write-Host ''
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendScript

Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "   Starting Frontend on http://localhost:3000..." -ForegroundColor Yellow
$frontendScript = @"
cd '$frontendPath'
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   FRONTEND IS RUNNING' -ForegroundColor Green
Write-Host '   URL: http://localhost:3000' -ForegroundColor White
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''
Write-Host 'Press Ctrl+C to stop' -ForegroundColor Yellow
Write-Host ''
npm start
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendScript

# Summary
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE IS STARTING!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend and Frontend are starting in separate windows..." -ForegroundColor White
Write-Host ""
Write-Host "   Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "   API Docs:  http://localhost:8000/docs" -ForegroundColor White
Write-Host "   Frontend:  http://localhost:3000 (will open automatically)" -ForegroundColor White
Write-Host ""
Write-Host "To stop: Close both PowerShell windows" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
pause
