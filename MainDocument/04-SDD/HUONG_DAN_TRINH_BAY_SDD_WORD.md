# HƯỚNG DẪN TRÌNH BÀY SDD TRÊN WORD - ROADMAP

**Dự án**: CollabSphere - Software Design Description  
**Ngày**: January 13, 2026  
**Mục đích**: Hướng dẫn từng bước trình bày tài liệu SDD lên Word

---

## 📊 PHÂN TÍCH CÁC FILE SDD

### File có sẵn trong `Documentation/04-SDD/`

| # | File | Lines | Pages | Nội dung chính | Độ ưu tiên |
|---|------|-------|-------|----------------|------------|
| 1 | **4.1-SystemDesign.md** | ~862 | 20-25 | Architecture, Tech Stack, Components, Deployment | ⭐⭐⭐ **BẮT ĐẦU ĐÂY** |
| 2 | **4.2-DatabaseDesign.md** | ~1465 | 30-35 | ERD, 28 Tables, Indexes, Optimization | ⭐⭐ Sau đó |
| 3 | **4.3-DetailedDesign.md** | ~3203 | 35-40 | 60+ API Endpoints, Security, Performance | ⭐ Cuối cùng |
| | **TỔNG CỘNG** | **~5530** | **85-100** | | |

### File hỗ trợ

- `diagrams/` - Chứa tất cả diagrams (PlantUML PNG exports)
- `QUICK_START_GUIDE.md` - Tổng quan nhanh về SDD
- `REVIEW_CHECKLIST_AND_GUIDE.md` - Checklist review chất lượng
- `SECTION_IV_COMPLETION_REPORT.md` - Báo cáo hoàn thành section IV

---

## 🎯 ROADMAP TRÌNH BÀY (6 BƯỚC)

### **BƯỚC 1: Setup Document Foundation** ⏱️ 30 phút

#### Công việc:
1. Tạo file Word mới: `SECTION_IV_SDD_CollabSphere.docx`
2. Setup page formatting:
   - A4, margins (Top 2.5, Bottom 2.5, Left 3, Right 2)
   - Font: Times New Roman 13pt
   - Line spacing: 1.15
3. Tạo Cover Page
4. Tạo Document Information table
5. Insert Table of Contents (placeholder)

#### Template:

```
SECTION IV
SOFTWARE DESIGN DESCRIPTION

CollabSphere
Project-Based Learning Management System

Mã dự án: SP25SE107
Version: 1.0
Date: January 13, 2026

[Team Information]
```

---

### **BƯỚC 2: Trình bày 4.1 - System Design** ⏱️ 2-3 giờ

#### File nguồn: `4.1-SystemDesign.md` (862 lines, ~20 pages)

#### Sections cần copy:

| Section | Nội dung | Diagrams | Ước tính trang |
|---------|----------|----------|----------------|
| 4.1.1 | Architecture Overview | Figure 4.1 (System Architecture) | 3-4 |
| 4.1.2 | Technology Stack | Tech tables | 3-4 |
| 4.1.3 | Component Architecture | Component diagrams | 4-5 |
| 4.1.4 | Deployment Architecture | Docker Compose diagram | 3 |
| 4.1.5 | Communication Protocols | REST/WebSocket/WebRTC | 2-3 |
| 4.1.6 | Security Architecture | JWT/RBAC diagrams | 3 |
| 4.1.7 | Scalability & Monitoring | Performance metrics | 2 |

#### Checklist:
- [ ] Copy text từ markdown → Word
- [ ] Export diagrams từ `diagrams/` folder (PNG 300 DPI)
- [ ] Insert diagrams với caption
- [ ] Format tables (Grid Table 4 style)
- [ ] Add cross-references
- [ ] Review formatting consistency

#### Tips:
- **Diagram placement**: Center-align, In Line with Text
- **Captions**: `Figure 4.1.1: System Architecture Diagram`
- **Tables**: Use "Table 4.1.1", "Table 4.1.2"
- **Code blocks**: Consolas 11pt, gray background

---

### **BƯỚC 3: Trình bày 4.2 - Database Design** ⏱️ 3-4 giờ

#### File nguồn: `4.2-DatabaseDesign.md` (1465 lines, ~30 pages)

#### Sections cần copy:

| Section | Nội dung | Diagrams | Ước tính trang |
|---------|----------|----------|----------------|
| 4.2.1 | Database Overview | Database structure tree | 2 |
| 4.2.2 | ERD Conceptual Model | ERD Level 1 (6 modules) | 2 |
| 4.2.3 | ERD Logical Model | ERD Level 2 (relationships) | 3 |
| 4.2.4 | ERD Physical Model | **28 Tables detailed specs** | 15-18 |
| 4.2.5 | Database Optimization | Indexes, query optimization | 3 |
| 4.2.6 | Backup & Recovery | Backup strategy | 2 |
| 4.2.7 | Database Migrations | Alembic workflow | 2 |

#### Checklist Physical Model (4.2.4):
28 tables cần format theo template:

```
**Table 4.2.X: [Table Name]**

Description: [Purpose of table]

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| id | INTEGER | PRIMARY KEY | AUTO | ... |
| ... | ... | ... | ... | ... |

**Indexes:**
- idx_tablename_column ON column_name

**Foreign Keys:**
- fk_parent_table → parent_table(id)

**Business Rules:**
- [Rule 1]
- [Rule 2]
```

#### Các nhóm bảng (28 tables):

**Group 1: Users & Authentication (1 table)**
- [ ] users

**Group 2: Academic Management (4 tables)**
- [ ] subjects
- [ ] curricula  
- [ ] classes
- [ ] class_members

**Group 3: Project & Group (9 tables)**
- [ ] projects
- [ ] project_milestones
- [ ] class_projects
- [ ] groups
- [ ] group_members
- [ ] group_milestones
- [ ] checkpoints
- [ ] tasks
- [ ] milestone_questions

**Group 4: Collaboration (7 tables)**
- [ ] meetings
- [ ] meeting_participants
- [ ] chat_messages
- [ ] resources
- [ ] whiteboard_sessions
- [ ] whiteboard_objects
- [ ] workspace_cards

**Group 5: Evaluation (6 tables)**
- [ ] evaluations
- [ ] evaluation_criteria
- [ ] evaluation_scores
- [ ] peer_reviews
- [ ] comments
- [ ] contribution_logs

**Group 6: Notifications (1 table)**
- [ ] notifications

#### Tips:
- **Large ERD**: Insert as full-page landscape
- **Table specs**: Use consistent formatting
- **Indexes**: Highlight in yellow
- **Foreign keys**: Use → symbol
- **Cross-references**: Link to related tables

---

### **BƯỚC 4: Trình bày 4.3 - Detailed Design** ⏱️ 4-5 giờ

#### File nguồn: `4.3-DetailedDesign.md` (3203 lines, ~35 pages)

#### Sections cần copy:

| Section | Nội dung | Ước tính trang |
|---------|----------|----------------|
| 4.3.1 | API Design Overview | 3 |
| 4.3.2 | **12 API Modules** (60+ endpoints) | 18-20 |
| 4.3.3 | Business Logic Flows | 4 |
| 4.3.4 | Class Diagrams | 3 |
| 4.3.5 | Sequence Diagrams | 4 |
| 4.3.6 | Security Design | 3 |
| 4.3.7 | Error Handling | 2 |
| 4.3.8 | Performance Optimization | 2 |
| 4.3.9 | Deployment Configuration | 2 |

#### 12 API Modules cần document:

**Authentication & Users (2 modules)**
- [ ] 1. Authentication API (5 endpoints)
- [ ] 2. Users API (8 endpoints)

**Academic Management (3 modules)**
- [ ] 3. Subjects API (6 endpoints)
- [ ] 4. Classes API (10 endpoints)
- [ ] 5. Curricula API (4 endpoints)

**Project & Group (3 modules)**
- [ ] 6. Projects API (12 endpoints)
- [ ] 7. Groups API (10 endpoints)
- [ ] 8. Tasks API (6 endpoints)

**Collaboration (3 modules)**
- [ ] 9. Chat API (5 endpoints)
- [ ] 10. Meetings API (6 endpoints)
- [ ] 11. Resources API (7 endpoints)

**Evaluation & AI (2 modules)**
- [ ] 12. Evaluations API (8 endpoints)
- [ ] 13. AI Assistant API (4 endpoints)

#### API Endpoint Template:

```
**Endpoint: [METHOD] /api/v1/[resource]**

Description: [What this endpoint does]

Authentication: Required / Optional
Authorization: [Roles allowed]

**Request:**
```json
{
  "field": "type"
}
```

**Response (200 OK):**
```json
{
  "data": { ... }
}
```

**Error Responses:**
- 400 Bad Request: Invalid input
- 401 Unauthorized: No token
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
```

#### Tips:
- **API grouping**: Group by module
- **Code formatting**: Use syntax highlighting
- **Request/Response**: Use collapsible sections if needed
- **Error codes**: Consistent format
- **Sequence diagrams**: Use PlantUML exports

---

### **BƯỚC 5: Insert Diagrams & Finalize** ⏱️ 2-3 giờ

#### Diagrams cần insert (từ `diagrams/` folder):

**System Design (4.1)**
- [ ] Figure 4.1.1: System Architecture Diagram
- [ ] Figure 4.1.2: Component Architecture
- [ ] Figure 4.1.3: Deployment Architecture (Docker)
- [ ] Figure 4.1.4: Security Architecture

**Database Design (4.2)**
- [ ] Figure 4.2.1: ERD Conceptual Model
- [ ] Figure 4.2.2: ERD Logical Model
- [ ] Figure 4.2.3: ERD Physical Model (Full)
- [ ] Figure 4.2.4: Database Optimization Strategy

**Detailed Design (4.3)**
- [ ] Figure 4.3.1: API Architecture
- [ ] Figure 4.3.2: Authentication Flow (Sequence)
- [ ] Figure 4.3.3: Project Approval Flow (Sequence)
- [ ] Figure 4.3.4: Peer Review Flow (Sequence)
- [ ] Figure 4.3.5: User Management Class Diagram
- [ ] Figure 4.3.6: Project Module Class Diagram
- [ ] Figure 4.3.7: Group Module Class Diagram

#### Checklist mỗi diagram:
- [ ] Export PNG 300 DPI
- [ ] Insert In Line with Text
- [ ] Center align
- [ ] Add caption (Figure X.X.X: Description)
- [ ] Auto-number figures
- [ ] Cross-reference trong text

---

### **BƯỚC 6: Review & Polish** ⏱️ 1-2 giờ

#### Checklist Final Review:

**Formatting**
- [ ] Consistent heading styles (H1, H2, H3)
- [ ] All tables formatted (Grid Table 4)
- [ ] All code blocks formatted (Consolas, gray bg)
- [ ] Page numbers correct
- [ ] Header/Footer consistent

**Content**
- [ ] Table of Contents updated
- [ ] All figures numbered correctly
- [ ] All tables numbered correctly
- [ ] Cross-references working
- [ ] No orphan headings

**Diagrams**
- [ ] All diagrams inserted
- [ ] All captions present
- [ ] High resolution (300 DPI)
- [ ] Proper alignment

**Technical**
- [ ] Spell check completed
- [ ] Grammar check
- [ ] Technical terms consistent
- [ ] Acronyms defined on first use

**Export**
- [ ] Save as .docx
- [ ] Export as PDF (Standard quality)
- [ ] File size check (<50MB)
- [ ] PDF bookmarks working

---

## 📅 TIMELINE ĐỀ XUẤT

### Lịch trình 3 ngày (intensive):

**Ngày 1: Foundation + System Design**
- Morning (3h): Setup document + 4.1 Section
- Afternoon (3h): Complete 4.1, insert diagrams
- Evening (2h): Review 4.1

**Ngày 2: Database Design**
- Morning (3h): 4.2.1 - 4.2.3 (Overview + ERD)
- Afternoon (4h): 4.2.4 (28 tables detailed specs)
- Evening (1h): 4.2.5 - 4.2.7 (Optimization + Backup)

**Ngày 3: Detailed Design + Finalize**
- Morning (3h): 4.3.1 - 4.3.2 (API Overview + Modules 1-6)
- Afternoon (3h): 4.3.2 (Modules 7-13) + 4.3.3-4.3.9
- Evening (2h): Insert remaining diagrams + Final review

---

## 🎯 THỨ TỰ THỰC HIỆN (RECOMMEND)

### **Ưu tiên 1: BẮT ĐẦU VỚI 4.1 - System Design**

**Lý do:**
- ✅ Tổng quan nhất, dễ hiểu context
- ✅ Ít phức tạp hơn (20 pages)
- ✅ Diagrams đẹp, ấn tượng
- ✅ Build foundation cho các section sau

**Công việc:**
1. Copy nội dung từ `4.1-SystemDesign.md`
2. Insert 4-5 diagrams chính
3. Format tables về tech stack
4. Review & polish

**Output**: 20-25 pages hoàn chỉnh

---

### **Ưu tiên 2: Tiếp theo 4.2 - Database Design**

**Lý do:**
- ✅ Database là core foundation
- ✅ ERD diagram rất quan trọng
- ✅ 28 tables cần format cẩn thận
- ✅ Logic tiếp nối từ System Design

**Công việc:**
1. Copy overview và ERD sections
2. Insert ERD diagrams (3 levels)
3. Format 28 tables specs (mất nhiều thời gian nhất)
4. Add indexes và optimization

**Output**: 30-35 pages hoàn chỉnh

---

### **Ưu tiên 3: Cuối cùng 4.3 - Detailed Design**

**Lý do:**
- ✅ Phức tạp nhất (60+ endpoints)
- ✅ Cần reference 4.1 và 4.2
- ✅ Nhiều technical details
- ✅ Sequence diagrams phức tạp

**Công việc:**
1. Copy API overview
2. Document 13 API modules
3. Add business logic flows
4. Insert sequence diagrams
5. Security và performance sections

**Output**: 35-40 pages hoàn chỉnh

---

## 🛠️ TOOLS CẦN THIẾT

### Software:
- [ ] Microsoft Word 2016+ (hoặc Office 365)
- [ ] PlantUML (để export diagrams)
- [ ] PDF Viewer
- [ ] Text Editor (VSCode) để đọc markdown

### Word Add-ins (optional):
- [ ] Grammarly (grammar check)
- [ ] MathType (nếu có công thức)

### Files cần prepare:
- [ ] All markdown files (4.1, 4.2, 4.3)
- [ ] All diagram PNGs (từ diagrams/ folder)
- [ ] Logo/Cover images
- [ ] Template styles (nếu có)

---

## 🔍 TIPS QUAN TRỌNG

### 1. **Markdown → Word Conversion**
```
DON'T: Copy paste trực tiếp (sẽ mất format)
DO: Copy từng section, format manual
```

### 2. **Diagram Quality**
```
✅ Export PNG 300 DPI minimum
✅ White background, không transparent
✅ Font size đủ lớn để đọc khi print
❌ Không sử dụng screenshot
```

### 3. **Table Formatting**
```
✅ Use Table Styles (Grid Table 4 - Accent 1)
✅ Header row bold + colored
✅ Alternate row shading
✅ Auto-fit columns
```

### 4. **Code Blocks**
```
Font: Consolas 11pt
Background: RGB(245, 245, 245)
Border: 1pt solid gray
Margin: 0.3cm all sides
```

### 5. **Page Breaks**
```
✅ New section = new page
✅ Large table/diagram = own page
❌ Avoid orphan headings
❌ Avoid widows/orphans in paragraphs
```

---

## ✅ SUCCESS CRITERIA

Document được coi là hoàn thành khi:

- [ ] **85-100 pages** đầy đủ content
- [ ] **20+ diagrams** inserted với caption
- [ ] **50+ tables** formatted consistently
- [ ] **Table of Contents** auto-generated, working
- [ ] **All cross-references** linked properly
- [ ] **PDF export** < 50MB, bookmarks working
- [ ] **No formatting errors** (spell check, grammar)
- [ ] **Professional appearance** (consistent styles)

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Check `REVIEW_CHECKLIST_AND_GUIDE.md` cho troubleshooting
2. Reference `QUICK_START_GUIDE.md` cho overview
3. Hỏi team leader hoặc supervisor

---

**Good luck với việc trình bày SDD!** 🚀

**Estimated Total Time**: 12-15 hours (distributed over 3 days)

---

*Document created: January 13, 2026*  
*Version: 1.0*
