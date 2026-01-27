# IV. SOFTWARE DESIGN DESCRIPTION (SDD)

**Mô tả Thiết kế Phần mềm - CollabSphere**

---

## DOCUMENT INFORMATION

| Thông tin | Nội dung |
|-----------|----------|
| **Document Title** | Software Design Description (SDD) |
| **Project Name** | CollabSphere - Project-Based Learning Management System |
| **Project Code** | SP25SE107 |
| **Version** | 1.0 |
| **Date** | January 4, 2026 |
| **Status** | Draft |

---

## TABLE OF CONTENTS

### [4.1. System Design](04-SDD/4.1-SystemDesign.md) (~20 pages)
Thiết kế kiến trúc tổng thể hệ thống:
- Architecture Overview (3-Tier Pattern)
- Technology Stack (React + FastAPI + PostgreSQL)
- Component Architecture (Frontend & Backend structure)
- Deployment Architecture (Docker Compose)
- Communication Protocols (REST, WebSocket, WebRTC)
- Security Architecture (JWT, RBAC)
- Scalability & Monitoring

### [4.2. Database Design](04-SDD/4.2-DatabaseDesign.md) (~30 pages)
Thiết kế cơ sở dữ liệu chi tiết:
- Database Overview (PostgreSQL 15, 28 tables)
- ERD Conceptual Model (6 entity groups)
- ERD Logical Model (Relationships & Cardinality)
- **ERD Physical Model (Complete specifications)**:
  * Users & Academic (5 tables)
  * Projects & Groups (8 tables)
  * Collaboration (6 tables)
  * Evaluation (6 tables)
  * Notifications (1 table)
  * Additional (2 tables)
- Database Optimization (40+ indexes, query optimization)
- Backup & Recovery Strategy
- Database Migrations (Alembic)

### [4.3. Detailed Design](04-SDD/4.3-DetailedDesign.md) (~35 pages)
Thiết kế chi tiết API và Business Logic:
- **API Design (60+ endpoints)**: 12 modules documented
  * Authentication & Authorization
  * Users, Subjects, Classes Management
  * Projects & Approval Workflow
  * Groups, Tasks, Milestones
  * Evaluations & Peer Reviews
  * Chat, Meetings, Resources
  * AI Assistant Integration
  * Notifications
- **Business Logic Flows**: Authentication, Project Approval, Peer Review
- **Class Design**: SQLModel classes, React components
- **Sequence Diagrams**: Key interaction flows
- **Security Design**: JWT authentication, RBAC matrix, input validation
- **Error Handling**: Exception strategy, frontend error handling
- **Performance Optimization**: Database queries, caching, code splitting
- **Testing Considerations**: Unit tests, integration tests
- **Deployment Configuration**: Docker Compose, environment variables

---

## SUMMARY

**Total Section IV: ~85 pages** of comprehensive technical documentation

- ✅ **System Architecture**: Complete 3-tier architecture with Docker deployment
- ✅ **Database Design**: All 28 tables fully specified with indexes and optimization
- ✅ **API Documentation**: 60+ REST endpoints with request/response schemas
- ✅ **Security Design**: JWT authentication, RBAC authorization, input validation
- ✅ **Business Logic**: Core workflows (authentication, project approval, peer review)
- ✅ **Integration**: AWS Bedrock (AI), Cloudinary (storage), Socket.IO (real-time)

---

## DOCUMENT OVERVIEW

Tài liệu này mô tả **chi tiết thiết kế phần mềm** của hệ thống CollabSphere từ góc nhìn kỹ thuật, bao gồm:

### Mục đích tài liệu

1. **Hướng dẫn implementation**: Cung cấp blueprint chi tiết cho developers
2. **Cơ sở review**: Cho architects và technical leads đánh giá thiết kế
3. **Tài liệu bảo trì**: Giúp hiểu cấu trúc hệ thống khi maintenance
4. **Chuẩn integration**: Định nghĩa interfaces và protocols

### Đối tượng đọc

- **Solution Architects**: Đánh giá kiến trúc tổng thể
- **Backend Developers**: Hiểu API design và database schema
- **Frontend Developers**: Hiểu data models và API contracts
- **DevOps Engineers**: Hiểu deployment architecture
- **QA Engineers**: Hiểu system components để test

### Cấu trúc tài liệu

Tài liệu được chia thành **3 phần chính**:

#### **Section 4.1: System Design** 
Mô tả kiến trúc hệ thống từ high-level:
- **Architecture Pattern**: 3-Tier Architecture (Presentation - Application - Data)
- **Technology Stack**: Frontend (React), Backend (FastAPI/Python), Database (PostgreSQL)
- **Component Diagram**: Các thành phần chính và mối quan hệ
- **Deployment Architecture**: Cấu trúc triển khai với Docker
- **Communication Protocols**: REST API, WebSocket, WebRTC

#### **Section 4.2: Database Design**
Thiết kế cơ sở dữ liệu chi tiết:
- **ERD Conceptual Model**: 6 nhóm thực thể chính
- **ERD Logical Model**: Relationships và cardinality
- **ERD Physical Model**: Schema chi tiết 28 tables
- **Table Specifications**: Columns, types, constraints, indexes
- **Database Optimization**: Indexing strategy, query optimization

#### **Section 4.3: Detailed Design**
Thiết kế chi tiết các thành phần:
- **API Design**: 60+ REST endpoints với request/response schemas
- **Business Logic**: Core workflows và business rules
- **Security Design**: Authentication, authorization, data protection
- **Error Handling**: Exception handling strategy
- **Integration Points**: External services (AWS, Cloudinary, SMTP)

---

## DESIGN PRINCIPLES

Các nguyên tắc thiết kế được áp dụng:

### 1. **Separation of Concerns**
- Frontend và Backend tách biệt hoàn toàn
- Mỗi module có trách nhiệm rõ ràng
- Models, Services, Routers phân tách

### 2. **RESTful Design**
- API tuân thủ REST principles
- HTTP methods đúng mục đích (GET, POST, PUT, DELETE)
- Resource-based URLs

### 3. **Security by Design**
- Authentication required cho tất cả protected endpoints
- Role-Based Access Control (RBAC)
- Input validation ở mọi layer
- Secure password hashing (bcrypt)

### 4. **Scalability**
- Stateless API design
- Database indexing optimization
- Horizontal scaling capability

### 5. **Maintainability**
- Clean code structure
- Comprehensive documentation
- Type hints (Python) và TypeScript (Frontend)
- Separation of business logic và data access

---

## TECHNOLOGY STACK OVERVIEW

### **Frontend Stack**
```
React 18.2+              - UI framework
Material-UI (MUI)        - Component library
Tailwind CSS             - Utility-first CSS
React Router v6          - Client-side routing
Axios                    - HTTP client
Socket.IO Client         - Real-time communication
Context API              - State management
React Hook Form          - Form validation
```

### **Backend Stack**
```
Python 3.11+             - Programming language
FastAPI 0.104+           - Web framework
SQLModel                 - ORM (based on SQLAlchemy)
Pydantic                 - Data validation
JWT (python-jose)        - Authentication
bcrypt                   - Password hashing
Alembic                  - Database migrations
Socket.IO                - WebSocket server
```

### **Database & Storage**
```
PostgreSQL 15            - Primary database
Redis (optional)         - Caching layer
Cloudinary               - File/image storage
```

### **AI & External Services**
```
AWS Bedrock              - AI/LLM service
SMTP (Gmail/SendGrid)    - Email service
WebRTC (PeerJS)          - Video calling
```

### **DevOps & Deployment**
```
Docker                   - Containerization
Docker Compose           - Multi-container orchestration
Nginx                    - Reverse proxy
GitHub Actions           - CI/CD pipeline
```

---

## ARCHITECTURAL PATTERNS

### 1. **Three-Tier Architecture**
```
┌─────────────────────────────────────┐
│   PRESENTATION TIER (Frontend)      │
│   - React SPA                        │
│   - Client-side routing              │
│   - UI components                    │
└─────────────────┬───────────────────┘
                  │ HTTPS/REST API
                  │ WebSocket
┌─────────────────▼───────────────────┐
│   APPLICATION TIER (Backend)        │
│   - FastAPI application              │
│   - Business logic                   │
│   - API routers                      │
│   - Services                         │
└─────────────────┬───────────────────┘
                  │ SQL/ORM
┌─────────────────▼───────────────────┐
│   DATA TIER (Database)               │
│   - PostgreSQL                       │
│   - 28 tables                        │
│   - Indexes & constraints            │
└─────────────────────────────────────┘
```

### 2. **MVC-like Pattern (Backend)**
```
Models (SQLModel)
  ↓ Define
Views/Routers (FastAPI)
  ↓ Handle requests
Services (Business Logic)
  ↓ Process
Database (PostgreSQL)
```

### 3. **Component-Based Architecture (Frontend)**
```
Pages
  └── Contains
Components
  └── Uses
Services/API
  └── Calls
Backend API
```

---

## SYSTEM CONSTRAINTS

### Technical Constraints
1. **Browser Support**: Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
2. **Database**: PostgreSQL 15+ required
3. **Python Version**: 3.11+ required for backend
4. **Node.js**: 16+ required for frontend build
5. **Network**: Minimum 1 Mbps for basic features, 2 Mbps for video calls

### Security Constraints
1. All API communications must use HTTPS in production
2. JWT tokens expire after 24 hours
3. Password minimum 6 characters (8+ recommended)
4. File uploads limited to 100MB per file
5. Rate limiting: 100 requests/minute per user

### Business Constraints
1. Maximum 500 concurrent users (can be scaled)
2. Maximum 5 members per team
3. Maximum 20 participants per video call
4. Database storage: Initial 100GB quota

---

## ASSUMPTIONS AND DEPENDENCIES

### Assumptions
1. Users have stable internet connection (minimum 1 Mbps)
2. Modern browsers with JavaScript enabled
3. Users understand basic PBL concepts
4. Email addresses provided are valid and accessible
5. Video calls require camera/microphone permissions

### Dependencies
1. **External Services**:
   - AWS Bedrock API availability (for AI features)
   - Cloudinary service (for file storage)
   - SMTP server (for email notifications)

2. **Third-party Libraries**:
   - FastAPI framework updates
   - React library updates
   - PostgreSQL version compatibility

3. **Infrastructure**:
   - Docker runtime environment
   - Sufficient server resources (2GB RAM minimum)

---

## REVISION HISTORY

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-01-04 | Development Team | Initial SDD document |
| | | | |

---

## REFERENCES

### Internal Documents
1. [00-FrontMatter.md](../00-FrontMatter.md) - Project overview
2. [01-ProjectIntroduction.md](../01-ProjectIntroduction.md) - Business context
3. [02-ProjectManagementPlan.md](../02-ProjectManagementPlan.md) - Project planning
4. [03-SRS.md](../03-SRS.md) - Requirements specification
5. [ERD_DATABASE_DESIGN_COLLABSPHERE.md](../../ERD_DATABASE_DESIGN_COLLABSPHERE.md) - Database design details

### External Standards
1. **REST API Design**: Roy Fielding's dissertation on REST
2. **PostgreSQL Documentation**: https://www.postgresql.org/docs/
3. **FastAPI Documentation**: https://fastapi.tiangolo.com/
4. **React Documentation**: https://react.dev/
5. **Docker Best Practices**: https://docs.docker.com/develop/dev-best-practices/

### Technology References
1. **SQLModel**: https://sqlmodel.tiangolo.com/
2. **Socket.IO**: https://socket.io/docs/
3. **WebRTC**: https://webrtc.org/
4. **AWS Bedrock**: https://aws.amazon.com/bedrock/
5. **Material-UI**: https://mui.com/

---

## DOCUMENT APPROVAL

This Software Design Description document has been reviewed and approved by:

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Solution Architect** | [Name] | _____________ | ______ |
| **Lead Backend Developer** | [Name] | _____________ | ______ |
| **Lead Frontend Developer** | [Name] | _____________ | ______ |
| **Database Administrator** | [Name] | _____________ | ______ |
| **Project Supervisor** | [Lecturer Name] | _____________ | ______ |

---

**[← Back to Project Management Plan](../02-ProjectManagementPlan.md)** | **[Next: Section V - Testing →](../05-Testing.md)**
