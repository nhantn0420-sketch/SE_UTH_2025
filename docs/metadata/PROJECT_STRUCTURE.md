# 📁 CẤU TRÚC PROJECT - SAU KHI SẮP XẾP

**Ngày sắp xếp**: 4/1/2026  
**Phiên bản**: 2.0 (Restructured)

---

## 🎯 NHỮNG GÌ ĐÃ THAY ĐỔI

### ✅ Files đã di chuyển:

| File gốc (Root) | Vị trí mới | Lý do |
|----------------|------------|-------|
| `Template.md` | `00-ProjectInfo/Templates/` | Template chính thức |
| `DeBai.md` | `00-ProjectInfo/` | Yêu cầu đề bài |
| `Ketquamongmuon.md` | `00-ProjectInfo/` | Kết quả mong muốn |
| `Huongdan.md` | `00-ProjectInfo/Guides/` | Hướng dẫn chung |
| `HUONG_DAN_CHAY_PROJECT.md` | `00-ProjectInfo/Guides/` | Hướng dẫn chạy |
| `@startuml.txt` | `Documentation/diagrams/plantuml-sources/` | PlantUML source |
| `ERD_DATABASE_DESIGN_COLLABSPHERE.md` | `Documentation/diagrams/plantuml-sources/` | ERD PlantUML |
| `Database_Verification.txt` | `Documentation/` | Verification log |
| `FILE_LOCATIONS_SUMMARY.md` | `Documentation/` | File summary |

### ✅ Thư mục mới tạo:

```
00-ProjectInfo/          # Thông tin dự án, templates, guides
├── Templates/           # Templates chính thức
└── Guides/             # Hướng dẫn setup & run

Documentation/diagrams/
└── plantuml-sources/   # PlantUML source code
```

### ✅ Files mới tạo (Root):

- **README.md** - Hướng dẫn cấu trúc project
- **INDEX.md** - Index tìm kiếm nhanh
- **DOCUMENT_FLOW_OVERVIEW.md** - Tổng quan flow tài liệu (đã có)

---

## 📂 CẤU TRÚC HOÀN CHỈNH

```
SE/                                    # ROOT PROJECT
│
├── 📄 README.md                       # ★ BẮT ĐẦU TẠI ĐÂY - Hướng dẫn tổng quan
├── 📄 INDEX.md                        # ★ TÌM KIẾM NHANH - Index đầy đủ
├── 📄 DOCUMENT_FLOW_OVERVIEW.md       # ★ FLOW TÀI LIỆU - Cấu trúc chi tiết
├── 📄 PROJECT_STRUCTURE_TREE.txt      # Tree structure (auto-generated)
├── .gitignore
└── link.docx
│
├── 📁 00-ProjectInfo/                 # ★★ THÔNG TIN DỰ ÁN
│   ├── DeBai.md                       # Đề bài đồ án
│   ├── Ketquamongmuon.md             # Kết quả mong muốn
│   │
│   ├── 📁 Templates/
│   │   └── Template.md                # Template đồ án chính thức
│   │
│   └── 📁 Guides/
│       ├── HUONG_DAN_CHAY_PROJECT.md  # Hướng dẫn setup & run
│       └── Huongdan.md                # Hướng dẫn chung
│
├── 📁 Documentation/                  # ★★★ TÀI LIỆU CHÍNH THỨC (Nộp đồ án)
│   │
│   ├── 📄 README.md                   # Hướng dẫn Documentation
│   │
│   ├── ✅ SECTION 0: Front Matter
│   │   └── 00-FrontMatter.md          # 10 trang
│   │
│   ├── ✅ SECTION I: Project Introduction
│   │   └── 01-ProjectIntroduction.md  # 35 trang (72 features)
│   │
│   ├── ✅ SECTION II: Project Management
│   │   └── 02-ProjectManagementPlan.md # 25 trang (WBS, RACI)
│   │
│   ├── ✅ SECTION III: SRS (65 trang)
│   │   ├── 03-SRS.md                  # Master file (deprecated)
│   │   └── 📁 03-SRS/
│   │       ├── 3.1-ProductOverview.md       # 12 trang
│   │       ├── 3.2-UserRequirements.md      # 15 trang (42 UC)
│   │       ├── 3.3-FunctionalRequirements.md # 20 trang (72 FE)
│   │       ├── 3.4-NonFunctionalRequirements.md # 10 trang (22 NFR)
│   │       └── 3.5-RequirementAppendix.md   # 8 trang
│   │
│   ├── 🟡 SECTION IV: SDD (85 trang) - Text ✅ Diagrams ⏳
│   │   ├── 04-SDD.md                  # Master file (deprecated)
│   │   └── 📁 04-SDD/
│   │       ├── 4.1-SystemDesign.md           # 20 trang ✅
│   │       ├── 4.2-DatabaseDesign.md         # 25 trang ✅
│   │       ├── 4.3-DetailedDesign.md         # 40 trang ✅
│   │       ├── README.md                     # Status dashboard
│   │       ├── REVIEW_CHECKLIST_AND_GUIDE.md # 29 KB checklist
│   │       ├── QUICK_START_GUIDE.md          # 9 KB quick start
│   │       ├── DIAGRAM_INSERT_TEMPLATE.md    # Templates chèn diagram
│   │       ├── SECTION_IV_COMPLETION_REPORT.md
│   │       │
│   │       └── 📁 diagrams/
│   │           ├── 📁 guides/         # ★ 9 hướng dẫn vẽ Draw.io ✅
│   │           │   ├── 01-SYSTEM-ARCHITECTURE-GUIDE.md
│   │           │   ├── 02-DATABASE-ERD-GUIDE.md
│   │           │   ├── 03-CLASS-USER-MODULE-GUIDE.md
│   │           │   ├── 03-CLASS-ACADEMIC-MODULE-GUIDE.md
│   │           │   ├── 03-CLASS-PROJECT-MODULE-GUIDE.md
│   │           │   ├── 03-CLASS-GROUP-MODULE-GUIDE.md
│   │           │   ├── 03-CLASS-COLLABORATION-MODULE-GUIDE.md
│   │           │   └── 03-CLASS-EVALUATION-MODULE-GUIDE.md
│   │           │
│   │           └── (48 PNG files) ⏳ Cần vẽ
│   │
│   ├── ❌ SECTION V: Testing (25 trang) - Chưa tạo
│   │   └── 05-Testing.md
│   │
│   ├── ❌ SECTION VI: User Guides (35 trang) - Chưa tạo
│   │   └── 06-UserGuides.md
│   │
│   ├── 📁 diagrams/                   # Diagrams tổng hợp
│   │   └── 📁 plantuml-sources/       # ★ PlantUML source code
│   │       ├── @startuml.txt          # 6 KB PlantUML code
│   │       └── ERD_DATABASE_DESIGN_COLLABSPHERE.md # 60 KB ERD
│   │
│   └── 📋 Implementation Tracking Documents
│       ├── ROLES_AND_PERMISSIONS.md           # 17 KB permissions matrix
│       ├── USE_CASE_IMPLEMENTATION_MAP.md     # 35 KB UC→code mapping
│       ├── IMPLEMENTATION_PROGRESS.md         # 12 KB phase tracking
│       ├── IMPLEMENTATION_SUMMARY_JAN3.md     # 10 KB daily summary
│       ├── ACTION_PLAN.md                     # 12 KB action plan
│       ├── EVALUATION_REPORT.md               # 21 KB evaluation
│       ├── NOTES-TODO.md                      # 16 KB todo list
│       ├── Database_Verification.txt          # 3 KB verification
│       └── FILE_LOCATIONS_SUMMARY.md          # 9 KB file summary
│
├── 📁 KeHoach/                        # ★★ HƯỚNG DẪN KỸ THUẬT (9 files)
│   ├── 00-TongQuan.md                 # Tổng quan kiến trúc
│   ├── 01-PhanTichThietKe.md         # Phân tích thiết kế
│   ├── 02-ThietLapBackend.md         # Setup Backend
│   ├── 03-APIBackend.md              # API documentation
│   ├── 04-AIRealtime.md              # AI & Real-time
│   ├── 05-FrontendReact.md           # Frontend setup
│   ├── 06-CongCuCongTac.md           # Tools & workflows
│   ├── 07-Testing.md                 # Testing guide
│   ├── 08-Deployment.md              # Deployment guide
│   └── 09-CauHoiCanXemXet.md         # Q&A
│
├── 📁 Doc/                            # Tài liệu cũ (có thể xóa)
│   └── usecase.md
│
└── 📁 collabsphere/                   # ★★★ SOURCE CODE
    ├── docker-compose.yml
    ├── README.md
    │
    ├── 📁 backend/                    # FastAPI Backend
    │   ├── app/
    │   │   ├── main.py                # Entry point
    │   │   ├── config.py              # Configuration
    │   │   ├── database.py            # DB connection
    │   │   │
    │   │   ├── 📁 models/             # 28 SQLAlchemy models
    │   │   │   ├── user.py
    │   │   │   ├── academic.py
    │   │   │   ├── subject.py
    │   │   │   ├── project.py
    │   │   │   ├── group.py
    │   │   │   ├── communication.py
    │   │   │   ├── evaluation.py
    │   │   │   ├── notification.py
    │   │   │   └── resource.py
    │   │   │
    │   │   ├── 📁 routers/            # 13 API routers (60+ endpoints)
    │   │   │   ├── auth.py
    │   │   │   ├── users.py
    │   │   │   ├── subjects.py
    │   │   │   ├── classes.py
    │   │   │   ├── projects.py
    │   │   │   ├── groups.py
    │   │   │   ├── meetings.py
    │   │   │   ├── chat.py
    │   │   │   ├── resources.py
    │   │   │   ├── evaluations.py
    │   │   │   ├── notifications.py
    │   │   │   └── ai.py
    │   │   │
    │   │   ├── 📁 schemas/            # Pydantic schemas
    │   │   │   ├── auth.py
    │   │   │   └── common.py
    │   │   │
    │   │   ├── 📁 services/           # Business logic
    │   │   │   ├── ai_service.py
    │   │   │   ├── socket_service.py
    │   │   │   └── notification_service.py
    │   │   │
    │   │   └── 📁 utils/              # Utilities
    │   │       ├── security.py
    │   │       └── dependencies.py
    │   │
    │   ├── 📁 alembic/                # Database migrations
    │   │   ├── env.py
    │   │   └── versions/
    │   │
    │   ├── alembic.ini
    │   ├── requirements.txt
    │   ├── Dockerfile
    │   ├── check_db.py
    │   └── create_test_accounts.py
    │
    └── 📁 frontend/                   # React Frontend
        ├── public/
        │   └── index.html
        │
        ├── src/
        │   ├── App.js                 # Main app
        │   ├── index.js               # Entry point
        │   ├── config.js              # Config
        │   │
        │   ├── 📁 components/         # React components
        │   │   ├── Auth/
        │   │   ├── Collaboration/
        │   │   ├── Common/
        │   │   ├── Evaluation/
        │   │   ├── Group/
        │   │   └── ...
        │   │
        │   ├── 📁 pages/              # Page components
        │   ├── 📁 services/           # API services
        │   ├── 📁 context/            # React Context
        │   ├── 📁 styles/             # CSS
        │   └── 📁 config/
        │
        ├── package.json
        ├── Dockerfile
        └── nginx.conf
```

---

## 🎯 ĐƯỜNG DẪN NHANH (Quick Links)

### 📖 Đọc đầu tiên:
1. `/README.md` - Tổng quan project
2. `/INDEX.md` - Tìm kiếm nhanh
3. `/DOCUMENT_FLOW_OVERVIEW.md` - Flow tài liệu chi tiết

### 🏃 Chạy project:
→ `/00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md`

### 📚 Đọc tài liệu chính thức:
→ `/Documentation/` (Sections 0-VI)

### 👨‍💻 Implementation guides:
→ `/KeHoach/` (9 files tiếng Việt)

### 🎨 Vẽ diagrams:
→ `/Documentation/04-SDD/diagrams/guides/` (9 guides)

### 💻 Xem code:
→ `/collabsphere/backend/` và `/collabsphere/frontend/`

### 🔍 Tìm UC implementation:
→ `/Documentation/USE_CASE_IMPLEMENTATION_MAP.md`

### 📋 Xem todo:
→ `/Documentation/NOTES-TODO.md`

### 🔐 Xem permissions:
→ `/Documentation/ROLES_AND_PERMISSIONS.md`

---

## 📊 THỐNG KÊ

### Files count:
- **Root**: 6 files (README, INDEX, OVERVIEW, etc.)
- **00-ProjectInfo**: 5 files (DeBai, Template, Guides)
- **Documentation**: 13 main files + 5 SRS + 3 SDD + 9 guides = 30 files
- **KeHoach**: 9 files
- **Source code**: 100+ files (backend + frontend)

### Documentation size:
- **Hoàn thành**: 170 trang (60%)
- **Còn lại**: 110 trang (40%)
- **Tổng**: 280 trang

### Diagrams:
- **Guides**: 9 files ✅
- **PNG files**: 0/48 ⏳

---

## 🎯 LỢI ÍCH CỦA CẤU TRÚC MỚI

### ✅ Dễ tìm kiếm:
- Root có 3 files hướng dẫn (README, INDEX, OVERVIEW)
- Thông tin dự án tập trung ở `00-ProjectInfo/`
- Tài liệu chính thức rõ ràng ở `Documentation/`
- Code tách biệt ở `collabsphere/`

### ✅ Logic hơn:
- Templates và đề bài ở 1 chỗ
- Guides tập trung
- PlantUML sources ở diagrams/plantuml-sources/
- Tracking docs ở Documentation/

### ✅ Dễ maintain:
- Mỗi loại file ở đúng chỗ
- Không còn files rải rác ở root
- Cấu trúc rõ ràng theo mục đích

### ✅ Dễ onboard:
- Người mới đọc README → INDEX → OVERVIEW
- Developer đọc KeHoach/ guides
- Reviewer đọc Documentation/ sections

---

## 🚀 NEXT STEPS

1. ⏳ **Vẽ 48 diagrams** (13.5 giờ)
   - Dùng 9 guides đã có ở `/Documentation/04-SDD/diagrams/guides/`
   - Save PNG vào `/Documentation/04-SDD/diagrams/`

2. ⏳ **Chèn diagrams vào markdown** (1 giờ)
   - Dùng template ở `DIAGRAM_INSERT_TEMPLATE.md`

3. ❌ **Viết Section V: Testing** (25 trang, 3-4 ngày)

4. ❌ **Viết Section VI: User Guides** (35 trang, 3-4 ngày)

5. 🟡 **Hoàn thiện implementation** (3 UC còn thiếu + 30% frontend)

---

## 📞 CONTACT

**Team**: 4Bees  
**Project**: CollabSphere (SP25SE107)  
**Semester**: Spring 2025  
**Restructured**: 4/1/2026

---

**File này**: `/PROJECT_STRUCTURE.md`  
**Version**: 2.0
