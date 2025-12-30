# 🚀 HƯỚNG DẪN CHẠY ĐẦY ĐỦ PROJECT COLLABSPHERE

## 📋 MỤC LỤC
1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cách 1: Chạy bằng Docker (Khuyến nghị)](#cách-1-chạy-bằng-docker)
3. [Cách 2: Chạy thủ công](#cách-2-chạy-thủ-công)
4. [Tạo tài khoản test](#tạo-tài-khoản-test)
5. [Truy cập và sử dụng](#truy-cập-và-sử-dụng)
6. [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)

---

## 📦 YÊU CẦU HỆ THỐNG

### Cách 1: Docker (Đơn giản nhất)
- **Docker Desktop**: >= 4.0
- **Docker Compose**: >= 2.0

### Cách 2: Chạy thủ công
- **Python**: >= 3.10
- **Node.js**: >= 16
- **PostgreSQL**: >= 14
- **Redis**: >= 6.0

---

## 🐳 CÁCH 1: CHẠY BẰNG DOCKER (KHUYẾN NGHỊ)

### Bước 1: Cài đặt Docker Desktop
1. Tải Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Cài đặt và khởi động Docker Desktop
3. Kiểm tra cài đặt:
```powershell
docker --version
docker-compose --version
```

### Bước 2: Tạo file .env
```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere
```

Tạo file `.env` với nội dung:
```env
# Database
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=collabsphere

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production-min-32-chars

# AWS (Optional - dành cho AI features)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

# Cloudinary (Optional - dành cho upload files)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Email (Optional - dành cho gửi thông báo)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Bước 3: Chạy toàn bộ hệ thống
```powershell
# Di chuyển vào thư mục project
cd C:\Users\LENOVO\Desktop\SE\collabsphere

# Khởi động tất cả services (lần đầu sẽ mất thời gian build images)
docker-compose up -d

# Xem logs để kiểm tra
docker-compose logs -f
```

### Bước 4: Khởi tạo database
```powershell
# Chạy migrations
docker-compose exec backend alembic upgrade head

# Tạo tài khoản test (tùy chọn)
docker-compose exec backend python create_test_accounts.py
```

### ✅ XONG! Truy cập:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Các lệnh Docker hữu ích:
```powershell
# Dừng tất cả services
docker-compose down

# Khởi động lại
docker-compose restart

# Xem logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend

# Xem trạng thái
docker-compose ps

# Xóa toàn bộ (bao gồm database)
docker-compose down -v

# Rebuild nếu có thay đổi code
docker-compose up -d --build
```

---

## 💻 CÁCH 2: CHẠY THỦ CÔNG

### A. CÀI ĐẶT VÀ CHẠY POSTGRESQL

#### Bước 1: Cài đặt PostgreSQL
1. Tải PostgreSQL: https://www.postgresql.org/download/windows/
2. Cài đặt và ghi nhớ password của user `postgres`

#### Bước 2: Tạo database
```powershell
# Mở PowerShell và kết nối PostgreSQL
psql -U postgres

# Trong psql prompt:
CREATE DATABASE collabsphere;
\q
```

### B. CÀI ĐẶT VÀ CHẠY REDIS

#### Cách 1: Dùng Windows Subsystem for Linux (WSL)
```powershell
wsl --install
# Sau khi restart và cài WSL
wsl
sudo apt update
sudo apt install redis-server
sudo service redis-server start
```

#### Cách 2: Dùng Memurai (Redis cho Windows)
1. Tải: https://www.memurai.com/get-memurai
2. Cài đặt và khởi động service

### C. CHẠY BACKEND

```powershell
# Di chuyển vào thư mục backend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend

# Tạo virtual environment
python -m venv venv

# Kích hoạt virtual environment
.\venv\Scripts\Activate.ps1

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file .env
New-Item -Path .env -ItemType File
```

Nội dung file `.env`:
```env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/collabsphere
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-super-secret-key-change-this-in-production-min-32-chars
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

```powershell
# Chạy migrations
alembic upgrade head

# Khởi động backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend sẽ chạy tại: http://localhost:8000

### D. CHẠY FRONTEND

**MỞ POWERSHELL MỚI** (để backend vẫn chạy):

```powershell
# Di chuyển vào thư mục frontend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\frontend

# Cài đặt dependencies
npm install

# Tạo file .env
New-Item -Path .env -ItemType File
```

Nội dung file `.env`:
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_SOCKET_URL=http://localhost:8000
```

```powershell
# Khởi động frontend
npm start
```

Frontend sẽ tự động mở browser tại: http://localhost:3000

---

## 👥 TẠO TÀI KHOẢN TEST

### Cách 1: Dùng script có sẵn (Docker)
```powershell
docker-compose exec backend python create_test_accounts.py
```

### Cách 2: Dùng script có sẵn (Thủ công)
```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend
.\venv\Scripts\Activate.ps1
python create_test_accounts.py
```

### Cách 3: Tạo thủ công qua API
Truy cập: http://localhost:8000/docs

Sử dụng endpoint `POST /api/v1/auth/register` với body:
```json
{
  "email": "admin@example.com",
  "password": "Admin123!",
  "full_name": "Administrator",
  "role": "admin"
}
```

---

## 🎯 TRUY CẬP VÀ SỬ DỤNG

### 1. Truy cập hệ thống

#### Với Docker:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

#### Với cài đặt thủ công:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

### 2. Tài khoản mẫu (nếu chạy script tạo test accounts)

| Vai trò | Email | Password | Mô tả |
|---------|-------|----------|-------|
| Admin | admin@example.com | Admin123! | Quản trị hệ thống |
| Staff | staff@example.com | Staff123! | Quản lý môn học |
| Head | head@example.com | Head123! | Trưởng khoa |
| Lecturer | lecturer@example.com | Lecturer123! | Giảng viên |
| Student | student@example.com | Student123! | Sinh viên |

### 3. Luồng sử dụng cơ bản

#### A. Đăng nhập
1. Truy cập frontend
2. Nhập email và password
3. Hệ thống sẽ chuyển đến dashboard tương ứng với vai trò

#### B. Admin
- Quản lý người dùng
- Xem thống kê hệ thống
- Cấu hình hệ thống

#### C. Staff
- Tạo môn học
- Tạo lớp học
- Import danh sách sinh viên từ Excel

#### D. Lecturer
- Tạo đề xuất đồ án
- Quản lý nhóm sinh viên
- Đánh giá và chấm điểm
- Chat với sinh viên
- Sử dụng AI hỗ trợ

#### E. Student
- Tham gia nhóm
- Hoàn thành tasks
- Chat với giảng viên và nhóm
- Đánh giá đồng nghiệp
- Sử dụng AI hỗ trợ

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### 1. Docker không khởi động được

**Lỗi**: Cannot connect to Docker daemon
```powershell
# Kiểm tra Docker Desktop đã chạy chưa
# Mở Docker Desktop và đợi nó khởi động hoàn toàn
```

**Lỗi**: Port already in use
```powershell
# Tìm và tắt process đang dùng port
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Hoặc đổi port trong docker-compose.yml
```

### 2. Database connection failed

**Với Docker**:
```powershell
# Kiểm tra database container
docker-compose ps
docker-compose logs db

# Restart database
docker-compose restart db
```

**Với cài đặt thủ công**:
```powershell
# Kiểm tra PostgreSQL service đang chạy
Get-Service -Name postgresql*

# Kiểm tra kết nối
psql -U postgres -d collabsphere
```

### 3. Frontend không kết nối được Backend

**Kiểm tra file .env**:
```env
# Phải đúng URL của backend
REACT_APP_API_URL=http://localhost:8000/api/v1
```

**Kiểm tra CORS** trong [backend/app/main.py](collabsphere/backend/app/main.py):
```python
# Phải có localhost:3000 trong origins
origins = [
    "http://localhost:3000",
    "http://localhost",
]
```

### 4. Module not found

**Backend**:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Frontend**:
```powershell
cd frontend
npm install
```

### 5. Alembic migration failed

```powershell
# Xem trạng thái migration
alembic current

# Quay lại version trước
alembic downgrade -1

# Hoặc xóa database và tạo lại
docker-compose down -v
docker-compose up -d
docker-compose exec backend alembic upgrade head
```

### 6. Redis connection error

**Với Docker**: Redis sẽ tự động chạy trong container

**Với cài đặt thủ công**:
```powershell
# Nếu dùng WSL
wsl sudo service redis-server start

# Nếu dùng Memurai, kiểm tra service đang chạy
Get-Service Memurai
```

### 7. Port đã bị sử dụng

```powershell
# Tìm process đang dùng port 8000
netstat -ano | findstr :8000

# Tắt process (thay <PID> bằng số thực tế)
taskkill /PID <PID> /F

# Tương tự với port 3000 (frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📝 GHI CHÚ QUAN TRỌNG

### 1. Các biến môi trường tùy chọn

**Bắt buộc**:
- `DATABASE_URL`: Kết nối database
- `SECRET_KEY`: Mã hóa JWT tokens

**Tùy chọn** (có thể bỏ qua lúc development):
- `AWS_*`: Chỉ cần khi sử dụng AI features (Claude)
- `CLOUDINARY_URL`: Chỉ cần khi upload files
- `SMTP_*`: Chỉ cần khi gửi email

### 2. Development vs Production

**Development** (localhost):
- Dùng HTTP
- Debug mode bật
- Hot reload

**Production** (deploy):
- Phải dùng HTTPS
- Tắt debug mode
- Đổi SECRET_KEY thành giá trị phức tạp
- Cấu hình database production
- Tắt --reload flag

### 3. Backup dữ liệu

```powershell
# Backup database (Docker)
docker-compose exec -T db pg_dump -U postgres collabsphere > backup.sql

# Restore
docker-compose exec -T db psql -U postgres collabsphere < backup.sql
```

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra logs: `docker-compose logs -f`
2. Xem API docs: http://localhost:8000/docs
3. Kiểm tra network: `docker-compose ps`
4. Restart services: `docker-compose restart`

---

## ✨ TỔNG KẾT CÁC LỆNH QUAN TRỌNG

### Docker (Khuyến nghị)
```powershell
# Setup ban đầu
cd C:\Users\LENOVO\Desktop\SE\collabsphere
docker-compose up -d
docker-compose exec backend alembic upgrade head
docker-compose exec backend python create_test_accounts.py

# Dừng
docker-compose down

# Khởi động lại
docker-compose up -d

# Xem logs
docker-compose logs -f
```

### Thủ công
```powershell
# Terminal 1 - Backend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd C:\Users\LENOVO\Desktop\SE\collabsphere\frontend
npm start

# Terminal 3 - Redis (nếu cần)
wsl sudo service redis-server start
```

---

**Chúc bạn chạy project thành công! 🎉**
