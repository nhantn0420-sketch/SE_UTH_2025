# 📄 TÀI LIỆU CHÍNH THỨC - COLLABSPHERE

**Mã dự án**: SP25SE107  
**Tên dự án**: CollabSphere - Hệ thống quản lý học tập theo dự án  
**Ngày tạo**: 20/1/2026  
**Phiên bản**: 1.0

---

## 📋 MỤC LỤC TÀI LIỆU

Tài liệu chính thức được tổ chức theo 7 sections theo chuẩn IEEE:

### **Section 0: Front Matter**
📄 [00-FrontMatter.md](00-FrontMatter.md) - 10 trang
- Trang bìa, mục lục
- Thông tin nhóm
- Danh sách viết tắt

---

### **Section I: Project Introduction**
📄 [01-ProjectIntroduction.md](01-ProjectIntroduction.md) - 35 trang
- 1.1 Overview
- 1.2 Product Background
- 1.3 Existing Systems Analysis
- 1.4 Business Opportunity
- 1.5 Software Product Vision
- 1.6 Project Scope
- 1.7 Project Stakeholders
- 1.8 Success Criteria

**Trạng thái**: ✅ 100% hoàn thành

---

### **Section II: Project Management Plan**
📄 [02-ProjectManagementPlan.md](02-ProjectManagementPlan.md) - 25 trang
- 2.1 Work Breakdown Structure (350 man-days)
- 2.2 Management Approach (Agile/Scrum)
- 2.3 Project Deliverables
- 2.4 Responsibility Assignments (RACI)
- 2.5 Communications Plan
- 2.6 Configuration Management
- 2.7 Risk Management
- 2.8 Quality Assurance

**Trạng thái**: ✅ 95% hoàn thành (cần Gantt Chart)

---

### **Section III: Software Requirements Specification**
📁 [03-SRS/](03-SRS/)

#### 3.1 Product Overview
📄 [3.1-ProductOverview.md](03-SRS/3.1-ProductOverview.md) - 15 trang
- System Context
- Module Structure
- Operating Environment
- Design Constraints

#### 3.2 User Requirements
📄 [3.2-UserRequirements.md](03-SRS/3.2-UserRequirements.md) - 35 trang
- **42 Use Cases chi tiết**
- 8 categories (Project, Class, Team, Communication, Evaluation, Resource, AI, Student Views)

#### 3.3 Functional Requirements
📄 [3.3-FunctionalRequirements.md](03-SRS/3.3-FunctionalRequirements.md) - 25 trang
- **72 Functional Features** (FE-01 ~ FE-72)
- 8 modules (Authentication, Admin, Staff, Head, Lecturer, Student, Collaboration, Notification)

#### 3.4 Non-Functional Requirements
📄 [3.4-NonFunctionalRequirements.md](03-SRS/3.4-NonFunctionalRequirements.md) - 8 trang
- **22 NFRs**: Performance, Security, Usability, Reliability, Scalability, Compatibility, Maintainability

#### 3.5 Requirement Appendix
📄 [3.5-RequirementAppendix.md](03-SRS/3.5-RequirementAppendix.md) - 5 trang
- Business Rules (BR-01~BR-30)
- Data Dictionary
- Requirement Traceability Matrix

**Tổng Section III**: 88 trang  
**Trạng thái**: ✅ 100% hoàn thành (text), 🟡 33% diagrams (cần Use Case theo role)

---

### **Section IV: Software Design Description**
📁 [04-SDD/](04-SDD/)

#### 4.1 System Design
📄 [4.1-SystemDesign.md](04-SDD/4.1-SystemDesign.md) - 20 trang
- 3-Tier Architecture
- Technology Stack (React, FastAPI, PostgreSQL, Docker)
- Deployment Architecture
- Security Architecture
- Communication Protocols

#### 4.2 Database Design
📄 [4.2-DatabaseDesign.md](04-SDD/4.2-DatabaseDesign.md) - 30 trang
- **28 Tables** documented
- ERD Conceptual & Logical Models
- 6 table groups (Users, Academic, Projects, Collaboration, Evaluation, Notification)
- Indexes & Optimization

#### 4.3 Detailed Design
📄 [4.3-DetailedDesign.md](04-SDD/4.3-DetailedDesign.md) - 35 trang
- **60+ API Endpoints** catalog
- Business Logic Flows
- RBAC Permission Matrix (5 roles × 72 features)
- Class Design (28 SQLModel classes)
- Error Handling & Performance

**Tổng Section IV**: 85 trang  
**Trạng thái**: ✅ 100% hoàn thành (text), 🟡 70% diagrams

---

### **Section V: Software Testing Documentation**
📄 ⚠️ **CHƯA CÓ** - Cần tạo `05-Testing.md` - 25 trang
- 5.1 Scope of Testing
- 5.2 Test Strategy
- 5.3 Test Plan
- 5.4 Test Cases (30-50 test cases)
- 5.5 Test Reports

**Trạng thái**: ❌ 0% - Cần viết

---

### **Section VI: Release Package & User Guides**
📄 ⚠️ **CHƯA CÓ** - Cần tạo `06-UserGuides.md` - 35 trang
- 6.1 Deliverable Package
- 6.2 Installation Guides
  - Backend setup
  - Frontend setup
  - Docker deployment
- 6.3 User Manual
  - Admin guide
  - Staff guide
  - Head guide
  - Lecturer guide (main)
  - Student guide

**Trạng thái**: ❌ 0% - Cần viết

---

## 🎨 DIAGRAMS & IMAGES

### 📁 Images Folder
Chứa **31 diagrams** đã hoàn thành:

#### ✅ Đã có (31/48 = 65%)
- **Use Case**: 2 diagrams (Overall, Summary)
- **System Design**: 4 diagrams (Architecture, Context, Module Structure, Deployment)
- **Database ERD**: 7 diagrams (Conceptual, Full ERD, 5 modules)
- **Class Diagrams**: 6 diagrams ✅ **HOÀN THÀNH 100%**
- **Sequence Diagrams**: 10 diagrams (Login, Create Project, Approve, Group, Checkpoint, Chat, Video, Review, etc.)
- **Project Management**: 1 diagram (Timeline)
- **Other**: 1 diagram (RBAC Hierarchy)

#### ⚠️ Còn thiếu (17/48 = 35%)
- 4 Use Case diagrams theo role (Admin/Staff/Head/Lecturer)
- 1 ERD Module 6 (Notifications)
- 3 Sequence diagrams (Registration, AI Chatbot, Notification)
- 1 Component Diagram
- 1 Gantt Chart
- 30 GUI Screenshots

**Xem chi tiết**: [DIAGRAMS_STATUS.md](DIAGRAMS_STATUS.md)

---

## 📊 TIẾN ĐỘ TỔNG QUAN

```
DOCUMENT COMPLETION STATUS
═════════════════════════════════════════════════════════════

📝 Text Content:    ████████████████░░░░  80% (225/280 trang)
🎨 Diagrams:        █████████████░░░░░░░  65% (31/48 diagrams)
📷 Screenshots:     ░░░░░░░░░░░░░░░░░░░░   0% (0/30 screens)
📊 Tables/Charts:   ████████████████████ 100% (đầy đủ)
🔗 Code Examples:   ████████████████░░░░  80% (có API docs)

═════════════════════════════════════════════════════════════
TỔNG ĐIỂM:          ███████████████░░░░░  ~75% (Grade B)
═════════════════════════════════════════════════════════════
```

### Checklist hoàn thành:
- [x] Section 0: Front Matter (90%)
- [x] Section I: Project Introduction (100%)
- [x] Section II: PM Plan (95%)
- [x] Section III: SRS (100% text, 33% diagrams)
- [x] Section IV: SDD (100% text, 70% diagrams)
- [ ] Section V: Testing (0%)
- [ ] Section VI: User Guides (0%)

---

## 🎯 ROADMAP 3 TUẦN

### 📅 **Tuần 1 (20-26/1)**: HIGH PRIORITY
- [ ] Hoàn thiện Front Matter (điền team info)
- [ ] Insert 31 diagrams vào đúng vị trí trong docs
- [ ] Vẽ 5 Use Case diagrams theo role
- [ ] Vẽ 5 diagrams còn thiếu (ERD, Sequence, Component, Gantt)

### 📅 **Tuần 2 (27/1-2/2)**: MEDIUM PRIORITY
- [ ] Viết Section V - Testing (8 giờ)
- [ ] Chụp 30 screenshots từ hệ thống thực tế (8 giờ)
- [ ] Insert screenshots vào tài liệu

### 📅 **Tuần 3 (3-9/2)**: LOW PRIORITY
- [ ] Viết Section VI - User Guides (12 giờ)
- [ ] Polish & Review toàn bộ tài liệu (4 giờ)
- [ ] Final check & Submit

**Mục tiêu**: Đạt **95%+ (Grade A)** trước 10/2/2026

---

## 📂 CẤU TRÚC THƯ MỤC

```
MainDocument/
├── README.md                           (file này)
├── 00-FrontMatter.md                   ✅ Section 0
├── 01-ProjectIntroduction.md           ✅ Section I
├── 02-ProjectManagementPlan.md         ✅ Section II
├── 03-SRS/                             ✅ Section III
│   ├── 3.1-ProductOverview.md
│   ├── 3.2-UserRequirements.md
│   ├── 3.3-FunctionalRequirements.md
│   ├── 3.4-NonFunctionalRequirements.md
│   └── 3.5-RequirementAppendix.md
├── 04-SDD/                             ✅ Section IV
│   ├── 4.1-SystemDesign.md
│   ├── 4.2-DatabaseDesign.md
│   └── 4.3-DetailedDesign.md
├── 05-Testing.md                       ⚠️ TBD
├── 06-UserGuides.md                    ⚠️ TBD
└── Images/                             🎨 31 diagrams
    ├── UseCaseDiagramVer3.drawio.png
    ├── SystemArchitecture.png
    ├── EntityRelationshipDiagram.png
    ├── *-ClassDiagram.png (6 files)
    ├── *Flow.png (10 sequence files)
    └── ... (31 files total)
```

---

## 🔗 LIÊN KẾT NHANH

- 📋 **Checklist đầy đủ**: [DOCUMENT_AUDIT_REPORT.md](../DOCUMENT_AUDIT_REPORT.md)
- 🎨 **Diagram guides**: [04-SDD/diagrams/guides/](04-SDD/diagrams/guides/)
- 📝 **Notes & TODOs**: [../Documentation/NOTES-TODO.md](../Documentation/NOTES-TODO.md)
- 🚀 **Project repo**: [SE_UTH_2025](https://github.com/nhantn0420-sketch/SE_UTH_2025)

---

## 💡 HƯỚNG DẪN SỬ DỤNG

### Để đọc tài liệu theo thứ tự:
1. Bắt đầu từ `00-FrontMatter.md` để có overview
2. Đọc tuần tự từ Section I → II → III → IV
3. Mỗi section có mục lục chi tiết ở đầu file

### Để chỉnh sửa:
1. **Edit trực tiếp** các file .md trong thư mục này
2. **Diagrams**: Chỉnh sửa file gốc trong `Images/`, sau đó update reference
3. **New sections**: Tạo file mới với naming convention `0X-SectionName.md`

### Để export sang Word:
1. Sử dụng Pandoc hoặc VS Code extension "Markdown PDF"
2. Hoặc copy/paste từng section vào Word template
3. Insert diagrams từ folder `Images/`

### Để review:
- Sử dụng VS Code Preview (Ctrl+Shift+V)
- Hoặc mở diagram-viewer.html trong browser để xem tất cả hình

---

**Liên hệ**: Team CollabSphere  
**Email**: [Điền email nhóm]  
**Version**: 1.0.0 - 20/1/2026
