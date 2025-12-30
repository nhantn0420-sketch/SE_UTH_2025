# CollabSphere (COSRE)

**Hệ thống hỗ trợ học tập theo phương pháp học tập dự án**  
*Project-Based Learning Support System*

## 📋 Tổng quan

CollabSphere là một nền tảng web hỗ trợ học tập theo phương pháp PBL (Project-Based Learning) với 5 vai trò người dùng:
- **Admin**: Quản lý người dùng và hệ thống
- **Staff**: Quản lý môn học và lớp học
- **Department Head**: Phê duyệt đề xuất đồ án
- **Lecturer**: Tạo và quản lý đồ án, đánh giá sinh viên
- **Student**: Tham gia dự án, hoàn thành task, đánh giá đồng nghiệp

## 🏗 Kiến trúc

```
collabsphere/
├── backend/           # FastAPI Backend
│   ├── app/
│   │   ├── models/    # SQLModel entities
│   │   ├── routers/   # API endpoints
│   │   ├── services/  # Business logic
│   │   └── utils/     # Security, helpers
│   └── requirements.txt
├── frontend/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   └── package.json
└── README.md
```

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Python >= 3.10
- Node.js >= 16
- PostgreSQL >= 14

### Backend Setup

```bash
# Di chuyển đến thư mục backend
cd collabsphere/backend

# Tạo virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Cài đặt dependencies
pip install -r requirements.txt

# Tạo file .env từ template
copy .env.example .env

# Cấu hình database trong .env
# DATABASE_URL=postgresql://user:password@localhost/collabsphere

# Chạy migrations
alembic upgrade head

# Khởi động server
uvicorn app.main:app --reload
```

Backend sẽ chạy tại `http://localhost:8000`

### Frontend Setup

```bash
# Di chuyển đến thư mục frontend
cd collabsphere/frontend

# Cài đặt dependencies
npm install

# Tạo file .env từ template
copy .env.example .env

# Khởi động development server
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

## 📦 Tech Stack

### Backend
- **FastAPI** - Web framework
- **SQLModel** - ORM (SQLAlchemy + Pydantic)
- **PostgreSQL** - Database
- **JWT** - Authentication
- **AWS Bedrock** - AI (Claude)
- **Cloudinary** - File storage
- **Socket.IO** - Real-time

### Frontend
- **React 18** - UI library
- **Material-UI 5** - Component library
- **React Router DOM 6** - Routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time
- **Recharts** - Charts
- **React Hook Form** - Forms

## 🔑 Tính năng chính

### 1. Quản lý người dùng
- Đăng ký/Đăng nhập
- Phân quyền theo vai trò
- Import người dùng từ Excel

### 2. Quản lý môn học & Lớp học
- CRUD môn học, lớp học
- Phân công giảng viên
- Import từ Excel

### 3. Quản lý đồ án
- Tạo đồ án với wizard
- AI đề xuất milestone
- Quy trình phê duyệt

### 4. Quản lý nhóm
- Tạo nhóm sinh viên
- Phân công task
- Theo dõi tiến độ

### 5. Collaboration
- Chat real-time
- Video call (WebRTC)
- Bảng trắng chung

### 6. Đánh giá
- Đánh giá nhóm
- Đánh giá đồng nghiệp
- Checkpoint đánh giá

### 7. AI Integration
- Tự động tạo milestone
- Phân tích tiến độ
- Chatbot hỗ trợ

## 📚 API Documentation

Sau khi khởi động backend, truy cập:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📄 License

MIT License

---

**CollabSphere (COSRE)** - Xây dựng bởi nhóm phát triển SE
