# 🚀 CollabSphere - Project-Based Learning Platform

**Mã dự án**: SP25SE107  
**Học kỳ**: Spring 2025  
**Team**: 4Bees  
**Cập nhật**: 4/1/2026

---

## 📂 CẤU TRÚC PROJECT (ĐƯỜNG DẪN NHANH)

### 🎯 1. BẮT ĐẦU TẠI ĐÂY
| Mục đích | File | Mô tả |
|----------|------|-------|
| 📘 **Tổng quan toàn bộ tài liệu** | **[DOCUMENT_FLOW_OVERVIEW.md](DOCUMENT_FLOW_OVERVIEW.md)** | ⭐ **ĐỌC ĐẦU TIÊN** - Flow, cấu trúc, tiến độ |
| 🏃 **Chạy project** | [00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md](00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md) | Hướng dẫn setup & run |
| 📋 **Xem công việc còn lại** | [Documentation/NOTES-TODO.md](Documentation/NOTES-TODO.md) | Todo list & priorities |

---

### 📁 2. TÀI LIỆU CHÍNH THỨC (Nộp đồ án)

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

### 📚 3. HƯỚNG DẪN KỸ THUẬT (Implementation)

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

### 🔍 4. TÀI LIỆU TRACKING (Implementation Progress)

**Thư mục**: [`Documentation/`](Documentation/)

| File | Mục đích | Kích thước |
|------|----------|-----------|
| [ROLES_AND_PERMISSIONS.md](Documentation/ROLES_AND_PERMISSIONS.md) | Chi tiết permissions 5 roles | 17 KB |
| [USE_CASE_IMPLEMENTATION_MAP.md](Documentation/USE_CASE_IMPLEMENTATION_MAP.md) | Map 42 UC → code (file paths, line numbers) | 35 KB |
| [IMPLEMENTATION_PROGRESS.md](Documentation/IMPLEMENTATION_PROGRESS.md) | Progress Phase 1-4, checklist | 12 KB |
| [IMPLEMENTATION_SUMMARY_JAN3.md](Documentation/IMPLEMENTATION_SUMMARY_JAN3.md) | Daily summary 3/1/2026 | 10 KB |
| [ACTION_PLAN.md](Documentation/ACTION_PLAN.md) | Action plan chi tiết | 12 KB |
| [EVALUATION_REPORT.md](Documentation/EVALUATION_REPORT.md) | Báo cáo đánh giá | 21 KB |
| [Database_Verification.txt](Documentation/Database_Verification.txt) | Database verification log | 3 KB |
| [FILE_LOCATIONS_SUMMARY.md](Documentation/FILE_LOCATIONS_SUMMARY.md) | File locations summary | 9 KB |

---

### 📐 5. DIAGRAMS & PLANTUML

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
