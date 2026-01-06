# CLASS DIAGRAMS - RENDER GUIDE

## ✅ HOÀN THÀNH

### User Module Class Diagram ✅
- **File PlantUML**: `4.3.1-class-user-module.puml`
- **File PNG**: `4.3.1-class-user-module.png` (72 KB)
- **Trạng thái**: ✅ Đã có PNG, đã insert vào `4.3-DetailedDesign.md`
- **Entities**: User, UserRole, Session, ActivityLog, PasswordResetToken, EmailVerificationToken

---

## 🔄 CẦN RENDER (5 diagrams)

### 1. Academic Module Class Diagram
- **File PlantUML**: `4.3.2-class-academic-module.puml` ✅ Đã tạo
- **File PNG cần**: `4.3.2-class-academic-module.png`
- **Entities**: Subject, Curriculum, Class, ClassMember, EnrollmentStatus
- **Complexity**: ⭐⭐ Medium

### 2. Project Module Class Diagram
- **File PlantUML**: `4.3.3-class-project-module.puml` ✅ Đã tạo
- **File PNG cần**: `4.3.3-class-project-module.png`
- **Entities**: Project, ProjectMilestone, MilestoneQuestion, ClassProject, ProjectStatus
- **Complexity**: ⭐⭐⭐ Medium-High (approval workflow + AI)

### 3. Group Module Class Diagram
- **File PlantUML**: `4.3.4-class-group-module.puml` ✅ Đã tạo
- **File PNG cần**: `4.3.4-class-group-module.png`
- **Entities**: Group, GroupMember, GroupMilestone, Checkpoint, CheckpointSubmission, CheckpointAssignment, Task, WorkspaceCard
- **Complexity**: ⭐⭐⭐⭐ High (8 entities, most complex)

### 4. Collaboration Module Class Diagram
- **File PlantUML**: `4.3.5-class-collaboration-module.puml` ✅ Đã tạo
- **File PNG cần**: `4.3.5-class-collaboration-module.png`
- **Entities**: Meeting, MeetingParticipant, ChatMessage, Resource, WhiteboardSession, DocumentSession
- **Complexity**: ⭐⭐⭐ Medium-High (real-time features)

### 5. Evaluation Module Class Diagram
- **File PlantUML**: `4.3.6-class-evaluation-module.puml` ✅ Đã tạo
- **File PNG cần**: `4.3.6-class-evaluation-module.png`
- **Entities**: PeerReview, GroupEvaluation, MemberEvaluation, CheckpointEvaluation, MilestoneAnswer
- **Complexity**: ⭐⭐⭐ Medium-High (scoring algorithms)

---

## 🚀 CÁCH RENDER

### Option 1: PlantUML Web (KHUYẾN NGHỊ - 2 phút/diagram)

**Bước 1**: Mở https://www.plantuml.com/plantuml/uml/

**Bước 2**: Render từng diagram
1. Click **"Upload"** 
2. Chọn file `.puml` từ `Documentation/diagrams/plantuml-sources/`
3. Đợi 3-5 giây để render
4. Nhấn chuột phải vào diagram → **"Save image as..."**
5. Đặt tên đúng: `4.3.X-class-module-name.png`
6. Lưu vào: `C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\`

**Bước 3**: Lặp lại cho 5 diagrams

### Option 2: VS Code Extension (nếu có PlantUML extension)

1. Mở file `.puml` trong VS Code
2. Nhấn `Alt+D` để preview
3. `Ctrl+Shift+P` → "PlantUML: Export Current Diagram"
4. Chọn PNG format
5. Lưu vào thư mục `diagrams/`

### Option 3: Local Java JAR (nếu có Java)

```powershell
# Render tất cả diagrams cùng lúc
cd "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources"
java -jar "C:\path\to\plantuml.jar" -tpng *.puml

# Di chuyển PNG files
Move-Item "*.png" "..\*.png"
```

---

## 📝 SAU KHI CÓ 5 PNG FILES

### Kiểm tra files đã render
```powershell
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\4.3.*-class-*.png" | Select-Object Name, Length
```

### Báo cho tôi biết
Khi bạn đã có cả 5 PNG files (hoặc một số files), báo cho tôi biết. Tôi sẽ:

1. **Insert tất cả diagrams vào markdown** (`4.3-DetailedDesign.md`)
   - Thêm Figure numbers (4.3.2 đến 4.3.6)
   - Viết captions chi tiết cho từng diagram
   - Thêm bảng thống kê entities
   - Giải thích business rules

2. **Update progress tracking**
   - 18/18 diagrams complete (100%)
   - Section IV hoàn thành
   - Documentation 195/280 pages (70%)

3. **Chuẩn bị Section V - Testing** (25 pages)

---

## 📊 DIAGRAM SUMMARY

### Tổng quan các Class Diagrams

| **Module** | **Entities** | **Enums** | **Relationships** | **Complexity** |
|------------|-------------|-----------|-------------------|----------------|
| **User** | 6 | 1 | 5 | ⭐⭐ Easy |
| **Academic** | 4 | 1 | 6 | ⭐⭐ Medium |
| **Project** | 4 | 1 | 7 | ⭐⭐⭐ Medium-High |
| **Group** | 8 | 4 | 14 | ⭐⭐⭐⭐ High |
| **Collaboration** | 6 | 2 | 10 | ⭐⭐⭐ Medium-High |
| **Evaluation** | 5 | 0 | 9 | ⭐⭐⭐ Medium-High |
| **TOTAL** | **33** | **9** | **51** | |

### Key Features trong Diagrams

**User Module:**
- JWT authentication (access + refresh tokens)
- bcrypt password hashing
- 5 role-based permissions (RBAC)
- Audit trail (activity logs)
- Password reset workflow
- Email verification

**Academic Module:**
- Subject versioning (curricula)
- Class enrollment (3-60 students)
- One lecturer per class
- Enrollment status tracking

**Project Module:**
- AI milestone generation (AWS Bedrock)
- Two-stage approval (Lecturer → Head)
- Multi-class availability
- Race condition handling
- Research questions per milestone

**Group Module:**
- Group formation (3-5 members, 1 leader)
- Project selection
- Milestone cloning from project
- Checkpoint submission with per-member assignments
- Kanban board (4 columns: TODO/IN_PROGRESS/REVIEW/DONE)
- Whiteboard integration

**Collaboration Module:**
- WebSocket real-time chat
- WebRTC P2P video calls (up to 10 participants)
- File sharing via Cloudinary (max 100MB)
- Collaborative whiteboard (Socket.IO sync)
- Real-time document editing (Operational Transform)

**Evaluation Module:**
- 4-dimension peer review (cooperation, contribution, communication, technical)
- Anonymous peer reviews
- Checkpoint grading (0-10)
- Individual grade calculation (weighted: group 50% + peer 25% + contribution 15% + attendance 10%)
- Milestone research question answers

---

## 💡 TIPS

### Nếu render bị lỗi:
- Kiểm tra syntax PlantUML (file đã được test)
- Thử render online trước (plantuml.com)
- Check file size (<2MB OK)

### Để diagram đẹp hơn:
- PlantUML đã optimize layout tự động
- Colors đã được chọn theo module
- Font sizes appropriate cho print/screen

### Quality check:
- ✅ All entities có PK/FK rõ ràng
- ✅ Relationships có cardinality (1, 0..1, 0..*, 1..*)
- ✅ Enums có values đầy đủ
- ✅ Methods có parameters và return types
- ✅ Notes giải thích business rules
- ✅ Legends cho notation và workflow

---

## 🎯 NEXT ACTIONS

1. **Render 5 diagrams** (10 phút với PlantUML Web)
2. **Verify files** (check names, sizes)
3. **Báo cho tôi biết** → Tôi insert vào markdown
4. **Review final documentation**
5. **Start Section V - Testing**

**Estimated Time**: 15 minutes để hoàn thành tất cả class diagrams!

---

**BẮT ĐẦU RENDER! 🚀**

Open: https://www.plantuml.com/plantuml/uml/
Upload 5 files from: `Documentation/diagrams/plantuml-sources/4.3.*.puml`
