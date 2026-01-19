# 🚀 CollabSphere - Project-Based Learning Platform

**Mã dự án**: SP25SE107  
**Học kỳ**: Spring 2025  
**Team**: 4Bees  
**Cập nhật**: 20/1/2026

---

## 📂 CẤU TRÚC PROJECT (ĐÃ TỔ CHỨC LẠI)

### 🎯 1. BẮT ĐẦU TẠI ĐÂY
| Mục đích | File | Mô tả |
|----------|------|-------|
| 📘 **Tổng quan project** | **[INDEX.md](INDEX.md)** | ⭐ **ĐỌC ĐẦU TIÊN** - Navigation & roadmap |
| 🚀 **Quick Start Docker** | [guides/deployment/QUICK_START_DOCKER.md](guides/deployment/QUICK_START_DOCKER.md) | Hướng dẫn chạy nhanh với Docker |
| 📖 **Hướng dẫn chi tiết** | [00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md) | Setup & run đầy đủ |
| 📋 **Todo & Progress** | [Documentation/NOTES-TODO.md](Documentation/NOTES-TODO.md) | Công việc còn lại |

### 📁 2. CẤU TRÚC THƯ MỤC MỚI

```
SE/
├── 📁 collabsphere/          # Source code chính
│   ├── backend/              # FastAPI backend
│   ├── frontend/             # React frontend
│   └── docker-compose.yml    # Docker configuration
│
├── 📁 Documentation/         # Tài liệu chính thức (nộp đồ án)
│   ├── 00-FrontMatter.md
│   ├── 01-ProjectIntroduction.md
│   ├── 02-ProjectManagementPlan.md
│   ├── 03-SRS/              # Requirements (5 files)
│   ├── 04-SDD/              # Design (3 files + diagrams)
│   └── diagrams/            # UML diagrams & guides
│
├── 📁 guides/               # 🆕 Hướng dẫn sử dụng
│   ├── deployment/          # Deployment guides
│   │   ├── QUICK_START_DOCKER.md
│   │   ├── HUONG_DAN_CHAY_DOCKER_TESTED.md
│   │   ├── HUONG_DAN_CHAY_HE_THONG.md
│   │   └── TINH_NANG_CAI_DAT_SETTINGS.md
│   └── setup/               # Setup guides
│
├── 📁 scripts/              # 🆕 Scripts tự động hóa
│   ├── deployment/          # Git, deployment scripts
│   │   ├── push-to-github.ps1
│   │   └── git-push-simple.cmd
│   └── docker/              # Docker scripts
│       ├── setup-first-time.ps1
│       ├── start-docker.ps1
│       ├── stop-docker.ps1
│       ├── start-hybrid.ps1
│       └── stop-hybrid.ps1
│
├── 📁 docs/                 # 🆕 Documentation metadata
│   └── metadata/            # Project structure & audits
│       ├── DIAGRAM_IMPLEMENTATION_STATUS.md
│       ├── DIAGRAM_MAPPING_GUIDE.md
│       ├── DOCUMENT_FLOW_OVERVIEW.md
│       ├── FOLDER_REORGANIZATION_GUIDE.md
│       ├── IMAGE_AUDIT_COMPLETE_REPORT.md
│       ├── PROJECT_STRUCTURE.md
│       └── PROJECT_STRUCTURE_TREE.txt
│
├── 📁 00-ProjectInfo/       # Thông tin dự án
│   ├── DeBai.md
│   ├── Guides/
│   └── Templates/
│
├── 📁 KeHoach/              # Kế hoạch triển khai (9 files)
├── 📁 Doc/                  # Tài liệu khác
├── 📁 Images/               # Hình ảnh diagrams
└── 📁 .archived/            # 🆕 File cũ đã lưu trữ
```

---

### 📁 3. TÀI LIỆU CHÍNH THỨC (Nộp đồ án)

**Thư mục**: [`Documentation/`](Documentation/)

| Section | Files | Trang | Trạng thái |
|---------|-------|-------|-----------|
| **Front Matter** | [00-FrontMatter.md](Documentation/00-FrontMatter.md) | 10 | ✅ 100% |
| **Section I** | [01-ProjectIntroduction.md](Documentation/01-ProjectIntroduction.md) | 35 | ✅ 100% |
| **Section II** | [02-ProjectManagementPlan.md](Documentation/02-ProjectManagementPlan.md) | 25 | ✅ 100% |
| **Section III** | [03-SRS/](Documentation/03-SRS/) (5 files) | 65 | ✅ 100% |
| **Section IV** | [04-SDD/](Documentation/04-SDD/) (3 files + diagrams) | 85 | 🟡 60% |
| **Section V** | 05-Testing.md | 25 | ❌ Chưa tạo |
| **Section VI** | 06-UserGuides.md | 35 | ❌ Chưa tạo |

**TỔNG**: 280 trang (170 hoàn thành)

#### 📊 Section III - SRS (Requirements)
- [3.1-ProductOverview.md](Documentation/03-SRS/3.1-ProductOverview.md) - Tổng quan sản phẩm
- [3.2-UserRequirements.md](Documentation/03-SRS/3.2-UserRequirements.md) - 42 Use Cases
- [3.3-FunctionalRequirements.md](Documentation/03-SRS/3.3-FunctionalRequirements.md) - 72 Features
- [3.4-NonFunctionalRequirements.md](Documentation/03-SRS/3.4-NonFunctionalRequirements.md) - 22 NFRs
- [3.5-RequirementAppendix.md](Documentation/03-SRS/3.5-RequirementAppendix.md) - Business rules

#### 🏗️ Section IV - SDD (Design)
- [4.1-SystemDesign.md](Documentation/04-SDD/4.1-SystemDesign.md) - Architecture (20p) ✅
- [4.2-DatabaseDesign.md](Documentation/04-SDD/4.2-DatabaseDesign.md) - 28 Tables (25p) ✅
- [4.3-DetailedDesign.md](Documentation/04-SDD/4.3-DetailedDesign.md) - APIs, Class (40p) ✅
- [04-SDD/README.md](Documentation/04-SDD/README.md) - Status dashboard
- [04-SDD/diagrams/guides/](Documentation/04-SDD/diagrams/guides/) - 9 hướng dẫn vẽ diagram ✅

**Cần làm**: Vẽ 48 diagrams (13.5 giờ)

---

### 📚 4. HƯỚNG DẪN DEPLOYMENT & SCRIPTS

#### 🚀 Deployment Guides
**Thư mục**: [`guides/deployment/`](guides/deployment/)

| File | Mô tả |
|------|-------|
| [QUICK_START_DOCKER.md](guides/deployment/QUICK_START_DOCKER.md) | Quick start với Docker (5 phút) |
| [HUONG_DAN_CHAY_DOCKER_TESTED.md](guides/deployment/HUONG_DAN_CHAY_DOCKER_TESTED.md) | Hướng dẫn Docker chi tiết (đã test) |
| [HUONG_DAN_CHAY_HE_THONG.md](guides/deployment/HUONG_DAN_CHAY_HE_THONG.md) | Hướng dẫn chạy hệ thống đầy đủ |
| [TINH_NANG_CAI_DAT_SETTINGS.md](guides/deployment/TINH_NANG_CAI_DAT_SETTINGS.md) | Tính năng cài đặt settings |

#### ⚙️ Scripts Tự động hóa
**Thư mục**: [`scripts/`](scripts/)

**Deployment Scripts** (`scripts/deployment/`):
- `push-to-github.ps1` - Push code lên GitHub
- `git-push-simple.cmd` - Git push đơn giản

**Docker Scripts** (`scripts/docker/`):
- `setup-first-time.ps1` - Setup lần đầu
- `start-docker.ps1` - Khởi động Docker containers
- `stop-docker.ps1` - Dừng containers
- `start-hybrid.ps1` - Chạy hybrid mode
- `stop-hybrid.ps1` - Dừng hybrid mode
- `start-manual.ps1` - Chạy manual mode

---

### 📖 5. KẾ HOẠCH TRIỂN KHAI (Implementation)

**Thư mục**: [`KeHoach/`](KeHoach/) - **9 files tiếng Việt**

| File | Nội dung |
|------|----------|
| [00-TongQuan.md](KeHoach/00-TongQuan.md) | Kiến trúc 3-tier, tech stack |
| [01-PhanTichThietKe.md](KeHoach/01-PhanTichThietKe.md) | Phân tích & thiết kế hệ thống |
| [02-ThietLapBackend.md](KeHoach/02-ThietLapBackend.md) | Setup FastAPI, PostgreSQL |
| [03-APIBackend.md](KeHoach/03-APIBackend.md) | 60+ API endpoints |
| [04-AIRealtime.md](KeHoach/04-AIRealtime.md) | AWS Bedrock, Socket.IO, WebRTC |
| [05-FrontendReact.md](KeHoach/05-FrontendReact.md) | Setup React, routing |
| [06-CongCuCongTac.md](KeHoach/06-CongCuCongTac.md) | Docker, Git, VS Code |
| [07-Testing.md](KeHoach/07-Testing.md) | Pytest, E2E testing |
| [08-Deployment.md](KeHoach/08-Deployment.md) | Deploy Render, Vercel |
| [09-CauHoiCanXemXet.md](KeHoach/09-CauHoiCanXemXet.md) | Q&A, troubleshooting |

---

### 🔍 6. TÀI LIỆU TRACKING & METADATA

**Tracking Progress** (`Documentation/`):
| File | Mục đích | Kích thước |
|------|----------|-----------|
| [ROLES_AND_PERMISSIONS.md](Documentation/ROLES_AND_PERMISSIONS.md) | Chi tiết permissions 5 roles | 17 KB |
| [USE_CASE_IMPLEMENTATION_MAP.md](Documentation/USE_CASE_IMPLEMENTATION_MAP.md) | Map 42 UC → code | 35 KB |
| [IMPLEMENTATION_PROGRESS.md](Documentation/IMPLEMENTATION_PROGRESS.md) | Progress Phase 1-4 | 12 KB |
| [ACTION_PLAN.md](Documentation/ACTION_PLAN.md) | Action plan chi tiết | 12 KB |
| [EVALUATION_REPORT.md](Documentation/EVALUATION_REPORT.md) | Báo cáo đánh giá | 21 KB |

**Project Metadata** (`docs/metadata/`):
| File | Mô tả |
|------|-------|
| [DOCUMENT_FLOW_OVERVIEW.md](docs/metadata/DOCUMENT_FLOW_OVERVIEW.md) | Tổng quan flow tài liệu |
| [PROJECT_STRUCTURE.md](docs/metadata/PROJECT_STRUCTURE.md) | Cấu trúc project |
| [DIAGRAM_IMPLEMENTATION_STATUS.md](docs/metadata/DIAGRAM_IMPLEMENTATION_STATUS.md) | Trạng thái diagrams |
| [DIAGRAM_MAPPING_GUIDE.md](docs/metadata/DIAGRAM_MAPPING_GUIDE.md) | Hướng dẫn mapping diagrams |
| [IMAGE_AUDIT_COMPLETE_REPORT.md](docs/metadata/IMAGE_AUDIT_COMPLETE_REPORT.md) | Báo cáo audit hình ảnh |

---

### 📐 7. DIAGRAMS & PLANTUML

**Thư mục**: [`Documentation/diagrams/`](Documentation/diagrams/)

#### PlantUML Source Code:
- [plantuml-sources/@startuml.txt](Documentation/diagrams/plantuml-sources/@startuml.txt) - PlantUML code tổng hợp
- [plantuml-sources/ERD_DATABASE_DESIGN_COLLABSPHERE.md](Documentation/diagrams/plantuml-sources/ERD_DATABASE_DESIGN_COLLABSPHERE.md) - ERD PlantUML (911 dòng)

#### Hướng dẫn vẽ (Draw.io):
**Thư mục**: [04-SDD/diagrams/guides/](Documentation/04-SDD/diagrams/guides/)

| Guide | Thời gian | Độ khó |
|-------|-----------|--------|
| 01-SYSTEM-ARCHITECTURE-GUIDE.md | 2h | ⭐⭐⭐ |
| 02-DATABASE-ERD-GUIDE.md | 4h | ⭐⭐⭐⭐ |
| 03-CLASS-USER-MODULE-GUIDE.md | 45m | ⭐⭐ |
| 03-CLASS-ACADEMIC-MODULE-GUIDE.md | 1h | ⭐⭐⭐ |
| 03-CLASS-PROJECT-MODULE-GUIDE.md | 1h | ⭐⭐⭐ |
| 03-CLASS-GROUP-MODULE-GUIDE.md | 1.5h | ⭐⭐⭐⭐ |
| 03-CLASS-COLLABORATION-MODULE-GUIDE.md | 1h | ⭐⭐⭐ |
| 03-CLASS-EVALUATION-MODULE-GUIDE.md | 1.5h | ⭐⭐⭐⭐ |

**Tổng thời gian vẽ**: 13.5 giờ

---

### 📋 6. THÔNG TIN DỰ ÁN (Project Info)

**Thư mục**: [`00-ProjectInfo/`](00-ProjectInfo/)

| Loại | Files |
|------|-------|
| **Yêu cầu** | [DeBai.md](00-ProjectInfo/DeBai.md) - Đề bài đồ án |
| | [Ketquamongmuon.md](00-ProjectInfo/Ketquamongmuon.md) - Kết quả mong muốn |
| **Templates** | [Templates/Template.md](00-ProjectInfo/Templates/Template.md) - Template đồ án chính thức |
| **Hướng dẫn** | [Guides/HUONG_DAN_CHAY_PROJECT.md](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md) - Setup & run |
| | [Guides/Huongdan.md](00-ProjectInfo/Guides/Huongdan.md) - Hướng dẫn chung |

---

### 💻 7. SOURCE CODE

**Thư mục**: [`collabsphere/`](collabsphere/)

```
collabsphere/
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── models/   # 28 database models
│   │   ├── routers/  # API endpoints
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   └── utils/    # Utilities
│   ├── alembic/      # Database migrations
│   └── requirements.txt
│
└── frontend/         # React frontend
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── context/
    └── package.json
```

**Chạy project**:
```bash
# Backend
cd collabsphere/backend
docker-compose up

# Frontend
cd collabsphere/frontend
npm install
npm start
```

---

## 🎯 WORKFLOW THEO MỤC ĐÍCH

### 👨‍🏫 Nếu bạn là GIẢNG VIÊN (Chấm đồ án):
1. Đọc [DOCUMENT_FLOW_OVERVIEW.md](DOCUMENT_FLOW_OVERVIEW.md) - Tổng quan
2. Đọc Section I, II, III trong [Documentation/](Documentation/)
3. Đọc Section IV (design) trong [Documentation/04-SDD/](Documentation/04-SDD/)
4. Xem code trong [collabsphere/](collabsphere/)

### 👨‍💻 Nếu bạn là DEVELOPER (Làm việc với code):
1. Đọc [00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md)
2. Đọc [KeHoach/00-TongQuan.md](KeHoach/00-TongQuan.md) - Kiến trúc
3. Đọc [Documentation/USE_CASE_IMPLEMENTATION_MAP.md](Documentation/USE_CASE_IMPLEMENTATION_MAP.md) - Map UC → Code
4. Xem [Documentation/IMPLEMENTATION_PROGRESS.md](Documentation/IMPLEMENTATION_PROGRESS.md) - Công việc còn lại
5. Code trong [collabsphere/](collabsphere/)

### 📝 Nếu bạn cần VIẾT TÀI LIỆU:
1. Đọc [DOCUMENT_FLOW_OVERVIEW.md](DOCUMENT_FLOW_OVERVIEW.md) - Hiểu cấu trúc
2. Xem [00-ProjectInfo/Templates/Template.md](00-ProjectInfo/Templates/Template.md) - Template chuẩn
3. Xem [Documentation/README.md](Documentation/README.md) - Hướng dẫn viết
4. Viết trong [Documentation/](Documentation/)

### 🎨 Nếu bạn cần VẼ DIAGRAMS:
1. Xem [Documentation/04-SDD/README.md](Documentation/04-SDD/README.md) - Status & checklist
2. Đọc guides trong [Documentation/04-SDD/diagrams/guides/](Documentation/04-SDD/diagrams/guides/)
3. Vẽ bằng Draw.io theo hướng dẫn
4. Save PNG vào [Documentation/04-SDD/diagrams/](Documentation/04-SDD/diagrams/)

### 🔍 Nếu cần TÌM THÔNG TIN CỤ THỂ:

| Cần tìm | Đến file |
|---------|----------|
| 72 Features | [Documentation/01-ProjectIntroduction.md](Documentation/01-ProjectIntroduction.md) Section 6 |
| 42 Use Cases | [Documentation/03-SRS/3.2-UserRequirements.md](Documentation/03-SRS/3.2-UserRequirements.md) |
| API Endpoints | [Documentation/04-SDD/4.3-DetailedDesign.md](Documentation/04-SDD/4.3-DetailedDesign.md) |
| Database Tables | [Documentation/04-SDD/4.2-DatabaseDesign.md](Documentation/04-SDD/4.2-DatabaseDesign.md) |
| Permissions | [Documentation/ROLES_AND_PERMISSIONS.md](Documentation/ROLES_AND_PERMISSIONS.md) |
| Code của UC | [Documentation/USE_CASE_IMPLEMENTATION_MAP.md](Documentation/USE_CASE_IMPLEMENTATION_MAP.md) |

---

## 📊 TIẾN ĐỘ TỔNG THỂ

### Tài liệu: 60%
```
Front Matter    ████████████████████ 100% ✅
Section I       ████████████████████ 100% ✅
Section II      ████████████████████ 100% ✅
Section III     ████████████████████ 100% ✅
Section IV      ████████████░░░░░░░░  60% 🟡 (Text 100%, Diagrams 0%)
Section V       ░░░░░░░░░░░░░░░░░░░░   0% ❌
Section VI      ░░░░░░░░░░░░░░░░░░░░   0% ❌
```

### Implementation: 73%
```
Backend         ███████████████████░  93% 🟡 (39/42 UC)
Frontend        ██████████████░░░░░░  70% 🟡
Database        ████████████████████ 100% ✅
Authentication  ████████████████████ 100% ✅
Real-time       ███████████████░░░░░  75% 🟡
Testing         █████░░░░░░░░░░░░░░░  25% ❌
```

---

## 🚀 CÔNG VIỆC ƯU TIÊN

### ⚡ TUẦN NÀY (4-10/1/2026):
1. ⏳ **Vẽ 48 diagrams** (13.5h) - Dùng guides đã có
2. ⏳ **Chèn diagrams vào markdown** (1h)
3. ⏳ **Review Section IV** (1h)

### ⚡ TUẦN SAU (11-17/1/2026):
1. ❌ **Viết Section V: Testing** (25 trang, 3-4 ngày)
2. ❌ **Viết Section VI: User Guides** (35 trang, 3-4 ngày)

### ⚡ IMPLEMENTATION (Ongoing):
1. 🟡 Hoàn thiện 3 UC còn thiếu (UC010, UC032, UC041)
2. 🟡 Frontend 30% còn lại
3. 🟡 Testing & Bug fixes

---

## 📞 LIÊN HỆ & LINKS

**Team**: 4Bees  
**Project Code**: SP25SE107  
**Semester**: Spring 2025

### Quick Links:
- **Documentation**: [Documentation/](Documentation/)
- **Implementation Guides**: [KeHoach/](KeHoach/)
- **Source Code**: [collabsphere/](collabsphere/)
- **Todo**: [Documentation/NOTES-TODO.md](Documentation/NOTES-TODO.md)

---

**Cập nhật lần cuối**: 4/1/2026  
**Version**: 2.0 (Restructured)
