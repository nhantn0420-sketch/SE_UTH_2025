# II. PROJECT MANAGEMENT PLAN (KẾ HOẠCH QUẢN LÝ DỰ ÁN)

---

## 2.1. OVERVIEW - WORK BREAKDOWN STRUCTURE (WBS)

### Scope & Estimation (Phạm vi và Ước tính)

Dự án CollabSphere được ước tính mất **8-16 tuần (2-4 tháng)** với tổng effort khoảng **320-400 man-days** cho nhóm 4 người.

### Work Breakdown Structure Table

| # | WBS Item | Sub-tasks | Complexity | Est. Effort (man-days) | Assigned To | Status |
|---|----------|-----------|------------|------------------------|-------------|---------|
| **1** | **Project Initiating** | | | **10** | | |
| 1.1 | Requirements Gathering | Đọc đề bài, phân tích yêu cầu | Simple | 2 | Team Leader | ✅ Done |
| 1.2 | Feasibility Study | Nghiên cứu công nghệ, khả thi | Simple | 2 | Team Leader | ✅ Done |
| 1.3 | Team Organization | Phân công vai trò, setup collaboration tools | Simple | 1 | Team Leader | ✅ Done |
| 1.4 | Project Charter | Lập kế hoạch tổng thể | Simple | 2 | Team Leader | ✅ Done |
| 1.5 | Risk Assessment | Xác định rủi ro và biện pháp | Simple | 3 | All | ✅ Done |
| **2** | **Project Planning** | | | **25** | | |
| 2.1 | Requirements Analysis | Phân tích chi tiết 72 features | Medium | 5 | BA | ✅ Done |
| 2.2 | Use Case Modeling | Tạo 5 use case diagrams cho 5 roles | Medium | 4 | BA | 📝 In Progress |
| 2.3 | SRS Document | Viết Software Requirements Specification | Complex | 8 | BA, Team Leader | 📝 In Progress |
| 2.4 | Database Design | ERD với 15+ entities, relationships | Complex | 5 | Backend Dev | 📝 In Progress |
| 2.5 | Architecture Design | High-level và detailed design | Medium | 3 | Backend Dev | 📝 In Progress |
| **3** | **Executing - Analysis & Design** | | | **40** | | |
| 3.1 | Class Diagram | Thiết kế 6 class diagrams chính | Complex | 8 | Backend Dev | ⏳ Planned |
| 3.2 | Sequence Diagrams | Tạo 10 sequence diagrams cho flows | Complex | 10 | Backend Dev | ⏳ Planned |
| 3.3 | Activity Diagrams | Vẽ 4-5 activity diagrams | Medium | 4 | BA | ⏳ Planned |
| 3.4 | UI/UX Design | Wireframes, mockups cho 20+ pages | Complex | 10 | Designer | ⏳ Planned |
| 3.5 | API Design | OpenAPI specification cho 50+ endpoints | Medium | 8 | Backend Dev | ⏳ Planned |
| **4** | **Executing - Backend Implementation** | | | **80** | | |
| 4.1 | Project Setup | FastAPI, PostgreSQL, Docker setup | Simple | 3 | Backend Dev | ⏳ Planned |
| 4.2 | Database Models | SQLModel cho 15+ tables | Medium | 8 | Backend Dev | ⏳ Planned |
| 4.3 | Authentication System | JWT, OAuth2, role-based access | Complex | 10 | Backend Dev | ⏳ Planned |
| 4.4 | User Management API | CRUD users, roles, permissions | Medium | 6 | Backend Dev | ⏳ Planned |
| 4.5 | Subject & Curriculum API | Import file, CRUD operations | Medium | 8 | Backend Dev | ⏳ Planned |
| 4.6 | Class Management API | CRUD classes, assign members | Medium | 6 | Backend Dev | ⏳ Planned |
| 4.7 | Project Management API | CRUD, approval workflow | Complex | 12 | Backend Dev | ⏳ Planned |
| 4.8 | Group Management API | Groups, members, milestones | Complex | 10 | Backend Dev | ⏳ Planned |
| 4.9 | Evaluation System API | Evaluations, peer reviews | Medium | 8 | Backend Dev | ⏳ Planned |
| 4.10 | Resource Management API | File upload/download với Cloudinary | Medium | 5 | Backend Dev | ⏳ Planned |
| 4.11 | Notification Service | Email và real-time notifications | Complex | 4 | Full-stack Dev | ⏳ Planned |
| **5** | **Executing - AI & Real-time** | | | **35** | | |
| 5.1 | AI Integration | AWS Bedrock setup, chatbot API | Complex | 8 | Full-stack Dev | ⏳ Planned |
| 5.2 | AI Milestone Generation | Auto-generate project milestones | Complex | 6 | Full-stack Dev | ⏳ Planned |
| 5.3 | WebSocket Setup | Socket.IO server cho chat | Medium | 4 | Full-stack Dev | ⏳ Planned |
| 5.4 | Real-time Chat | Chat rooms, message persistence | Complex | 6 | Full-stack Dev | ⏳ Planned |
| 5.5 | Video Call Integration | WebRTC với PeerJS/SimplePeer | Complex | 8 | Full-stack Dev | ⏳ Planned |
| 5.6 | Whiteboard Sync | Real-time whiteboard với Socket.IO | Complex | 3 | Full-stack Dev | ⏳ Planned |
| **6** | **Executing - Frontend Implementation** | | | **70** | | |
| 6.1 | React Setup | Create React App, routing, MUI | Simple | 3 | Frontend Dev | ⏳ Planned |
| 6.2 | Authentication Pages | Login, Register, Profile | Simple | 5 | Frontend Dev | ⏳ Planned |
| 6.3 | Admin Dashboard | User management, system reports | Medium | 8 | Frontend Dev | ⏳ Planned |
| 6.4 | Staff Dashboard | Import files, manage subjects/classes | Medium | 10 | Frontend Dev | ⏳ Planned |
| 6.5 | Head Dashboard | Approve projects, assign to classes | Medium | 8 | Frontend Dev | ⏳ Planned |
| 6.6 | Lecturer Dashboard | Project creation, group management | Complex | 12 | Frontend Dev | ⏳ Planned |
| 6.7 | Student Dashboard | View groups, tasks, submissions | Medium | 10 | Frontend Dev | ⏳ Planned |
| 6.8 | Project Pages | Create, list, detail, edit projects | Medium | 8 | Frontend Dev | ⏳ Planned |
| 6.9 | Group Workspace | Kanban board, task management | Complex | 6 | Frontend Dev | ⏳ Planned |
| **7** | **Executing - Collaboration Tools** | | | **25** | | |
| 7.1 | Chat Interface | Chat UI với message list, input | Medium | 5 | Frontend Dev | ⏳ Planned |
| 7.2 | Video Call UI | Video grid, controls, screen share | Complex | 8 | Frontend Dev | ⏳ Planned |
| 7.3 | Whiteboard Component | Canvas drawing, sync với backend | Complex | 6 | Frontend Dev | ⏳ Planned |
| 7.4 | Collaborative Editor | Rich text editor với sync | Complex | 6 | Frontend Dev | ⏳ Planned |
| **8** | **Testing & QA** | | | **30** | | |
| 8.1 | Unit Testing | Backend unit tests với pytest | Medium | 8 | Backend Dev | ⏳ Planned |
| 8.2 | API Testing | Integration tests cho API endpoints | Medium | 6 | Backend Dev | ⏳ Planned |
| 8.3 | Frontend Testing | React component tests với Jest | Medium | 6 | Frontend Dev | ⏳ Planned |
| 8.4 | Manual Testing | Test cases, bug reports | Medium | 6 | Tester | ⏳ Planned |
| 8.5 | UAT | User acceptance testing với real users | Simple | 4 | All | ⏳ Planned |
| **9** | **Deployment & Finalization** | | | **15** | | |
| 9.1 | Docker Configuration | Dockerfile, docker-compose.yml | Medium | 3 | Backend Dev | ⏳ Planned |
| 9.2 | Cloud Deployment | Deploy backend lên Azure, frontend lên AWS | Complex | 5 | Full-stack Dev | ⏳ Planned |
| 9.3 | Database Migration | Setup production database | Medium | 2 | Backend Dev | ⏳ Planned |
| 9.4 | Performance Optimization | Caching, query optimization | Medium | 3 | Backend Dev | ⏳ Planned |
| 9.5 | Security Hardening | HTTPS, rate limiting, input validation | Medium | 2 | Backend Dev | ⏳ Planned |
| **10** | **Documentation** | | | **20** | | |
| 10.1 | API Documentation | Swagger/OpenAPI docs | Simple | 3 | Backend Dev | 📝 In Progress |
| 10.2 | User Manual | Hướng dẫn cho 5 roles | Medium | 6 | Tester | 📝 In Progress |
| 10.3 | Installation Guide | Deploy instructions | Simple | 3 | Backend Dev | 📝 In Progress |
| 10.4 | Final Report | Tài liệu đồ án tốt nghiệp | Complex | 8 | All | 📝 In Progress |
| **TOTAL** | | | | **350** | | |

### Timeline Gantt Chart

```
[Giai đoạn 1-2: Weeks 1-2] Requirements & Design
├── Requirements Analysis ████░░░░░░░░░░░░
├── Use Case & SRS        ░░████░░░░░░░░░░
└── Database & API Design ░░░░████░░░░░░░░

[Giai đoạn 3-4: Weeks 3-6] Backend Development
├── Auth & User System    ░░░░░░████░░░░░░
├── Core API Modules      ░░░░░░░░████████
└── Evaluation & Resource ░░░░░░░░░░░░████

[Giai đoạn 5: Weeks 7-8] AI & Real-time
├── AI Integration        ░░░░░░░░░░░░░░██
├── WebSocket & Chat      ░░░░░░░░░░░░░░██
└── Video Call & Whiteboard ░░░░░░░░░░░░██

[Giai đoạn 6-7: Weeks 9-12] Frontend Development
├── Admin/Staff/Head UI   ░░░░░░░░░░░░████
├── Lecturer/Student UI   ░░░░░░░░░░░░░░██████
└── Collaboration Tools   ░░░░░░░░░░░░░░░░████

[Giai đoạn 8-9: Weeks 13-15] Testing & Deployment
├── Testing (Unit/Integration) ░░░░░░░░░░░░░░░░██░░
├── Deployment & Optimization  ░░░░░░░░░░░░░░░░░░██
└── Documentation              ░░░░░░░░░░░░░░██████
```

**Legend**: ✅ Done | 📝 In Progress | ⏳ Planned

---

## 2.2. MANAGEMENT APPROACH (Phương pháp quản lý)

### Development Methodology

**Agile Scrum Hybrid Approach**

Dự án áp dụng phương pháp Agile với các đặc điểm:

#### Sprint Structure
- **Sprint Duration**: 2 tuần/sprint
- **Total Sprints**: 7-8 sprints
- **Sprint Planning**: Đầu mỗi sprint (2 giờ)
- **Daily Standup**: Mỗi ngày (15 phút, online qua Discord)
- **Sprint Review**: Cuối sprint (1 giờ, demo với supervisor)
- **Sprint Retrospective**: Sau review (30 phút)

#### Sprint Breakdown

| Sprint # | Duration | Focus Area | Key Deliverables |
|----------|----------|------------|------------------|
| **Sprint 0** | Week 1-2 | Planning & Design | SRS, ERD, Use Cases, API Design |
| **Sprint 1** | Week 3-4 | Backend Core | Auth system, User API, Database setup |
| **Sprint 2** | Week 5-6 | Backend Modules | Subject/Class/Project APIs |
| **Sprint 3** | Week 7-8 | AI & Real-time | AI integration, WebSocket, Chat |
| **Sprint 4** | Week 9-10 | Frontend Core | Auth pages, Admin/Staff dashboards |
| **Sprint 5** | Week 11-12 | Frontend Features | Lecturer/Student dashboards, Groups |
| **Sprint 6** | Week 13-14 | Collaboration Tools | Video call, Whiteboard, Editor |
| **Sprint 7** | Week 15-16 | Testing & Deploy | Testing, bug fixes, deployment |

#### Why Agile?
- ✅ **Flexibility**: Dễ dàng điều chỉnh khi yêu cầu thay đổi
- ✅ **Early Feedback**: Demo cho supervisor mỗi 2 tuần
- ✅ **Risk Mitigation**: Phát hiện vấn đề sớm
- ✅ **Team Collaboration**: Daily standup giúp đồng bộ
- ✅ **Continuous Improvement**: Retrospective để học hỏi

### Version Control Strategy

**Git Workflow**: GitHub Flow (simplified Git Flow)

```
main (production-ready)
  ├── develop (integration branch)
  │   ├── feature/auth-system
  │   ├── feature/project-api
  │   ├── feature/video-call
  │   └── bugfix/notification-error
  └── hotfix/security-patch
```

#### Branch Naming Convention
- `main`: Production code (deploy-ready)
- `develop`: Development integration branch
- `feature/<feature-name>`: Tính năng mới
- `bugfix/<bug-name>`: Sửa lỗi
- `hotfix/<issue-name>`: Sửa lỗi khẩn cấp trên production

#### Commit Message Format
```
<type>(<scope>): <subject>

Examples:
feat(auth): add JWT authentication
fix(chat): resolve message not sending bug
docs(readme): update installation guide
test(api): add unit tests for project endpoints
```

### Project Management Tools

| Tool | Purpose | URL |
|------|---------|-----|
| **GitHub** | Version control, code repository | github.com/team/collabsphere |
| **Jira / Trello** | Task tracking, sprint board | [Link] |
| **Discord** | Daily communication, voice calls | [Link] |
| **Google Drive** | Document sharing, design files | [Link] |
| **Figma** | UI/UX design, prototyping | [Link] |
| **Postman** | API testing, documentation | [Link] |

---

## 2.3. PROJECT DELIVERABLES (Sản phẩm dự án)

### A. Technical Deliverables (Sản phẩm kỹ thuật)

| # | Deliverable | Description | Format | Due Date |
|---|-------------|-------------|--------|----------|
| 1 | **Source Code** | Full codebase (Backend + Frontend) | GitHub Repository | Week 16 |
| 2 | **Database Schema** | PostgreSQL database với sample data | SQL dump file | Week 16 |
| 3 | **Docker Images** | Containerized application | Docker Hub | Week 16 |
| 4 | **Deployed Application** | Live demo trên cloud | URL link | Week 16 |
| 5 | **API Documentation** | Swagger/OpenAPI specs | HTML + JSON | Week 14 |

### B. Documentation Deliverables (Tài liệu)

| # | Document | Description | Pages | Due Date |
|---|----------|-------------|-------|----------|
| 1 | **Software Requirements Specification (SRS)** | Chi tiết 72 features, use cases | 30-40 | Week 3 |
| 2 | **Software Design Description (SDD)** | Architecture, ERD, class/sequence diagrams | 40-50 | Week 4 |
| 3 | **Test Plan & Test Cases** | Test strategy, 100+ test cases | 20-30 | Week 14 |
| 4 | **Test Report** | Test results, bug reports, coverage | 10-15 | Week 15 |
| 5 | **User Manual** | Hướng dẫn sử dụng cho 5 roles | 30-40 | Week 15 |
| 6 | **Installation Guide** | Deploy instructions (local + cloud) | 10-15 | Week 15 |
| 7 | **Final Report** | Tài liệu đồ án tốt nghiệp đầy đủ | 150-200 | Week 16 |

### C. Presentation Deliverables

| # | Deliverable | Description | Duration | Due Date |
|---|-------------|-------------|----------|----------|
| 1 | **Mid-term Presentation** | Demo progress, architecture | 20 min | Week 8 |
| 2 | **Final Presentation** | Full demo, Q&A | 30 min | Week 16 |
| 3 | **Demo Video** | Screen recording với voice-over | 10 min | Week 16 |
| 4 | **Slide Deck** | PowerPoint/Google Slides | 30-40 slides | Week 16 |

---

## 2.4. RESPONSIBILITY ASSIGNMENTS (Phân công trách nhiệm)

### RACI Matrix

**Legend**: 
- **R** = Responsible (Người thực hiện)
- **A** = Accountable (Người chịu trách nhiệm chính)
- **C** = Consulted (Người tư vấn)
- **I** = Informed (Người được thông báo)

| Task / Activity | Team Leader | Backend Dev | Frontend Dev | Full-stack Dev | Tester/Designer | Supervisor |
|-----------------|-------------|-------------|--------------|----------------|-----------------|------------|
| **Planning & Requirements** |
| Requirements Analysis | A, R | C | C | C | C | C |
| SRS Document | A, R | R | C | C | C | I |
| Database Design | C | A, R | I | C | I | I |
| API Design | C | A, R | C | C | I | I |
| UI/UX Design | C | I | C | I | A, R | I |
| **Backend Development** |
| Project Setup | C | A, R | I | C | I | I |
| Authentication System | C | A, R | I | C | I | I |
| User Management API | I | A, R | I | C | I | I |
| Project/Group API | I | A, R | I | C | I | I |
| Evaluation API | I | A, R | I | C | I | I |
| File Upload | I | A, R | I | C | I | I |
| **AI & Real-time** |
| AI Integration | C | C | I | A, R | I | I |
| WebSocket Setup | I | C | I | A, R | I | I |
| Chat Implementation | I | C | C | A, R | I | I |
| Video Call | I | I | C | A, R | I | I |
| Whiteboard Sync | I | I | C | A, R | I | I |
| **Frontend Development** |
| React Setup | I | I | A, R | C | C | I |
| Authentication Pages | I | I | A, R | C | C | I |
| Admin Dashboard | I | I | A, R | C | C | I |
| Staff Dashboard | I | I | A, R | C | C | I |
| Lecturer Dashboard | I | I | A, R | C | C | I |
| Student Dashboard | I | I | A, R | C | C | I |
| Collaboration UI | I | I | A, R | C | C | I |
| **Testing** |
| Unit Testing | C | A, R | R | R | C | I |
| Integration Testing | C | A, R | C | C | C | I |
| Manual Testing | C | C | C | C | A, R | I |
| UAT | A | C | C | C | R | C |
| Bug Fixes | A | R | R | R | R | I |
| **Deployment** |
| Docker Setup | C | A, R | I | C | I | I |
| Cloud Deployment | C | C | I | A, R | I | I |
| Performance Tuning | C | A, R | I | C | I | I |
| **Documentation** |
| API Documentation | C | A, R | I | C | I | I |
| User Manual | A, C | I | C | I | A, R | I |
| Final Report | A, R | R | R | R | R | C |
| Presentation | A, R | C | C | C | C | I |

### Team Roles & Responsibilities

#### 1. **Team Leader** (Trưởng nhóm)
**Họ tên**: [TÊN THÀNH VIÊN]

**Trách nhiệm chính**:
- 📋 Quản lý tổng thể dự án, phân công công việc
- 📋 Liên lạc với supervisor, báo cáo tiến độ
- 📋 Tổ chức họp nhóm, sprint planning, retrospective
- 📋 Quản lý rủi ro và giải quyết conflicts
- 📋 Review code và ensure quality
- 💻 Backend development (authentication, user management)

#### 2. **Backend Developer** (Lập trình viên Backend)
**Họ tên**: [TÊN THÀNH VIÊN]

**Trách nhiệm chính**:
- 💻 Thiết kế và implement database schema
- 💻 Phát triển REST API với FastAPI
- 💻 Implement business logic và services
- 💻 Unit testing và API testing
- 💻 Setup Docker và deployment
- 📝 Viết API documentation

#### 3. **Frontend Developer** (Lập trình viên Frontend)
**Họ tên**: [TÊN THÀNH VIÊN]

**Trách nhiệm chính**:
- 🎨 Phát triển UI với React và Material-UI
- 🎨 Implement các pages cho 5 roles
- 🎨 Integrate với backend API
- 🎨 Responsive design cho mobile/tablet
- 🎨 Frontend testing với Jest
- 🎨 Optimize performance

#### 4. **Full-stack Developer** (Lập trình viên Full-stack)
**Họ tên**: [TÊN THÀNH VIÊN]

**Trách nhiệm chính**:
- 🔗 Tích hợp AI (AWS Bedrock)
- 🔗 Implement real-time features (WebSocket, WebRTC)
- 🔗 Phát triển chat, video call, whiteboard
- 🔗 Notification system (email + real-time)
- 🔗 Integration testing
- 🔗 Cloud deployment

#### 5. **UI/UX Designer & Tester** (Thiết kế & Kiểm thử)
**Họ tên**: [TÊN THÀNH VIÊN]

**Trách nhiệm chính**:
- 🎨 Thiết kế UI/UX, wireframes, mockups
- 🎨 User research và usability testing
- 🧪 Viết test plan và test cases
- 🧪 Manual testing và bug reporting
- 🧪 UAT với real users
- 📝 Viết user manual

---

## 2.5. PROJECT COMMUNICATIONS (Giao tiếp dự án)

### Communication Plan

#### A. Internal Team Communication (Giao tiếp nội bộ)

| Loại họp | Tần suất | Thời lượng | Công cụ | Mục đích |
|----------|----------|------------|---------|----------|
| **Daily Standup** | Hàng ngày | 15 phút | Discord (Voice) | Sync progress, blockers, plan |
| **Sprint Planning** | Mỗi 2 tuần | 2 giờ | Discord + Jira | Plan tasks cho sprint mới |
| **Sprint Review** | Mỗi 2 tuần | 1 giờ | Zoom + Screen share | Demo features cho team |
| **Sprint Retrospective** | Mỗi 2 tuần | 30 phút | Discord | Lessons learned, improvements |
| **Code Review** | As needed | 30 phút | GitHub PR | Review và feedback code |
| **Technical Discussion** | As needed | 1 giờ | Discord | Giải quyết technical issues |

#### B. Supervisor Communication (Giao tiếp với giảng viên)

| Loại họp | Tần suất | Thời lượng | Công cụ | Mục đích |
|----------|----------|------------|---------|----------|
| **Weekly Meeting** | Mỗi tuần | 30-45 phút | Zoom/MS Teams | Progress report, Q&A |
| **Mid-term Presentation** | Tuần 8 | 30 phút | On-site + Slides | Demo progress, get feedback |
| **Final Presentation** | Tuần 16 | 45 phút | On-site + Slides | Final demo, defense |
| **Ad-hoc Consultation** | As needed | 15-30 phút | Email/Zalo | Urgent questions |

#### C. Communication Channels

| Kênh | Mục đích | Response Time |
|------|----------|---------------|
| **Discord #general** | Thảo luận chung, thông báo | Real-time |
| **Discord #dev** | Technical discussions | Real-time |
| **Discord #bugs** | Bug reports và fixes | < 2 giờ |
| **GitHub Issues** | Track tasks, bugs, features | < 1 ngày |
| **GitHub PR** | Code reviews | < 1 ngày |
| **Email** | Formal communication với supervisor | < 24 giờ |
| **Zalo Group** | Urgent notifications | Real-time |
| **Google Drive** | Document sharing | N/A |

### Meeting Templates

#### Daily Standup Format
```
1. What did I do yesterday?
2. What will I do today?
3. Any blockers?
```

#### Weekly Supervisor Report
```
1. Progress this week (completed tasks)
2. Challenges encountered
3. Plan for next week
4. Questions/Concerns
```

---

## 2.6. CONFIGURATION MANAGEMENT (Quản lý cấu hình)

### Version Control

#### Git Repository Structure
```
collabsphere/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   ├── alembic/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
│   ├── package.json
│   └── Dockerfile
├── docs/
│   ├── api/
│   ├── design/
│   └── user-manual/
├── docker-compose.yml
└── README.md
```

#### Versioning Strategy

**Semantic Versioning**: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (v1.0.0 → v2.0.0)
- **MINOR**: New features (v1.0.0 → v1.1.0)
- **PATCH**: Bug fixes (v1.0.0 → v1.0.1)

**Release Schedule**:
- `v0.1.0` - Week 4: Backend core APIs
- `v0.2.0` - Week 8: AI & Real-time features
- `v0.3.0` - Week 12: Frontend MVP
- `v0.4.0` - Week 14: Full features
- `v1.0.0` - Week 16: Production release

### Code Quality Standards

#### Backend (Python)
- ✅ **PEP 8**: Follow Python style guide
- ✅ **Type hints**: Use typing module
- ✅ **Docstrings**: For all functions and classes
- ✅ **Linting**: pylint, flake8
- ✅ **Formatting**: black
- ✅ **Testing**: pytest với coverage >80%

#### Frontend (JavaScript/React)
- ✅ **ESLint**: Airbnb style guide
- ✅ **Prettier**: Code formatting
- ✅ **PropTypes**: Type checking
- ✅ **Component naming**: PascalCase
- ✅ **Testing**: Jest + React Testing Library

### CI/CD Pipeline

```
[Push to GitHub]
    ↓
[GitHub Actions]
    ├── Lint Check
    ├── Unit Tests
    ├── Build Docker Images
    └── Deploy to Staging (if develop branch)
    └── Deploy to Production (if main branch)
```

### Backup & Recovery

| Item | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| **Code** | Every commit | Forever | GitHub |
| **Database** | Daily | 30 days | Azure Backup |
| **Documents** | Daily | Forever | Google Drive |
| **Docker Images** | Every release | Forever | Docker Hub |

---

**END OF SECTION II - PROJECT MANAGEMENT PLAN**

---
