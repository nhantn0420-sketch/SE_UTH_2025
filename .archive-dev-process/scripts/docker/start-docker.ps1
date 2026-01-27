# ============================================
# CollabSphere - Docker Compose Start Script
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE - DOCKER COMPOSE STARTUP" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

# Kiểm tra Docker đang chạy
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

# Kiểm tra file .env
Write-Host "`n[2/5] Checking .env file..." -ForegroundColor Green
if (-not (Test-Path ".env")) {
    Write-Host "   .env file not found. Creating default .env..." -ForegroundColor Yellow
    
    $envContent = @"
# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=collabsphere

# Security
SECRET_KEY=your-super-secret-key-change-in-production-2024

# AWS Bedrock (AI) - Optional
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Cloudinary - Optional
CLOUDINARY_URL=

# Email SMTP - Optional
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "   Created .env with default values" -ForegroundColor Green
} else {
    Write-Host "   .env file found!" -ForegroundColor Green
}

# Dừng containers cũ nếu có
Write-Host "`n[3/5] Stopping old containers..." -ForegroundColor Green
docker-compose down 2>&1 | Out-Null
Write-Host "   Old containers stopped" -ForegroundColor Green

# Build và start containers
Write-Host "`n[4/5] Building and starting containers..." -ForegroundColor Green
Write-Host "   This may take 5-10 minutes on first run..." -ForegroundColor Yellow
Write-Host ""

docker-compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n   Containers started successfully!" -ForegroundColor Green
    
    # Chờ backend khởi động
    Write-Host "`n[5/5] Waiting for backend to be ready..." -ForegroundColor Green
    $maxRetries = 30
    $retries = 0
    $backendReady = $false
    
    while ($retries -lt $maxRetries -and -not $backendReady) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 2 -UseBasicParsing 2>&1
            if ($response.StatusCode -eq 200) {
                $backendReady = $true
                Write-Host "   Backend is ready!" -ForegroundColor Green
            }
        } catch {
            $retries++
            Write-Host "   Waiting... ($retries/$maxRetries)" -ForegroundColor Gray
            Start-Sleep -Seconds 2
        }
    }
    
    if (-not $backendReady) {
        Write-Host "`n   WARNING: Backend taking longer than expected" -ForegroundColor Yellow
        Write-Host "   Check logs with: docker-compose logs backend" -ForegroundColor Yellow
    }
    
    # Hiển thị thông tin
    Write-Host "`n================================================" -ForegroundColor Cyan
    Write-Host "   COLLABSPHERE IS RUNNING!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Frontend:  http://localhost" -ForegroundColor White
    Write-Host "   Backend:   http://localhost:8000" -ForegroundColor White
    Write-Host "   API Docs:  http://localhost:8000/docs" -ForegroundColor White
    Write-Host "   Database:  localhost:5432" -ForegroundColor White
    Write-Host "   Redis:     localhost:6379" -ForegroundColor White
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Useful Commands:" -ForegroundColor Yellow
    Write-Host "   View logs:          docker-compose logs -f" -ForegroundColor Gray
    Write-Host "   Stop:               docker-compose stop" -ForegroundColor Gray
    Write-Host "   Restart:            docker-compose restart" -ForegroundColor Gray
    Write-Host "   Stop and remove:    docker-compose down" -ForegroundColor Gray
    Write-Host ""
    
    # Hỏi có muốn xem logs không
    Write-Host "Do you want to view logs now? (Y/N)" -ForegroundColor Yellow
    $viewLogs = Read-Host
    if ($viewLogs -eq "Y" -or $viewLogs -eq "y") {
        docker-compose logs -f
    }
    
} else {
    Write-Host "`n   ERROR: Failed to start containers!" -ForegroundColor Red
    Write-Host "   Check logs with: docker-compose logs" -ForegroundColor Yellow
    pause
    exit 1
}
