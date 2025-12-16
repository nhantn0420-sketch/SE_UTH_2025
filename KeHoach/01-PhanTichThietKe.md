# Giai Đoạn 1: Phân Tích Yêu Cầu và Thiết Kế Hệ Thống

**Thời gian**: 1-2 tuần  
**Mục tiêu**: Tạo foundation vững chắc cho development với tài liệu thiết kế đầy đủ

## Nhiệm Vụ Chính

### 1.1. Phân Tích Yêu Cầu Chi Tiết

#### A. Lập Tài Liệu SRS (Software Requirements Specification)

**Nội dung cần bao gồm**:
1. **Giới thiệu**
   - Mục đích hệ thống
   - Phạm vi dự án
   - Định nghĩa, từ viết tắt (COSRE, PBL)
   - Tham chiếu tài liệu

2. **Mô tả tổng quan**
   - Bối cảnh sản phẩm (PBL environment)
   - Chức năng sản phẩm (tổng quan 12 tính năng chính)
   - Đặc điểm người dùng (5 vai trò)
   - Ràng buộc, giả định

3. **Yêu cầu chức năng chi tiết**
   - Theo từng vai trò (Admin, Staff, Head, Lecturer, Student)
   - Mỗi chức năng: Use case ID, mô tả, actors, preconditions, postconditions, flow
   - Ví dụ: UC-01: Quản trị viên xem tất cả tài khoản
   - UC-02: Nhân viên import file tạo môn học
   - UC-15: Giảng viên tạo dự án với AI
   - UC-25: Sinh viên mark milestone hoàn thành

4. **Yêu cầu phi chức năng**
   - Performance: Response time <2s cho API calls, <1s cho real-time sync
   - Security: HTTPS, JWT authentication, role-based authorization
   - Scalability: Support 500+ concurrent users
   - Usability: Responsive design, hỗ trợ Tiếng Việt/Anh
   - Reliability: 99.5% uptime, backup daily

#### B. Thu Thập và Xác Nhận Requirements

**Checklist**:
- [ ] Đọc kỹ `DeBai.md` và list tất cả functional requirements
- [ ] Xác định input/output cho từng chức năng (e.g., import CSV format)
- [ ] Liệt kê business rules (e.g., chỉ Trưởng khoa mới approve project)
- [ ] Xác định edge cases (e.g., sinh viên rời nhóm giữa chừng)

### 1.2. Thiết Kế UML 2.0

#### A. Use Case Diagrams

**Tạo 5 diagrams cho từng vai trò**:

1. **Admin Use Case**
   - Actors: Administrator
   - Use cases: View All Accounts, Deactivate Account, View System Reports
   
2. **Staff Use Case**
   - Actors: Staff
   - Use cases: Import Subjects/Curricula, Manage Classes, Create Lecturer/Student Accounts, Assign Members to Classes
   
3. **Department Head Use Case**
   - Actors: Department Head
   - Use cases: View Projects, Approve/Reject Projects, Update Approved Projects, Assign Projects to Classes
   
4. **Lecturer Use Case**
   - Actors: Lecturer
   - Use cases: Create Projects (with AI), Manage Groups, Track Progress, Evaluate Students, Video Meeting, Chat, Upload Resources
   
5. **Student Use Case**
   - Actors: Student
   - Use cases: View Assignments, Mark Milestones, Manage Tasks, Submit Checkpoints, Peer Review, Collaborate (Whiteboard, Editor)

**Tools**: Draw.io, Lucidchart, PlantUML, hoặc Visual Paradigm

#### B. Class Diagrams

**Core classes cần thiết kế**:

```
User (abstract)
├── Administrator
├── Staff
├── DepartmentHead
├── Lecturer
└── Student

AcademicEntities
├── Subject
├── Curriculum
├── Class
└── ClassMember

ProjectManagement
├── Project
├── ProjectMilestone
├── Group
├── GroupMember
├── Checkpoint
└── CheckpointSubmission

Collaboration
├── Meeting
├── ChatMessage
├── WhiteboardSession
├── DocumentSession
└── Resource

Evaluation
├── GroupEvaluation
├── MemberEvaluation
├── PeerReview
└── MilestoneAnswer

System
├── Notification
├── AIRequest
└── SystemReport
```

**Attributes và methods cần định nghĩa**:
- Mỗi class có ID, timestamps (created_at, updated_at)
- Relationships: 1-1, 1-N, N-N (e.g., Class N-N Student through ClassMember)
- Methods: CRUD operations, business logic (e.g., Project.submit_for_approval())

#### C. Sequence Diagrams

**Tạo diagrams cho critical workflows**:

1. **Authentication Flow**
   - User → Frontend → Backend API → Database → JWT Token

2. **Project Creation and Approval Flow**
   - Lecturer creates project → AI generates milestones → Submit for approval → DepartHead approves → Assign to class

3. **Real-time Collaboration Flow**
   - Student A edits whiteboard → Socket.IO → Server broadcasts → Student B receives update

4. **Milestone Completion Flow**
   - GroupLeader marks milestone → Notification triggered → Email + Real-time notify → Lecturer/Members receive

**Ít nhất 8-10 sequence diagrams** cho các flows quan trọng

#### D. Activity Diagrams (Optional nhưng recommended)

- Workflow phức tạp như: Import file → Parse → Validate → Batch insert
- Group formation process
- Evaluation and feedback cycle

### 1.3. Thiết Kế Database (ERD)

#### A. Entity Relationship Diagram

**Core entities và relationships**:

1. **Users & Roles**
   - User (id, username, email, password_hash, role, is_active)
   - Role enum: 'admin', 'staff', 'head', 'lecturer', 'student'

2. **Academic Management**
   - Subject (id, code, name, description)
   - Curriculum (id, subject_id, content, learning_outcomes)
   - Class (id, code, name, semester, lecturer_id)
   - ClassMember (class_id, student_id, role) // N-N

3. **Project & Group**
   - Project (id, title, description, goals, milestones_json, status, created_by, approved_by)
   - ClassProject (class_id, project_id, assigned_at)
   - Group (id, name, class_id, project_id, leader_id)
   - GroupMember (group_id, student_id, contribution_score)
   - Milestone (id, group_id, title, description, deadline, is_completed)
   - Checkpoint (id, group_id, title, assigned_members_json, status)

4. **Collaboration**
   - Meeting (id, group_id, scheduled_at, meeting_url, status)
   - ChatMessage (id, sender_id, group_id, message, timestamp)
   - Resource (id, title, file_url, uploaded_by, group_id, class_id)
   - WhiteboardSession (id, group_id, data_json, last_updated)

5. **Evaluation**
   - Evaluation (id, evaluator_id, target_id, target_type, score, feedback, created_at)
   - PeerReview (id, reviewer_id, reviewee_id, group_id, rating, comments)

6. **Notifications & AI**
   - Notification (id, user_id, type, content, is_read, created_at)
   - AILog (id, user_id, request_type, prompt, response, created_at)

**Constraints**:
- Foreign keys với ON DELETE CASCADE/SET NULL phù hợp
- Unique constraints (e.g., Class.code, User.email)
- Check constraints (e.g., role IN ('admin', 'staff', ...))

**Indexes**:
- Index trên foreign keys
- Composite index cho queries thường dùng (e.g., group_id + created_at)

#### B. Database Normalization

- Đảm bảo 3NF (Third Normal Form)
- Denormalize nếu cần cho performance (e.g., cache contribution_score)

**Tools**: dbdiagram.io, MySQL Workbench, PostgreSQL pgAdmin

### 1.4. Thiết Kế Kiến Trúc Hệ Thống

#### A. Architecture Diagram

**Kiến trúc 3-tier**:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                            │
│  React.js SPA (Desktop/Tablet/Mobile Browser)               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS/WSS
┌──────────────────────▼──────────────────────────────────────┐
│                   Application Layer                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  FastAPI Backend (REST API + WebSocket)                │ │
│  │  - Auth Service (JWT)                                  │ │
│  │  - User Management Service                             │ │
│  │  - Project Management Service                          │ │
│  │  - Group & Collaboration Service                       │ │
│  │  - Evaluation Service                                  │ │
│  │  - Notification Service                                │ │
│  │  - AI Integration Service (AWS Bedrock)                │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ PostgreSQL   │  │ Redis Cache  │  │ Cloudinary/S3    │  │
│  │ (Main DB)    │  │ (Real-time)  │  │ (File Storage)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**External Services**:
- AWS Bedrock (AI)
- SMTP Server (Email)
- Socket.IO Server (Real-time)
- WebRTC TURN/STUN Servers

#### B. API Architecture

**RESTful API design principles**:
- Resource-based URLs: `/api/v1/projects`, `/api/v1/groups/{id}`
- HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (delete)
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)

**Endpoint grouping**:
```
/api/v1/auth/          # Authentication
/api/v1/users/         # User management
/api/v1/subjects/      # Subject & Curriculum
/api/v1/classes/       # Class management
/api/v1/projects/      # Project management
/api/v1/groups/        # Group & workspace
/api/v1/evaluations/   # Evaluation & feedback
/api/v1/resources/     # File management
/api/v1/notifications/ # Notifications
/api/v1/ai/            # AI services
/ws/chat              # WebSocket for chat
/ws/whiteboard        # WebSocket for whiteboard
```

#### C. Security Architecture

**Security layers**:
1. **Network**: HTTPS (TLS 1.3), WSS for WebSocket
2. **Authentication**: JWT with refresh tokens
3. **Authorization**: Role-based access control (RBAC) middleware
4. **Input Validation**: Pydantic models, sanitization
5. **Database**: Parameterized queries (SQLModel ORM)
6. **File Upload**: File type validation, virus scanning, size limits
7. **Rate Limiting**: Prevent DDoS (e.g., 100 requests/minute per IP)

### 1.5. Thiết Kế API Endpoints

#### A. API Specification Document

**Format**: OpenAPI 3.0 (Swagger)

**Sample endpoints cho mỗi module**:

```yaml
# Authentication
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
GET  /api/v1/auth/me

# Projects (Lecturer)
POST   /api/v1/projects                  # Create project
GET    /api/v1/projects                  # List own projects
GET    /api/v1/projects/{id}             # Get project details
PUT    /api/v1/projects/{id}             # Update project
POST   /api/v1/projects/{id}/submit      # Submit for approval
POST   /api/v1/ai/generate-milestones    # AI generate milestones

# Projects (Department Head)
GET    /api/v1/projects/pending          # List pending projects
POST   /api/v1/projects/{id}/approve     # Approve project
POST   /api/v1/projects/{id}/reject      # Reject project

# Groups
POST   /api/v1/groups                    # Create group
GET    /api/v1/groups/{id}/progress      # Track progress
POST   /api/v1/groups/{id}/milestones/{mid}/complete  # Mark milestone
GET    /api/v1/groups/{id}/contributions # Member contributions

# Evaluations
POST   /api/v1/evaluations               # Create evaluation
GET    /api/v1/evaluations/peer-reviews  # View peer reviews
```

**Mỗi endpoint cần define**:
- Parameters (path, query, body)
- Request body schema (Pydantic model)
- Response schema (success + error cases)
- Authentication requirements
- Authorization (allowed roles)

### 1.6. Thiết Kế UI/UX (Wireframes & Mockups)

#### A. Wireframes cho Major Pages

**Admin**:
- Dashboard (statistics)
- User management table
- System reports

**Staff**:
- Import file forms
- Subject/Class management tables
- Member assignment interface

**Department Head**:
- Project approval dashboard
- Pending projects list
- Class assignment interface

**Lecturer**:
- Dashboard (classes, groups overview)
- Project creation form (with AI assistant)
- Group management (progress charts, contribution graphs)
- Evaluation forms
- Resource upload interface

**Student**:
- Dashboard (assigned groups, milestones)
- Workspace (task board, Kanban style)
- Collaboration tools (whiteboard, editor, video)
- Peer review forms

**Tools**: Figma, Adobe XD, Sketch, hoặc Balsamiq

#### B. Design System

**Define**:
- Color palette (primary, secondary, accent colors)
- Typography (fonts, sizes, weights)
- Spacing (margins, paddings)
- Component library (buttons, forms, cards, modals)

## Deliverables Giai Đoạn 1

- [ ] Tài liệu SRS hoàn chỉnh (PDF/DOCX, 30-50 trang)
- [ ] Use Case Diagrams (5 diagrams)
- [ ] Class Diagrams (1-2 comprehensive diagrams)
- [ ] Sequence Diagrams (8-10 critical flows)
- [ ] ERD (Entity Relationship Diagram)
- [ ] Architecture Diagram
- [ ] API Specification (OpenAPI/Swagger YAML)
- [ ] Wireframes/Mockups (15-20 screens)
- [ ] Design System Guide

## Tips & Best Practices

1. **Collaboration**: Sử dụng tools như Miro/Figma để team cùng làm real-time
2. **Review**: Peer review tài liệu với teammates/instructor
3. **Validation**: Đối chiếu thiết kế với requirements trong `DeBai.md`
4. **Versioning**: Lưu versions của documents (v1.0, v1.1) khi có changes
5. **Reusability**: Thiết kế components/services reusable (e.g., Notification service dùng chung)

## Resources

- **UML Tools**: PlantUML, Draw.io, Lucidchart, Visual Paradigm
- **Database Design**: dbdiagram.io, pgAdmin ERD Tool
- **API Design**: Swagger Editor (editor.swagger.io)
- **UI Design**: Figma Community (templates), Material Design guidelines

---

**Next Step**: Sau khi hoàn thành giai đoạn 1, chuyển sang `02-ThietLapBackend.md` để bắt đầu development.
