# CollabSphere Automation Runner Script
# Automatically install dependencies, run tests, and capture screenshots

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "COLLABSPHERE AUTOMATION TEST" -ForegroundColor Cyan
Write-Host "Automated Testing & Screenshot Capture" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Python
Write-Host "Step 1: Checking Python..." -ForegroundColor Yellow
$pythonCmd = Get-Command python -ErrorAction SilentlyContinue

if (-not $pythonCmd) {
    Write-Host "ERROR: Python not found! Please install Python 3.8+" -ForegroundColor Red
    Write-Host "Download from: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

$pythonVersion = python --version
Write-Host "Found: $pythonVersion" -ForegroundColor Green
Write-Host ""

# Step 2: Check Docker
Write-Host "Step 2: Checking Docker containers..." -ForegroundColor Yellow
$dockerStatus = docker compose ps 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker not running! Please start Docker Desktop" -ForegroundColor Red
    exit 1
}

# Check if containers are up
$frontendRunning = docker compose ps | Select-String "frontend.*Up"
$backendRunning = docker compose ps | Select-String "backend.*Up"

if (-not $frontendRunning -or -not $backendRunning) {
    Write-Host "WARNING: Containers not running. Starting..." -ForegroundColor Yellow
    docker compose up -d
    Start-Sleep -Seconds 10
    Write-Host "Containers started" -ForegroundColor Green
} else {
    Write-Host "Containers already running" -ForegroundColor Green
}
Write-Host ""

# Step 3: Install dependencies
Write-Host "Step 3: Installing Python dependencies..." -ForegroundColor Yellow
$automationDir = Join-Path $PSScriptRoot "."
cd $automationDir

if (Test-Path "requirements.txt") {
    Write-Host "Installing packages..." -ForegroundColor Cyan
    python -m pip install --upgrade pip --quiet
    python -m pip install -r requirements.txt --quiet
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ERROR: requirements.txt not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Check Chrome/Edge
Write-Host "Step 4: Checking browser..." -ForegroundColor Yellow
$chromeInstalled = Test-Path "C:\Program Files\Google\Chrome\Application\chrome.exe"
$edgeInstalled = Test-Path "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

if ($chromeInstalled) {
    Write-Host "Chrome found" -ForegroundColor Green
} elseif ($edgeInstalled) {
    Write-Host "Edge found" -ForegroundColor Green
} else {
    Write-Host "WARNING: Chrome/Edge not found. Installing ChromeDriver..." -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Create screenshot directory
Write-Host "Step 5: Preparing screenshot directory..." -ForegroundColor Yellow
$screenshotDir = "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"
if (-not (Test-Path $screenshotDir)) {
    New-Item -ItemType Directory -Path $screenshotDir -Force | Out-Null
    Write-Host "Created: $screenshotDir" -ForegroundColor Green
} else {
    Write-Host "Directory exists: $screenshotDir" -ForegroundColor Green
}
Write-Host ""

# Step 6: Verify backend is accessible
Write-Host "Step 6: Testing backend connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/docs" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "Backend API accessible (http://localhost:8000)" -ForegroundColor Green
} catch {
    Write-Host "WARNING: Backend may not be ready" -ForegroundColor Yellow
    Write-Host "Waiting 10 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}

Write-Host "Testing frontend connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:80" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "Frontend accessible (http://localhost:80)" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Frontend not accessible!" -ForegroundColor Red
    Write-Host "Please ensure Docker containers are running" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Step 7: Run automation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "STARTING AUTOMATION TEST" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Estimated time: 5-10 minutes" -ForegroundColor Yellow
Write-Host "Will capture 17 screenshots" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to cancel..." -ForegroundColor Gray
Write-Host ""

Start-Sleep -Seconds 3

# Run Python automation script
python automation_test.py

$exitCode = $LASTEXITCODE

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($exitCode -eq 0) {
    Write-Host "AUTOMATION COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Verify screenshots
    Write-Host "Verifying screenshots..." -ForegroundColor Yellow
    $screenshots = Get-ChildItem -Path $screenshotDir -Filter "*.png" -ErrorAction SilentlyContinue
    $count = ($screenshots | Measure-Object).Count
    
    Write-Host "Found: $count/17 screenshots" -ForegroundColor Cyan
    
    if ($count -eq 17) {
        Write-Host "ALL 17 SCREENSHOTS CAPTURED!" -ForegroundColor Green
    } elseif ($count -gt 0) {
        Write-Host "WARNING: Only $count screenshots captured (expected 17)" -ForegroundColor Yellow
    } else {
        Write-Host "ERROR: No screenshots found!" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Location: $screenshotDir" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Review screenshots in Images/Screenshots/" -ForegroundColor White
    Write-Host "  2. Update status checklist" -ForegroundColor White
    Write-Host "  3. Insert screenshots into Section VI documentation" -ForegroundColor White
    Write-Host "  4. Generate final PDF" -ForegroundColor White
    
} else {
    Write-Host "AUTOMATION FAILED" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Check logs above for errors" -ForegroundColor Yellow
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Docker containers not running" -ForegroundColor White
    Write-Host "  - Frontend/Backend not accessible" -ForegroundColor White
    Write-Host "  - ChromeDriver version mismatch" -ForegroundColor White
    Write-Host "  - UI elements changed (selectors outdated)" -ForegroundColor White
}

Write-Host ""
Write-Host "Press Enter to exit..." -ForegroundColor White
$null = Read-Host

exit $exitCode
