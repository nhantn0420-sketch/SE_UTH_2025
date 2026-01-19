# ============================================
# CollabSphere - Docker Compose Stop Script
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE - DOCKER COMPOSE SHUTDOWN" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "Choose an option:" -ForegroundColor Yellow
Write-Host "  1. Stop containers (keep data)" -ForegroundColor White
Write-Host "  2. Stop and remove containers (keep data)" -ForegroundColor White
Write-Host "  3. Stop and remove everything (DELETE ALL DATA)" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`nStopping containers..." -ForegroundColor Green
        docker-compose stop
        Write-Host "`nContainers stopped. Data preserved." -ForegroundColor Green
        Write-Host "To start again: docker-compose start" -ForegroundColor Yellow
    }
    "2" {
        Write-Host "`nStopping and removing containers..." -ForegroundColor Green
        docker-compose down
        Write-Host "`nContainers removed. Data preserved in volumes." -ForegroundColor Green
        Write-Host "To start again: docker-compose up" -ForegroundColor Yellow
    }
    "3" {
        Write-Host "`nWARNING: This will delete ALL data!" -ForegroundColor Red
        $confirm = Read-Host "Are you sure? (type 'YES' to confirm)"
        if ($confirm -eq "YES") {
            Write-Host "`nStopping and removing everything..." -ForegroundColor Red
            docker-compose down -v
            Write-Host "`nEverything removed including data." -ForegroundColor Red
        } else {
            Write-Host "`nCancelled." -ForegroundColor Yellow
        }
    }
    default {
        Write-Host "`nInvalid choice. Exiting." -ForegroundColor Red
    }
}

Write-Host ""
pause
