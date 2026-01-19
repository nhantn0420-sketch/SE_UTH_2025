# Script: Push Project to GitHub
# Date: 9/1/2026
# Purpose: Check, commit, and push all changes to GitHub

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  PUSH PROJECT TO GITHUB" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Check Git status
Write-Host "[1/6] Checking Git status..." -ForegroundColor Green
$gitStatus = git status --short
if ($gitStatus) {
    Write-Host "Files to commit:" -ForegroundColor Yellow
    $gitStatus | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "No changes to commit!" -ForegroundColor Green
    exit 0
}

# Step 2: Check remote repository
Write-Host "`n[2/6] Checking remote repository..." -ForegroundColor Green
$remoteUrl = git remote get-url origin 2>&1
if ($remoteUrl -match "github.com") {
    Write-Host "Remote: $remoteUrl" -ForegroundColor Cyan
} else {
    Write-Host "ERROR: No GitHub remote configured!" -ForegroundColor Red
    Write-Host "Please run: git remote add origin <your-github-url>" -ForegroundColor Yellow
    exit 1
}

# Step 3: Stage all changes
Write-Host "`n[3/6] Staging all changes..." -ForegroundColor Green
git add -A
if ($?) {
    Write-Host "All changes staged successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to stage changes!" -ForegroundColor Red
    exit 1
}

# Step 4: Commit changes
Write-Host "`n[4/6] Committing changes..." -ForegroundColor Green
$commitMessage = @"
docs: Update documentation with diagrams and reorganization

- Added 10 diagrams to 3.2-UserRequirements.md (sequence diagrams)
- Added Gantt chart to 02-ProjectManagementPlan.md
- Created IMAGE_AUDIT_COMPLETE_REPORT.md
- Created DIAGRAM_IMPLEMENTATION_STATUS.md
- Created FOLDER_REORGANIZATION_GUIDE.md
- All 31 diagrams now properly integrated (100% complete)
- Updated diagram mapping and documentation structure
"@

git commit -m $commitMessage
if ($?) {
    Write-Host "Changes committed successfully!" -ForegroundColor Green
} else {
    Write-Host "ERROR: Failed to commit changes!" -ForegroundColor Red
    exit 1
}

# Step 5: Check current branch
Write-Host "`n[5/6] Checking current branch..." -ForegroundColor Green
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan

# Step 6: Push to GitHub
Write-Host "`n[6/6] Pushing to GitHub..." -ForegroundColor Green
Write-Host "Pushing to origin/$currentBranch..." -ForegroundColor Yellow

git push origin $currentBranch
if ($?) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "  SUCCESS: PUSHED TO GITHUB!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`nRepository: $remoteUrl" -ForegroundColor Cyan
    Write-Host "Branch: $currentBranch" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: Failed to push to GitHub!" -ForegroundColor Red
    Write-Host "This might be because:" -ForegroundColor Yellow
    Write-Host "  1. No upstream branch set (try: git push -u origin $currentBranch)" -ForegroundColor White
    Write-Host "  2. Authentication failed (check your GitHub credentials)" -ForegroundColor White
    Write-Host "  3. Network connection issues" -ForegroundColor White
    exit 1
}

Write-Host "`nDone! Check your GitHub repository." -ForegroundColor Cyan
