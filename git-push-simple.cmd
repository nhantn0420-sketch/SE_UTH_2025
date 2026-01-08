@echo off
chcp 65001 >nul
cd /d "C:\Users\LENOVO\Desktop\SE"

echo.
echo [1/5] Setting remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/nhantn0420-sketch/SE_UTH_2025.git
git remote -v

echo.
echo [2/5] Checking Git status...
git status --short

echo.
echo [3/5] Staging all changes...
git add -A

echo.
echo [4/5] Committing changes...
git commit -m "docs: Update documentation with diagrams and reorganization" -m "" -m "- Added 10 diagrams to 3.2-UserRequirements.md (sequence diagrams)" -m "- Added Gantt chart to 02-ProjectManagementPlan.md" -m "- Created IMAGE_AUDIT_COMPLETE_REPORT.md" -m "- Created DIAGRAM_IMPLEMENTATION_STATUS.md" -m "- Created FOLDER_REORGANIZATION_GUIDE.md" -m "- Created push automation scripts" -m "- All 31 diagrams now properly integrated (100%% complete)" -m "- Updated diagram mapping and documentation structure"

echo.
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Done!
pause
