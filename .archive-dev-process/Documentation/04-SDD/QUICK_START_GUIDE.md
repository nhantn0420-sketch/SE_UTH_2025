# HƯỚNG DẪN NHANH - HOÀN THIỆN SECTION IV

**Thời gian ước tính**: 15 giờ (2 ngày)  
**Kỹ năng yêu cầu**: Cơ bản về vẽ diagrams

---

## ✅ ĐÃ HOÀN THÀNH (Text Documentation)

### Có sẵn 100%:
1. ✅ **04-SDD.md** - Master file với TOC
2. ✅ **4.1-SystemDesign.md** - 740 dòng về Architecture
3. ✅ **4.2-DatabaseDesign.md** - 1,178 dòng, 28 tables đầy đủ
4. ✅ **4.3-DetailedDesign.md** - 2,191 dòng, 60+ API endpoints

**Tổng**: ~85 trang documentation chất lượng cao

---

## ❌ CẦN BỔ SUNG (Visual Diagrams)

Template yêu cầu diagrams hình ảnh, hiện chỉ có TEXT/ASCII ART

### Cần tạo 48 diagrams:

| Loại | Số lượng | Ưu tiên |
|------|----------|---------|
| System Architecture | 1 | 🔴 Cao |
| Database ERD | 1 | 🔴 Cao |
| Class Diagrams | 6 | 🔴 Cao |
| Sequence Diagrams | 10 | 🟡 Trung bình |
| GUI Screenshots | 30 | 🟢 Thấp (có thể mockup) |

---

## 🚀 BẮT ĐẦU NHANH (1.5 giờ → 17 diagrams)

### BƯỚC 1: Class Diagrams (30 phút)

**ĐÃ CÓ SẴN PlantUML CODE!**

```powershell
# Mở file này:
C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\02-CLASS-GUIDE.md
```

**Cách làm**:
1. Vào: http://www.plantuml.com/plantuml/
2. Copy code từ `02-CLASS-GUIDE.md` (tìm `@startuml`)
3. Paste → Tự động render
4. Click "PNG" button → Download
5. Lưu thành: `4.3-class-user.png`, `4.3-class-academic.png`, etc.

**Lặp lại 6 lần** → ✅ XONG 6 diagrams!

---

### BƯỚC 2: Sequence Diagrams (30 phút)

**ĐÃ CÓ SẴN PlantUML CODE!**

```powershell
# Mở file này:
C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\03-SEQUENCE-GUIDE.md
```

**Cách làm**: Giống bước 1
- Copy PlantUML code → Paste vào website → Download PNG
- Lặp lại 10 lần

✅ XONG 10 diagrams!

---

### BƯỚC 3: Database ERD (30 phút)

**ĐÃ CÓ SẴN PlantUML CODE!**

```powershell
# Mở file này:
C:\Users\LENOVO\Desktop\SE\ERD_DATABASE_DESIGN_COLLABSPHERE.md
```

**Cách làm**:
1. Vào: http://www.plantuml.com/plantuml/
2. Copy PlantUML code (911 dòng)
3. Paste → Generate
4. Zoom out để thấy cả 28 tables
5. Download PNG (size lớn)

✅ XONG 1 diagram ERD đầy đủ!

---

## ⏱️ KẾT QUẢ SAU 1.5 GIỜ:

✅ 6 Class Diagrams  
✅ 10 Sequence Diagrams  
✅ 1 ERD Diagram  
**= 17/48 diagrams (35% done!)**

---

## 📝 CÒN LẠI CẦN LÀM

### 1. System Architecture Diagram (2 giờ)

**Công cụ**: Draw.io (https://app.diagrams.net/)

**Nội dung vẽ**:
- Client Layer (React Browser)
- Nginx (Web Server)
- FastAPI (Application Server)
- PostgreSQL (Database)
- External: AWS Bedrock, Cloudinary

**Tham khảo**:
- File: `4.1-SystemDesign.md` (dòng 20-80)
- Diagram guide: `Documentation/diagrams/04-ARCHITECTURE-GUIDE.md`

**Lưu thành**: `diagrams/4.1-system-architecture.png`

---

### 2. GUI Screenshots (4-6 giờ)

**Option A: Chụp từ app đang chạy** (RECOMMENDED)

```powershell
cd C:\Users\LENOVO\Desktop\SE\collabsphere
docker-compose up
# Truy cập: http://localhost:3000
```

**Cần chụp 30 màn hình**:
- Login/Register (3 screens)
- Admin Dashboard (3 screens)
- Staff Management (2 screens)
- Head Approval (3 screens)
- Lecturer Project (5 screens)
- Student Workspace (14 screens)

**Cách chụp**:
- Windows: `Win + Shift + S`
- Crop về 1920x1080
- Lưu vào: `diagrams/gui/4.3-gui-01-login.png`, etc.

**Option B: Mockup với Figma** (nếu app chưa xong)
- Vào: https://www.figma.com/
- Dùng Material Design templates
- Vẽ wireframes 30 screens

---

### 3. Chèn Diagrams vào Markdown (1 giờ)

**Cần chỉnh sửa 3 files**:

#### File: `4.1-SystemDesign.md`
Thêm sau section 4.1.1:
```markdown
### Architecture Diagram
![System Architecture](diagrams/4.1-system-architecture.png)
*Figure 4.1: CollabSphere 3-Tier System Architecture*
```

#### File: `4.2-DatabaseDesign.md`
Thêm sau section 4.2.3:
```markdown
### Complete ERD
![Database ERD](diagrams/4.2-erd-full.png)
*Figure 4.2: Complete Entity Relationship Diagram (28 Tables)*
```

#### File: `4.3-DetailedDesign.md`
Thêm sau sections 4.3.5 và 4.3.6:
```markdown
### Class Diagrams
![User Classes](diagrams/4.3-class-user.png)
*Figure 4.3.1: User and Authentication Classes*
[... 5 diagrams khác ...]

### Sequence Diagrams
![Auth Sequence](diagrams/4.3-seq-authentication.png)
*Figure 4.3.7: Authentication Flow*
[... 9 diagrams khác ...]
```

Tạo section mới 4.3.13 cho GUI:
```markdown
## 4.3.13. GUI DESIGN

### User Interface Screenshots
![Login](diagrams/gui/4.3-gui-01-login.png)
*Figure 4.3.20: Login Screen*
[... 29 screenshots khác ...]
```

---

## 📊 TIMELINE ĐỀ XUẤT

### Ngày 1 (8 giờ):
- **09:00-10:30**: Generate 17 diagrams với PlantUML (EASY!)
- **10:30-12:30**: Vẽ System Architecture (Draw.io)
- **13:30-15:30**: Setup app và chụp 15 screenshots đầu
- **15:30-17:30**: Chụp 15 screenshots còn lại

**End of Day 1**: 33/48 diagrams done (69%)

### Ngày 2 (7 giờ):
- **09:00-10:00**: Chèn diagrams vào Markdown files
- **10:00-11:00**: Review tất cả images (quality check)
- **11:00-12:00**: Update TOC, figure numbers
- **13:00-16:00**: Final review toàn bộ Section IV
- **16:00-17:00**: Export PDF để kiểm tra layout

**End of Day 2**: ✅ 100% complete!

---

## 🎯 CHECKLIST NHANH

### Phase 1: Quick Wins (1.5h)
- [ ] Generate 6 class diagrams từ PlantUML
- [ ] Generate 10 sequence diagrams từ PlantUML
- [ ] Generate 1 ERD từ PlantUML
- [ ] Tạo thư mục `diagrams/` và `diagrams/gui/`

### Phase 2: Manual Work (6h)
- [ ] Vẽ 1 System Architecture diagram
- [ ] Chụp 30 GUI screenshots

### Phase 3: Integration (1h)
- [ ] Chèn all diagrams vào Markdown
- [ ] Add captions và figure numbers
- [ ] Update TOC

### Phase 4: Review (1h)
- [ ] Check tất cả images load
- [ ] Check resolution đủ cao
- [ ] Check figure numbering tuần tự
- [ ] Final proofread

**TOTAL**: ~10 giờ thực tế (có kinh nghiệm)

---

## 🛠️ CÔNG CỤ CẦN CÀI

### Bắt buộc:
1. ✅ **Web browser** (đã có)
2. ✅ **PlantUML Online**: http://www.plantuml.com/plantuml/ (không cần cài)
3. 🔴 **Draw.io Desktop**: https://github.com/jgraph/drawio-desktop/releases (FREE)
   - Hoặc dùng online: https://app.diagrams.net/

### Tùy chọn (nếu muốn chuyên nghiệp hơn):
- **MySQL Workbench** (ERD tự động): https://dev.mysql.com/downloads/workbench/
- **Figma** (GUI mockups): https://www.figma.com/
- **Visual Paradigm** (UML pro): https://online.visual-paradigm.com/

---

## ❓ FAQ

**Q: PlantUML code ở đâu?**  
A: Đã có sẵn 100% trong 3 files:
- `02-CLASS-GUIDE.md` (766 dòng)
- `03-SEQUENCE-GUIDE.md` 
- `ERD_DATABASE_DESIGN_COLLABSPHERE.md` (911 dòng)

**Q: App chưa chạy được, làm sao chụp GUI?**  
A: Dùng Figma vẽ mockups hoặc tìm screenshots tương tự từ Google Images (tham khảo)

**Q: Diagram quá phức tạp?**  
A: Chia nhỏ, ví dụ ERD 28 tables → chia 3 diagrams (Users/Academic, Projects/Groups, Collaboration/Evaluation)

**Q: Không biết vẽ?**  
A: PlantUML tự động vẽ! Chỉ cần copy/paste code → click generate

**Q: Resolution bao nhiêu?**  
A: Architecture: 1920x1080, ERD: 4961x3508 (A3), Class/Sequence: 1920x1080, GUI: 1920x1080

---

## 📌 LINKS QUAN TRỌNG

### Documentation Files:
- Master: `C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\04-SDD.md`
- Detail 1: `04-SDD\4.1-SystemDesign.md`
- Detail 2: `04-SDD\4.2-DatabaseDesign.md`
- Detail 3: `04-SDD\4.3-DetailedDesign.md`

### PlantUML Code Sources:
- Classes: `Documentation\diagrams\02-CLASS-GUIDE.md`
- Sequences: `Documentation\diagrams\03-SEQUENCE-GUIDE.md`
- ERD: `ERD_DATABASE_DESIGN_COLLABSPHERE.md`
- Architecture: `Documentation\diagrams\04-ARCHITECTURE-GUIDE.md`

### Tools:
- PlantUML: http://www.plantuml.com/plantuml/
- Draw.io: https://app.diagrams.net/
- Figma: https://www.figma.com/

---

## ✅ KHI NÀO XONG?

**Section IV đạt 100% khi**:
- ✅ Có đủ 48 diagrams (hoặc ít nhất 20 diagrams quan trọng)
- ✅ Tất cả diagrams được chèn vào Markdown
- ✅ Figure numbers và captions đầy đủ
- ✅ Images resolution cao (không bị mờ)
- ✅ Navigation links hoạt động
- ✅ Export PDF có layout đẹp

**MỨC TỐI THIỂU ĐỂ PASS** (nếu gấp):
- 1 System Architecture ✅
- 1 Complete ERD ✅
- 6 Class Diagrams ✅
- 5-10 Sequence Diagrams (chọn quan trọng) ✅
- 10-15 GUI Screenshots ✅

**= ~25 diagrams tối thiểu** (có thể làm xong trong 1 ngày)

---

**BẮT ĐẦU NGAY TỪ PHẦN DỄ NHẤT!** → PlantUML diagrams (1.5h)

Good luck! 🚀
