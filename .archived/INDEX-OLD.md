# 🔍 QUICK INDEX - Tìm Kiếm Nhanh

**Cập nhật**: 4/1/2026

---

## 🎯 MỤC LỤC NHANH

### [A. BẮT ĐẦU TẠI ĐÂY](#a-bắt-đầu-tại-đây)
### [B. TÌM THEO SECTION](#b-tìm-theo-section)
### [C. TÌM THEO LOẠI NỘI DUNG](#c-tìm-theo-loại-nội-dung)
### [D. TÌM THEO ROLE](#d-tìm-theo-role)
### [E. TÌM CODE](#e-tìm-code)
### [F. TÌM DIAGRAM](#f-tìm-diagram)

---

## A. BẮT ĐẦU TẠI ĐÂY

| 🎯 Mục đích | 📄 File | 📂 Đường dẫn |
|------------|---------|-------------|
| **Tổng quan toàn bộ** | DOCUMENT_FLOW_OVERVIEW.md | `/` |
| **Index này** | INDEX.md | `/` |
| **Hướng dẫn cấu trúc** | README.md | `/` |
| **Chạy project** | HUONG_DAN_CHAY_PROJECT.md | `/00-ProjectInfo/Guides/` |
| **Todo list** | NOTES-TODO.md | `/Documentation/` |

---

## B. TÌM THEO SECTION (Tài liệu chính thức)

### Section 0: Front Matter (10 trang)
📄 **00-FrontMatter.md** → `/Documentation/`
- Trang bìa
- Danh sách thành viên
- Mục lục
- Definitions & Acronyms

---

### Section I: Project Introduction (35 trang)
📄 **01-ProjectIntroduction.md** → `/Documentation/`

**Nội dung chính**:
- 1.1 Overview
- 1.2 Product Background
- 1.3 Existing Systems
- 1.4 Business Opportunity
- 1.5 Software Product Vision
- 1.6 **Project Scope** (72 features FE-01 đến FE-72)
- 1.7 **Limitations** (16 items LI-01 đến LI-16)

**Tìm nhanh**:
- 72 Features → Section 1.6, bảng phân theo role
- Limitations → Section 1.7

---

### Section II: Project Management Plan (25 trang)
📄 **02-ProjectManagementPlan.md** → `/Documentation/`

**Nội dung chính**:
- 2.1 Overview (WBS, Effort estimation)
- 2.2 Management Approach
- 2.3 Project Deliverables
- 2.4 **RACI Matrix** (Responsibility assignments)
- 2.5 Project Communications
- 2.6 Configuration Management

---

### Section III: SRS - Software Requirements (65 trang)
📂 **03-SRS/** → `/Documentation/03-SRS/`

| File | Nội dung | Trang |
|------|----------|-------|
| **3.1-ProductOverview.md** | System context, User roles | 12 |
| **3.2-UserRequirements.md** | **42 Use Cases** (UC001-UC042) | 15 |
| **3.3-FunctionalRequirements.md** | **72 Functional Requirements** | 20 |
| **3.4-NonFunctionalRequirements.md** | **22 NFRs** (Performance, Security...) | 10 |
| **3.5-RequirementAppendix.md** | Business rules, Glossary | 8 |

**Tìm nhanh**:
- Use Cases → `3.2-UserRequirements.md`
- Features chi tiết → `3.3-FunctionalRequirements.md`
- Performance/Security → `3.4-NonFunctionalRequirements.md`

---

### Section IV: SDD - Software Design (85 trang)
📂 **04-SDD/** → `/Documentation/04-SDD/`

| File | Nội dung | Trang |
|------|----------|-------|
| **4.1-SystemDesign.md** | 3-tier architecture, Tech stack | 20 |
| **4.2-DatabaseDesign.md** | **28 Database tables** | 25 |
| **4.3-DetailedDesign.md** | **60+ API endpoints**, Class/Sequence diagrams | 40 |

**Support files**:
- **README.md** - Status dashboard
- **REVIEW_CHECKLIST_AND_GUIDE.md** - Checklist hoàn thành
- **QUICK_START_GUIDE.md** - Quick start with PlantUML
- **DIAGRAM_INSERT_TEMPLATE.md** - Templates chèn diagram

**Diagrams** (48 total):
- **guides/** - 9 hướng dẫn vẽ Draw.io ✅
- **.png files** - 48 diagrams cần vẽ ⏳

**Tìm nhanh**:
- Architecture → `4.1-SystemDesign.md` Section 4.1.1
- Database tables → `4.2-DatabaseDesign.md` Section 4.2.2
- API endpoints → `4.3-DetailedDesign.md` Section 4.3.1
- Hướng dẫn vẽ → `diagrams/guides/`

---

### Section V: Testing (25 trang) ❌ Chưa tạo
📄 **05-Testing.md** → `/Documentation/`

**Nội dung dự kiến**:
- 5.1 Scope of Testing
- 5.2 Test Strategy
- 5.3 Test Plan
- 5.4 Test Cases
- 5.5 Test Reports

---

### Section VI: User Guides (35 trang) ❌ Chưa tạo
📄 **06-UserGuides.md** → `/Documentation/`

**Nội dung dự kiến**:
- 6.1 Deliverable Package
- 6.2 Installation Guides
- 6.3 User Manual (5 roles)

---

## C. TÌM THEO LOẠI NỘI DUNG

### 📋 Requirements & Features

| Nội dung | File | Location |
|----------|------|----------|
| **72 Features tổng hợp** | 01-ProjectIntroduction.md | Section 1.6 |
| **72 Features chi tiết** | 3.3-FunctionalRequirements.md | `/Documentation/03-SRS/` |
| **42 Use Cases** | 3.2-UserRequirements.md | `/Documentation/03-SRS/` |
| **22 NFRs** | 3.4-NonFunctionalRequirements.md | `/Documentation/03-SRS/` |
| **16 Limitations** | 01-ProjectIntroduction.md | Section 1.7 |
| **Business Rules** | 3.5-RequirementAppendix.md | `/Documentation/03-SRS/` |

---

### 🏗️ Design & Architecture

| Nội dung | File | Location |
|----------|------|----------|
| **System Architecture** | 4.1-SystemDesign.md | `/Documentation/04-SDD/` |
| **3-tier Architecture** | 4.1-SystemDesign.md | Section 4.1.1 |
| **Tech Stack** | 4.1-SystemDesign.md | Section 4.1.2 |
| **28 Database Tables** | 4.2-DatabaseDesign.md | `/Documentation/04-SDD/` |
| **ERD Description** | 4.2-DatabaseDesign.md | Section 4.2.2 |
| **60+ API Endpoints** | 4.3-DetailedDesign.md | `/Documentation/04-SDD/` |
| **Class Diagrams** | 4.3-DetailedDesign.md | Section 4.3.2 |
| **Sequence Diagrams** | 4.3-DetailedDesign.md | Section 4.3.3 |

---

### 🔐 Security & Permissions

| Nội dung | File | Location |
|----------|------|----------|
| **Security Design** | 4.1-SystemDesign.md | Section 4.1.4 |
| **Authentication** | 4.3-DetailedDesign.md | Section 4.3.1 |
| **Permissions Matrix** | ROLES_AND_PERMISSIONS.md | `/Documentation/` |
| **5 User Roles** | 3.1-ProductOverview.md | `/Documentation/03-SRS/` |
| **Security NFRs** | 3.4-NonFunctionalRequirements.md | NFR-08 đến NFR-12 |

---

### 📊 Implementation Tracking

| Nội dung | File | Location |
|----------|------|----------|
| **UC → Code Mapping** | USE_CASE_IMPLEMENTATION_MAP.md | `/Documentation/` |
| **Progress Phase 1-4** | IMPLEMENTATION_PROGRESS.md | `/Documentation/` |
| **Daily Summary** | IMPLEMENTATION_SUMMARY_JAN3.md | `/Documentation/` |
| **Action Plan** | ACTION_PLAN.md | `/Documentation/` |
| **Todo List** | NOTES-TODO.md | `/Documentation/` |
| **Database Verification** | Database_Verification.txt | `/Documentation/` |

---

### 🎨 Diagrams & Visual

| Nội dung | File | Location |
|----------|------|----------|
| **Architecture Diagram Guide** | 01-SYSTEM-ARCHITECTURE-GUIDE.md | `/Documentation/04-SDD/diagrams/guides/` |
| **ERD Guide** | 02-DATABASE-ERD-GUIDE.md | `/Documentation/04-SDD/diagrams/guides/` |
| **6 Class Diagram Guides** | 03-CLASS-*-GUIDE.md | `/Documentation/04-SDD/diagrams/guides/` |
| **PlantUML ERD Source** | ERD_DATABASE_DESIGN_COLLABSPHERE.md | `/Documentation/diagrams/plantuml-sources/` |
| **PlantUML Code** | @startuml.txt | `/Documentation/diagrams/plantuml-sources/` |

---

## D. TÌM THEO ROLE

### 👨‍💼 Admin (7 features)
**Features**: FE-01 đến FE-07
📄 File: `01-ProjectIntroduction.md` Section 1.6.1

**Chức năng chính**:
- Login/Logout (FE-01, FE-02)
- User Management (FE-03, FE-04, FE-05)
- View reports (FE-06, FE-07)

**Permissions**: `ROLES_AND_PERMISSIONS.md` Section 2.1

---

### 👨‍🏫 Department Head (9 features)
**Features**: FE-08 đến FE-16
📄 File: `01-ProjectIntroduction.md` Section 1.6.2

**Chức năng chính**:
- Approve/Reject Projects (FE-08, FE-09)
- Assign Projects to Classes (FE-10)
- View Reports (FE-11 đến FE-16)

**Permissions**: `ROLES_AND_PERMISSIONS.md` Section 2.2

---

### 👥 Academic Staff (8 features)
**Features**: FE-17 đến FE-24
📄 File: `01-ProjectIntroduction.md` Section 1.6.3

**Chức năng chính**:
- Subject Management (FE-17, FE-18)
- Class Management (FE-19 đến FE-22)
- Student Management (FE-23, FE-24)

**Permissions**: `ROLES_AND_PERMISSIONS.md` Section 2.3

---

### 👨‍🏫 Lecturer (24 features)
**Features**: FE-25 đến FE-48
📄 File: `01-ProjectIntroduction.md` Section 1.6.4

**Chức năng chính**:
- Project Creation & Management (FE-25 đến FE-29)
- Group Management (FE-30 đến FE-34)
- Evaluation (FE-35 đến FE-40)
- Collaboration (FE-41 đến FE-48)

**Permissions**: `ROLES_AND_PERMISSIONS.md` Section 2.4

---

### 👨‍🎓 Student (24 features)
**Features**: FE-49 đến FE-72
📄 File: `01-ProjectIntroduction.md` Section 1.6.5

**Chức năng chính**:
- Project Selection (FE-49, FE-50)
- Group Formation (FE-51 đến FE-54)
- Task Management (FE-55 đến FE-58)
- Collaboration (FE-59 đến FE-66)
- Peer Review (FE-67 đến FE-72)

**Permissions**: `ROLES_AND_PERMISSIONS.md` Section 2.5

---

## E. TÌM CODE

### 📂 Backend Structure
**Location**: `/collabsphere/backend/app/`

| Component | Folder | Nội dung |
|-----------|--------|----------|
| **Models** | `models/` | 28 database models (SQLAlchemy) |
| **API Routers** | `routers/` | 13 router files với 60+ endpoints |
| **Schemas** | `schemas/` | Pydantic validation schemas |
| **Services** | `services/` | Business logic (AI, Socket, Notification) |
| **Utils** | `utils/` | Security, dependencies, helpers |

**Key files**:
- `main.py` - FastAPI app entry point
- `database.py` - Database connection
- `config.py` - Configuration settings

---

### 📂 Frontend Structure
**Location**: `/collabsphere/frontend/src/`

| Component | Folder | Nội dung |
|-----------|--------|----------|
| **Components** | `components/` | React components (Auth, Group, etc.) |
| **Pages** | `pages/` | Page components |
| **Services** | `services/` | API call functions |
| **Context** | `context/` | React Context (Auth, Socket) |
| **Styles** | `styles/` | CSS/styling |

---

### 🔍 Tìm Code của Use Case
📄 **USE_CASE_IMPLEMENTATION_MAP.md** → `/Documentation/`

**Format**: Mỗi UC có:
- Status (✅ Complete / 🟡 Partial / ❌ Missing)
- Backend files với line numbers
- Frontend files với line numbers
- API endpoints related
- Notes & dependencies

**Example**:
```
UC001: User Login
✅ Status: Complete
Backend: app/routers/auth.py (lines 15-45)
Frontend: src/pages/LoginPage.js (lines 20-80)
Endpoints: POST /auth/login
```

---

### 📋 API Endpoints Mapping

**Backend Implementation**: `03-APIBackend.md` → `/KeHoach/`

**Categories**:
1. Authentication (5 endpoints)
2. User Management (8 endpoints)
3. Academic (12 endpoints)
4. Projects (10 endpoints)
5. Groups (15 endpoints)
6. Collaboration (10+ endpoints)

**Design Documentation**: `4.3-DetailedDesign.md` → `/Documentation/04-SDD/`

---

## F. TÌM DIAGRAM

### 📐 Diagram Guides (Hướng dẫn vẽ)
**Location**: `/Documentation/04-SDD/diagrams/guides/`

| Guide | File | Thời gian |
|-------|------|-----------|
| **System Architecture** | 01-SYSTEM-ARCHITECTURE-GUIDE.md | 2h |
| **Database ERD** | 02-DATABASE-ERD-GUIDE.md | 4h |
| **User Module** | 03-CLASS-USER-MODULE-GUIDE.md | 45m |
| **Academic Module** | 03-CLASS-ACADEMIC-MODULE-GUIDE.md | 1h |
| **Project Module** | 03-CLASS-PROJECT-MODULE-GUIDE.md | 1h |
| **Group Module** | 03-CLASS-GROUP-MODULE-GUIDE.md | 1.5h |
| **Collaboration Module** | 03-CLASS-COLLABORATION-MODULE-GUIDE.md | 1h |
| **Evaluation Module** | 03-CLASS-EVALUATION-MODULE-GUIDE.md | 1.5h |

**Tổng**: 13.5 giờ để vẽ tất cả

---

### 🖼️ Diagram Files (PNG - Cần vẽ)
**Location**: `/Documentation/04-SDD/diagrams/`

**48 diagrams cần tạo**:
- 1 × Architecture (`4.1-system-architecture.png`)
- 1 × ERD (`4.2-erd-full.png`)
- 6 × Class Diagrams (`4.3.1` đến `4.3.6-class-*.png`)
- 10 × Sequence Diagrams (`4.3.7` đến `4.3.16-seq-*.png`)
- 30 × GUI Screenshots (`4.3.17` đến `4.3.46-gui-*.png`)

---

### 📊 PlantUML Source Code
**Location**: `/Documentation/diagrams/plantuml-sources/`

| File | Nội dung | Dòng |
|------|----------|------|
| **ERD_DATABASE_DESIGN_COLLABSPHERE.md** | ERD PlantUML code | 911 |
| **@startuml.txt** | PlantUML code tổng hợp | ~200 |

**Sử dụng**: Copy code này vào PlantUML editor để generate diagram tự động

---

## 🎯 SCENARIOS TÌM KIẾM THƯỜNG GẶP

### "Tôi muốn biết feature X thuộc role nào?"
→ `01-ProjectIntroduction.md` Section 1.6 → Tìm FE-XX

### "Tôi muốn biết Use Case Y implement ở đâu?"
→ `USE_CASE_IMPLEMENTATION_MAP.md` → Tìm UCYYY

### "Tôi muốn biết database table Z có gì?"
→ `4.2-DatabaseDesign.md` Section 4.2.2 → Tìm table name

### "Tôi muốn vẽ diagram loại A?"
→ `04-SDD/diagrams/guides/` → Chọn guide phù hợp

### "Tôi muốn biết API endpoint B?"
→ `4.3-DetailedDesign.md` Section 4.3.1 → Tìm category

### "Tôi muốn biết role C có permission gì?"
→ `ROLES_AND_PERMISSIONS.md` → Tìm Section 2.X

### "Tôi muốn biết còn phải làm gì?"
→ `NOTES-TODO.md` hoặc `IMPLEMENTATION_PROGRESS.md`

### "Tôi muốn setup project?"
→ `00-ProjectInfo/Guides/HUONG_DAN_CHAY_PROJECT.md`

---

## 📞 LIÊN HỆ

**Team**: 4Bees  
**Project**: CollabSphere (SP25SE107)  
**Semester**: Spring 2025

---

**Cập nhật**: 4/1/2026  
**Version**: 1.0
