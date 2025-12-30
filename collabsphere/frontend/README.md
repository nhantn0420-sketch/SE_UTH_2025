# CollabSphere (COSRE) - Frontend

Hệ thống hỗ trợ học tập theo phương pháp học tập dự án (Project-Based Learning)

## 🚀 Cài đặt

### Yêu cầu
- Node.js >= 16
- npm hoặc yarn

### Bước cài đặt

1. **Clone và di chuyển đến thư mục frontend:**
```bash
cd collabsphere/frontend
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Tạo file .env:**
```bash
copy .env.example .env
```

4. **Cấu hình .env:**
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_SOCKET_URL=http://localhost:8000
```

5. **Chạy development server:**
```bash
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📁 Cấu trúc thư mục

```
src/
├── components/          # React components
│   ├── Auth/           # ProtectedRoute
│   ├── Collaboration/  # Whiteboard
│   ├── Common/         # Loading, EmptyState, ConfirmDialog
│   ├── Evaluation/     # PeerReview, EvaluationForm
│   ├── Group/          # TaskBoard, MilestoneProgress
│   ├── Layout/         # Layout, Header, Sidebar
│   └── Notification/   # NotificationMenu
├── config/             # Configuration constants
├── context/            # React Context (Auth, Notification)
├── pages/              # Page components
│   ├── Admin/          # Dashboard, UserManagement
│   ├── Auth/           # Login, Register
│   ├── Collaboration/  # Chat, VideoCall
│   ├── Groups/         # GroupList, GroupDetail, GroupWorkspace
│   ├── Head/           # Dashboard, ProjectApproval
│   ├── Lecturer/       # Dashboard
│   ├── Profile/        # Profile
│   ├── Projects/       # ProjectList, ProjectCreate, ProjectDetail
│   ├── Staff/          # Dashboard, SubjectManagement, ClassManagement
│   └── Student/        # Dashboard
├── services/           # API services
├── styles/             # Theme configuration
├── App.js              # Main App component with routes
└── index.js            # Application entry point
```

## 👥 Vai trò người dùng

| Vai trò | Quyền hạn |
|---------|-----------|
| **Admin** | Quản lý người dùng, kích hoạt/vô hiệu hóa tài khoản |
| **Staff** | Quản lý môn học, lớp học, import dữ liệu |
| **Department Head** | Phê duyệt/từ chối đề xuất đồ án |
| **Lecturer** | Tạo đồ án, quản lý nhóm, đánh giá sinh viên |
| **Student** | Tham gia nhóm, hoàn thành task, đánh giá đồng nghiệp |

## 🔧 Tính năng chính

### Dashboard
- Thống kê tổng quan theo vai trò
- Biểu đồ trực quan (Recharts)

### Quản lý đồ án
- Tạo đồ án với wizard 3 bước
- AI tự động đề xuất milestone
- Quy trình phê duyệt từ trưởng khoa

### Quản lý nhóm
- Task board kiểu Kanban
- Theo dõi tiến độ milestone
- Upload tài liệu

### Collaboration
- Chat real-time (Socket.IO)
- Video call (WebRTC)
- Bảng trắng vẽ chung

### Đánh giá
- Đánh giá nhóm từ giảng viên
- Đánh giá đồng nghiệp giữa sinh viên

## 🛠 Công nghệ

- **React 18** - UI library
- **Material-UI 5** - Component library
- **React Router DOM 6** - Routing
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time
- **Recharts** - Charts
- **React Hook Form** - Form handling
- **React Toastify** - Notifications

## 📝 Scripts

```bash
# Development
npm start

# Build production
npm run build

# Run tests
npm test

# Eject configuration
npm run eject
```

## 🔗 API Endpoints

Frontend kết nối với backend FastAPI tại `REACT_APP_API_URL`:

- `/api/v1/auth` - Authentication
- `/api/v1/users` - User management
- `/api/v1/subjects` - Subject management
- `/api/v1/classes` - Class management
- `/api/v1/projects` - Project management
- `/api/v1/groups` - Group management
- `/api/v1/evaluations` - Evaluations
- `/api/v1/notifications` - Notifications

## 📄 License

MIT License
