# NOTES - CÁC PHẦN CẦN XỬ LÝ THÊM

**Ngày tạo**: 30/12/2025  
**Mục đích**: Ghi lại các task cần hoàn thành để tài liệu đạt chuẩn yêu cầu

---

## 📝 I. THÔNG TIN CẦN BỔ SUNG

### A. Front Matter (File 00-FrontMatter.md)

✅ **CẦN CẬP NHẬT**:
1. **Group Members Table**:
   - [ ] Điền tên đầy đủ 4 thành viên
   - [ ] Điền vai trò cụ thể của từng người
   - [ ] Điền email FPT (@fpt.edu.vn)
   - [ ] Điền số điện thoại

2. **Supervisor Information**:
   - [ ] Điền tên giảng viên hướng dẫn
   - [ ] Điền chức danh (Giảng viên/Tiến sĩ/...)
   - [ ] Điền thông tin liên hệ

3. **Capstone Project Code**:
   - [ ] Xác nhận mã dự án chính xác (SP25SE107 hoặc khác)
   - [ ] Xác nhận học kỳ và năm học

4. **Acknowledgement**:
   - [ ] Thêm tên nhóm nếu có (VD: Best regards, Team 4Bees)
   - [ ] Cập nhật ngày tháng cuối tài liệu

---

## 🎨 II. DIAGRAMS CẦN VẼ (QUAN TRỌNG)

### A. Use Case Diagrams (5 diagrams) - **PRIORITY: HIGH**

**Công cụ đề xuất**: Draw.io, Lucidchart, PlantUML, hoặc Visual Paradigm

#### 1. **Admin Use Case Diagram**
- **Actors**: Administrator
- **Use Cases**:
  - View All Accounts
  - Deactivate Account
  - Activate Account
  - View System Reports
  - Dashboard Analytics
- **File**: `diagrams/use-case-admin.png`

#### 2. **Staff Use Case Diagram**
- **Actors**: Staff
- **Use Cases**:
  - Import Subjects from File
  - Manage Subjects (CRUD)
  - Import Curricula from File
  - Manage Curricula (CRUD)
  - Import Classes from File
  - Manage Classes (CRUD)
  - Import Users from File
  - Assign Lecturer to Class
  - Assign Students to Class
- **File**: `diagrams/use-case-staff.png`

#### 3. **Department Head Use Case Diagram**
- **Actors**: Department Head
- **Use Cases**:
  - View All Projects
  - Approve Project
  - Reject Project
  - Update Approved Project
  - Assign Project to Classes
  - View All Classes
  - View Subjects & Curricula
- **File**: `diagrams/use-case-head.png`

#### 4. **Lecturer Use Case Diagram**
- **Actors**: Lecturer
- **Use Cases**:
  - Create Project
  - AI Generate Milestones
  - Submit Project for Approval
  - View Own Projects
  - Assign Project to Class
  - Create Groups
  - Manage Group Members
  - Assign Project to Group
  - Track Group Progress
  - Track Member Contribution
  - AI Progress Analysis
  - Manage Group Milestones
  - Create Milestone Questions
  - View Milestone Answers
  - View Checkpoint Submissions
  - View Group Workspace
  - Manage Class Resources
  - Manage Group Resources
  - Evaluate Groups
  - Evaluate Members
  - Evaluate Checkpoints
  - View Peer Reviews
  - Chat with Groups
  - Schedule Meetings
  - Join Video Meetings
  - Use AI Chatbot
- **File**: `diagrams/use-case-lecturer.png`

#### 5. **Student Use Case Diagram**
- **Actors**: Student, Group Leader (extends Student)
- **Use Cases**:
  - View Assigned Classes
  - View Group Details
  - View Group Progress
  - **[Leader]** Mark Milestones Complete
  - Answer Milestone Questions
  - **[Leader]** Create Checkpoints
  - Submit Checkpoints
  - Mark Checkpoints Complete
  - Manage Tasks
  - Assign Tasks
  - Update Task Status
  - View/Upload Group Resources
  - Peer Review
  - Review Milestone Answers
  - View Evaluations
  - Chat with Groups
  - Join Video Meetings
  - Use Collaboration Tools (Whiteboard, Editor)
  - Use AI Chatbot
- **File**: `diagrams/use-case-student.png`

---

### B. Class Diagrams (6 diagrams) - **PRIORITY: HIGH**

#### 1. **User & Roles Class Diagram**
**Classes cần vẽ**:
```
User (abstract)
- id: UUID
- username: String
- email: String
- hashed_password: String
- full_name: String
- role: UserRole (enum)
- is_active: Boolean
- created_at: DateTime
+ authenticate()
+ deactivate()

Admin extends User
Staff extends User
DepartmentHead extends User
Lecturer extends User
Student extends User

UserRole (enum)
- ADMIN
- STAFF
- HEAD
- LECTURER
- STUDENT
```
**File**: `diagrams/class-user-roles.png`

#### 2. **Academic Entities Class Diagram**
**Classes**:
```
Subject
- id: UUID
- code: String
- name: String
- description: Text

Curriculum
- id: UUID
- subject_id: FK
- content: Text
- learning_outcomes: Text

Class
- id: UUID
- code: String
- name: String
- semester: String
- lecturer_id: FK

ClassMember (Association)
- class_id: FK
- student_id: FK
- role: String

ClassProject (Association)
- class_id: FK
- project_id: FK
- assigned_at: DateTime
```
**File**: `diagrams/class-academic.png`

#### 3. **Project Management Class Diagram**
**Classes**:
```
Project
- id: UUID
- title: String
- description: Text
- goals: Text
- status: ProjectStatus (enum)
- created_by: FK (Lecturer)
- approved_by: FK (Head)
+ submit_for_approval()
+ approve()
+ reject()

ProjectMilestone
- id: UUID
- project_id: FK
- title: String
- description: Text
- order: Int

MilestoneQuestion
- id: UUID
- milestone_id: FK
- question: Text
- created_by: FK

ProjectStatus (enum)
- DRAFT
- PENDING
- APPROVED
- REJECTED
```
**File**: `diagrams/class-project.png`

#### 4. **Group & Workspace Class Diagram**
**Classes**:
```
Group
- id: UUID
- name: String
- class_id: FK
- project_id: FK
- leader_id: FK (Student)

GroupMember
- group_id: FK
- student_id: FK
- contribution_score: Float

GroupMilestone
- id: UUID
- group_id: FK
- milestone_id: FK
- is_completed: Boolean
- completed_at: DateTime

Checkpoint
- id: UUID
- group_id: FK
- title: String
- assigned_members: JSON
- status: String

CheckpointSubmission
- id: UUID
- checkpoint_id: FK
- submitted_by: FK
- content: Text
- file_url: String

Task
- id: UUID
- group_id: FK
- title: String
- description: Text
- assigned_to: FK
- status: TaskStatus (enum)
- due_date: DateTime
```
**File**: `diagrams/class-group.png`

#### 5. **Evaluation Class Diagram**
**Classes**:
```
GroupEvaluation
- id: UUID
- group_id: FK
- evaluator_id: FK (Lecturer)
- score: Float
- feedback: Text

MemberEvaluation
- id: UUID
- member_id: FK (Student)
- evaluator_id: FK (Lecturer)
- score: Float
- feedback: Text

PeerReview
- id: UUID
- reviewer_id: FK (Student)
- reviewee_id: FK (Student)
- group_id: FK
- rating: Int (1-5)
- comments: Text

MilestoneAnswer
- id: UUID
- question_id: FK
- student_id: FK
- answer: Text
- submitted_at: DateTime
```
**File**: `diagrams/class-evaluation.png`

#### 6. **Communication Class Diagram**
**Classes**:
```
Meeting
- id: UUID
- group_id: FK
- scheduled_at: DateTime
- meeting_url: String
- status: MeetingStatus (enum)

ChatMessage
- id: UUID
- sender_id: FK
- group_id: FK
- message: Text
- timestamp: DateTime

Resource
- id: UUID
- title: String
- file_url: String
- uploaded_by: FK
- group_id: FK (nullable)
- class_id: FK (nullable)
- uploaded_at: DateTime

Notification
- id: UUID
- user_id: FK
- type: NotificationType (enum)
- content: Text
- is_read: Boolean
- created_at: DateTime
```
**File**: `diagrams/class-communication.png`

---

### C. Sequence Diagrams (10 diagrams) - **PRIORITY: HIGH**

#### 1. **Authentication Flow**
**Flow**: User → Frontend → Backend API → Database → JWT Token → Frontend
**File**: `diagrams/sequence-auth.png`

#### 2. **Project Creation with AI**
**Flow**: Lecturer → Frontend → Backend API → AI Service (AWS Bedrock) → Generate Milestones → Save to DB
**File**: `diagrams/sequence-project-creation.png`

#### 3. **Project Approval Workflow**
**Flow**: Lecturer submits → Backend → Notification → Head reviews → Approve/Reject → Notification → Lecturer
**File**: `diagrams/sequence-project-approval.png`

#### 4. **Group Creation**
**Flow**: Lecturer → Create Group → Add Members → Assign Project → Database → Notifications
**File**: `diagrams/sequence-group-creation.png`

#### 5. **Milestone Completion**
**Flow**: GroupLeader marks → Backend → Update DB → Notification Service → Email + Real-time → Lecturer & Members
**File**: `diagrams/sequence-milestone-completion.png`

#### 6. **Peer Review Submission**
**Flow**: Student submits → Frontend → Backend API → Save → Notification → Reviewee
**File**: `diagrams/sequence-peer-review.png`

#### 7. **Real-time Chat**
**Flow**: Student A sends → WebSocket → Socket.IO Server → Broadcast → Student B, C receive
**File**: `diagrams/sequence-chat.png`

#### 8. **Video Call Initiation**
**Flow**: User initiates → WebRTC Signaling → STUN/TURN → P2P Connection → Video Stream
**File**: `diagrams/sequence-video-call.png`

#### 9. **File Upload**
**Flow**: User uploads → Frontend → Backend API → Cloudinary → Get URL → Save to DB → Notification
**File**: `diagrams/sequence-file-upload.png`

#### 10. **AI Chatbot Interaction**
**Flow**: User asks → Frontend → Backend API → AWS Bedrock → LLM Response → Frontend displays
**File**: `diagrams/sequence-ai-chatbot.png`

---

### D. Entity Relationship Diagram (ERD) - **PRIORITY: CRITICAL**

**Cần vẽ ERD đầy đủ với**:
- 15+ entities
- Primary Keys (PK)
- Foreign Keys (FK)
- Relationships (1:1, 1:N, N:N)
- Cardinality
- Constraints

**Entities chính**:
1. users
2. subjects
3. curricula
4. classes
5. class_members
6. class_projects
7. projects
8. project_milestones
9. milestone_questions
10. groups
11. group_members
12. group_milestones
13. checkpoints
14. checkpoint_submissions
15. tasks
16. evaluations (group, member)
17. peer_reviews
18. milestone_answers
19. meetings
20. chat_messages
21. resources
22. notifications

**File**: `diagrams/erd-database.png`

---

### E. Architecture Diagram - **PRIORITY: HIGH**

**Cần vẽ kiến trúc tổng thể**:
```
[Frontend Layer]
  React.js SPA
    ↓ HTTPS/WSS
[Backend Layer]
  FastAPI + Socket.IO
    ↓
[Data Layer]
  PostgreSQL | Redis | Cloudinary
    ↓
[External Services]
  AWS Bedrock | SMTP Server
```

**File**: `diagrams/architecture.png`

---

### F. Activity Diagrams (Optional nhưng recommended)

#### 1. **File Import Workflow**
**Flow**: Upload file → Parse → Validate → Batch Insert → Success/Error
**File**: `diagrams/activity-file-import.png`

#### 2. **Project Approval Workflow**
**Flow**: Create → Submit → Pending → Head reviews → Approved/Rejected → Assign
**File**: `diagrams/activity-project-approval.png`

#### 3. **Group Formation Process**
**Flow**: Lecturer creates → Add members → Assign project → Setup milestones → Ready
**File**: `diagrams/activity-group-formation.png`

#### 4. **Evaluation Cycle**
**Flow**: Project end → Lecturer evaluates → Students peer review → Final scores
**File**: `diagrams/activity-evaluation.png`

---

## 📊 III. SCREENSHOTS CẦN CHỤP

### A. Authentication Pages
- [ ] Login page
- [ ] Register page
- [ ] Profile page

### B. Admin Dashboard
- [ ] User management table
- [ ] Deactivate account modal
- [ ] System reports view

### C. Staff Dashboard
- [ ] Import subjects interface
- [ ] Subject management table
- [ ] Import classes interface
- [ ] Assign lecturer to class

### D. Head Dashboard
- [ ] Project approval list
- [ ] Approve/reject modal
- [ ] Assign project to classes

### E. Lecturer Dashboard
- [ ] Create project form
- [ ] AI generate milestones
- [ ] Group management
- [ ] Track progress charts
- [ ] Evaluation form

### F. Student Dashboard
- [ ] Group workspace (Kanban board)
- [ ] Task detail modal
- [ ] Milestone list
- [ ] Peer review form

### G. Collaboration Tools
- [ ] Chat interface
- [ ] Video call screen
- [ ] Whiteboard canvas
- [ ] Collaborative editor

**Lưu ý**: Chụp screenshots khi ứng dụng đã chạy ở local hoặc staging

---

## 📝 IV. DOCUMENTS CẦN BỔ SUNG

### A. File 03-SRS.md (Software Requirements Specification)

**CẦN BỔ SUNG**:
1. Chi tiết 72 Functional Requirements (FE-01 đến FE-72):
   - Mô tả chi tiết từng feature
   - Preconditions, Postconditions
   - Main flow, Alternative flows
   - UI mockup references

2. Non-Functional Requirements:
   - Performance metrics cụ thể (response time, throughput)
   - Security requirements chi tiết
   - Usability requirements
   - Reliability và Availability

3. Business Rules (BR-01, BR-02, ...):
   - Compile từ code logic
   - VD: "Chỉ Group Leader mới được mark milestone complete"

### B. File 04-SDD.md (Software Design Description)

**CẦN BỔ SUNG**:
1. Database Schema Tables (từ ERD):
   - Table structure với tất cả columns
   - Data types, constraints
   - Indexes và optimization

2. API Endpoint Documentation:
   - Tổng hợp từ backend routers
   - Request/Response examples
   - Error codes

3. Component Design (Frontend):
   - Component hierarchy
   - Props và State management
   - Routing structure

### C. File 05-Testing.md

**CẦN BỔ SUNG**:
1. Test Cases chi tiết (100+ test cases):
   - Test case ID, Description, Steps, Expected Result
   - Phân loại: Unit, Integration, System, UAT

2. Test Reports:
   - Thực hiện test và ghi lại kết quả
   - Bug reports với screenshots
   - Test coverage report

### D. File 06-UserGuides.md

**CẦN VIẾT**:
1. Hướng dẫn cho Admin
2. Hướng dẫn cho Staff
3. Hướng dẫn cho Head
4. Hướng dẫn cho Lecturer
5. Hướng dẫn cho Student

Mỗi guide cần:
- Screenshots từng bước
- Mô tả chức năng
- Tips và troubleshooting

---

## ✅ V. CHECKLIST HOÀN THÀNH TÀI LIỆU

### Phase 1: Diagrams (Ưu tiên cao nhất)
- [ ] 5 Use Case Diagrams
- [ ] 6 Class Diagrams
- [ ] 10 Sequence Diagrams
- [ ] 1 ERD Diagram
- [ ] 1 Architecture Diagram
- [ ] 4 Activity Diagrams (optional)

### Phase 2: Content Completion
- [x] File 00-FrontMatter.md (cần cập nhật thông tin team)
- [x] File 01-ProjectIntroduction.md (completed)
- [x] File 02-ProjectManagementPlan.md (completed)
- [ ] File 03-SRS.md (cần viết chi tiết 72 features)
- [ ] File 04-SDD.md (cần database schema + API docs)
- [ ] File 05-Testing.md (cần test cases + reports)
- [ ] File 06-UserGuides.md (cần viết hướng dẫn 5 roles)

### Phase 3: Screenshots & Evidence
- [ ] Chụp 20+ screenshots từ ứng dụng
- [ ] Tạo demo video 10 phút
- [ ] Export API documentation từ Swagger

### Phase 4: Review & Finalize
- [ ] Spell check và grammar check
- [ ] Format consistency
- [ ] Add page numbers
- [ ] Create final PDF
- [ ] Review với supervisor

---

## 🎯 VI. TIMELINE ĐỀ XUẤT

| Tuần | Task | Deliverable |
|------|------|-------------|
| **Tuần hiện tại** | Hoàn thiện diagrams | 22 diagrams |
| **Tuần tiếp theo** | Viết chi tiết SRS + SDD | 2 files hoàn chỉnh |
| **Tuần +2** | Testing + Screenshots | Test reports + 20 screenshots |
| **Tuần +3** | User guides + Review | User manual + Final PDF |

---

## 📌 VII. GHI CHÚ QUAN TRỌNG

1. **Công cụ vẽ diagram đề xuất**:
   - **Draw.io** (miễn phí, dễ sử dụng): https://app.diagrams.net/
   - **Lucidchart** (có free tier): https://www.lucidchart.com/
   - **PlantUML** (code-based, version control friendly)
   - **Visual Paradigm** (professional, có student license)

2. **Format diagram**:
   - Export dạng PNG hoặc SVG (high resolution)
   - Kích thước: Width 1200px minimum
   - Include trong folder `Documentation/diagrams/`

3. **Naming convention**:
   - Use Case: `use-case-{role}.png`
   - Class: `class-{module}.png`
   - Sequence: `sequence-{feature}.png`
   - ERD: `erd-database.png`

4. **Embed vào Markdown**:
   ```markdown
   ![Use Case Admin](diagrams/use-case-admin.png)
   ```

5. **Backup**:
   - Lưu source files (.drawio, .vpp, .puml)
   - Version control cả diagrams
   - Google Drive backup

---

**END OF NOTES - Cập nhật liên tục khi làm việc**

---
