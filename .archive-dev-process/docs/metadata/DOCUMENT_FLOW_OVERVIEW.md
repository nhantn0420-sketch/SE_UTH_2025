# 📘 TỔNG QUAN FLOW TÀI LIỆU HỆ THỐNG COLLABSPHERE

**Dự án**: CollabSphere - Hệ thống hỗ trợ học tập dựa trên dự án  
**Mã dự án**: SP25SE107  
**Học kỳ**: Spring 2025  
**Cập nhật**: 4/1/2026

---

## 🗺️ CẤU TRÚC TỔNG THỂ - 3 LOẠI TÀI LIỆU

```
SE/
├── 📄 TÀI LIỆU CHÍNH THỨC (Documentation/) ← ĐỒ ÁN CHÍNH THỨC NỘP
├── 📋 TÀI LIỆU KẾ HOẠCH (KeHoach/) ← HƯỚNG DẪN KỸ THUẬT
└── 📝 TÀI LIỆU PHỤ (Doc/, diagrams/) ← BỔ TRỢ
```

---

## 🎯 PHẦN 1: TÀI LIỆU CHÍNH THỨC (Documentation/) - ĐỒ ÁN NỘP

**Đây là tài liệu CHÍNH theo template đồ án tốt nghiệp**

### 📊 Tiến độ tổng thể: 60% hoàn thành

| Phần | File | Trang | Trạng thái | Vị trí |
|------|------|-------|-----------|--------|
| **Front Matter** | `00-FrontMatter.md` | 10 | ✅ 100% | `Documentation/` |
| **Section I** | `01-ProjectIntroduction.md` | 35 | ✅ 100% | `Documentation/` |
| **Section II** | `02-ProjectManagementPlan.md` | 25 | ✅ 100% | `Documentation/` |
| **Section III** | `03-SRS/` (5 files) | 65 | ✅ 100% | `Documentation/03-SRS/` |
| **Section IV** | `04-SDD/` (3 files) | 85 | 🟡 60% | `Documentation/04-SDD/` |
| **Section V** | `05-Testing.md` | 25 | ❌ 0% | Chưa tạo |
| **Section VI** | `06-UserGuides.md` | 35 | ❌ 0% | Chưa tạo |

**TỔNG CỘNG**: ~280 trang (170 trang hoàn thành)

---

## 📖 FLOW ĐỌC TÀI LIỆU CHÍNH THỨC (Theo Template)

### 🔹 BƯỚC 1: Front Matter (10 trang)
**File**: `Documentation/00-FrontMatter.md`

**Nội dung**:
- Trang bìa (Capstone Project Document)
- Danh sách thành viên nhóm (4Bees)
- Giảng viên hướng dẫn
- Mã dự án: SP25SE107
- Mục lục (Table of Contents)
- Lời cảm ơn (Acknowledgement)
- Định nghĩa & Viết tắt (BA, ERD, SRS, SDD, UC, NFR...)

**Trạng thái**: ✅ Hoàn thành, cần cập nhật thông tin team

---

### 🔹 BƯỚC 2: Section I - Project Introduction (35 trang)
**File**: `Documentation/01-ProjectIntroduction.md`

**Nội dung**:
1. **Overview**: Thông tin dự án (Web app, team 4Bees)
2. **Product Background**: Vấn đề cần giải quyết (quản lý đồ án nhóm phức tạp)
3. **Existing Systems**: Phân tích 2 hệ thống (Call4Project, Dev.to) + nhược điểm
4. **Business Opportunity**: Lợi ích (cải thiện collaboration, tăng quality)
5. **Software Product Vision**: Tầm nhìn sản phẩm
6. **Project Scope & Limitations**:
   - ✅ **72 Major Features** (phân theo role):
     * Admin (7 features): FE-01 đến FE-07
     * Department Head (9 features): FE-08 đến FE-16
     * Academic Staff (8 features): FE-17 đến FE-24
     * Lecturer (24 features): FE-25 đến FE-48
     * Student (24 features): FE-49 đến FE-72
   - ✅ **16 Limitations** (LI-01 đến LI-16)

**Trạng thái**: ✅ 100% hoàn chỉnh

---

### 🔹 BƯỚC 3: Section II - Project Management Plan (25 trang)
**File**: `Documentation/02-ProjectManagementPlan.md`

**Nội dung**:
1. **Overview**: Work Breakdown Structure (WBS) với effort estimation
2. **Management Approach**: Agile methodology
3. **Project Deliverables**: Code, documents, presentation
4. **Responsibility Assignments**: RACI matrix (4 members)
5. **Project Communications**: Meeting schedule, tools (Slack, Discord)
6. **Configuration Management**: Git workflow, version control

**Trạng thái**: ✅ 100% hoàn chỉnh

---

### 🔹 BƯỚC 4: Section III - SRS (Software Requirement Specification) (65 trang)
**Thư mục**: `Documentation/03-SRS/` - **5 files riêng biệt**

#### 📄 File 1: `3.1-ProductOverview.md` (~12 trang)
- System context diagram
- User roles (5 roles: Admin, Head, Staff, Lecturer, Student)
- High-level features overview

#### 📄 File 2: `3.2-UserRequirements.md` (~15 trang)
- **42 Use Cases** (UC001-UC042)
- Use Case Diagram
- Actor descriptions
- Use Case specifications

#### 📄 File 3: `3.3-FunctionalRequirements.md` (~20 trang)
- Chi tiết **72 Functional Requirements** (FE-01 đến FE-72)
- Preconditions, postconditions
- Main flow, alternative flows
- Business rules

#### 📄 File 4: `3.4-NonFunctionalRequirements.md` (~10 trang)
- **22 Non-Functional Requirements**:
  * Performance (NFR-01 đến NFR-04)
  * Scalability (NFR-05 đến NFR-07)
  * Security (NFR-08 đến NFR-12)
  * Usability (NFR-13 đến NFR-15)
  * Reliability (NFR-16 đến NFR-18)
  * Maintainability (NFR-19 đến NFR-20)
  * Compatibility (NFR-21 đến NFR-22)

#### 📄 File 5: `3.5-RequirementAppendix.md` (~8 trang)
- Business rules glossary
- Data dictionary
- Traceability matrix (UC → FE mapping)

**Trạng thái**: ✅ 100% hoàn chỉnh (5/5 files)

---

### 🔹 BƯỚC 5: Section IV - SDD (Software Design Description) (85 trang) 🟡
**Thư mục**: `Documentation/04-SDD/` - **3 files văn bản + diagrams**

#### 📄 File 1: `4.1-SystemDesign.md` (~20 trang) ✅
**Nội dung**:
1. Architecture Overview
   - 3-tier architecture (Client, Server, Database)
   - Component diagram
2. Technology Stack
   - Frontend: React, Socket.IO, WebRTC
   - Backend: FastAPI, PostgreSQL, Redis
   - External: AWS Bedrock, Cloudinary, SMTP
3. Design Patterns & Principles
4. Security Design
5. Deployment Architecture

**Trạng thái**: ✅ Text hoàn thành, ⏳ Cần diagram

---

#### 📄 File 2: `4.2-DatabaseDesign.md` (~25 trang) ✅
**Nội dung**:
1. Database Overview (PostgreSQL)
2. **28 Tables** chi tiết:
   - **Module 1: Users & Academic** (5 tables)
     * users, subjects, curricula, classes, class_members
   - **Module 2: Projects & Groups** (8 tables)
     * projects, project_milestones, class_projects, groups, group_members, group_milestones, checkpoints, tasks
   - **Module 3: Collaboration** (6 tables)
     * chat_messages, meetings, meeting_participants, resources, whiteboard_sessions, document_sessions
   - **Module 4: Evaluation** (6 tables)
     * peer_reviews, group_evaluations, member_evaluations, checkpoint_evaluations, milestone_questions, milestone_answers
   - **Module 5: Notifications** (1 table)
     * notifications
   - **Module 6: Additional** (2 tables)
     * project_tags, activity_logs
3. Relationships & Foreign Keys
4. Indexes & Constraints
5. Database Optimization

**Trạng thái**: ✅ Text hoàn thành, ⏳ Cần ERD diagram

---

#### 📄 File 3: `4.3-DetailedDesign.md` (~40 trang) ✅
**Nội dung**:
1. **60+ API Endpoints** (REST + WebSocket):
   - Authentication (5 endpoints)
   - User Management (8 endpoints)
   - Academic (12 endpoints)
   - Projects (10 endpoints)
   - Groups (15 endpoints)
   - Collaboration (10+ endpoints)
2. Business Logic Design
3. Class Diagrams (6 modules)
4. Sequence Diagrams (10 flows)
5. State Machines
6. GUI Mockups (30 screens)

**Trạng thái**: ✅ Text hoàn thành, ⏳ Cần 48 diagrams

---

#### 📊 Diagrams cần vẽ (48 total):

**Vị trí**: `Documentation/04-SDD/diagrams/`

| Loại | Số lượng | Files | Trạng thái |
|------|----------|-------|-----------|
| Architecture | 1 | `4.1-system-architecture.png` | ⏳ Có guide |
| ERD | 1 | `4.2-erd-full.png` | ⏳ Có guide |
| Class Diagrams | 6 | `4.3.1` đến `4.3.6-class-*.png` | ⏳ Có guide |
| Sequence Diagrams | 10 | `4.3.7` đến `4.3.16-seq-*.png` | ⏳ Chưa guide |
| GUI Mockups | 30 | `4.3.17` đến `4.3.46-gui-*.png` | ⏳ Chưa guide |

**Hướng dẫn vẽ**: `Documentation/04-SDD/diagrams/guides/`
- ✅ `01-SYSTEM-ARCHITECTURE-GUIDE.md` (2 giờ)
- ✅ `02-DATABASE-ERD-GUIDE.md` (4 giờ)
- ✅ `03-CLASS-USER-MODULE-GUIDE.md` (45 phút)
- ✅ `03-CLASS-ACADEMIC-MODULE-GUIDE.md` (1 giờ)
- ✅ `03-CLASS-PROJECT-MODULE-GUIDE.md` (1 giờ)
- ✅ `03-CLASS-GROUP-MODULE-GUIDE.md` (1.5 giờ)
- ✅ `03-CLASS-COLLABORATION-MODULE-GUIDE.md` (1 giờ)
- ✅ `03-CLASS-EVALUATION-MODULE-GUIDE.md` (1.5 giờ)
- ⏳ `04-SEQUENCE-DIAGRAMS-GUIDE.md` (Cần tạo)
- ⏳ `05-GUI-SCREENSHOTS-GUIDE.md` (Cần tạo)

**Thời gian ước tính vẽ**: 13.5 giờ

**Section IV Status**: 🟡 Text 100% (85 trang), Diagrams 0% (0/48)

---

### 🔹 BƯỚC 6: Section V - Testing (25 trang) ❌
**File**: `Documentation/05-Testing.md` - **CHƯA TẠO**

**Nội dung dự kiến**:
1. Scope of Testing
2. Test Strategy (Unit, Integration, System, UAT)
3. Test Plan
4. Test Cases (100+ cases)
5. Test Reports

**Trạng thái**: ❌ Chưa bắt đầu

---

### 🔹 BƯỚC 7: Section VI - User Guides (35 trang) ❌
**File**: `Documentation/06-UserGuides.md` - **CHƯA TẠO**

**Nội dung dự kiến**:
1. Deliverable Package
2. Installation Guides
3. User Manual (5 roles):
   - Admin Guide
   - Department Head Guide
   - Academic Staff Guide
   - Lecturer Guide
   - Student Guide

**Trạng thái**: ❌ Chưa bắt đầu

---

## 🎯 PHẦN 2: TÀI LIỆU KẾ HOẠCH (KeHoach/) - HƯỚNG DẪN KỸ THUẬT

**Đây là tài liệu HƯỚNG DẪN IMPLEMENTATION (không nộp đồ án)**

**Vị trí**: `KeHoach/` - **9 files tiếng Việt**

| File | Mục đích | Trạng thái |
|------|----------|-----------|
| `00-TongQuan.md` | Tổng quan kiến trúc, tech stack | ✅ Hoàn thành |
| `01-PhanTichThietKe.md` | Phân tích & thiết kế hệ thống | ✅ Hoàn thành |
| `02-ThietLapBackend.md` | Setup FastAPI, PostgreSQL, Alembic | ✅ Hoàn thành |
| `03-APIBackend.md` | Chi tiết 60+ API endpoints | ✅ Hoàn thành |
| `04-AIRealtime.md` | AWS Bedrock AI, Socket.IO, WebRTC | ✅ Hoàn thành |
| `05-FrontendReact.md` | Setup React, routing, state | ✅ Hoàn thành |
| `06-CongCuCongTac.md` | Docker, Git, VS Code | ✅ Hoàn thành |
| `07-Testing.md` | Pytest, E2E testing | ✅ Hoàn thành |
| `08-Deployment.md` | Deploy Render, Vercel | ✅ Hoàn thành |
| `09-CauHoiCanXemXet.md` | Q&A, troubleshooting | ✅ Hoàn thành |

**Sử dụng khi**: Developers cần implement hoặc troubleshoot code

---

## 🎯 PHẦN 3: TÀI LIỆU PHỤ TRỢ (Root & diagrams/)

### 📋 Tài liệu Implementation Tracking (Documentation/)

| File | Mục đích | Ngày tạo | Kích thước |
|------|----------|----------|-----------|
| `ROLES_AND_PERMISSIONS.md` | Chi tiết permissions 5 roles | 3/1/2026 | 17 KB |
| `USE_CASE_IMPLEMENTATION_MAP.md` | Map 42 UC → code | 3/1/2026 | 35 KB |
| `IMPLEMENTATION_PROGRESS.md` | Progress tracking Phase 1-4 | 3/1/2026 | 12 KB |
| `IMPLEMENTATION_SUMMARY_JAN3.md` | Daily summary 3/1 | 3/1/2026 | 10 KB |
| `ACTION_PLAN.md` | Action plan chi tiết | Cũ | 8 KB |
| `NOTES-TODO.md` | Todo list | Cũ | 5 KB |

---

### 📊 Diagrams (diagrams/ & Documentation/diagrams/)

**Vị trí rải rác**:
- `diagrams/` (root) - Use Case diagrams, PlantUML code
- `Documentation/04-SDD/diagrams/` - Architecture, ERD, Class, Sequence, GUI
- `Documentation/diagrams/` - Tổng hợp

**Files quan trọng**:
- `@startuml.txt` - PlantUML source code
- `ERD_DATABASE_DESIGN_COLLABSPHERE.md` - ERD PlantUML (911 dòng)
- `diagrams/01-USE-CASE-PLANTUML.md` - Use Case PlantUML
- `diagrams/02-CLASS-GUIDE.md` - Class diagram PlantUML (766 dòng)
- `diagrams/03-SEQUENCE-GUIDE.md` - Sequence diagram PlantUML

---

## 📌 CÁCH ĐỌC TÀI LIỆU - THEO MỤC ĐÍCH

### 🎓 Nếu bạn là GIẢNG VIÊN CHẤM ĐỒ ÁN:
**Đọc theo thứ tự**:
1. `Documentation/00-FrontMatter.md` - Thông tin nhóm
2. `Documentation/01-ProjectIntroduction.md` - 72 features
3. `Documentation/02-ProjectManagementPlan.md` - WBS, RACI
4. `Documentation/03-SRS/` (5 files) - Requirements chi tiết
5. `Documentation/04-SDD/` (3 files) - Design chi tiết
6. `Documentation/05-Testing.md` - Test plan (khi có)
7. `Documentation/06-UserGuides.md` - User manual (khi có)

---

### 👨‍💻 Nếu bạn là DEVELOPER MỚI VÀO DỰ ÁN:
**Đọc theo thứ tự**:
1. `Documentation/01-ProjectIntroduction.md` - Hiểu dự án làm gì
2. `Documentation/USE_CASE_IMPLEMENTATION_MAP.md` - Map UC → code
3. `Documentation/ROLES_AND_PERMISSIONS.md` - Hiểu phân quyền
4. `KeHoach/00-TongQuan.md` - Kiến trúc tổng thể
5. `KeHoach/02-ThietLapBackend.md` - Setup backend
6. `KeHoach/05-FrontendReact.md` - Setup frontend
7. `Documentation/IMPLEMENTATION_PROGRESS.md` - Xem còn gì chưa làm

---

### 🔍 Nếu bạn muốn TÌM THÔNG TIN CỤ THỂ:

#### 📌 Tìm Feature/Requirement:
→ `Documentation/01-ProjectIntroduction.md` (Section 6: 72 features FE-01 đến FE-72)

#### 📌 Tìm Use Case:
→ `Documentation/03-SRS/3.2-UserRequirements.md` (42 UC)

#### 📌 Tìm API Endpoint:
→ `Documentation/04-SDD/4.3-DetailedDesign.md` (60+ endpoints)  
→ `KeHoach/03-APIBackend.md` (implementation)

#### 📌 Tìm Database Table:
→ `Documentation/04-SDD/4.2-DatabaseDesign.md` (28 tables)

#### 📌 Tìm Permissions:
→ `Documentation/ROLES_AND_PERMISSIONS.md` (permission matrix)

#### 📌 Tìm Code của 1 Use Case:
→ `Documentation/USE_CASE_IMPLEMENTATION_MAP.md` (file paths + line numbers)

---

## 📊 TIẾN ĐỘ TỔNG THỂ DỰ ÁN

### Tài liệu (Documentation)
```
Front Matter    ████████████████████ 100%  ✅
Section I       ████████████████████ 100%  ✅
Section II      ████████████████████ 100%  ✅
Section III     ████████████████████ 100%  ✅ (5/5 files)
Section IV      ████████████░░░░░░░░  60%  🟡 (Text 100%, Diagrams 0%)
Section V       ░░░░░░░░░░░░░░░░░░░░   0%  ❌ Chưa tạo
Section VI      ░░░░░░░░░░░░░░░░░░░░   0%  ❌ Chưa tạo
────────────────────────────────────────
TỔNG            ████████████░░░░░░░░  60%
```

### Implementation (Code)
```
Backend         ███████████████████░  93%  🟡 (39/42 UC)
Frontend        ██████████████░░░░░░  70%  🟡 
Database        ████████████████████ 100%  ✅ (28 tables)
Authentication  ████████████████████ 100%  ✅
Real-time       ███████████████░░░░░  75%  🟡
AI Features     ████████████████░░░░  80%  🟡
Testing         █████░░░░░░░░░░░░░░░  25%  ❌
Deployment      ████████████░░░░░░░░  60%  🟡
────────────────────────────────────────
TỔNG            ██████████████░░░░░░  73%
```

---

## 🚀 CÔNG VIỆC ƯU TIÊN TIẾP THEO

### ⚡ PHASE 1: Hoàn thiện Section IV (Tuần này)
1. ⏳ Vẽ 48 diagrams (13.5 giờ):
   - 1 System Architecture (2h)
   - 1 Database ERD (4h)
   - 6 Class Diagrams (7.5h)
   - 10 Sequence Diagrams (chưa có guide)
   - 30 GUI Screenshots (chưa có guide)

2. ⏳ Tạo 2 guides còn lại:
   - `04-SEQUENCE-DIAGRAMS-GUIDE.md`
   - `05-GUI-SCREENSHOTS-GUIDE.md`

3. ⏳ Chèn diagrams vào markdown (1h)

**Deadline**: 10/1/2026

---

### ⚡ PHASE 2: Tạo Section V - Testing (Tuần sau)
1. ❌ Viết test plan
2. ❌ Tạo test cases (100+ cases)
3. ❌ Chạy tests và ghi kết quả
4. ❌ Test reports

**Ước tính**: 25 trang, 3-4 ngày

---

### ⚡ PHASE 3: Tạo Section VI - User Guides (Tuần sau)
1. ❌ Installation guide
2. ❌ User manual cho 5 roles
3. ❌ Screenshots hướng dẫn

**Ước tính**: 35 trang, 3-4 ngày

---

### ⚡ PHASE 4: Implementation (Ongoing)
1. 🟡 Hoàn thiện 3 UC còn thiếu:
   - UC010: Student Picks Project
   - UC032: Create Poll
   - UC041: Version Control Integration

2. 🟡 Frontend 30% còn lại

3. 🟡 Testing & Bug fixes

---

## 📂 SƠ ĐỒ CẤU TRÚC THƯ MỤC HOÀN CHỈNH

```
SE/
│
├── 📄 DOCUMENT_FLOW_OVERVIEW.md ← FILE NÀY (Tổng quan)
├── 📄 Template.md ← Template đồ án chính thức
├── 📄 DeBai.md ← Đề bài đồ án
│
├── 📁 Documentation/ ← ★ TÀI LIỆU CHÍNH THỨC NỘP
│   ├── 00-FrontMatter.md (10p) ✅
│   ├── 01-ProjectIntroduction.md (35p) ✅
│   ├── 02-ProjectManagementPlan.md (25p) ✅
│   │
│   ├── 📁 03-SRS/ ← Section III (65p) ✅
│   │   ├── 3.1-ProductOverview.md
│   │   ├── 3.2-UserRequirements.md
│   │   ├── 3.3-FunctionalRequirements.md
│   │   ├── 3.4-NonFunctionalRequirements.md
│   │   └── 3.5-RequirementAppendix.md
│   │
│   ├── 📁 04-SDD/ ← Section IV (85p) 🟡 60%
│   │   ├── 4.1-SystemDesign.md ✅
│   │   ├── 4.2-DatabaseDesign.md ✅
│   │   ├── 4.3-DetailedDesign.md ✅
│   │   ├── README.md (Status dashboard)
│   │   ├── REVIEW_CHECKLIST_AND_GUIDE.md
│   │   ├── QUICK_START_GUIDE.md
│   │   ├── DIAGRAM_INSERT_TEMPLATE.md
│   │   └── 📁 diagrams/
│   │       ├── 📁 guides/ (9 hướng dẫn vẽ) ✅
│   │       └── (48 PNG files) ⏳ Chưa vẽ
│   │
│   ├── 05-Testing.md (25p) ❌ Chưa tạo
│   ├── 06-UserGuides.md (35p) ❌ Chưa tạo
│   │
│   ├── 📋 Implementation Tracking:
│   ├── ROLES_AND_PERMISSIONS.md (17KB)
│   ├── USE_CASE_IMPLEMENTATION_MAP.md (35KB)
│   ├── IMPLEMENTATION_PROGRESS.md (12KB)
│   ├── IMPLEMENTATION_SUMMARY_JAN3.md (10KB)
│   ├── ACTION_PLAN.md
│   ├── NOTES-TODO.md
│   └── README.md (Hướng dẫn)
│
├── 📁 KeHoach/ ← HƯỚNG DẪN KỸ THUẬT (9 files) ✅
│   ├── 00-TongQuan.md
│   ├── 01-PhanTichThietKe.md
│   ├── 02-ThietLapBackend.md
│   ├── 03-APIBackend.md
│   ├── 04-AIRealtime.md
│   ├── 05-FrontendReact.md
│   ├── 06-CongCuCongTac.md
│   ├── 07-Testing.md
│   ├── 08-Deployment.md
│   └── 09-CauHoiCanXemXet.md
│
├── 📁 diagrams/ ← PlantUML source code
│   ├── 00-OVERVIEW.md
│   ├── 01-USE-CASE-PLANTUML.md
│   ├── 02-CLASS-GUIDE.md
│   ├── 03-SEQUENCE-GUIDE.md
│   └── 04-ARCHITECTURE-GUIDE.md
│
├── 📁 collabsphere/ ← SOURCE CODE
│   ├── 📁 backend/ (FastAPI)
│   └── 📁 frontend/ (React)
│
└── 📁 Doc/ ← Tài liệu bổ trợ cũ
    └── usecase.md
```

---

## 🎯 CHECKLIST HOÀN THIỆN ĐỒ ÁN

### Tài liệu (280 trang):
- [x] Front Matter (10p)
- [x] Section I: Project Introduction (35p)
- [x] Section II: Project Management (25p)
- [x] Section III: SRS (65p) - 5 files
- [ ] Section IV: SDD (85p) - 3 files + 48 diagrams
  - [x] Text content (85p)
  - [x] 9 diagram guides
  - [ ] 48 diagrams PNG
- [ ] Section V: Testing (25p)
- [ ] Section VI: User Guides (35p)

### Implementation (Code):
- [x] Database (28 tables) 100%
- [x] Authentication 100%
- [ ] Backend 93% (39/42 UC)
- [ ] Frontend 70%
- [ ] Real-time 75%
- [ ] Testing 25%

### Deployment:
- [ ] Backend on Render 60%
- [ ] Frontend on Vercel 60%
- [ ] Database on Neon 100%

---

## 📞 LIÊN HỆ & HỖ TRỢ

**Team**: 4Bees  
**Project Code**: SP25SE107  
**GitHub**: [Thêm link repository]  
**Demo**: [Thêm link demo]

---

**Cập nhật gần nhất**: 4/1/2026  
**Người tổng hợp**: AI Assistant  
**Version**: 1.0
