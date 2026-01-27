# SECTION VII: APPENDIX

**CollabSphere - Project-Based Learning Management System**

---

**Document Version**: 1.0  
**Last Updated**: January 27, 2026  
**Status**: Final

---

## TABLE OF CONTENTS

- [Appendix A: API Documentation](#appendix-a-api-documentation)
  - [A.1. API Overview](#a1-api-overview)
  - [A.2. Authentication Endpoints](#a2-authentication-endpoints)
  - [A.3. Core Module Endpoints](#a3-core-module-endpoints)
  - [A.4. Response Codes & Error Handling](#a4-response-codes--error-handling)
- [Appendix B: Database Schema Reference](#appendix-b-database-schema-reference)
  - [B.1. Database Overview](#b1-database-overview)
  - [B.2. Table Listing](#b2-table-listing)
  - [B.3. Key Relationships](#b3-key-relationships)
  - [B.4. Indexes & Constraints](#b4-indexes--constraints)
- [Appendix C: Deployment Guide](#appendix-c-deployment-guide)
  - [C.1. System Requirements](#c1-system-requirements)
  - [C.2. Docker Deployment](#c2-docker-deployment)
  - [C.3. Environment Configuration](#c3-environment-configuration)
  - [C.4. Production Considerations](#c4-production-considerations)
- [Appendix D: Source Code Repository](#appendix-d-source-code-repository)
  - [D.1. Repository Structure](#d1-repository-structure)
  - [D.2. Branch Strategy](#d2-branch-strategy)
  - [D.3. Development Workflow](#d3-development-workflow)
  - [D.4. Code Standards](#d4-code-standards)
- [Appendix E: Troubleshooting Guide](#appendix-e-troubleshooting-guide)
  - [E.1. Common Issues](#e1-common-issues)
  - [E.2. Backend Issues](#e2-backend-issues)
  - [E.3. Frontend Issues](#e3-frontend-issues)
  - [E.4. Docker Issues](#e4-docker-issues)

---

## APPENDIX A: API DOCUMENTATION

### A.1. API Overview

CollabSphere provides a comprehensive RESTful API built with FastAPI. The API follows REST principles and uses JSON for data exchange.

#### A.1.1. Base Information

| Property | Value |
|----------|-------|
| **Base URL** | `http://localhost:8000` (Development) |
| **API Version** | v1 |
| **Protocol** | HTTP/HTTPS |
| **Authentication** | JWT Bearer Token |
| **Content Type** | `application/json` |
| **Documentation** | `/docs` (Swagger UI), `/redoc` (ReDoc) |

#### A.1.2. API Statistics

| Metric | Count |
|--------|-------|
| **Total Endpoints** | 121 |
| **Routers** | 12 |
| **Authentication Required** | 108 endpoints |
| **Public Endpoints** | 13 endpoints |
| **Admin Only** | 15 endpoints |
| **Lecturer Only** | 28 endpoints |

#### A.1.3. API Modules

| Module | Router | Endpoints | Description |
|--------|--------|-----------|-------------|
| **Authentication** | `/auth` | 6 | User authentication & authorization |
| **Users** | `/users` | 8 | User management |
| **Subjects** | `/subjects` | 10 | Course/subject management |
| **Classes** | `/classes` | 10 | Class management |
| **Projects** | `/projects` | 15 | Project/topic management |
| **Groups** | `/groups` | 12 | Team/group management |
| **Evaluations** | `/evaluations` | 18 | Grading & evaluation |
| **Resources** | `/resources` | 8 | File & resource management |
| **Meetings** | `/meetings` | 9 | Video meeting management |
| **Chat** | `/chat` | 10 | Real-time messaging |
| **Notifications** | `/notifications` | 7 | Notification system |
| **AI** | `/ai` | 8 | AI-powered features |

---

### A.2. Authentication Endpoints

#### A.2.1. POST /auth/register

**Description**: Register a new user account

**Access**: Public

**Request Body**:
```json
{
  "username": "string",
  "email": "user@example.com",
  "password": "string",
  "full_name": "string",
  "role": "STUDENT"
}
```

**Response (201)**:
```json
{
  "id": 1,
  "username": "student123",
  "email": "student@example.com",
  "full_name": "John Doe",
  "role": "STUDENT",
  "created_at": "2026-01-27T08:00:00Z"
}
```

---

#### A.2.2. POST /auth/login

**Description**: Authenticate user and receive JWT tokens

**Access**: Public

**Request Body**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800,
  "user": {
    "id": 1,
    "username": "student123",
    "email": "student@example.com",
    "role": "STUDENT"
  }
}
```

---

#### A.2.3. POST /auth/logout

**Description**: Invalidate current session and tokens

**Access**: Authenticated users

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response (200)**:
```json
{
  "message": "Logged out successfully"
}
```

---

#### A.2.4. POST /auth/refresh-token

**Description**: Refresh access token using refresh token

**Access**: Public (requires valid refresh token)

**Request Body**:
```json
{
  "refresh_token": "string"
}
```

**Response (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 1800
}
```

---

#### A.2.5. GET /auth/me

**Description**: Get current authenticated user information

**Access**: Authenticated users

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response (200)**:
```json
{
  "id": 1,
  "username": "student123",
  "email": "student@example.com",
  "full_name": "John Doe",
  "role": "STUDENT",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_active": true,
  "created_at": "2026-01-15T10:30:00Z"
}
```

---

#### A.2.6. PATCH /auth/change-password

**Description**: Change user password

**Access**: Authenticated users

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request Body**:
```json
{
  "old_password": "string",
  "new_password": "string"
}
```

**Response (200)**:
```json
{
  "message": "Password changed successfully"
}
```

---

### A.3. Core Module Endpoints

#### A.3.1. Projects Module (`/projects`)

**GET /projects** - List all projects (with filters)
- Query params: `?status=APPROVED&lecturer_id=1&skip=0&limit=20`
- Returns: Paginated list of projects

**POST /projects** - Create new project (LECTURER only)
- Body: Project details (title, description, duration, etc.)
- Returns: Created project object

**GET /projects/{id}** - Get project details
- Returns: Full project information with milestones

**PATCH /projects/{id}** - Update project (Creator only)
- Body: Fields to update
- Returns: Updated project

**DELETE /projects/{id}** - Delete project (Creator only)
- Returns: Success message

**GET /projects/pending** - Get pending approval projects (HEAD only)
- Returns: List of projects awaiting approval

**POST /projects/{id}/approve** - Approve project (HEAD only)
- Returns: Approved project

**POST /projects/{id}/reject** - Reject project (HEAD only)
- Body: Rejection reason
- Returns: Rejected project

**GET /projects/{id}/milestones** - Get project milestones
- Returns: List of milestones

**POST /projects/{id}/milestones** - Create milestone
- Body: Milestone details
- Returns: Created milestone

**PATCH /milestones/{id}** - Update milestone
- Body: Fields to update
- Returns: Updated milestone

**DELETE /milestones/{id}** - Delete milestone
- Returns: Success message

**POST /projects/{id}/ai-milestones** - Generate milestones with AI
- Body: Project description, duration
- Returns: Generated milestones

**GET /projects/{id}/checkpoints** - Get project checkpoints
- Returns: List of checkpoints

**POST /projects/{id}/checkpoints** - Create checkpoint
- Body: Checkpoint details
- Returns: Created checkpoint

---

#### A.3.2. Groups Module (`/groups`)

**GET /groups** - List groups (with filters)
- Query params: `?project_id=1&class_id=2&skip=0&limit=20`
- Returns: Paginated list of groups

**POST /groups** - Create new group (STUDENT)
- Body: Group name, description, project_id
- Returns: Created group

**GET /groups/{id}** - Get group details
- Returns: Full group information with members

**PATCH /groups/{id}** - Update group (Leader only)
- Body: Fields to update
- Returns: Updated group

**DELETE /groups/{id}** - Delete/Disband group (Leader only)
- Returns: Success message

**GET /groups/{id}/members** - Get group members
- Returns: List of members with roles

**POST /groups/{id}/members** - Add member to group (Leader)
- Body: user_id, role (optional)
- Returns: Added member

**DELETE /groups/{id}/members/{user_id}** - Remove member (Leader)
- Returns: Success message

**POST /groups/{id}/leave** - Leave group (Member)
- Returns: Success message

**GET /groups/{id}/progress** - Get group progress
- Returns: Milestone completion status

**GET /groups/{id}/submissions** - Get group submissions
- Returns: List of checkpoint submissions

**POST /groups/{id}/submissions** - Submit checkpoint (Member)
- Body: checkpoint_id, files, description
- Returns: Created submission

---

#### A.3.3. Evaluations Module (`/evaluations`)

**GET /evaluations** - List evaluations (LECTURER)
- Query params: `?group_id=1&checkpoint_id=2&skip=0&limit=20`
- Returns: List of evaluations

**POST /evaluations** - Create evaluation (LECTURER)
- Body: Evaluation criteria and scores
- Returns: Created evaluation

**GET /evaluations/{id}** - Get evaluation details
- Returns: Full evaluation with scores

**PATCH /evaluations/{id}** - Update evaluation (LECTURER)
- Body: Fields to update
- Returns: Updated evaluation

**GET /evaluations/submissions** - Get submissions to grade (LECTURER)
- Returns: Pending submissions

**POST /evaluations/submissions/{id}/grade** - Grade submission (LECTURER)
- Body: scores, feedback
- Returns: Graded submission

**GET /peer-reviews** - List peer reviews
- Returns: Peer review data

**POST /peer-reviews** - Create peer review (STUDENT)
- Body: reviewee_id, criteria, ratings
- Returns: Created review

**GET /peer-reviews/{id}** - Get peer review details
- Returns: Full review

**GET /peer-reviews/results** - Get aggregated peer review results
- Returns: Statistical summary

**GET /evaluations/checkpoints/{id}** - Get checkpoint evaluations
- Returns: All evaluations for a checkpoint

**POST /evaluations/checkpoints/{id}** - Evaluate checkpoint (LECTURER)
- Body: Evaluation data
- Returns: Created evaluation

**GET /evaluations/group/{id}** - Get group evaluation summary
- Returns: Overall group performance

**POST /evaluations/group/{id}** - Evaluate group performance (LECTURER)
- Body: Evaluation criteria
- Returns: Created evaluation

**GET /evaluations/member/{user_id}** - Get member evaluation
- Returns: Individual member evaluation

**POST /evaluations/member/{user_id}** - Evaluate member (LECTURER)
- Body: Evaluation data
- Returns: Created evaluation

**GET /evaluations/my-grades** - Get current user's grades (STUDENT)
- Returns: Student's grade summary

**GET /evaluations/group/{id}/analytics** - Get group analytics (LECTURER)
- Returns: Performance analytics

---

### A.4. Response Codes & Error Handling

#### A.4.1. HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| **200** | OK | Request succeeded |
| **201** | Created | Resource created successfully |
| **204** | No Content | Request succeeded, no content returned |
| **400** | Bad Request | Invalid request data |
| **401** | Unauthorized | Authentication required or invalid |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource not found |
| **409** | Conflict | Resource conflict (duplicate) |
| **422** | Unprocessable Entity | Validation error |
| **500** | Internal Server Error | Server error |

#### A.4.2. Error Response Format

All error responses follow this structure:

```json
{
  "detail": "Error message",
  "status_code": 400,
  "timestamp": "2026-01-27T08:00:00Z",
  "path": "/api/projects/123",
  "errors": [
    {
      "field": "title",
      "message": "Title is required",
      "type": "value_error.missing"
    }
  ]
}
```

#### A.4.3. Common Error Messages

| Error | Message | Solution |
|-------|---------|----------|
| **Invalid credentials** | "Username or password is incorrect" | Verify login credentials |
| **Token expired** | "Token has expired" | Refresh token or login again |
| **Permission denied** | "You don't have permission to perform this action" | Check user role |
| **Resource not found** | "Project with id 123 not found" | Verify resource ID |
| **Duplicate entry** | "Username already exists" | Use different username |
| **Validation error** | "Field 'email' is not a valid email address" | Fix input data format |

---

## APPENDIX B: DATABASE SCHEMA REFERENCE

### B.1. Database Overview

#### B.1.1. Database Information

| Property | Value |
|----------|-------|
| **DBMS** | PostgreSQL 15 |
| **ORM** | SQLModel (SQLAlchemy + Pydantic) |
| **Total Tables** | 28 tables |
| **Migration Tool** | Alembic |
| **Connection Pool** | 10 (max 20 overflow) |
| **Charset** | UTF-8 |

#### B.1.2. Database Schema Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      COLLABSPHERE DATABASE                    │
└──────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┌────▼─────┐        ┌─────▼──────┐      ┌──────▼────────┐
   │  USERS   │        │  ACADEMIC  │      │   PROJECTS    │
   │  MODULE  │        │   MODULE   │      │    MODULE     │
   └────┬─────┘        └─────┬──────┘      └──────┬────────┘
        │                    │                     │
        │                    │                     │
   ┌────▼──────────────┬─────▼────────┬───────────▼─────────┐
   │                   │              │                     │
┌──▼────────┐   ┌─────▼────┐   ┌─────▼────────┐   ┌──────▼──────┐
│ GROUPS    │   │  CHAT    │   │ EVALUATION   │   │ RESOURCES   │
│ MODULE    │   │  MODULE  │   │   MODULE     │   │   MODULE    │
└───────────┘   └──────────┘   └──────────────┘   └─────────────┘
```

---

### B.2. Table Listing

#### B.2.1. Users & Authentication (4 tables)

**1. users**
- **Description**: Core user accounts table
- **Rows**: ~167 users (in test environment)
- **Key Fields**: id, username, email, full_name, hashed_password, role, avatar_url, is_active
- **Indexes**: username (UNIQUE), email (UNIQUE), role
- **Relationships**: 1:M with all user-related tables

**2. user_profiles**
- **Description**: Extended user profile information
- **Key Fields**: user_id (FK), bio, phone, address, date_of_birth, student_id, staff_id
- **Relationships**: 1:1 with users

**3. refresh_tokens**
- **Description**: JWT refresh token storage
- **Key Fields**: id, user_id (FK), token, expires_at, is_revoked
- **Relationships**: M:1 with users

**4. password_reset_tokens**
- **Description**: Password reset token tracking
- **Key Fields**: id, user_id (FK), token, expires_at, is_used
- **Relationships**: M:1 with users

---

#### B.2.2. Academic Module (4 tables)

**5. subjects**
- **Description**: Course/subject catalog
- **Key Fields**: id, code, name, description, credits, semester, lecturer_id (FK)
- **Indexes**: code (UNIQUE), lecturer_id
- **Relationships**: M:1 with users (lecturer), 1:M with classes, curriculums

**6. curriculums**
- **Description**: Course curriculum and learning outcomes
- **Key Fields**: id, subject_id (FK), title, description, learning_outcomes, order_index
- **Relationships**: M:1 with subjects

**7. classes**
- **Description**: Class instances for subjects
- **Key Fields**: id, name, subject_id (FK), lecturer_id (FK), semester, year, max_students
- **Indexes**: lecturer_id, subject_id
- **Relationships**: M:1 with subjects, users; 1:M with class_members

**8. class_members**
- **Description**: Student enrollment in classes
- **Key Fields**: id, class_id (FK), user_id (FK), joined_at
- **Indexes**: UNIQUE(class_id, user_id)
- **Relationships**: M:1 with classes, users

---

#### B.2.3. Projects Module (5 tables)

**9. projects**
- **Description**: Project/topic definitions
- **Key Fields**: id, title, description, creator_id (FK), subject_id (FK), duration_weeks, max_group_size, min_group_size, status (PENDING/APPROVED/REJECTED)
- **Indexes**: creator_id, subject_id, status
- **Relationships**: M:1 with users (creator), subjects; 1:M with groups, milestones

**10. class_projects**
- **Description**: Project assignments to classes
- **Key Fields**: id, class_id (FK), project_id (FK), assigned_at, deadline
- **Indexes**: UNIQUE(class_id, project_id)
- **Relationships**: M:1 with classes, projects

**11. milestones**
- **Description**: Project milestones/phases
- **Key Fields**: id, project_id (FK), title, description, start_date, end_date, order_index, required
- **Indexes**: project_id, order_index
- **Relationships**: M:1 with projects; 1:M with checkpoints

**12. checkpoints**
- **Description**: Milestone checkpoints for evaluation
- **Key Fields**: id, milestone_id (FK), title, description, due_date, weight_percentage, checkpoint_type
- **Indexes**: milestone_id, due_date
- **Relationships**: M:1 with milestones; 1:M with submissions

**13. project_templates**
- **Description**: Reusable project templates
- **Key Fields**: id, title, description, template_data (JSON), creator_id (FK)
- **Relationships**: M:1 with users

---

#### B.2.4. Groups Module (3 tables)

**14. groups**
- **Description**: Student project teams
- **Key Fields**: id, name, description, project_id (FK), class_id (FK), leader_id (FK), status
- **Indexes**: project_id, class_id, leader_id
- **Relationships**: M:1 with projects, classes, users (leader); 1:M with group_members

**15. group_members**
- **Description**: Group membership
- **Key Fields**: id, group_id (FK), user_id (FK), role, joined_at
- **Indexes**: UNIQUE(group_id, user_id)
- **Relationships**: M:1 with groups, users

**16. group_invitations**
- **Description**: Group join invitations
- **Key Fields**: id, group_id (FK), user_id (FK), invited_by (FK), status, expires_at
- **Indexes**: group_id, user_id, status
- **Relationships**: M:1 with groups, users

---

#### B.2.5. Evaluation Module (5 tables)

**17. submissions**
- **Description**: Checkpoint submission records
- **Key Fields**: id, group_id (FK), checkpoint_id (FK), submitted_by (FK), submission_url, description, submitted_at, status
- **Indexes**: group_id, checkpoint_id, submitted_at
- **Relationships**: M:1 with groups, checkpoints, users

**18. checkpoint_evaluations**
- **Description**: Lecturer evaluation of submissions
- **Key Fields**: id, submission_id (FK), evaluator_id (FK), score, max_score, feedback, evaluated_at
- **Indexes**: submission_id, evaluator_id
- **Relationships**: M:1 with submissions, users (evaluator)

**19. group_evaluations**
- **Description**: Overall group performance evaluation
- **Key Fields**: id, group_id (FK), evaluator_id (FK), criteria (JSON), total_score, feedback
- **Relationships**: M:1 with groups, users

**20. peer_reviews**
- **Description**: Peer evaluation between group members
- **Key Fields**: id, reviewer_id (FK), reviewee_id (FK), group_id (FK), checkpoint_id (FK), ratings (JSON), comments, created_at
- **Indexes**: group_id, checkpoint_id
- **Relationships**: M:1 with users (reviewer, reviewee), groups, checkpoints

**21. member_evaluations**
- **Description**: Individual member contribution evaluation
- **Key Fields**: id, member_id (FK), group_id (FK), evaluator_id (FK), contribution_score, teamwork_score, technical_score, comments
- **Relationships**: M:1 with users, groups

---

#### B.2.6. Communication Module (3 tables)

**22. chat_messages**
- **Description**: Team chat messages
- **Key Fields**: id, group_id (FK), user_id (FK), message, message_type, parent_id (FK for threads), created_at
- **Indexes**: group_id, created_at DESC
- **Relationships**: M:1 with groups, users; Self-referencing for threads

**23. meetings**
- **Description**: Video meeting records
- **Key Fields**: id, group_id (FK), host_id (FK), title, meeting_url, scheduled_at, started_at, ended_at, duration_minutes, status
- **Indexes**: group_id, scheduled_at
- **Relationships**: M:1 with groups, users (host); 1:M with meeting_participants

**24. meeting_participants**
- **Description**: Meeting attendance tracking
- **Key Fields**: id, meeting_id (FK), user_id (FK), joined_at, left_at, duration_minutes
- **Indexes**: meeting_id, user_id
- **Relationships**: M:1 with meetings, users

---

#### B.2.7. Resources Module (2 tables)

**25. resources**
- **Description**: Shared files and documents
- **Key Fields**: id, title, description, file_url, file_type, file_size, uploaded_by (FK), group_id (FK), project_id (FK), uploaded_at
- **Indexes**: group_id, project_id, uploaded_at DESC
- **Relationships**: M:1 with users (uploader), groups, projects

**26. whiteboard_sessions**
- **Description**: Collaborative whiteboard sessions
- **Key Fields**: id, group_id (FK), session_data (JSON), created_by (FK), updated_at
- **Relationships**: M:1 with groups, users

---

#### B.2.8. Notification Module (2 tables)

**27. notifications**
- **Description**: System notifications
- **Key Fields**: id, user_id (FK), title, message, notification_type, related_entity_type, related_entity_id, is_read, created_at
- **Indexes**: user_id, is_read, created_at DESC
- **Relationships**: M:1 with users

**28. notification_settings**
- **Description**: User notification preferences
- **Key Fields**: id, user_id (FK), email_enabled, push_enabled, preferences (JSON)
- **Relationships**: 1:1 with users

---

### B.3. Key Relationships

#### B.3.1. Entity Relationship Summary

```
users (1) ──< (M) projects [creator]
users (1) ──< (M) groups [leader]
users (1) ──< (M) group_members
users (1) ──< (M) class_members
users (1) ──< (M) submissions [submitted_by]
users (1) ──< (M) evaluations [evaluator]
users (1) ──< (M) chat_messages
users (1) ──< (M) notifications

subjects (1) ──< (M) classes
subjects (1) ──< (M) projects

classes (1) ──< (M) class_members
classes (1) ──< (M) groups
classes (1) ──< (M) class_projects

projects (1) ──< (M) groups
projects (1) ──< (M) milestones
projects (1) ──< (M) class_projects

milestones (1) ──< (M) checkpoints

groups (1) ──< (M) group_members
groups (1) ──< (M) submissions
groups (1) ──< (M) chat_messages
groups (1) ──< (M) meetings
groups (1) ──< (M) resources
groups (1) ──< (M) peer_reviews

checkpoints (1) ──< (M) submissions
submissions (1) ──< (M) checkpoint_evaluations

meetings (1) ──< (M) meeting_participants
```

#### B.3.2. Foreign Key Constraints

All foreign key relationships enforce referential integrity:

- **ON DELETE**: 
  - Most: `RESTRICT` (prevent deletion of referenced records)
  - Some: `CASCADE` (delete dependent records automatically)
  - Examples: Deleting a user doesn't delete their projects (RESTRICT), but deleting a project deletes its milestones (CASCADE)

- **ON UPDATE**: 
  - All: `CASCADE` (update references automatically)

---

### B.4. Indexes & Constraints

#### B.4.1. Primary Indexes

All tables have auto-incrementing primary key: `id SERIAL PRIMARY KEY`

#### B.4.2. Unique Constraints

| Table | Columns | Purpose |
|-------|---------|---------|
| users | username | Prevent duplicate usernames |
| users | email | Prevent duplicate emails |
| subjects | code | Unique subject codes |
| class_members | (class_id, user_id) | One enrollment per class |
| class_projects | (class_id, project_id) | One assignment per class |
| group_members | (group_id, user_id) | One membership per group |

#### B.4.3. Performance Indexes

| Table | Index | Columns | Purpose |
|-------|-------|---------|---------|
| users | idx_users_role | role | Fast role-based queries |
| projects | idx_projects_status | status | Filter by approval status |
| projects | idx_projects_creator | creator_id | Lecturer's projects |
| groups | idx_groups_project | project_id | Groups per project |
| groups | idx_groups_class | class_id | Groups per class |
| chat_messages | idx_chat_group_time | (group_id, created_at DESC) | Recent messages |
| notifications | idx_notif_user_read | (user_id, is_read, created_at DESC) | Unread notifications |
| submissions | idx_sub_checkpoint | checkpoint_id | Submissions per checkpoint |
| meetings | idx_meet_schedule | (group_id, scheduled_at) | Upcoming meetings |
| resources | idx_res_group_time | (group_id, uploaded_at DESC) | Recent uploads |

#### B.4.4. Check Constraints

| Table | Constraint | Validation |
|-------|------------|------------|
| users | role_check | role IN ('STUDENT', 'LECTURER', 'HEAD', 'STAFF', 'ADMIN') |
| projects | duration_check | duration_weeks > 0 AND duration_weeks <= 52 |
| projects | group_size_check | min_group_size <= max_group_size |
| projects | status_check | status IN ('PENDING', 'APPROVED', 'REJECTED') |
| checkpoints | weight_check | weight_percentage > 0 AND weight_percentage <= 100 |
| checkpoint_evaluations | score_check | score >= 0 AND score <= max_score |
| groups | status_check | status IN ('FORMING', 'ACTIVE', 'INACTIVE', 'DISBANDED') |

---

## APPENDIX C: DEPLOYMENT GUIDE

### C.1. System Requirements

#### C.1.1. Hardware Requirements

**Minimum (Development)**:
- CPU: 2 cores
- RAM: 4 GB
- Storage: 10 GB
- Network: Broadband internet

**Recommended (Production)**:
- CPU: 4+ cores
- RAM: 8+ GB
- Storage: 50+ GB SSD
- Network: High-speed connection with static IP

#### C.1.2. Software Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| **Docker** | 20.10+ | Container runtime |
| **Docker Compose** | 2.0+ | Multi-container orchestration |
| **Git** | 2.30+ | Version control |
| **Node.js** | 18+ LTS | Frontend build (if building locally) |
| **Python** | 3.11+ | Backend runtime (if running locally) |

#### C.1.3. Operating System Support

| OS | Status | Notes |
|----|--------|-------|
| **Ubuntu 20.04+** | ✅ Recommended | Best for production |
| **Debian 11+** | ✅ Supported | Stable alternative |
| **CentOS/RHEL 8+** | ✅ Supported | Enterprise option |
| **Windows 10/11** | ✅ Supported | Use Docker Desktop |
| **macOS** | ✅ Supported | Use Docker Desktop |

---

### C.2. Docker Deployment

#### C.2.1. Quick Start with Docker Compose

**Step 1: Clone Repository**
```bash
git clone https://github.com/yourusername/collabsphere.git
cd collabsphere
```

**Step 2: Configure Environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

**Step 3: Build and Start Services**
```bash
docker-compose up -d
```

**Step 4: Verify Services**
```bash
docker-compose ps
```

Expected output:
```
NAME                     STATUS    PORTS
collabsphere-frontend    Up        0.0.0.0:80->80/tcp
collabsphere-backend     Up        0.0.0.0:8000->8000/tcp
collabsphere-db          Up        0.0.0.0:5432->5432/tcp
collabsphere-redis       Up        0.0.0.0:6379->6379/tcp
```

#### C.2.2. Docker Compose Configuration

**File**: `docker-compose.yml`

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  db:
    image: postgres:15-alpine
    container_name: collabsphere-db
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER:-collabsphere}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-secure_password}
      POSTGRES_DB: ${DB_NAME:-collabsphere_db}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U collabsphere"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: collabsphere-redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # FastAPI Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: collabsphere-backend
    restart: always
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
      REDIS_URL: redis://redis:6379
      SECRET_KEY: ${SECRET_KEY}
      ALGORITHM: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: 30
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend/app:/app/app
      - backend_uploads:/app/uploads

  # React Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: collabsphere-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
  backend_uploads:
```

#### C.2.3. Docker Commands Reference

**Start all services**:
```bash
docker-compose up -d
```

**Stop all services**:
```bash
docker-compose down
```

**View logs**:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

**Restart service**:
```bash
docker-compose restart backend
```

**Rebuild after code changes**:
```bash
docker-compose up -d --build
```

**Database backup**:
```bash
docker exec collabsphere-db pg_dump -U collabsphere collabsphere_db > backup.sql
```

**Database restore**:
```bash
docker exec -i collabsphere-db psql -U collabsphere collabsphere_db < backup.sql
```

**Enter container shell**:
```bash
docker exec -it collabsphere-backend bash
```

---

### C.3. Environment Configuration

#### C.3.1. Environment Variables

**File**: `.env`

```bash
# Database Configuration
DB_HOST=db
DB_PORT=5432
DB_USER=collabsphere
DB_PASSWORD=your_secure_password
DB_NAME=collabsphere_db
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}

# Backend Configuration
SECRET_KEY=your-super-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS Settings
ALLOWED_ORIGINS=http://localhost,http://localhost:80,http://localhost:3000

# AWS Configuration (Optional - for file uploads)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=collabsphere-uploads

# Email Configuration (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@collabsphere.com

# AI Service Configuration (Optional)
OPENAI_API_KEY=your_openai_api_key
AI_MODEL=gpt-4

# Application Settings
DEBUG=false
LOG_LEVEL=INFO
ENVIRONMENT=production
```

#### C.3.2. Security Configuration

**Generate SECRET_KEY**:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Best Practices**:
1. Never commit `.env` file to Git
2. Use strong, unique passwords
3. Rotate SECRET_KEY regularly
4. Use environment-specific configurations
5. Enable HTTPS in production
6. Configure firewall rules

---

### C.4. Production Considerations

#### C.4.1. Performance Optimization

**Database**:
```sql
-- Enable query optimization
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;
```

**Backend**:
```python
# Increase worker processes in production
# uvicorn.run(app, workers=4, host="0.0.0.0", port=8000)
```

**Nginx Caching**:
```nginx
# Add to nginx.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m;
proxy_cache api_cache;
proxy_cache_valid 200 10m;
```

#### C.4.2. Monitoring Setup

**Health Check Endpoints**:
- Backend: `http://localhost:8000/health`
- Database: `docker exec collabsphere-db pg_isready`
- Redis: `docker exec collabsphere-redis redis-cli ping`

**Logging**:
```bash
# Centralized logging with Docker
docker-compose logs -f --tail=100 > /var/log/collabsphere.log
```

#### C.4.3. Backup Strategy

**Automated Daily Backup Script**:
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Database backup
docker exec collabsphere-db pg_dump -U collabsphere collabsphere_db | \
  gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Uploads backup
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz ./backend/uploads

# Keep only last 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Cron job** (run daily at 2 AM):
```bash
0 2 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1
```

#### C.4.4. Scaling Options

**Horizontal Scaling**:
```yaml
# docker-compose.yml
backend:
  deploy:
    replicas: 3
  # Add load balancer (nginx)
```

**Vertical Scaling**:
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '2'
        memory: 4G
      reservations:
        cpus: '1'
        memory: 2G
```

---

## APPENDIX D: SOURCE CODE REPOSITORY

### D.1. Repository Structure

#### D.1.1. Directory Tree

```
collabsphere/
├── .git/                       # Git version control
├── .github/                    # GitHub specific files
│   └── workflows/              # CI/CD workflows
│       └── docker-build.yml    # Docker build action
├── backend/                    # FastAPI backend
│   ├── alembic/                # Database migrations
│   │   ├── versions/           # Migration scripts
│   │   └── env.py             # Alembic configuration
│   ├── app/                    # Application code
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app entry
│   │   ├── config.py          # Configuration
│   │   ├── database.py        # Database connection
│   │   ├── models/            # SQLModel models
│   │   │   ├── user.py
│   │   │   ├── project.py
│   │   │   ├── group.py
│   │   │   └── ...
│   │   ├── routers/           # API endpoints
│   │   │   ├── auth.py
│   │   │   ├── projects.py
│   │   │   ├── groups.py
│   │   │   └── ...
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── auth.py
│   │   │   └── common.py
│   │   ├── services/          # Business logic
│   │   │   ├── ai_service.py
│   │   │   ├── notification_service.py
│   │   │   └── socket_service.py
│   │   └── utils/             # Utilities
│   │       ├── dependencies.py
│   │       └── security.py
│   ├── tests/                 # Backend tests
│   │   ├── test_auth.py
│   │   └── test_projects.py
│   ├── Dockerfile             # Backend Docker image
│   ├── requirements.txt       # Python dependencies
│   └── alembic.ini            # Alembic config
├── frontend/                  # React frontend
│   ├── public/                # Static files
│   │   ├── index.html
│   │   └── assets/
│   ├── src/                   # Source code
│   │   ├── App.js             # Root component
│   │   ├── index.js           # Entry point
│   │   ├── config.js          # Frontend config
│   │   ├── components/        # React components
│   │   │   ├── Auth/
│   │   │   ├── Collaboration/
│   │   │   ├── Common/
│   │   │   ├── Evaluation/
│   │   │   ├── Group/
│   │   │   ├── Layout/
│   │   │   ├── Meeting/
│   │   │   └── ...
│   │   ├── context/           # React contexts
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── pages/             # Page components
│   │   │   ├── Admin/
│   │   │   ├── Lecturer/
│   │   │   ├── Student/
│   │   │   └── ...
│   │   ├── services/          # API services
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   └── ...
│   │   └── styles/            # CSS/styling
│   ├── Dockerfile             # Frontend Docker image
│   ├── nginx.conf             # Nginx configuration
│   └── package.json           # Node dependencies
├── Documentation/             # Project documentation
│   ├── 00-FrontMatter.md
│   ├── 01-ProjectIntroduction.md
│   ├── 02-ProjectManagementPlan.md
│   ├── 03-SRS.md
│   ├── 04-SDD.md
│   ├── 05-Testing.md
│   ├── 06-UserGuides.md
│   └── 07-Appendix.md        # This document
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── docker-compose.yml         # Docker orchestration
└── README.md                  # Project overview
```

#### D.1.2. Key Files Description

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `backend/app/main.py` | FastAPI application entry | Medium |
| `backend/app/database.py` | Database connection setup | Low |
| `backend/alembic/versions/*.py` | Database migrations | Per schema change |
| `frontend/src/App.js` | React root component | Low |
| `frontend/src/config.js` | Frontend configuration | Low |
| `docker-compose.yml` | Service orchestration | Low |
| `.env` | Environment variables | Per deployment |
| `requirements.txt` | Python dependencies | Medium |
| `package.json` | Node dependencies | Medium |

---

### D.2. Branch Strategy

#### D.2.1. Branch Naming Conventions

**Branch Types**:

| Type | Pattern | Example | Purpose |
|------|---------|---------|---------|
| **Main** | `main` | `main` | Production-ready code |
| **Development** | `develop` | `develop` | Integration branch |
| **Feature** | `feature/<name>` | `feature/ai-milestones` | New features |
| **Bugfix** | `bugfix/<issue-id>` | `bugfix/AUTH-123` | Bug fixes |
| **Hotfix** | `hotfix/<issue-id>` | `hotfix/CRIT-456` | Critical production fixes |
| **Release** | `release/<version>` | `release/1.0.0` | Release preparation |

#### D.2.2. Git Workflow (GitFlow)

```
main (production)
  │
  ├── hotfix/CRIT-456 ──┐
  │                     │
  │◄────────────────────┘ (merge)
  │
develop (integration)
  │
  ├── feature/ai-milestones ──┐
  ├── feature/peer-review     │
  │                           │
  │◄──────────────────────────┘ (merge after review)
  │
  ├── release/1.0.0 ──┐
  │                   │
  │◄──────────────────┘ (merge)
  │
main ◄─────────────────── (release merge)
```

**Workflow Steps**:

1. **Create feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-feature
   ```

2. **Work on feature**:
   ```bash
   # Make changes
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

3. **Create Pull Request**: `feature/new-feature` → `develop`

4. **Code Review**: Team reviews changes

5. **Merge to develop**: After approval

6. **Release**: Create release branch → test → merge to `main` and `develop`

---

### D.3. Development Workflow

#### D.3.1. Setting Up Development Environment

**Step 1: Clone Repository**
```bash
git clone https://github.com/yourusername/collabsphere.git
cd collabsphere
```

**Step 2: Install Dependencies**

Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Frontend:
```bash
cd frontend
npm install
```

**Step 3: Configure Environment**
```bash
cp .env.example .env
# Edit .env with local configuration
```

**Step 4: Start Development Servers**

Backend:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Frontend:
```bash
cd frontend
npm start
```

**Step 5: Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

#### D.3.2. Making Changes

**Before Starting Work**:
```bash
# Update your local repository
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name
```

**During Development**:
```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add user profile editing"

# Push to remote
git push origin feature/your-feature-name
```

**After Completion**:
1. Create Pull Request on GitHub
2. Add description and link related issues
3. Request review from team members
4. Address review comments
5. Merge after approval

#### D.3.3. Pull Request Process

**PR Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #123
```

**PR Review Checklist**:
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors
- [ ] No merge conflicts
- [ ] Passes CI/CD pipeline

---

### D.4. Code Standards

#### D.4.1. Python (Backend) Standards

**PEP 8 Compliance**:
```python
# Good
def calculate_project_score(project_id: int, user_id: int) -> float:
    """
    Calculate final score for a project.
    
    Args:
        project_id: The project ID
        user_id: The user ID
        
    Returns:
        float: Final score between 0-100
    """
    # Implementation
    pass

# Bad
def calcScore(p,u):
    pass
```

**Type Hints**:
```python
from typing import List, Optional
from sqlmodel import Session

def get_user_projects(
    session: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 20
) -> List[Project]:
    """Get user's projects with pagination"""
    return session.query(Project).filter(
        Project.creator_id == user_id
    ).offset(skip).limit(limit).all()
```

**Linting with flake8**:
```bash
flake8 app/ --max-line-length=120
```

**Formatting with black**:
```bash
black app/
```

#### D.4.2. JavaScript (Frontend) Standards

**ESLint Configuration**:
```json
{
  "extends": ["react-app", "prettier"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

**Code Style**:
```javascript
// Good
const ProjectCard = ({ project, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(project.id);
  }, [project.id, onSelect]);

  return (
    <Card onClick={handleClick}>
      <CardContent>
        <Typography variant="h5">{project.title}</Typography>
      </CardContent>
    </Card>
  );
};

// Bad
function card(p) {
  return <div onClick={() => doSomething()}>{p.title}</div>;
}
```

**React Best Practices**:
- Use functional components with hooks
- Implement PropTypes or TypeScript
- Memoize expensive computations
- Use Context API for global state
- Split large components

#### D.4.3. Commit Message Convention

**Format**: `<type>(<scope>): <subject>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(auth): add password reset functionality
fix(groups): resolve member invitation bug
docs(api): update endpoint documentation
refactor(database): optimize query performance
test(evaluation): add peer review test cases
chore(deps): update FastAPI to 0.104.0
```

#### D.4.4. Code Review Guidelines

**For Reviewers**:
- ✅ Check code quality and standards
- ✅ Verify tests are included
- ✅ Ensure no security vulnerabilities
- ✅ Validate documentation updates
- ✅ Test functionality locally if needed
- ✅ Provide constructive feedback

**For Authors**:
- Keep PRs small and focused
- Write clear commit messages
- Add tests for new features
- Update documentation
- Respond to feedback promptly
- Resolve conflicts before requesting review

---

## APPENDIX E: TROUBLESHOOTING GUIDE

### E.1. Common Issues

#### E.1.1. Login Issues

**Problem**: Cannot login with correct credentials

**Possible Causes**:
1. Backend server not running
2. Database connection failed
3. Incorrect password
4. User account disabled

**Solutions**:
```bash
# 1. Check backend status
docker-compose ps backend

# 2. View backend logs
docker-compose logs backend

# 3. Verify user in database
docker exec -it collabsphere-db psql -U collabsphere -d collabsphere_db
SELECT id, username, email, is_active FROM users WHERE username='admin';

# 4. Reset password (if needed)
docker exec -it collabsphere-backend python -c "
from app.utils.security import get_password_hash
print(get_password_hash('newpassword'))
"
# Update in database with hashed password
```

---

#### E.1.2. Connection Refused Errors

**Problem**: `ECONNREFUSED` or `Connection refused` errors

**Possible Causes**:
1. Service not started
2. Wrong port
3. Firewall blocking
4. Network configuration issue

**Solutions**:
```bash
# Check all services running
docker-compose ps

# Check port bindings
netstat -tulpn | grep -E '80|8000|5432|6379'

# Restart services
docker-compose restart

# Check Docker network
docker network ls
docker network inspect collabsphere_default
```

---

#### E.1.3. Database Migration Errors

**Problem**: Alembic migration fails

**Solutions**:
```bash
# Check current migration version
docker exec collabsphere-backend alembic current

# View migration history
docker exec collabsphere-backend alembic history

# Downgrade one version
docker exec collabsphere-backend alembic downgrade -1

# Upgrade to latest
docker exec collabsphere-backend alembic upgrade head

# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

---

### E.2. Backend Issues

#### E.2.1. Import Errors

**Problem**: `ModuleNotFoundError` or import errors

**Solution**:
```bash
# Rebuild backend container
docker-compose build backend

# Reinstall dependencies
docker exec collabsphere-backend pip install -r requirements.txt

# Check Python path
docker exec collabsphere-backend python -c "import sys; print(sys.path)"
```

---

#### E.2.2. Database Connection Pool Exhausted

**Problem**: `TimeoutError: QueuePool limit exceeded`

**Solution**:
```python
# In database.py, increase pool size
engine = create_engine(
    settings.database_url,
    pool_size=20,  # Increase from 10
    max_overflow=40  # Increase from 20
)
```

---

#### E.2.3. JWT Token Errors

**Problem**: `Invalid token` or `Token expired`

**Solutions**:
```bash
# 1. Verify SECRET_KEY in .env
# 2. Clear browser localStorage
# 3. Generate new token:

docker exec -it collabsphere-backend python -c "
from app.utils.security import create_access_token
token = create_access_token({'sub': 'admin'})
print(token)
"
```

---

### E.3. Frontend Issues

#### E.3.1. Blank Page / White Screen

**Problem**: Frontend shows blank page

**Solutions**:
```bash
# Check browser console for errors (F12)

# Rebuild frontend
docker-compose build frontend
docker-compose up -d frontend

# Check nginx logs
docker-compose logs frontend

# Verify API connection
curl http://localhost:8000/health
```

---

#### E.3.2. API Calls Failing (CORS)

**Problem**: `CORS policy` errors in console

**Solution**:
```python
# In backend/app/main.py, verify CORS settings
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:80",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

#### E.3.3. WebSocket Connection Failed

**Problem**: Chat/notifications not working

**Solutions**:
```javascript
// Check WebSocket connection in browser console
// Verify backend WebSocket endpoint

// In frontend, check WebSocket URL
const socket = new WebSocket('ws://localhost:8000/ws');

socket.onopen = () => console.log('WebSocket connected');
socket.onerror = (error) => console.error('WebSocket error:', error);
```

---

### E.4. Docker Issues

#### E.4.1. Container Keeps Restarting

**Problem**: Container status shows `Restarting`

**Solutions**:
```bash
# View container logs
docker-compose logs --tail=50 <service_name>

# Check container exit code
docker ps -a

# Inspect container
docker inspect collabsphere-backend

# Common fixes:
# - Environment variable missing
# - Port already in use
# - Dependency service not ready
```

---

#### E.4.2. Port Already in Use

**Problem**: `Bind for 0.0.0.0:80 failed: port is already allocated`

**Solutions**:
```bash
# Find process using port
netstat -ano | findstr :80  # Windows
lsof -i :80  # Linux/Mac

# Kill process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # Linux/Mac

# Or change port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

---

#### E.4.3. Out of Disk Space

**Problem**: `no space left on device`

**Solutions**:
```bash
# Remove unused Docker resources
docker system prune -a --volumes

# Check Docker disk usage
docker system df

# Remove specific images
docker images
docker rmi <image_id>

# Remove dangling volumes
docker volume ls -f dangling=true
docker volume prune
```

---

#### E.4.4. Docker Desktop Not Starting (Windows)

**Problem**: Docker Desktop fails to start

**Solutions**:
1. Check WSL 2 is installed and updated
   ```powershell
   wsl --update
   wsl --set-default-version 2
   ```

2. Enable Virtualization in BIOS

3. Reset Docker Desktop
   - Settings → Troubleshoot → Reset to factory defaults

4. Reinstall Docker Desktop

---

### E.5. Performance Issues

#### E.5.1. Slow API Response

**Problem**: API endpoints take too long to respond

**Solutions**:
```python
# Add database query optimization
from sqlmodel import select
from sqlalchemy.orm import joinedload

# Bad (N+1 query problem)
projects = session.exec(select(Project)).all()
for project in projects:
    print(project.milestones)  # Each prints triggers new query

# Good (eager loading)
statement = select(Project).options(joinedload(Project.milestones))
projects = session.exec(statement).all()

# Add indexes to frequently queried columns
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_creator ON projects(creator_id);
```

---

#### E.5.2. High Memory Usage

**Problem**: Backend consuming too much memory

**Solutions**:
```yaml
# In docker-compose.yml, limit resources
backend:
  deploy:
    resources:
      limits:
        memory: 1G
      reservations:
        memory: 512M
```

---

### E.6. Getting Help

**Resources**:
- 📖 Official Documentation: `/Documentation`
- 🐛 Issue Tracker: GitHub Issues
- 💬 Team Chat: [Your team communication platform]
- 📧 Email Support: [support email]

**When Reporting Issues**:
1. Describe the problem clearly
2. Include steps to reproduce
3. Provide error messages/logs
4. Specify environment (OS, Docker version)
5. Attach screenshots if applicable

---

**END OF SECTION VII - APPENDIX**

---

**Document Information**

| Property | Value |
|----------|-------|
| **Total Pages** | ~25 pages |
| **Last Updated** | January 27, 2026 |
| **Version** | 1.0 |
| **Status** | Complete |

---

*For questions or clarification, please refer to the main documentation or contact the development team.*
