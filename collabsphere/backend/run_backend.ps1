# Script khởi động Backend CollabSphere
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "    COLLABSPHERE BACKEND SERVER" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Set working directory
Set-Location "C:\Users\LENOVO\Desktop\SE\collabsphere\backend"

# Set PYTHONPATH
$env:PYTHONPATH = "C:\Users\LENOVO\Desktop\SE\collabsphere\backend"

Write-Host "📍 Backend URL: http://localhost:8001" -ForegroundColor Yellow
Write-Host "📚 API Documentation: http://localhost:8001/docs" -ForegroundColor Yellow
Write-Host "🔄 Đang khởi động server...`n" -ForegroundColor Cyan

# Start Uvicorn server
C:/Users/LENOVO/AppData/Local/Microsoft/WindowsApps/python3.13.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
