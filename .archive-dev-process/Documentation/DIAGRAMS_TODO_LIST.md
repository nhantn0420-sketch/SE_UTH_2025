# DANH SÁCH DIAGRAMS CÒN LẠI CẦN VẼ

## ✅ ĐÃ HOÀN THÀNH (12/18 diagrams - 67%)

### 1. ERD - Entity Relationship Diagram ✅
- **File**: `4.2-erd-full.png` (428 KB)
- **Trạng thái**: ✅ Đã có, đã chèn vào `4.2-DatabaseDesign.md`
- **Nội dung**: 37 tables, 6 zones (Users, Projects, Collaboration, Evaluation, Notifications, Logs)

### 2-11. Sequence Diagrams (10 diagrams) ✅
- **File**: `4.3.7-seq-authentication.png` đến `4.3.16-seq-video-call.png`
- **Trạng thái**: ✅ Đã có tất cả, đã chèn vào `4.3-DetailedDesign.md`
- **Nội dung**: 
  1. Authentication (JWT login)
  2. Create Project (AI milestone generation)
  3. Approve Project (Head approval)
  4. Create Team (3-5 members)
  5. Pick Project (race condition handling)
  6. Submit Checkpoint (Cloudinary upload)
  7. Evaluate Checkpoint (grade 0-10)
  8. Peer Review (4-dimension scoring)
  9. Chat Message (WebSocket real-time)
  10. Video Call (WebRTC P2P)

### 12. System Architecture Diagram ✅
- **File**: `4.1-system-architecture.png` (140 KB)
- **Trạng thái**: ✅ Vừa có, vừa chèn vào `4.1-SystemDesign.md`
- **Nội dung**: 3-Tier Architecture (Client → Web Server → Application → Data + External Services)

---

## ❌ CÒN THIẾU (6/18 diagrams - 33%)

### 🔴 PRIORITY 1: Class Diagram - User Module (45 phút)
**File cần tạo**: `4.3.1-class-user-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-USER-MODULE-GUIDE.md`  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.1)

**Nội dung**:
- **Classes**: `User`, `Role`, `Permission`, `Session`, `Token`, `ActivityLog`
- **Key Relationships**:
  - User 1-N Sessions (login tracking)
  - User M-N Roles (via UserRole junction)
  - Role M-N Permissions (via RolePermission junction)
  - User 1-N ActivityLogs (audit trail)
- **Key Methods**:
  - `User.register()`, `User.login()`, `User.logout()`
  - `User.changePassword()`, `User.verifyEmail()`
  - `Token.generate()`, `Token.verify()`, `Token.refresh()`
- **Attributes**:
  - User: `user_id`, `email`, `password_hash`, `full_name`, `role_id`, `is_active`
  - Session: `session_id`, `user_id`, `token`, `expires_at`, `ip_address`
  - Token: `token_id`, `user_id`, `access_token`, `refresh_token`, `expires_at`

**Tại sao vẽ đầu tiên?**
- ✅ Đơn giản nhất (6 classes, relationships cơ bản)
- ✅ Core module, được reference bởi tất cả modules khác
- ✅ Build momentum và quen với Draw.io workflow

---

### 🟠 PRIORITY 2: Class Diagram - Academic Module (1 giờ)
**File cần tạo**: `4.3.2-class-academic-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-ACADEMIC-MODULE-GUIDE.md`  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.2)

**Nội dung**:
- **Classes**: `Subject`, `Curriculum`, `Class`, `ClassMember`, `Enrollment`
- **Key Relationships**:
  - Subject 1-N Curricula (subject has many versions)
  - Curriculum 1-N Classes (curriculum taught in many classes)
  - Class 1-N ClassMembers (students in class)
  - User (Lecturer) 1-N Classes (lecturer teaches many)
  - User (Student) M-N Classes (student enrolls in many)
- **Key Methods**:
  - `Class.enroll()`, `Class.drop()`, `Class.getStudents()`
  - `Subject.createCurriculum()`, `Curriculum.activate()`
  - `ClassMember.checkAttendance()`, `ClassMember.getGrade()`
- **Business Rules**:
  - BR-01: Class size limit (30-60 students)
  - BR-02: One lecturer per class
  - BR-03: Curriculum must be active to create classes

**Tại sao vẽ thứ 2?**
- ✅ Moderate complexity, builds on User module
- ✅ Foundation cho Project module (projects link to classes)
- ✅ Clear business logic

---

### 🟡 PRIORITY 3: Class Diagram - Project Module (1 giờ)
**File cần tạo**: `4.3.3-class-project-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-PROJECT-MODULE-GUIDE.md`  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.3)

**Nội dung**:
- **Classes**: `Project`, `ProjectMilestone`, `MilestoneQuestion`, `Approval`, `ClassProject`
- **Key Relationships**:
  - Project 1-N Milestones (5-10 milestones per project)
  - Project 1-N Questions (research questions)
  - Lecturer 1-N Projects (lecturer creates projects)
  - Project 1-1 Approval (approval workflow)
  - Class M-N Projects (via ClassProject - many projects available)
- **State Machine**:
  - Project status: `pending` → `approved` / `denied` → `active` → `completed`
  - Approval workflow: Lecturer submits → Head reviews → Approved/Denied
- **Key Methods**:
  - `Project.submit()`, `Project.approve()`, `Project.deny()`
  - `Project.generateMilestones()` (AI via AWS Bedrock)
  - `Milestone.addQuestion()`, `Milestone.updateDeadline()`

**Tại sao vẽ thứ 3?**
- ✅ Depends on Academic module (links to Class)
- ✅ Shows approval workflow (state machine)
- ✅ AI integration point

---

### 🔴 PRIORITY 4: Class Diagram - Group Module (1.5 giờ) **MOST COMPLEX**
**File cần tạo**: `4.3.4-class-group-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-GROUP-MODULE-GUIDE.md` (longest guide)  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.4)

**Nội dung**:
- **Classes**: `Group`, `GroupMember`, `GroupMilestone`, `Checkpoint`, `CheckpointSubmission`, `CheckpointAssignment`, `Task`, `WorkspaceCard`
- **Key Relationships**:
  - Group 1-N Members (3-5 members, 1 leader)
  - Group 1-1 Project (group picks one project)
  - Group 1-N Milestones (cloned from project)
  - Milestone 1-N Checkpoints (deadlines for submissions)
  - Checkpoint 0-1 Submission (group submits checkpoint)
  - Submission 1-N Assignments (per-member assignments)
  - Group 1-N Tasks (Kanban board)
  - Task 0-1 Card (optional whiteboard card)
- **State Machines**:
  - Group: `forming` → `project_selected` → `working` → `completed`
  - Checkpoint: `pending` → `submitted` → `evaluated` → `graded`
  - Task: `todo` → `in_progress` → `review` → `done`
- **Key Methods**:
  - `Group.addMember()`, `Group.selectProject()`, `Group.createTask()`
  - `Checkpoint.submit()`, `Checkpoint.evaluate()`
  - `Task.assignTo()`, `Task.moveToColumn()`

**Tại sao phức tạp nhất?**
- ❗ Nhiều classes nhất (8 classes)
- ❗ Nhiều relationships phức tạp (12+ relationships)
- ❗ 3 state machines khác nhau
- ❗ Kanban board structure (Tasks with Cards)
- ❗ Checkpoint submission workflow with per-member assignments

**Tips để vẽ**:
1. Dùng canvas lớn hơn (A3 thay vì A4)
2. Zoom 150% khi vẽ
3. Chia làm 2 sub-diagrams nếu quá chật:
   - Sub-diagram A: Group, Members, Project, Milestones
   - Sub-diagram B: Checkpoints, Submissions, Tasks, Cards
4. Dùng màu sắc khác nhau cho từng nhóm entities

---

### 🟢 PRIORITY 5: Class Diagram - Collaboration Module (1 giờ)
**File cần tạo**: `4.3.5-class-collaboration-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-COLLABORATION-MODULE-GUIDE.md`  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.5)

**Nội dung**:
- **Classes**: `Meeting`, `MeetingParticipant`, `ChatMessage`, `Resource`, `WhiteboardSession`, `DocumentSession`
- **Key Relationships**:
  - Meeting M-N Users (via MeetingParticipant junction)
  - Group 1-N ChatMessages (group chat room)
  - Group 1-N Resources (shared files)
  - Group 1-N WhiteboardSessions (collaborative drawing)
  - Group 1-N DocumentSessions (collaborative editing)
- **Real-time Features**:
  - WebSocket events: message sent/received, typing indicator, presence
  - WebRTC: video/audio streams, screen sharing
  - Operational Transform (OT) for document collaboration
- **Key Methods**:
  - `Meeting.schedule()`, `Meeting.start()`, `Meeting.end()`
  - `ChatMessage.send()`, `ChatMessage.edit()`, `ChatMessage.delete()`
  - `Resource.upload()`, `Resource.download()`, `Resource.share()`
  - `WhiteboardSession.draw()`, `WhiteboardSession.erase()`

**Tại sao vẽ thứ 5?**
- ✅ Độc lập với các modules trước (ít dependencies)
- ✅ Focus vào real-time features
- ✅ Clear structure

---

### 🟣 PRIORITY 6: Class Diagram - Evaluation Module (1.5 giờ)
**File cần tạo**: `4.3.6-class-evaluation-module.png`  
**Hướng dẫn**: `Documentation/04-SDD/diagrams/guides/03-CLASS-EVALUATION-MODULE-GUIDE.md`  
**Insert vào**: `4.3-DetailedDesign.md` (section 4.3.6)

**Nội dung**:
- **Classes**: `PeerReview`, `GroupEvaluation`, `MemberEvaluation`, `CheckpointEvaluation`, `MilestoneAnswer`
- **Key Relationships**:
  - PeerReview: reviewer_id → User, reviewee_id → User (anonymous review)
  - GroupEvaluation 1-1 Group (overall group score)
  - MemberEvaluation 1-1 User (individual member score)
  - CheckpointEvaluation 1-1 CheckpointSubmission (checkpoint grade)
  - MilestoneAnswer 1-1 MilestoneQuestion (research answers)
- **Scoring System**:
  - Peer Review: 4 dimensions (cooperation_score, contribution_score, communication_score, technical_score) - each 0-10
  - Checkpoint: grade 0-10, feedback text, file attachment
  - Group: aggregated from checkpoints + final presentation
- **Key Methods**:
  - `PeerReview.submit()`, `PeerReview.calculateAverage()`
  - `CheckpointEvaluation.grade()`, `CheckpointEvaluation.provideFeedback()`
  - `GroupEvaluation.calculateFinal()`, `MemberEvaluation.calculateIndividual()`

**Tại sao vẽ cuối cùng?**
- ✅ Depends on nhiều modules (User, Group, Checkpoint)
- ✅ Complex scoring logic
- ✅ Anonymous review system cần careful design

---

## 📊 PROGRESS SUMMARY

### Diagrams Completed
- **Total**: 12/18 (67%)
- **ERD**: 1/1 ✅
- **Sequence**: 10/10 ✅
- **Architecture**: 1/1 ✅
- **Class**: 0/6 ❌

### Documentation Progress
- **Pages**: 183/280 (65%)
- **Section IV**: ~95% (thiếu 6 class diagrams + insert vào markdown)
- **Section V**: 0% (Testing - 25 pages)
- **Section VI**: 0% (User Guides - 35 pages)

### Time Estimate
- **6 Class Diagrams**: 7.5 hours total
  - User Module: 45 min ⏱️
  - Academic Module: 1h ⏱️
  - Project Module: 1h ⏱️
  - Group Module: 1.5h ⏱️ (most complex)
  - Collaboration Module: 1h ⏱️
  - Evaluation Module: 1.5h ⏱️
- **Insert into Markdown**: 30 min
- **Total**: ~8 hours

### Recommended Schedule
**Option A: 1 Day Sprint (8 hours)**
- Morning (9am-12pm): User + Academic + Project (2h 45min)
- Afternoon (1pm-4pm): Group + Collaboration (2h 30min)
- Evening (7pm-9pm): Evaluation + Insert markdown (2h)

**Option B: 2 Day Spread (Recommended)**
- **Day 1** (4 hours): User + Academic + Project + Insert 3 diagrams
- **Day 2** (4 hours): Group + Collaboration + Evaluation + Insert 3 diagrams

**Option C: 3 Day Comfortable Pace**
- **Day 1** (2h): User + Academic
- **Day 2** (3h): Project + Group
- **Day 3** (3h): Collaboration + Evaluation + Insert all

---

## 🎯 NEXT ACTIONS

### Immediate Next Steps:
1. ✅ **Architecture diagram inserted** vào `4.1-SystemDesign.md`
2. 🔄 **Bắt đầu vẽ User Module Class Diagram** (easiest, 45 min)
   - Open guide: `03-CLASS-USER-MODULE-GUIDE.md`
   - Open Draw.io: https://app.diagrams.net/
   - Follow 6-step guide
   - Save as: `4.3.1-class-user-module.png`
3. 🔄 **Repeat cho 5 diagrams còn lại** theo priority order

### Tools Needed:
- ✅ **Draw.io**: https://app.diagrams.net/ (free, no signup)
- ✅ **Guides**: All 6 guides available in `diagrams/guides/`
- ✅ **Reference**: `4.2-DatabaseDesign.md` (table structures)
- ✅ **VS Code**: Edit markdown sau khi có PNG

---

## 💡 TIPS & TRICKS

### Drawing Efficiency:
1. **Copy-Paste**: Vẽ class đầu tiên rồi duplicate cho các class tương tự
2. **Styles**: Save style presets (colors, fonts, borders)
3. **Templates**: User module làm template cho modules khác
4. **Naming**: Follow naming convention `4.3.X-class-module-name.png`

### Quality Checklist:
- [ ] All classes có tên rõ ràng
- [ ] All attributes có data types (VARCHAR, INT, BOOLEAN)
- [ ] All methods có parameters và return types
- [ ] Relationships có cardinality (1-1, 1-N, M-N)
- [ ] Foreign keys marked rõ ràng
- [ ] Colors consistent (same color per module)
- [ ] Export PNG at 200% zoom (high resolution)

### Common Mistakes to Avoid:
- ❌ Quên primary keys / foreign keys
- ❌ Cardinality sai (1-N nhầm thành N-1)
- ❌ Method signatures không đầy đủ
- ❌ Text quá nhỏ (font < 10pt)
- ❌ Diagram quá chật (không đủ spacing)
- ❌ Export ở zoom thấp (blurry khi in)

---

## 📞 HỖ TRỢ

Nếu cần trợ giúp:
1. Mở guide file tương ứng (có step-by-step instructions)
2. Check reference diagrams trong `Images/` folder
3. Hỏi tôi về:
   - Relationships không chắc chắn
   - Business rules cần clarify
   - Layout suggestions
   - Technical details

**READY TO START? Let's draw User Module first! 🎨**
