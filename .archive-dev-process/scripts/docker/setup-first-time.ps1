# ============================================
# CollabSphere - First Time Setup Script
# ============================================

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   COLLABSPHERE - FIRST TIME SETUP" -ForegroundColor Yellow
Write-Host "================================================`n" -ForegroundColor Cyan

$projectRoot = $PSScriptRoot

Write-Host "This script will:" -ForegroundColor White
Write-Host "  1. Create .env configuration file" -ForegroundColor Gray
Write-Host "  2. Run database migrations" -ForegroundColor Gray
Write-Host "  3. Create test accounts" -ForegroundColor Gray
Write-Host ""

$proceed = Read-Host "Continue? (Y/N)"
if ($proceed -ne "Y" -and $proceed -ne "y") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    exit
}

# Step 1: Create .env
Write-Host "`n[Step 1/3] Creating .env file..." -ForegroundColor Green

if (Test-Path ".env") {
    Write-Host "   .env already exists. Backup old file? (Y/N)" -ForegroundColor Yellow
    $backup = Read-Host
    if ($backup -eq "Y" -or $backup -eq "y") {
        Copy-Item ".env" ".env.backup"
        Write-Host "   Backed up to .env.backup" -ForegroundColor Green
    }
}

$envContent = @"
# ========================================
# CollabSphere Configuration
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ========================================

# Database Configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=collabsphere

# Security
SECRET_KEY=your-super-secret-key-change-in-production-2024-$(Get-Random)

# AWS Bedrock (AI Features) - Optional
# Get credentials from: https://aws.amazon.com/bedrock/
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Cloudinary (File Storage) - Optional
# Get credentials from: https://cloudinary.com/
CLOUDINARY_URL=

# Email SMTP - Optional
# For Gmail: Enable 2FA and create App Password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "   .env file created successfully!" -ForegroundColor Green

# Step 2: Run migrations (if using Docker)
Write-Host "`n[Step 2/3] Database setup..." -ForegroundColor Green
Write-Host "   Are you using Docker? (Y/N)" -ForegroundColor Yellow
$useDocker = Read-Host

if ($useDocker -eq "Y" -or $useDocker -eq "y") {
    Write-Host "   Checking if containers are running..." -ForegroundColor Yellow
    $dbRunning = docker ps --filter "name=collabsphere-db" --format "{{.Names}}" 2>&1
    
    if ($dbRunning -like "*collabsphere-db*") {
        Write-Host "   Running migrations..." -ForegroundColor Yellow
        docker-compose exec -T backend alembic upgrade head
        Write-Host "   Migrations completed!" -ForegroundColor Green
    } else {
        Write-Host "   Database container not running." -ForegroundColor Yellow
        Write-Host "   Start containers first with: start-docker.ps1" -ForegroundColor Yellow
    }
} else {
    Write-Host "   For manual setup, run migrations with:" -ForegroundColor Yellow
    Write-Host "   cd backend" -ForegroundColor Gray
    Write-Host "   .\venv\Scripts\Activate.ps1" -ForegroundColor Gray
    Write-Host "   alembic upgrade head" -ForegroundColor Gray
}

# Step 3: Create test accounts
Write-Host "`n[Step 3/3] Create test accounts..." -ForegroundColor Green
Write-Host "   Do you want to create test accounts? (Y/N)" -ForegroundColor Yellow
$createAccounts = Read-Host

if ($createAccounts -eq "Y" -or $createAccounts -eq "y") {
    if ($useDocker -eq "Y" -or $useDocker -eq "y") {
        $dbRunning = docker ps --filter "name=collabsphere-backend" --format "{{.Names}}" 2>&1
        
        if ($dbRunning -like "*collabsphere-backend*") {
            Write-Host "   Creating test accounts..." -ForegroundColor Yellow
            docker-compose exec -T backend python create_test_accounts.py
            
            Write-Host "`n   Test accounts created:" -ForegroundColor Green
            Write-Host "   ----------------------------------------" -ForegroundColor Gray
            Write-Host "   Admin:" -ForegroundColor Yellow
            Write-Host "      Email: admin@collabsphere.com" -ForegroundColor White
            Write-Host "      Password: admin123" -ForegroundColor White
            Write-Host ""
            Write-Host "   Lecturer:" -ForegroundColor Yellow
            Write-Host "      Email: lecturer@collabsphere.com" -ForegroundColor White
            Write-Host "      Password: lecturer123" -ForegroundColor White
            Write-Host ""
            Write-Host "   Student:" -ForegroundColor Yellow
            Write-Host "      Email: student@collabsphere.com" -ForegroundColor White
            Write-Host "      Password: student123" -ForegroundColor White
            Write-Host "   ----------------------------------------" -ForegroundColor Gray
        } else {
            Write-Host "   Backend container not running." -ForegroundColor Yellow
        }
    } else {
        Write-Host "   For manual setup, run:" -ForegroundColor Yellow
        Write-Host "   cd backend" -ForegroundColor Gray
        Write-Host "   python create_test_accounts.py" -ForegroundColor Gray
    }
}

# Summary
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "   SETUP COMPLETE!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Review and update .env file with your credentials" -ForegroundColor White
Write-Host "  2. Start the system:" -ForegroundColor White
Write-Host "     - Docker:  .\start-docker.ps1" -ForegroundColor Gray
Write-Host "     - Manual:  .\start-manual.ps1" -ForegroundColor Gray
Write-Host "  3. Open http://localhost (Docker) or http://localhost:3000 (Manual)" -ForegroundColor White
Write-Host ""
Write-Host "Documentation: ../HUONG_DAN_CHAY_HE_THONG.md" -ForegroundColor Cyan
Write-Host ""
pause
