# PROJECT OBJECTIVES (MỤC TIÊU DỰ ÁN)

**Dự án**: CollabSphere - Project-Based Learning Management System  
**Mã dự án**: SP25SE107  
**Thời gian**: 2/12/2025 - 31/1/2026 (9 tuần)

---

## 1. OVERALL OBJECTIVE (Mục tiêu tổng quát)

Xây dựng một **nền tảng web toàn diện và thống nhất** hỗ trợ việc học tập dựa trên dự án (Project-Based Learning) tại các trường đại học, tích hợp đầy đủ các công cụ cộng tác, quản lý dự án, và trí tuệ nhân tạo nhằm:

- 🎯 **Giảm thiểu phân mảnh công cụ**: Thay thế 5-7 công cụ riêng lẻ bằng 1 nền tảng duy nhất
- 🎯 **Tăng hiệu quả cộng tác**: Cung cấp môi trường làm việc nhóm chuyên nghiệp và hiệu quả
- 🎯 **Minh bạch hóa đánh giá**: Theo dõi đóng góp cá nhân và đánh giá công bằng
- 🎯 **Tự động hóa quy trình**: Sử dụng AI để hỗ trợ lập kế hoạch và quản lý dự án

---

## 2. SPECIFIC OBJECTIVES (Mục tiêu cụ thể - SMART)

### 2.1. Technical Implementation Objectives (Mục tiêu triển khai kỹ thuật)

#### **OBJ-01: Xây dựng hệ thống Backend đầy đủ**
- **Specific**: Phát triển REST API với FastAPI cho 72 features, 15+ database tables
- **Measurable**: 
  - ≥50 API endpoints hoàn chỉnh
  - Test coverage ≥80%
  - Response time <500ms cho 95% requests
- **Achievable**: Team có 2 backend developers, tech stack proven
- **Relevant**: Core foundation cho toàn bộ hệ thống
- **Time-bound**: Hoàn thành Week 6 (Sprint 1-2)

**Success Criteria**:
- ✅ Authentication & Authorization (JWT, OAuth2, RBAC) hoạt động
- ✅ 5 main modules API: Users, Academic, Projects, Groups, Evaluations
- ✅ Database migrations với Alembic
- ✅ API documentation với Swagger/OpenAPI
- ✅ Docker containerization

---

#### **OBJ-02: Triển khai Frontend với UX chuyên nghiệp**
- **Specific**: Xây dựng Single Page Application với React, Material-UI cho 5 user roles
- **Measurable**:
  - 25+ pages/components hoàn chỉnh
  - Responsive design trên 3 breakpoints (mobile, tablet, desktop)
  - Lighthouse Performance Score ≥85
- **Achievable**: Team có frontend developer + designer
- **Relevant**: Giao diện là điểm tiếp xúc trực tiếp với users
- **Time-bound**: Hoàn thành Week 7 (Sprint 2-3)

**Success Criteria**:
- ✅ 5 role-based dashboards: Admin, Staff, Head, Lecturer, Student
- ✅ Project workflow: Create → Approve → Group formation → Workspace
- ✅ Responsive UI với consistent design system
- ✅ Loading states, error handling, form validation

---

#### **OBJ-03: Tích hợp AI để tự động hóa quy trình**
- **Specific**: Sử dụng AWS Bedrock (Claude 3 Sonnet) để auto-generate project milestones
- **Measurable**:
  - AI chatbot trả lời ≥80% câu hỏi liên quan PBL
  - Generate 5-10 milestones phù hợp cho project trong <10s
  - Cost per request <$0.05
- **Achievable**: AWS Bedrock API đã có sẵn, documentation đầy đủ
- **Relevant**: Differentiation factor, giảm workload cho lecturers
- **Time-bound**: Hoàn thành Week 5 (Sprint 2)

**Success Criteria**:
- ✅ AI Chatbot hỗ trợ brainstorming, Q&A về PBL methodology
- ✅ Auto-generate milestones từ project description + objectives
- ✅ Research questions cho từng milestone
- ✅ Integration với backend API

---

#### **OBJ-04: Xây dựng Real-time Collaboration Tools**
- **Specific**: Triển khai chat, video call, whiteboard với WebSocket và WebRTC
- **Measurable**:
  - Chat latency <200ms
  - Video call hỗ trợ 4-6 participants đồng thời
  - Whiteboard sync delay <100ms
- **Achievable**: Sử dụng Socket.IO, SimplePeer libraries
- **Relevant**: Core feature cho team collaboration
- **Time-bound**: Hoàn thành Week 7 (Sprint 3)

**Success Criteria**:
- ✅ Real-time text chat với message persistence
- ✅ Video conferencing với screen sharing
- ✅ Collaborative whiteboard với drawing tools
- ✅ Online presence indicators

---

### 2.2. Functional Objectives (Mục tiêu chức năng)

#### **OBJ-05: Hỗ trợ đầy đủ 5 User Roles**
- **Admin**: Quản lý users, system configuration, reports
- **Staff**: Import subjects/curricula, manage classes, assign lecturers
- **Department Head**: Approve/reject projects, assign projects to classes
- **Lecturer**: Create projects, manage groups, evaluate students
- **Student**: Join groups, collaborate, submit checkpoints, peer review

**Success Criteria**:
- ✅ Mỗi role có dashboard riêng với relevant features
- ✅ Role-Based Access Control (RBAC) hoạt động đúng
- ✅ Workflow approval rõ ràng (Lecturer → Head → Classes)

---

#### **OBJ-06: Quản lý vòng đời Project hoàn chỉnh**
- **Phases**: 
  1. Creation (Lecturer creates project with objectives)
  2. AI Milestone Generation (Auto-generate 5-10 milestones)
  3. Approval (Department Head reviews and approves)
  4. Assignment (Assign to classes)
  5. Group Formation (Students form groups, choose projects)
  6. Execution (Groups work on milestones in workspace)
  7. Evaluation (Submissions, peer reviews, lecturer grading)

**Success Criteria**:
- ✅ Clear status transitions (PENDING → APPROVED → ACTIVE → COMPLETED)
- ✅ Milestone cloning từ ProjectMilestone → GroupMilestone
- ✅ Submission checkpoints cho từng milestone
- ✅ Peer review và lecturer evaluation

---

#### **OBJ-07: Workspace cộng tác tích hợp**
- **Features trong Group Workspace**:
  - Kanban board cho task management
  - File sharing và version control
  - Real-time chat
  - Video call integration
  - Collaborative whiteboard
  - Checkpoint submissions
  - Contribution tracking

**Success Criteria**:
- ✅ All-in-one workspace, không cần tools bên ngoài
- ✅ Task assignment, status tracking, progress visualization
- ✅ File upload với CloudFront CDN
- ✅ Activity log cho transparency

---

### 2.3. Quality & Performance Objectives (Mục tiêu chất lượng)

#### **OBJ-08: Đảm bảo Performance và Scalability**
- **Performance**:
  - Page load time <2s
  - API response time <500ms (p95)
  - Database query time <100ms (p95)
- **Scalability**:
  - Hỗ trợ 500+ concurrent users
  - 1000+ projects và 5000+ groups
- **Availability**: 99% uptime

**Success Criteria**:
- ✅ Load testing với 500 concurrent users
- ✅ Database indexing cho queries chậm
- ✅ Caching với Redis cho frequently accessed data
- ✅ CDN cho static assets

---

#### **OBJ-09: Security và Data Protection**
- **Authentication**: JWT tokens, password hashing (bcrypt)
- **Authorization**: Role-Based Access Control (RBAC)
- **Data Protection**: HTTPS, input validation, SQL injection prevention
- **Privacy**: GDPR-compliant data handling

**Success Criteria**:
- ✅ No critical security vulnerabilities (OWASP Top 10)
- ✅ Rate limiting để prevent abuse
- ✅ Audit logs cho sensitive operations
- ✅ Secure password reset flow

---

### 2.4. Documentation Objectives (Mục tiêu tài liệu)

#### **OBJ-10: Tài liệu kỹ thuật đầy đủ**
- **Software Requirements Specification (SRS)**: 30-40 pages
- **Software Design Description (SDD)**: 40-50 pages
  - 1 System Architecture Diagram
  - 1 ERD với 15+ entities
  - 6 Class Diagrams
  - 10 Sequence Diagrams
  - 5 Activity Diagrams
- **API Documentation**: Swagger/OpenAPI specs
- **Test Plan & Report**: 100+ test cases

**Success Criteria**:
- ✅ Diagrams được vẽ bằng PlantUML, rõ ràng, professional
- ✅ Mỗi diagram có caption chi tiết giải thích
- ✅ Consistent formatting và terminology
- ✅ Supervisor approval

---

#### **OBJ-11: Hướng dẫn sử dụng và triển khai**
- **User Manual**: 30-40 pages cho 5 roles
- **Installation Guide**: Local và cloud deployment
- **API Documentation**: Interactive với Swagger UI
- **Demo Video**: 10 phút screen recording

**Success Criteria**:
- ✅ Step-by-step screenshots
- ✅ Troubleshooting section
- ✅ Docker deployment guide
- ✅ Cloud deployment guide (Azure/AWS)

---

## 3. LEARNING OBJECTIVES (Mục tiêu học tập)

### 3.1. Technical Skills

#### **Backend Development**
- ✅ Thiết kế RESTful API với FastAPI
- ✅ Database modeling và optimization (PostgreSQL, SQLModel)
- ✅ Authentication & Authorization (JWT, OAuth2)
- ✅ Testing với pytest, coverage >80%
- ✅ Docker containerization

#### **Frontend Development**
- ✅ React 18 với hooks (useState, useEffect, useContext)
- ✅ Material-UI component library
- ✅ State management (Context API)
- ✅ API integration với axios
- ✅ Responsive design

#### **Real-time & Integration**
- ✅ WebSocket với Socket.IO
- ✅ WebRTC cho video conferencing
- ✅ AI integration (AWS Bedrock)
- ✅ Cloud deployment (Azure, AWS)

---

### 3.2. Soft Skills

#### **Project Management**
- ✅ Agile/Scrum methodology
- ✅ Sprint planning và retrospectives
- ✅ Task estimation và tracking
- ✅ Risk management

#### **Teamwork & Communication**
- ✅ Git collaboration (branching, PRs, code review)
- ✅ Daily standups và sprint reviews
- ✅ Technical documentation writing
- ✅ Presentation skills

#### **Problem Solving**
- ✅ Requirements analysis từ đề bài
- ✅ System architecture design
- ✅ Debugging và troubleshooting
- ✅ Performance optimization

---

## 4. SUCCESS CRITERIA (Tiêu chí thành công)

### 4.1. Minimum Viable Product (MVP) Criteria

Dự án được coi là **thành công** khi đáp ứng các tiêu chí sau:

#### **A. Functional Completeness (70% weight)**
- ✅ **5 User Roles** hoạt động đầy đủ với dashboards riêng
- ✅ **Project Lifecycle** hoàn chỉnh: Create → Approve → Assign → Execute → Evaluate
- ✅ **Group Workspace** với task board, chat, file sharing
- ✅ **AI Integration** auto-generate milestones
- ✅ **Real-time Features**: Chat + Video call hoạt động
- ✅ **Evaluation System**: Submissions, peer review, grading

#### **B. Technical Quality (20% weight)**
- ✅ **Backend**: 50+ API endpoints, test coverage ≥80%
- ✅ **Frontend**: 25+ pages, responsive design
- ✅ **Performance**: Page load <2s, API response <500ms
- ✅ **Security**: No critical vulnerabilities
- ✅ **Deployment**: Docker + Cloud deployment working

#### **C. Documentation (10% weight)**
- ✅ **SRS + SDD**: Đầy đủ theo template, 70-90 pages
- ✅ **Diagrams**: 1 architecture, 1 ERD, 6 class, 10 sequence, 5 activity
- ✅ **User Manual**: 30-40 pages
- ✅ **API Docs**: Swagger interactive documentation

---

### 4.2. Grading Rubric Alignment

| Criteria | Weight | Target Score | Requirements |
|----------|--------|--------------|--------------|
| **Functionality** | 40% | 35-38/40 | All core features working, minimal bugs |
| **Technical Design** | 20% | 17-19/20 | Clean architecture, scalable design |
| **Code Quality** | 15% | 12-14/15 | Clean code, good practices, testing |
| **Documentation** | 15% | 12-14/15 | Complete SRS/SDD, clear diagrams |
| **Presentation** | 10% | 8-9/10 | Professional demo, good Q&A |
| **TOTAL** | 100% | **84-94/100** | **Target: Grade A (≥85)** |

---

### 4.3. Acceptance Criteria per Phase

#### **Phase 1: Planning & Design (Week 1)**
- ✅ Requirements analysis hoàn chỉnh
- ✅ SRS document ≥30 pages
- ✅ ERD với 15+ entities
- ✅ Use case diagrams cho 5 roles
- ✅ API design với 50+ endpoints

#### **Phase 2: Development (Week 2-7)**
- ✅ Sprint 1: Backend Core APIs (Auth, Users, Academic)
- ✅ Sprint 2: AI Integration + Frontend Core
- ✅ Sprint 3: Frontend Features + Collaboration Tools
- ✅ Weekly demos với supervisor

#### **Phase 3: Testing & Integration (Week 7-8)**
- ✅ 100+ test cases executed
- ✅ Bug reports và fixes documented
- ✅ UAT với real users (3-5 users)
- ✅ Performance testing

#### **Phase 4: Deployment & Finalization (Week 9)**
- ✅ Docker deployment local working
- ✅ Cloud deployment (Azure/AWS) successful
- ✅ Final documentation complete
- ✅ Presentation deck và demo video ready

---

## 5. KEY PERFORMANCE INDICATORS (KPIs)

### 5.1. Development KPIs

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| **Sprint Velocity** | 40-50 story points/sprint | Jira/Trello tracking |
| **Code Commit Frequency** | 5-10 commits/day/developer | GitHub insights |
| **PR Review Time** | <24 hours | GitHub PR metrics |
| **Test Coverage** | ≥80% | pytest-cov report |
| **Build Success Rate** | ≥95% | CI/CD pipeline |
| **Bug Resolution Time** | <3 days for critical | Issue tracker |

---

### 5.2. Product KPIs

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| **API Response Time** | <500ms (p95) | Application logs |
| **Page Load Time** | <2s | Lighthouse audit |
| **API Uptime** | ≥99% | Monitoring dashboard |
| **Concurrent Users Support** | 500+ users | Load testing |
| **Feature Completeness** | 100% (72/72 features) | Feature checklist |

---

### 5.3. Documentation KPIs

| Document | Target Pages | Diagrams | Status |
|----------|--------------|----------|--------|
| **SRS** | 30-40 | 5 use cases | 📝 In Progress |
| **SDD** | 40-50 | 1 arch + 1 ERD + 6 class + 10 seq + 5 act | 📝 In Progress |
| **Test Plan** | 20-30 | - | ⏳ Planned |
| **User Manual** | 30-40 | Screenshots | ⏳ Planned |
| **Final Report** | 150-200 | All diagrams | ⏳ Planned |

---

## 6. RISKS & MITIGATION (Rủi ro & Biện pháp)

### 6.1. Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **AI API costs exceed budget** | Medium | Medium | Use rate limiting, cache responses, implement fallback |
| **WebRTC compatibility issues** | High | Medium | Test on multiple browsers, provide fallback to chat |
| **Database performance bottleneck** | Medium | High | Indexing, query optimization, caching với Redis |
| **Cloud deployment issues** | Medium | High | Test deployment early, prepare backup hosting |
| **Real-time sync lag** | Medium | Medium | Optimize Socket.IO, use efficient data structures |

---

### 6.2. Project Management Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Scope creep** | High | High | Strict change control, prioritize MVP features |
| **Timeline delays** | Medium | High | Buffer time in schedule, compress less critical features |
| **Team member unavailability** | Medium | Medium | Cross-training, documentation, code reviews |
| **Communication gaps** | Low | Medium | Daily standups, Discord always-on, clear documentation |
| **Integration conflicts** | Medium | Medium | Feature branches, frequent merges, integration tests |

---

## 7. ALIGNMENT WITH COURSE OBJECTIVES

### Software Engineering Principles Demonstrated

1. ✅ **Requirements Engineering**: SRS với use cases, user stories
2. ✅ **System Design**: Architecture, ERD, class diagrams, sequence diagrams
3. ✅ **Implementation**: Clean code, design patterns, best practices
4. ✅ **Testing**: Unit tests, integration tests, UAT
5. ✅ **Deployment**: Docker, CI/CD, cloud hosting
6. ✅ **Documentation**: Technical và user documentation đầy đủ
7. ✅ **Project Management**: Agile/Scrum, sprint planning, tracking

---

## 8. EXPECTED OUTCOMES (Kết quả mong đợi)

### 8.1. Product Outcomes

- 📦 **Deliverable**: Full-stack web application với 72 features
- 📦 **Deployment**: Live demo URL + Docker images trên Docker Hub
- 📦 **Code**: GitHub repository với clean codebase
- 📦 **Documentation**: 150-200 pages technical documentation

---

### 8.2. Learning Outcomes

- 🎓 **Technical Expertise**: Full-stack development với modern tech stack
- 🎓 **Project Management**: Agile methodology, team collaboration
- 🎓 **Problem Solving**: Real-world software engineering challenges
- 🎓 **Communication**: Technical documentation, presentations

---

### 8.3. Impact Outcomes

- 🌟 **Academic**: Grade A (≥85/100) cho capstone project
- 🌟 **Portfolio**: Impressive project cho job applications
- 🌟 **Real-world Value**: Potential deployment tại FPT University
- 🌟 **Future Development**: Foundation cho startup opportunity

---

## 9. CONCLUSION

CollabSphere project được thiết kế với **mục tiêu rõ ràng, đo lường được, và khả thi** trong timeline 9 tuần. Các objectives được align với:

- ✅ **Academic requirements**: Đáp ứng đầy đủ yêu cầu capstone project
- ✅ **Technical goals**: Demonstrate full-stack expertise
- ✅ **Real-world needs**: Giải quyết vấn đề thực tế trong PBL
- ✅ **Career development**: Portfolio project ấn tượng

Success của project được đo lường qua **3 dimensions**:
1. **Functional completeness** (70%): All core features working
2. **Technical quality** (20%): Performance, security, scalability
3. **Documentation** (10%): Complete và professional

Với kế hoạch chi tiết, risk mitigation strategies, và commitment từ toàn team, project có khả năng cao đạt được **target grade A (85-95/100)**.

---

**Document Version**: 1.0  
**Last Updated**: January 13, 2026  
**Approved By**: [Team Leader]  
**Next Review**: End of Sprint 1 (Week 3)
