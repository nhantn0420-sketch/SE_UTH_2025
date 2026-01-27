# HƯỚNG DẪN CHẠY HỆ THỐNG COLLABSPHERE

## 📋 MỤC LỤC
- [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
- [⚡ Khởi Động Nhanh Với Scripts (Khuyến Nghị)](#-khởi-động-nhanh-với-scripts-khuyến-nghị)
- [Cách 1: Chạy Bằng Docker Compose](#cách-1-chạy-bằng-docker-compose)
- [Cách 2: Chạy Thủ Công Từng Service](#cách-2-chạy-thủ-công-từng-service)
- [Kiểm Tra Kết Nối](#kiểm-tra-kết-nối)
- [Troubleshooting](#troubleshooting)
- [Tài Khoản Test](#tài-khoản-test)

---

## 📦 YÊU CẦU HỆ THỐNG

### Phương Án 1: Docker (Khuyến nghị)
- **Docker Desktop** 4.20+ hoặc Docker Engine 20+
- **Docker Compose** 2.0+
- RAM tối thiểu: 4GB
- Dung lượng: 2GB trống

### Phương Án 2: Chạy Thủ Công
#### Backend Requirements:
- **Python** 3.11+
- **PostgreSQL** 15+ (hoặc SQLite cho dev)
- **Redis** 7+

#### Frontend Requirements:
- **Node.js** 18+ LTS
- **npm** 9+ hoặc **yarn** 1.22+

---

## ⚡ KHỞI ĐỘNG NHANH VỚI SCRIPTS (KHUYẾN NGHỊ)

### 🎯 Cách Đơn Giản Nhất - Chỉ 1 Click!

Tôi đã tạo sẵn các scripts tự động trong thư mục `collabsphere/`:

#### **Lần Đầu Tiên - Setup:**
```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere
.\setup-first-time.ps1
```
Script này sẽ:
- ✅ Tạo file `.env` với cấu hình mặc định
- ✅ Chạy database migrations
- ✅ Tạo tài khoản test (Admin, Lecturer, Student)

#### **Khởi Động Với Docker (Khuyến nghị):**
```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere
.\start-docker.ps1
```
Hoặc double-click file `start-docker.ps1` trong File Explorer!

**Script sẽ tự động:**
- ✅ Kiểm tra Docker đang chạy
- ✅ Tạo file `.env` nếu chưa có
- ✅ Build và start tất cả containers
- ✅ Chờ backend khởi động xong
- ✅ Hiển thị URLs để truy cập

#### **Khởi Động Thủ Công (Không cần Docker):**
```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere
.\start-manual.ps1
```

**Script sẽ tự động:**
- ✅ Kiểm tra Python và Node.js
- ✅ Tạo virtual environment cho Python
- ✅ Cài đặt dependencies (pip + npm)
- ✅ Chạy migrations
- ✅ Mở 2 cửa sổ mới cho Backend và Frontend

#### **Dừng Docker:**
```powershell
.\stop-docker.ps1
```

Script này cho phép bạn chọn:
1. Stop containers (giữ data)
2. Stop và xóa containers (giữ data)
3. Xóa tất cả kể cả data

#### **CMD Alternative (Nếu PowerShell bị chặn):**
```cmd
cd C:\Users\LENOVO\Desktop\SE\collabsphere
start-docker.cmd
```

### 📝 Scripts Có Sẵn

| Script | Mô Tả | Khi Nào Dùng |
|--------|-------|--------------|
| `setup-first-time.ps1` | Setup ban đầu | Lần đầu tiên sử dụng |
| `start-docker.ps1` | Khởi động Docker | Chạy hệ thống (Docker) |
| `start-manual.ps1` | Khởi động thủ công | Chạy hệ thống (không Docker) |
| `stop-docker.ps1` | Dừng Docker | Dừng hệ thống |
| `start-docker.cmd` | CMD version | Nếu PowerShell bị lỗi |

---

## 🚀 CÁCH 1: CHẠY BẰNG DOCKER COMPOSE

### Bước 1: Chuẩn Bị File Cấu Hình

**Tạo file `.env`** trong thư mục `collabsphere/`:

```bash
# Chuyển vào thư mục project
cd C:\Users\LENOVO\Desktop\SE\collabsphere

# Tạo file .env
notepad .env
```

**Nội dung file `.env`:**
```env
# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=collabsphere

# Security
SECRET_KEY=your-super-secret-key-change-in-production-2024

# AWS Bedrock (AI) - Tùy chọn, bỏ trống nếu không dùng AI
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1

# Cloudinary - Tùy chọn, bỏ trống nếu không upload file
CLOUDINARY_URL=

# Email SMTP - Tùy chọn
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
```

### Bước 2: Khởi Động Tất Cả Services

```bash
# Chuyển vào thư mục collabsphere
cd C:\Users\LENOVO\Desktop\SE\collabsphere

# Build và khởi động tất cả containers
docker-compose up --build

# Hoặc chạy ở background (không hiển thị logs)
docker-compose up -d --build
```

**Quá trình này sẽ:**
1. Tải các Docker images cần thiết
2. Build Backend (FastAPI)
3. Build Frontend (React)
4. Khởi động PostgreSQL
5. Khởi động Redis
6. Chạy database migrations
7. Khởi động các services

**Thời gian ước tính:** 5-10 phút lần đầu

### Bước 3: Kiểm Tra Trạng Thái

```bash
# Xem trạng thái containers
docker-compose ps

# Xem logs real-time
docker-compose logs -f

# Xem logs của từng service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

### Bước 4: Truy Cập Ứng Dụng

- **Frontend:** http://localhost (port 80)
- **Backend API:** http://localhost:8000
- **API Docs (Swagger):** http://localhost:8000/docs
- **Database:** localhost:5432
- **Redis:** localhost:6379

### Bước 5: Khởi Tạo Database (Lần Đầu)

```bash
# Chạy migrations
docker-compose exec backend alembic upgrade head

# Tạo tài khoản test (tùy chọn)
docker-compose exec backend python create_test_accounts.py
```

### Dừng Hệ Thống

```bash
# Dừng nhưng giữ lại data
docker-compose stop

# Dừng và xóa containers (giữ volumes/data)
docker-compose down

# Dừng và xóa tất cả (bao gồm cả data)
docker-compose down -v

# Khởi động lại sau khi dừng
docker-compose start
```

---

## 🔧 CÁCH 2: CHẠY THỦ CÔNG TỪNG SERVICE

### A. BACKEND (FastAPI)

#### Bước 1: Cài Đặt Dependencies

```bash
# Chuyển vào thư mục backend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
.\venv\Scripts\activate.bat

# Cài đặt packages
pip install -r requirements.txt
```

#### Bước 2: Cấu Hình Database

**Option 1: Sử dụng SQLite (Đơn giản - Dev only)**

File `app/config.py` đã cấu hình sẵn SQLite:
```python
database_url: str = "sqlite:///./collabsphere.db"
```

**Option 2: Sử dụng PostgreSQL (Production)**

1. Cài đặt PostgreSQL
2. Tạo database:
```sql
CREATE DATABASE collabsphere;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE collabsphere TO postgres;
```

3. Tạo file `.env` trong thư mục `backend/`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/collabsphere
SECRET_KEY=your-secret-key-here
REDIS_URL=redis://localhost:6379
```

#### Bước 3: Cài Đặt Redis (Tùy Chọn)

**Windows:**
```bash
# Tải Redis for Windows từ: https://github.com/microsoftarchive/redis/releases
# Hoặc dùng Docker:
docker run -d -p 6379:6379 redis:7-alpine
```

**Hoặc skip Redis** bằng cách comment code sử dụng Redis trong backend.

#### Bước 4: Chạy Database Migrations

```bash
# Tạo migration đầu tiên (nếu chưa có)
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

#### Bước 5: Tạo Dữ Liệu Test (Tùy Chọn)

```bash
# Tạo tài khoản test
python create_test_accounts.py

# Kiểm tra database
python check_db.py
python check_users.py
```

#### Bước 6: Khởi Động Backend Server

```bash
# Development mode (auto-reload)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Backend sẽ chạy tại:**
- API: http://localhost:8000
- Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

### B. FRONTEND (React)

#### Bước 1: Cài Đặt Dependencies

```bash
# Chuyển vào thư mục frontend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\frontend

# Cài đặt packages
npm install

# Hoặc dùng yarn
yarn install
```

#### Bước 2: Cấu Hình API URL

**Tạo file `.env.local`** trong thư mục `frontend/`:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_SOCKET_URL=http://localhost:8000
```

Hoặc sửa file `src/config.js`:
```javascript
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  socketUrl: process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000',
};
```

#### Bước 3: Khởi Động Frontend

```bash
# Development mode (hot reload)
npm start

# Hoặc dùng yarn
yarn start
```

**Frontend sẽ tự động mở tại:**
- http://localhost:3000

#### Bước 4: Build Production (Tùy Chọn)

```bash
# Build static files
npm run build

# Test production build với serve
npx serve -s build -p 80
```

---

## ✅ KIỂM TRA KẾT NỐI

### 1. Kiểm Tra Backend

**Trong trình duyệt hoặc Postman:**
```
GET http://localhost:8000/
```
Kết quả mong đợi:
```json
{
  "message": "Welcome to CollabSphere API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

**Kiểm tra API Docs:**
```
http://localhost:8000/docs
```

### 2. Kiểm Tra Database

```bash
# Nếu dùng Docker
docker-compose exec backend python check_db.py

# Nếu chạy thủ công
cd collabsphere/backend
python check_db.py
```

### 3. Kiểm Tra Frontend

Mở trình duyệt:
```
http://localhost:3000  (development)
http://localhost:80    (Docker)
```

### 4. Test Login Flow

1. Truy cập Frontend
2. Click "Login" hoặc "Register"
3. Tạo tài khoản mới hoặc dùng tài khoản test
4. Kiểm tra console browser (F12) để xem API calls

---

## 🐛 TROUBLESHOOTING

### Lỗi 1: "Port Already in Use"

**Backend (port 8000):**
```bash
# Windows - Tìm process đang dùng port
netstat -ano | findstr :8000

# Kill process
taskkill /PID <PID_NUMBER> /F
```

**Frontend (port 3000):**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Database (port 5432):**
```bash
# Stop PostgreSQL service
net stop postgresql-x64-15
```

### Lỗi 2: "Cannot Connect to Database"

```bash
# Kiểm tra PostgreSQL đang chạy
# Windows Services: Win+R -> services.msc -> tìm PostgreSQL

# Test connection
psql -U postgres -d collabsphere

# Kiểm tra DATABASE_URL trong .env
echo $env:DATABASE_URL  # PowerShell
echo %DATABASE_URL%     # CMD
```

### Lỗi 3: "Module Not Found" (Backend)

```bash
# Cài lại dependencies
pip install -r requirements.txt --force-reinstall

# Kiểm tra virtual environment đã activate chưa
where python  # Should point to venv
```

### Lỗi 4: "npm install failed" (Frontend)

```bash
# Xóa cache và node_modules
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Hoặc dùng yarn
rm -rf node_modules yarn.lock
yarn install
```

### Lỗi 5: "CORS Error"

Kiểm tra `backend/app/config.py`:
```python
cors_origins: list = [
    "http://localhost:3000",
    "http://localhost:80",
    "http://127.0.0.1:3000",
]
```

### Lỗi 6: Docker Compose Failed

```bash
# Xem logs chi tiết
docker-compose logs

# Rebuild từ đầu
docker-compose down -v
docker system prune -a
docker-compose up --build

# Kiểm tra Docker daemon
docker ps
docker version
```

### Lỗi 7: "Database Migration Failed"

```bash
# Reset migrations (CHÚ Ý: Mất data!)
rm -rf alembic/versions/*
alembic stamp head
alembic revision --autogenerate -m "Initial"
alembic upgrade head

# Hoặc downgrade rồi upgrade lại
alembic downgrade base
alembic upgrade head
```

---

## 👤 TÀI KHOẢN TEST

### Tạo Tài Khoản Test

**Sử dụng script:**
```bash
# Docker
docker-compose exec backend python create_test_accounts.py

# Thủ công
cd collabsphere/backend
python create_test_accounts.py
```

### Tài Khoản Mặc Định (Sau khi chạy script)

**Admin:**
- Email: `admin@collabsphere.com`
- Password: `admin123`
- Role: `ADMIN`

**Lecturer:**
- Email: `lecturer@collabsphere.com`
- Password: `lecturer123`
- Role: `LECTURER`

**Student:**
- Email: `student@collabsphere.com`
- Password: `student123`
- Role: `STUDENT`

### Tạo Tài Khoản Qua API

**Endpoint:** `POST http://localhost:8000/api/v1/auth/register`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "student_id": "2021000001",
  "role": "STUDENT"
}
```

---

## 📊 CẤU TRÚC PORT

| Service    | Port  | URL                        |
|------------|-------|----------------------------|
| Frontend   | 80    | http://localhost           |
| Frontend   | 3000  | http://localhost:3000      |
| Backend    | 8000  | http://localhost:8000      |
| Database   | 5432  | localhost:5432             |
| Redis      | 6379  | localhost:6379             |

---

## 🔄 WORKFLOW PHÁT TRIỂN

### 1. Khởi Động Hàng Ngày

```bash
# Option A: Docker
cd collabsphere
docker-compose up

# Option B: Thủ công
# Terminal 1 - Backend
cd collabsphere/backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd collabsphere/frontend
npm start
```

### 2. Làm Việc Với Database

```bash
# Tạo migration mới khi thay đổi models
alembic revision --autogenerate -m "Add new table"

# Apply migration
alembic upgrade head

# Rollback migration
alembic downgrade -1

# Reset database (WARNING: Loses all data!)
alembic downgrade base
rm collabsphere.db  # If using SQLite
alembic upgrade head
```

### 3. Test API

```bash
# Dùng Swagger UI
http://localhost:8000/docs

# Dùng curl
curl http://localhost:8000/api/v1/health

# Dùng Python requests
python -c "import requests; print(requests.get('http://localhost:8000').json())"
```

### 4. Dừng Hệ Thống

```bash
# Docker
docker-compose stop

# Thủ công: Ctrl+C trong từng terminal
```

---

## 📝 GHI CHÚ QUAN TRỌNG

1. **Environment Variables:** Không commit file `.env` lên Git
2. **Database:** SQLite chỉ dùng cho development, production phải dùng PostgreSQL
3. **Secret Key:** Đổi `SECRET_KEY` trong production
4. **CORS:** Thêm domain production vào `cors_origins`
5. **File Upload:** Cần cấu hình Cloudinary hoặc AWS S3 cho production
6. **Email:** Cần SMTP credentials để gửi email
7. **AI Features:** Cần AWS Bedrock credentials để dùng AI
8. **Redis:** Optional cho development, required cho production (real-time features)

---

## 🆘 HỖ TRỢ

### Kiểm Tra Logs

**Docker:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

**Thủ công:**
- Backend: Xem terminal đang chạy uvicorn
- Frontend: Xem terminal đang chạy npm start
- Browser: F12 -> Console tab

### Command Cheat Sheet

```bash
# Docker
docker-compose up -d              # Khởi động background
docker-compose stop               # Dừng
docker-compose restart backend    # Restart backend
docker-compose exec backend bash  # SSH vào container
docker-compose down -v            # Xóa tất cả

# Backend
pip freeze > requirements.txt     # Update dependencies
alembic upgrade head              # Chạy migrations
python create_test_accounts.py   # Tạo test data

# Frontend
npm run build                     # Build production
npm audit fix                     # Fix security issues
```

---

## ✨ TÍNH NĂNG CHÍNH CẦN TEST

1. **Authentication:** Register, Login, Logout
2. **Projects:** Create, View, Update, Delete
3. **Groups:** Create, Join, Manage members
4. **Chat:** Real-time messaging (cần Redis)
5. **Meetings:** Video call (cần WebRTC)
6. **Resources:** Upload/Download files (cần Cloudinary)
7. **Evaluations:** Grade submissions
8. **Notifications:** Real-time updates
9. **AI:** Generate milestones, Q&A (cần AWS Bedrock)

---

**Ngày cập nhật:** 12/01/2026  
**Version:** 1.0.0  
**Tác giả:** CollabSphere Development Team
