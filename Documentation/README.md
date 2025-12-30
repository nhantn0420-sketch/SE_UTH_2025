# CollabSphere - Tài Liệu Đồ Án Tốt Nghiệp

**Dự án**: CollabSphere - Hệ thống hỗ trợ học tập dựa trên dự án  
**Mã dự án**: SP25SE107  
**Học kỳ**: Spring 2025

---

## 📚 CẤU TRÚC TÀI LIỆU

Tài liệu đồ án được chia thành các file riêng biệt để dễ quản lý và chỉnh sửa:

### ✅ **Đã hoàn thành** (Ready for review)

| File | Mô tả | Trang | Trạng thái |
|------|-------|-------|-----------|
| [`00-FrontMatter.md`](00-FrontMatter.md) | Trang bìa, thành viên, lời cảm ơn, định nghĩa | ~10 | ✅ **Cần cập nhật thông tin team** |
| [`01-ProjectIntroduction.md`](01-ProjectIntroduction.md) | Giới thiệu dự án, 72 features, phạm vi, giới hạn | ~35 | ✅ **Hoàn chỉnh** |
| [`02-ProjectManagementPlan.md`](02-ProjectManagementPlan.md) | WBS, RACI matrix, timeline, communication plan | ~25 | ✅ **Hoàn chỉnh** |

### ⏳ **Cần hoàn thành** (To be created)

| File | Mô tả | Ước tính | Trạng thái |
|------|-------|----------|-----------|
| `03-SRS.md` | Software Requirements Specification chi tiết | ~40 trang | ⏳ Cần viết |
| `04-SDD.md` | Software Design Description (architecture, database) | ~45 trang | ⏳ Cần viết |
| `05-Testing.md` | Test plan, test cases, test reports | ~25 trang | ⏳ Cần viết |
| `06-UserGuides.md` | Hướng dẫn sử dụng cho 5 roles | ~35 trang | ⏳ Cần viết |

### 📋 **Hỗ trợ**

| File | Mô tả | Mục đích |
|------|-------|----------|
| [`NOTES-TODO.md`](NOTES-TODO.md) | Danh sách công việc cần làm | 📌 **ĐỌC ĐẦU TIÊN** |
| `README.md` | File này - hướng dẫn sử dụng | Tổng quan |

---

## 🎯 HƯỚNG DẪN SỬ DỤNG

### Bước 1: Đọc NOTES-TODO.md

File [`NOTES-TODO.md`](NOTES-TODO.md) chứa:
- ✅ Danh sách 22 diagrams cần vẽ (Use Case, Class, Sequence, ERD, Architecture)
- ✅ 20+ screenshots cần chụp từ ứng dụng
- ✅ Thông tin cần bổ sung (team info, supervisor)
- ✅ Checklist hoàn thành tài liệu
- ✅ Timeline đề xuất

### Bước 2: Cập nhật thông tin cá nhân

**File cần cập nhật**: [`00-FrontMatter.md`](00-FrontMatter.md)

Thay thế các placeholder:
- `[TÊN THÀNH VIÊN 1-4]` → Tên thật
- `[email1@example.com]` → Email FPT
- `[0123456789]` → Số điện thoại
- `[TÊN GIẢNG VIÊN HƯỚNG DẪN]` → Tên supervisor
- `[Tên nhóm]` → Tên nhóm nếu có

### Bước 3: Vẽ diagrams (QUAN TRỌNG NHẤT)

**Tạo folder**: `Documentation/diagrams/`

**Cần vẽ**:
- 5 Use Case Diagrams (cho 5 roles)
- 6 Class Diagrams (User, Academic, Project, Group, Evaluation, Communication)
- 10 Sequence Diagrams (các flows quan trọng)
- 1 ERD (Entity Relationship Diagram)
- 1 Architecture Diagram
- 4 Activity Diagrams (optional)

**Công cụ đề xuất**:
- **Draw.io**: https://app.diagrams.net/ (miễn phí, dễ dùng)
- **Lucidchart**: https://www.lucidchart.com/ (có free tier)
- **PlantUML**: Code-based, version control friendly
- **Visual Paradigm**: Professional (có student license)

**Chi tiết**: Xem section II trong [`NOTES-TODO.md`](NOTES-TODO.md)

### Bước 4: Chụp screenshots

**Yêu cầu**:
- Chạy application (backend + frontend)
- Chụp màn hình cho từng role: Admin, Staff, Head, Lecturer, Student
- Chụp các tính năng: Chat, Video call, Whiteboard, Task board

**Lưu vào**: `Documentation/screenshots/`

**Danh sách**: Xem section III trong [`NOTES-TODO.md`](NOTES-TODO.md)

### Bước 5: Hoàn thiện các file còn lại

Sử dụng template và nội dung đã có trong:
- [`collabsphere/backend/app/models/`](../collabsphere/backend/app/models/) → Để viết database schema
- [`collabsphere/backend/app/routers/`](../collabsphere/backend/app/routers/) → Để viết API documentation
- [`collabsphere/frontend/src/pages/`](../collabsphere/frontend/src/pages/) → Để viết user guides
- [`KeHoach/07-Testing.md`](../KeHoach/07-Testing.md) → Để viết test documentation

### Bước 6: Ghép thành file PDF cuối cùng

**Option 1: Sử dụng Markdown to PDF converter**
```bash
# Cài đặt markdown-pdf
npm install -g markdown-pdf

# Convert từng file
markdown-pdf 00-FrontMatter.md -o 00-FrontMatter.pdf
markdown-pdf 01-ProjectIntroduction.md -o 01-ProjectIntroduction.pdf
# ... repeat cho tất cả files

# Hoặc sử dụng pandoc (recommended)
pandoc 00-FrontMatter.md 01-ProjectIntroduction.md 02-ProjectManagementPlan.md \
       03-SRS.md 04-SDD.md 05-Testing.md 06-UserGuides.md \
       -o CollabSphere_Final_Document.pdf \
       --toc --toc-depth=3 \
       -V geometry:margin=1in
```

**Option 2: Copy vào Google Docs/Word**
1. Copy nội dung từng file Markdown
2. Paste vào Google Docs
3. Format lại (headings, tables, images)
4. Insert diagrams và screenshots
5. Add page numbers
6. Export as PDF

**Option 3: Sử dụng LaTeX (professional)**
- Convert Markdown → LaTeX với pandoc
- Compile với pdflatex
- Best quality nhưng cần học LaTeX

---

## 📊 TỔNG QUAN NỘI DUNG

### I. Project Introduction (35 pages)
- ✅ Tổng quan dự án
- ✅ Bối cảnh và vấn đề (PBL fragmentation)
- ✅ Phân tích hệ thống hiện có (MS Teams, Google Classroom, Slack...)
- ✅ Cơ hội kinh doanh và ROI
- ✅ Tầm nhìn sản phẩm
- ✅ **72 Features chi tiết** (FE-01 đến FE-72)
- ✅ **15 Limitations** (LI-01 đến LI-15)

### II. Project Management Plan (25 pages)
- ✅ Work Breakdown Structure với 350 man-days
- ✅ Agile Scrum methodology
- ✅ RACI Matrix
- ✅ Communication Plan (daily standup, sprint review...)
- ✅ Version control strategy (Git workflow)
- ✅ Timeline Gantt chart

### III. Software Requirements Specification (40 pages)
- ⏳ Chi tiết 72 Functional Requirements
- ⏳ Use Case descriptions
- ⏳ Non-Functional Requirements (Performance, Security...)
- ⏳ Business Rules (BR-01, BR-02, ...)

### IV. Software Design Description (45 pages)
- ⏳ Architecture design (3-tier)
- ⏳ Database schema (15+ tables)
- ⏳ API documentation (50+ endpoints)
- ⏳ Class diagrams
- ⏳ Sequence diagrams
- ⏳ Component design

### V. Testing Documentation (25 pages)
- ⏳ Test strategy (Unit, Integration, System, UAT)
- ⏳ 100+ Test cases
- ⏳ Test reports với screenshots
- ⏳ Bug reports
- ⏳ Code coverage reports

### VI. User Guides (35 pages)
- ⏳ Hướng dẫn Admin
- ⏳ Hướng dẫn Staff
- ⏳ Hướng dẫn Head
- ⏳ Hướng dẫn Lecturer
- ⏳ Hướng dẫn Student
- ⏳ Troubleshooting

**Tổng ước tính**: ~200 pages

---

## 🔧 CÔNG CỤ CẦN THIẾT

### Drawing Tools
- [Draw.io](https://app.diagrams.net/) - Vẽ diagrams
- [dbdiagram.io](https://dbdiagram.io/) - Vẽ ERD
- [Lucidchart](https://www.lucidchart.com/) - Professional diagrams

### Documentation Tools
- VS Code với Markdown Preview
- [Grammarly](https://www.grammarly.com/) - Grammar check
- [Hemingway Editor](http://www.hemingwayapp.com/) - Readability check

### Screenshot Tools
- Windows Snipping Tool (Win + Shift + S)
- Lightshot (https://app.prntscr.com/)
- ShareX (https://getsharex.com/)

### PDF Conversion
- [Pandoc](https://pandoc.org/) - Universal document converter
- [markdown-pdf](https://www.npmjs.com/package/markdown-pdf)
- Google Docs - Online alternative

---

## 📅 TIMELINE ĐỀ XUẤT

| Tuần | Nhiệm vụ | Output |
|------|----------|--------|
| **Tuần 1** | Vẽ 22 diagrams | 22 PNG/SVG files |
| **Tuần 2** | Viết SRS + SDD | 2 MD files (~85 pages) |
| **Tuần 3** | Testing + Screenshots | Test reports + 20 images |
| **Tuần 4** | User guides + Review | User manual + Final review |
| **Tuần 5** | Ghép PDF + Submit | Final PDF (200 pages) |

---

## ✅ CHECKLIST HOÀN THÀNH

### Phase 1: Foundation ✅
- [x] Create folder structure
- [x] Front Matter template
- [x] Project Introduction (full)
- [x] Project Management Plan (full)
- [x] NOTES-TODO with detailed instructions

### Phase 2: Diagrams (CRITICAL) ⏳
- [ ] 5 Use Case Diagrams
- [ ] 6 Class Diagrams
- [ ] 10 Sequence Diagrams
- [ ] 1 ERD Diagram
- [ ] 1 Architecture Diagram
- [ ] 4 Activity Diagrams

### Phase 3: Content Completion ⏳
- [ ] SRS with 72 feature descriptions
- [ ] SDD with database schema + API docs
- [ ] Testing documentation with test cases
- [ ] User guides for 5 roles

### Phase 4: Evidence ⏳
- [ ] 20+ screenshots from running app
- [ ] Demo video (10 minutes)
- [ ] API documentation from Swagger

### Phase 5: Finalization ⏳
- [ ] Update team information in Front Matter
- [ ] Spell check all files
- [ ] Format consistency check
- [ ] Generate final PDF
- [ ] Review with supervisor

---

## 🆘 HỖ TRỢ VÀ LIÊN HỆ

### Nếu gặp vấn đề:

1. **Không biết vẽ diagram như thế nào?**
   - Xem chi tiết trong [`NOTES-TODO.md`](NOTES-TODO.md) section II
   - Tham khảo examples trong `KeHoach/01-PhanTichThietKe.md`

2. **Cần ví dụ cụ thể về Use Case?**
   - Xem format trong file 01-ProjectIntroduction.md
   - Follow template: Actor → Goal → Steps

3. **Không biết viết API documentation?**
   - Export từ Swagger UI: http://localhost:8000/docs
   - Click "Download" → Save as JSON
   - Convert JSON → Markdown

4. **Cần help với database schema?**
   - Xem `collabsphere/backend/app/models/`
   - Mỗi file model = 1 table
   - Extract fields, relationships

---

## 📞 CONTACT

**Team Leader**: [Tên] - [Email]  
**Supervisor**: [Tên Giảng viên] - [Email]

---

## 📄 LICENSE

Tài liệu này thuộc về nhóm sinh viên thực hiện đồ án CollabSphere.  
© 2025 FPT University. All rights reserved.

---

**Last Updated**: 30/12/2025  
**Version**: 1.0  
**Status**: In Progress

---
