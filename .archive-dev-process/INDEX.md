# 📋 CollabSphere - Project Navigation Index

**Cập nhật**: 20/1/2026  
**Project**: SP25SE107 - CollabSphere Platform  
**Team**: 4Bees

---

## 🎯 QUICK START - BẮT ĐẦU TẠI ĐÂY

### 🚀 Muốn chạy project ngay?
➡️ **[Quick Start Docker Guide](guides/deployment/QUICK_START_DOCKER.md)** (5 phút)

### 📖 Muốn hiểu toàn bộ project?
➡️ **[README.md](README.md)** - Tổng quan chi tiết

### 📝 Muốn xem công việc cần làm?
➡️ **[Documentation/NOTES-TODO.md](Documentation/NOTES-TODO.md)** - Todo list & priorities

---

## 📂 CẤU TRÚC PROJECT (Navigation)

### 1️⃣ SOURCE CODE - Mã nguồn chính

```
📁 collabsphere/
├── 🔙 backend/              FastAPI + PostgreSQL
│   ├── app/
│   │   ├── models/         28 database models
│   │   ├── routers/        60+ API endpoints
│   │   ├── schemas/        Pydantic schemas
│   │   ├── services/       Business logic
│   │   └── utils/          Helper functions
│   └── alembic/            Database migrations
│
├── 💻 frontend/            React.js
│   └── src/
│       ├── components/     UI components
│       ├── pages/          Page views (5 roles)
│       ├── services/       API services
│       └── context/        State management
│
└── 🐳 docker-compose.yml   Docker configuration
```

**Links**:
- [Backend README](collabsphere/backend/README.md)
- [Frontend README](collabsphere/frontend/README.md)
- [Main README](collabsphere/README.md)

---

### 2️⃣ DOCUMENTATION - Tài liệu chính thức (Nộp)

```
📁 Documentation/
├── 📄 00-FrontMatter.md              ✅ Bìa, mục lục (10 trang)
├── 📄 01-ProjectIntroduction.md       ✅ Section I (35 trang)
├── 📄 02-ProjectManagementPlan.md     ✅ Section II (25 trang)
│
├── 📁 03-SRS/                         ✅ Section III (65 trang)
│   ├── 3.1-ProductOverview.md
│   ├── 3.2-UserRequirements.md       42 Use Cases
│   ├── 3.3-FunctionalRequirements.md  72 Features
│   ├── 3.4-NonFunctionalRequirements.md
│   └── 3.5-RequirementAppendix.md
│
├── 📁 04-SDD/                         🟡 Section IV (85 trang, 60%)
│   ├── 4.1-SystemDesign.md           ✅ Architecture
│   ├── 4.2-DatabaseDesign.md         ✅ 28 Tables
│   ├── 4.3-DetailedDesign.md         ✅ APIs, Classes
│   └── diagrams/                     🟡 48 diagrams cần vẽ
│       ├── guides/                   9 hướng dẫn PlantUML
│       └── diagram-viewer.html       HTML viewer
│
└── 📁 diagrams/                       Use Case diagrams
    ├── 01-USE-CASE-GUIDE.md
    ├── 01-USE-CASE-PLANTUML.md       PlantUML code
    ├── 02-CLASS-GUIDE.md
    ├── 03-SEQUENCE-GUIDE.md
    └── 04-ARCHITECTURE-GUIDE.md
```

**Quick Links**:
- [Documentation README](Documentation/README.md)
- [04-SDD Dashboard](Documentation/04-SDD/README.md)
- [Diagram Viewer](Documentation/diagrams/diagram-viewer.html)

**Tiến độ**: 170/280 trang (60%)

---

### 3️⃣ GUIDES - Hướng dẫn sử dụng

```
📁 guides/
├── 📁 deployment/                 Deployment guides
│   ├── QUICK_START_DOCKER.md     🚀 Chạy nhanh (5 phút)
│   ├── HUONG_DAN_CHAY_DOCKER_TESTED.md
│   ├── HUONG_DAN_CHAY_HE_THONG.md
│   └── TINH_NANG_CAI_DAT_SETTINGS.md
│
└── 📁 setup/                      Setup guides
    └── (đang cập nhật)
```

**Hướng dẫn chính**:
1. [Quick Start Docker](guides/deployment/QUICK_START_DOCKER.md) ⭐
2. [Hướng dẫn chi tiết](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md)

---

### 4️⃣ SCRIPTS - Tự động hóa

```
📁 scripts/
├── 📁 deployment/                 Git & deployment
│   ├── push-to-github.ps1        Push lên GitHub
│   └── git-push-simple.cmd       Git push đơn giản
│
└── 📁 docker/                     Docker automation
    ├── setup-first-time.ps1      Setup lần đầu
    ├── start-docker.ps1          Khởi động containers
    ├── stop-docker.ps1           Dừng containers
    ├── start-hybrid.ps1          Hybrid mode
    ├── stop-hybrid.ps1           Dừng hybrid
    └── start-manual.ps1          Manual mode
```

**Cách dùng**:
```powershell
# Setup lần đầu
.\scripts\docker\setup-first-time.ps1

# Khởi động
.\scripts\docker\start-docker.ps1

# Push lên GitHub
.\scripts\deployment\push-to-github.ps1
```

---

### 5️⃣ KẾ HOẠCH TRIỂN KHAI - Implementation Plan

```
📁 KeHoach/                        9 files tiếng Việt
├── 00-TongQuan.md                Kiến trúc 3-tier
├── 01-PhanTichThietKe.md         Phân tích & thiết kế
├── 02-ThietLapBackend.md         Setup backend
├── 03-APIBackend.md              60+ API endpoints
├── 04-AIRealtime.md              AI & Real-time
├── 05-FrontendReact.md           Setup frontend
├── 06-CongCuCongTac.md           Tools & workflow
├── 07-Testing.md                 Testing strategy
├── 08-Deployment.md              Production deployment
└── 09-CauHoiCanXemXet.md         Q&A
```

**Đọc theo thứ tự**: 00 → 09

---

### 6️⃣ TRACKING & METADATA - Progress tracking

```
📁 docs/metadata/                  Project metadata
├── DOCUMENT_FLOW_OVERVIEW.md     Tổng quan tài liệu
├── PROJECT_STRUCTURE.md          Cấu trúc project
├── DIAGRAM_IMPLEMENTATION_STATUS.md
├── DIAGRAM_MAPPING_GUIDE.md
├── IMAGE_AUDIT_COMPLETE_REPORT.md
└── PROJECT_STRUCTURE_TREE.txt

📁 Documentation/                  Progress reports
├── ROLES_AND_PERMISSIONS.md      5 roles, permissions
├── USE_CASE_IMPLEMENTATION_MAP.md 42 UC → code
├── IMPLEMENTATION_PROGRESS.md    Phase 1-4 progress
├── ACTION_PLAN.md               Action plan
├── EVALUATION_REPORT.md         Báo cáo đánh giá
└── NOTES-TODO.md                Todo list ⭐
```

---

### 7️⃣ THÔNG TIN DỰ ÁN - Project Info

```
📁 00-ProjectInfo/
├── DeBai.md                      Đề bài project
├── 📁 Guides/
│   ├── HUONG_DAN_CHAY_PROJECT.md Setup chi tiết
│   └── Huongdan.md
└── 📁 Templates/
    └── Template.md               Template tài liệu
```

---

### 8️⃣ IMAGES - Diagrams & Screenshots

```
📁 Images/                        Hình ảnh diagrams
├── UseCaseDiagramVer3.drawio.png
├── Conceptual Model Project-Based Learning Management System.png
├── Production Deployment Architecture - CollabShere.png
├── Role - Based Access Control (RBAC) Hierarchy - CollabShere.png
├── Module1_Users&Authentication.png
├── Module2_AcademicManagement.png
├── Module3_Project&GroupManagement.png
├── CollaborationTools.png
└── Evaluation&Assessment.png
```

---

## 🎯 WORKFLOWS - Quy trình làm việc

### 🔄 Workflow 1: Phát triển tính năng mới

1. **Đọc requirements**: [03-SRS/3.2-UserRequirements.md](Documentation/03-SRS/3.2-UserRequirements.md)
2. **Xem design**: [04-SDD/](Documentation/04-SDD/)
3. **Implement code**: `collabsphere/backend/` hoặc `frontend/`
4. **Test**: `pytest` hoặc manual testing
5. **Update docs**: Cập nhật [IMPLEMENTATION_PROGRESS.md](Documentation/IMPLEMENTATION_PROGRESS.md)
6. **Push**: `.\scripts\deployment\push-to-github.ps1`

### 📊 Workflow 2: Vẽ diagrams

1. **Đọc hướng dẫn**: [04-SDD/diagrams/guides/](Documentation/04-SDD/diagrams/guides/)
2. **Xem PlantUML**: [01-USE-CASE-PLANTUML.md](Documentation/diagrams/01-USE-CASE-PLANTUML.md)
3. **Render**: [diagram-viewer.html](Documentation/diagrams/diagram-viewer.html)
4. **Export**: PNG/SVG từ PlantUML
5. **Insert**: Thêm vào markdown files

### 🚀 Workflow 3: Deploy

1. **Local test**: `.\scripts\docker\start-docker.ps1`
2. **Check logs**: `docker-compose logs -f`
3. **Test features**: http://localhost:3000
4. **Deploy production**: Xem [08-Deployment.md](KeHoach/08-Deployment.md)

---

## 📊 PROGRESS OVERVIEW - Tiến độ dự án

### ✅ Hoàn thành (100%)
- ✅ Backend API: 60+ endpoints
- ✅ Frontend UI: 5 roles interface
- ✅ Database: 28 tables
- ✅ Documentation: Section I, II, III (135 trang)
- ✅ Docker setup & scripts
- ✅ Project reorganization (20/1/2026)

### 🟡 Đang làm (60%)
- 🟡 Section IV - SDD: 85 trang (cần vẽ 48 diagrams)
- 🟡 Real-time features: Chat, Video call
- 🟡 AI integration: Chatbot, analysis

### ❌ Chưa làm
- ❌ Section V - Testing (25 trang)
- ❌ Section VI - User Guides (35 trang)
- ❌ E2E testing
- ❌ Production deployment

**Tổng tiến độ**: ~65%

---

## 🔗 QUICK LINKS - Liên kết nhanh

### 📖 Documentation
- [README.md](README.md) - Project overview
- [Documentation/README.md](Documentation/README.md) - Docs index
- [NOTES-TODO.md](Documentation/NOTES-TODO.md) - Todo list

### 🚀 Deployment
- [Quick Start](guides/deployment/QUICK_START_DOCKER.md)
- [Docker Guide](guides/deployment/HUONG_DAN_CHAY_DOCKER_TESTED.md)
- [Full Guide](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md)

### 📐 Diagrams
- [Diagram Viewer](Documentation/diagrams/diagram-viewer.html)
- [PlantUML Guides](Documentation/04-SDD/diagrams/guides/)
- [Use Case Guide](Documentation/diagrams/01-USE-CASE-GUIDE.md)

### 💻 Code
- [Backend](collabsphere/backend/)
- [Frontend](collabsphere/frontend/)
- [Docker Compose](collabsphere/docker-compose.yml)

### 📊 Progress
- [Implementation Progress](Documentation/IMPLEMENTATION_PROGRESS.md)
- [Use Case Map](Documentation/USE_CASE_IMPLEMENTATION_MAP.md)
- [Action Plan](Documentation/ACTION_PLAN.md)

---

## 🎓 DÀNH CHO TEAM MEMBERS

### 👨‍💻 Developer
1. Setup: [HUONG_DAN_CHAY_PROJECT.md](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md)
2. Backend: [02-ThietLapBackend.md](KeHoach/02-ThietLapBackend.md)
3. Frontend: [05-FrontendReact.md](KeHoach/05-FrontendReact.md)
4. API Docs: [03-APIBackend.md](KeHoach/03-APIBackend.md)

### 📝 Documentation Writer
1. Structure: [DOCUMENT_FLOW_OVERVIEW.md](docs/metadata/DOCUMENT_FLOW_OVERVIEW.md)
2. Templates: [00-ProjectInfo/Templates/](00-ProjectInfo/Templates/)
3. Progress: [IMPLEMENTATION_PROGRESS.md](Documentation/IMPLEMENTATION_PROGRESS.md)

### 🎨 Diagram Designer
1. Guides: [Documentation/diagrams/](Documentation/diagrams/)
2. PlantUML: [04-SDD/diagrams/guides/](Documentation/04-SDD/diagrams/guides/)
3. Viewer: [diagram-viewer.html](Documentation/diagrams/diagram-viewer.html)

### 🧪 Tester
1. Testing Plan: [07-Testing.md](KeHoach/07-Testing.md)
2. Test Cases: (Đang cập nhật)

---

## 📞 HỖ TRỢ

### ❓ Gặp vấn đề?
1. Xem [09-CauHoiCanXemXet.md](KeHoach/09-CauHoiCanXemXet.md)
2. Check [NOTES-TODO.md](Documentation/NOTES-TODO.md)
3. Hỏi team trên Discord/Slack

### 🐛 Bug hoặc Issue?
1. Check logs: `docker-compose logs`
2. Tạo issue trên GitHub
3. Document trong [NOTES-TODO.md](Documentation/NOTES-TODO.md)

---

## 🎯 PRIORITIES - Ưu tiên công việc

### 🔥 Cao (High Priority)
1. ✅ ~~Tổ chức lại cấu trúc project~~ (Hoàn thành 20/1/2026)
2. 🎨 Vẽ 48 diagrams cho Section IV (13.5 giờ)
3. 📝 Hoàn thành Section IV - SDD (40% còn lại)

### 🟡 Trung bình (Medium)
4. ✍️ Viết Section V - Testing (25 trang)
5. 📖 Viết Section VI - User Guides (35 trang)
6. 🤖 Hoàn thiện AI integration

### 🔵 Thấp (Low)
7. 🧪 E2E testing
8. 🚀 Production deployment
9. 📊 Performance optimization

---

**Cập nhật lần cuối**: 20/1/2026  
**Người cập nhật**: AI Assistant + Team 4Bees

📌 **Lưu ý**: File này được tự động cập nhật. Bookmark file này để navigation nhanh!
