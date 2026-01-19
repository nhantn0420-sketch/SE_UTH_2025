# ============================================
# CollabSphere - Stop Hybrid Mode
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   STOPPING COLLABSPHERE HYBRID MODE" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

# Stop Docker services
Write-Host "[1/3] Stopping Docker containers (DB + Redis)..." -ForegroundColor Yellow
docker-compose stop db redis 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   Docker containers stopped!" -ForegroundColor Green
} else {
    Write-Host "   No Docker containers running" -ForegroundColor Gray
}

# Stop Backend process
Write-Host "`n[2/3] Stopping Backend processes..." -ForegroundColor Yellow
$backendProcesses = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*uvicorn*"
}
if ($backendProcesses) {
    $backendProcesses | Stop-Process -Force
    Write-Host "   Backend stopped!" -ForegroundColor Green
} else {
    Write-Host "   No Backend processes found" -ForegroundColor Gray
}

# Stop Frontend process
Write-Host "`n[3/3] Stopping Frontend processes..." -ForegroundColor Yellow
$frontendProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*react-scripts*"
}
if ($frontendProcesses) {
    $frontendProcesses | Stop-Process -Force
    Write-Host "   Frontend stopped!" -ForegroundColor Green
} else {
    Write-Host "   No Frontend processes found" -ForegroundColor Gray
}

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   ALL SERVICES STOPPED" -ForegroundColor Green
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "You can also manually close the PowerShell terminal windows." -ForegroundColor Gray
Write-Host ""
pause
