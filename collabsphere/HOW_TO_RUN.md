# CollabSphere - Quick Start Guide

## 🚀 Khởi Động Project

### Cách 1: Tự Động (Khuyến nghị)

**Windows:** Double-click 2 files sau (mở 2 terminal riêng):
1. `backend/START_BACKEND.bat` 
2. `frontend/START_FRONTEND.bat`

**PowerShell:**
```powershell
# Terminal 1: Backend
cd backend
.\START_BACKEND.bat

# Terminal 2: Frontend (terminal mới)
cd frontend
.\START_FRONTEND.bat
```

### Cách 2: Thủ Công

**Backend:**
```bash
cd collabsphere/backend
set PYTHONPATH=%cd%
python -m uvicorn app.main:app --host 127.0.0.1 --port 8001
```

**Frontend:**
```bash
cd collabsphere/frontend
npm start
```

---

## 🌐 Access URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001
- **API Documentation:** http://localhost:8001/docs
- **Alternative API Docs:** http://localhost:8001/redoc

---

## ✅ Verify Servers Running

**Check Backend:**
```powershell
curl http://localhost:8001
# Should return: {"message": "CollabSphere API", "status": "running", ...}
```

**Check Frontend:**
- Open http://localhost:3000 in browser
- Should see login/register page

---

## 🐛 Troubleshooting

### Backend won't start:
```powershell
# Check port 8001 is free
netstat -ano | findstr :8001

# Kill process if needed
taskkill /PID <PID> /F

# Reinstall dependencies
cd backend
pip install -r requirements.txt
```

### Frontend won't start:
```powershell
# Check port 3000 is free
netstat -ano | findstr :3000

# Kill process if needed  
taskkill /PID <PID> /F

# Reinstall dependencies
cd frontend
npm install
```

### Database issues:
```powershell
# Delete and recreate database
cd backend
del collabsphere.db
python -c "from app.database import create_db_and_tables; create_db_and_tables()"
```

---

## 📝 First Time Usage

1. Start both servers (see above)
2. Open http://localhost:3000
3. Click "Đăng ký tài khoản" (Register)
4. Fill in:
   - Họ và tên: Your name
   - Mã sinh viên: Optional student ID
   - Email: Valid email (e.g., test@example.com)
   - Password: At least 6 characters
5. Click "Đăng ký"
6. Login with your email and password

---

## 🔧 Configuration

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:8001/api/v1
REACT_APP_SOCKET_URL=http://localhost:8001
```

**Backend (config.py):**
- Database: SQLite (collabsphere.db)
- CORS: Allows localhost:3000
- Debug: Enabled

---

## 📊 Tech Stack

- **Backend:** Python 3.13 + FastAPI + SQLModel + SQLite
- **Frontend:** React 18 + Material-UI + Axios
- **Auth:** JWT tokens (access + refresh)
- **Real-time:** Socket.io (for chat/notifications)

---

## ✅ Project Status

- ✅ Backend: 121 API endpoints ready
- ✅ Frontend: 29 pages (5 roles)
- ✅ Database: 28 tables created
- ✅ Auth: Login/Register working
- ✅ Overall: 81% complete

---

**Need help?** Check logs in terminal windows or browser console (F12)
