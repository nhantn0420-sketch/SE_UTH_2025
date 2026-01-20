# CollabSphere

**Hệ thống hỗ trợ học tập dựa trên dự án**  
*Project-Based Learning Management System*

[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## 📋 Tổng quan

CollabSphere là nền tảng web toàn diện hỗ trợ phương pháp học tập dựa trên dự án (Project-Based Learning) với các tính năng:

- 🎯 **Quản lý dự án thông minh** với AI hỗ trợ tạo milestone tự động
- 👥 **Collaboration Real-time** với chat, video call, và shared whiteboard
- 📊 **Đánh giá đa chiều** (nhóm, cá nhân, peer review)
- 🤖 **AI Integration** (AWS Bedrock Claude) cho phân tích tiến độ
- 🔔 **Thông báo Real-time** với WebSocket
- 📱 **Responsive Design** tương thích mọi thiết bị

### Vai trò người dùng
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

## 🚀 Cài đặt nhanh với Docker (Khuyến nghị)

### Yêu cầu
- Docker Desktop >= 20.10
- Docker Compose >= 2.0

### Khởi động toàn bộ hệ thống

```bash
# Clone repository
git clone https://github.com/nhantn0420-sketch/SE_UTH_2025.git
cd SE_UTH_2025/collabsphere

# Tạo file .env từ template (nếu chưa có)
copy .env.example .env  # Windows
# cp .env.example .env  # Linux/Mac

# Khởi động tất cả services (database, redis, backend, frontend)
docker compose up -d

# Xem logs
docker compose logs -f

# Dừng services
docker compose down
```

**Services sẽ chạy tại**:
- 🎨 Frontend: http://localhost
- ⚙️ Backend API: http://localhost:8000
- 📚 API Docs (Swagger): http://localhost:8000/docs
- 📖 API Docs (ReDoc): http://localhost:8000/redoc
- 🗄️ PostgreSQL: localhost:5432
- 🔴 Redis: localhost:6379

### Kiểm tra trạng thái

```bash
# Xem containers đang chạy
docker compose ps

# Xem logs của service cụ thể
docker compose logs -f backend
docker compose logs -f frontend

# Restart service
docker compose restart backend
```

---

## 🛠 Cài đặt thủ công (Development)

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
- **FastAPI 0.115** - Modern Python web framework
- **SQLModel** - ORM (SQLAlchemy + Pydantic)
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching & pub/sub
- **JWT** - Authentication & authorization
- **AWS Bedrock (Claude)** - AI milestone generation
- **Cloudinary** - File & image storage
- **Socket.IO** - WebSocket for real-time features
- **Alembic** - Database migrations
- **Pytest** - Testing framework

### Frontend
- **React 18.2** - UI library
- **Material-UI 5** - Component library
- **React Router DOM 6** - Client-side routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Simple Peer** - WebRTC for video calls
- **React Quill** - Rich text editor

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nginx** - Reverse proxy (production)
- **GitHub Actions** - CI/CD pipeline
- **Pytest & Jest** - Automated testing

## 🔑 Tính năng chính

### 1. 👤 Quản lý người dùng
- Đăng ký/Đăng nhập với JWT authentication
- Phân quyền theo 5 vai trò (RBAC)
- Import người dùng hàng loạt từ Excel
- Quản lý profile và avatar

### 2. 📚 Quản lý môn học & Lớp học
- CRUD môn học, lớp học, học kỳ
- Phân công giảng viên vào lớp
- Import danh sách sinh viên từ Excel
- Quản lý thời khóa biểu

### 3. 🎯 Quản lý đồ án
- Tạo đồ án với wizard interface
- **AI tự động đề xuất milestone** (AWS Bedrock Claude)
- Quy trình phê duyệt 2 cấp (Lecturer → Department Head)
- Template đồ án có sẵn
- Quản lý tài liệu đính kèm

### 4. 👥 Quản lý nhóm
- Tạo nhóm sinh viên tự động/thủ công
- Sinh viên chọn đồ án cho nhóm
- Phân công task và theo dõi tiến độ
- Team chat và shared resources

### 5. 🤝 Collaboration Real-time
- **Real-time chat** với WebSocket
- **Video call 1-1 và nhóm** (WebRTC)
- Shared whiteboard/drawing board
- File sharing trong nhóm
- Thông báo real-time

### 6. 📊 Đánh giá đa chiều
- Đánh giá checkpoint theo milestone
- Đánh giá nhóm (group evaluation)
- Peer review (đánh giá đồng nghiệp)
- Tự động tính điểm tổng hợp
- Export báo cáo đánh giá

### 7. 🤖 AI Integration
- AI tạo milestone tự động từ mô tả đồ án
- AI phân tích tiến độ và đưa ra khuyến nghị
- AI chatbot hỗ trợ sinh viên 24/7
- Sentiment analysis cho peer review

### 8. 🔔 Thông báo & Báo cáo
- Real-time notifications (WebSocket)
- Email notifications (SMTP)
- Dashboard thống kê cho từng vai trò
- Export báo cáo Excel/PDF

## 📚 API Documentation

Sau khi khởi động backend, truy cập:
- **Swagger UI**: http://localhost:8000/docs (Interactive API testing)
- **ReDoc**: http://localhost:8000/redoc (Beautiful API docs)

### API Endpoints Overview

| Module | Endpoints | Description |
|--------|-----------|-------------|
| **Authentication** | `/api/auth/*` | Login, register, refresh token |
| **Users** | `/api/users/*` | User management, profile |
| **Subjects** | `/api/subjects/*` | Subject & class management |
| **Projects** | `/api/projects/*` | Project CRUD, approval workflow |
| **Groups** | `/api/groups/*` | Team management, members |
| **Evaluations** | `/api/evaluations/*` | Assessment, peer review |
| **Chat** | `/api/chat/*` | Messages, conversations |
| **Meetings** | `/api/meetings/*` | Video call sessions |
| **Notifications** | `/api/notifications/*` | Real-time notifications |
| **AI** | `/api/ai/*` | AI milestone generation, chatbot |
| **Resources** | `/api/resources/*` | File upload/download |

Tổng cộng: **120+ endpoints**

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_auth.py

# Run with verbose output
pytest -v
```

**Test Coverage**: 88% (backend), 80% (frontend)

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests (Cypress)
npm run test:e2e
```

### CI/CD Pipeline

GitHub Actions workflow tự động chạy:
- ✅ Linting (ESLint, Flake8)
- ✅ Unit tests (Pytest, Jest)
- ✅ Integration tests
- ✅ Build Docker images
- ✅ Security scanning (Snyk)

## 🗄 Database

### ERD Overview

Database gồm **28 tables** được tổ chức theo 6 modules:

1. **User & Authentication** (5 tables): users, roles, permissions, sessions, user_preferences
2. **Academic Management** (4 tables): subjects, classes, semesters, enrollments
3. **Project Management** (6 tables): projects, milestones, tasks, project_approvals, project_templates
4. **Group & Collaboration** (4 tables): groups, group_members, team_chat, meetings
5. **Evaluation & Assessment** (5 tables): evaluations, peer_reviews, rubrics, grades, feedback
6. **Resources & Notifications** (4 tables): files, resources, notifications, activity_logs

### Migrations

```bash
# Tạo migration mới
alembic revision --autogenerate -m "Description"

# Chạy migrations
alembic upgrade head

# Rollback
alembic downgrade -1

# Xem lịch sử migrations
alembic history
```

## 🔒 Security

- ✅ JWT-based authentication với refresh tokens
- ✅ Password hashing (bcrypt)
- ✅ Role-Based Access Control (RBAC)
- ✅ CORS configuration
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ XSS protection
- ✅ HTTPS enforced (production)
- ✅ Rate limiting on API endpoints
- ✅ Input validation (Pydantic schemas)

## 📖 Documentation

Tài liệu chi tiết (400+ trang) tại folder `MainDocument/`:

- 📄 **Section I**: Project Introduction
- 📄 **Section II**: Project Management Plan
- 📄 **Section III**: Software Requirements Specification (42 Use Cases, 72 FRs)
- 📄 **Section IV**: Software Design Document (28 tables, 30+ diagrams)
- 📄 **Section V**: Testing Documentation (60 test cases)
- 📄 **Section VI**: User Guides (Installation + 3 role manuals)
- 📄 **Section VII**: Appendix (API docs, DB schema)

**Tổng số**: 13,240+ lines, 31 diagrams (UML, ERD, Sequence), 17 screenshots

## 🚢 Deployment

### Production với Docker

```bash
# Build production images
docker compose -f docker-compose.prod.yml build

# Deploy
docker compose -f docker-compose.prod.yml up -d

# Scale services
docker compose -f docker-compose.prod.yml up -d --scale backend=3
```

### Environment Variables

Cấu hình file `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/collabsphere
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=collabsphere

# Redis
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AWS (AI Features)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1

# Cloudinary (File Storage)
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Email (Notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 👥 Team & Contributors

**CollabSphere Development Team**

| Role | Responsibilities |
|------|------------------|
| Team Leader / Backend Developer | Architecture, Backend API, AI Integration |
| Frontend Developer | React UI, Components, State Management |
| Full-stack Developer | Backend endpoints, Frontend pages, Integration |
| UI/UX Designer & Tester | Design, Testing, Documentation |

**Supervisor**: [Tên Giảng viên]  
**Course**: SE107 - Software Engineering Capstone Project  
**Semester**: Spring 2025  
**Institution**: Đại học Giao thông Vận tải TP.HCM

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Python: Follow PEP 8, use `black` formatter
- JavaScript: Follow Airbnb style guide, use `prettier`
- Write tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **GitHub Repository**: https://github.com/nhantn0420-sketch/SE_UTH_2025
- **Documentation**: [MainDocument/](./MainDocument/)
- **API Documentation**: http://localhost:8000/docs (when running)
- **Project Report**: [Documentation/](./Documentation/)

## 📞 Contact & Support

For questions or support:
- 📧 Email: [your_team_email@example.com]
- 💬 GitHub Issues: [Create an issue](https://github.com/nhantn0420-sketch/SE_UTH_2025/issues)

---

**CollabSphere** - Built with ❤️ by SE Development Team  
© 2025 University of Transport Ho Chi Minh City
