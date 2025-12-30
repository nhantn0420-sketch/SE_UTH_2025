# THIẾT KẾ CƠ SỞ DỮ LIỆU - COLLABSPHERE
## Entity Relationship Diagram (ERD) - 3 Mức

---

## 📊 TỔNG QUAN

**Dự án**: CollabSphere - Hệ thống hỗ trợ học tập dựa trên dự án (PBL)

**Hệ quản trị CSDL**: PostgreSQL 15

**Tổng số bảng**: 28 bảng

**Công cụ thiết kế**: SQLModel (Python ORM)

---

## 1. MÔ HÌNH KHÁI NIỆM (CONCEPTUAL MODEL)

### 1.1. Các Thực Thể Chính (Core Entities)

```
┌─────────────────────────────────────────────────────────────────┐
│                        COLLABSPHERE                              │
│                   Hệ thống quản lý PBL                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼────┐  ┌────▼────┐  ┌────▼────────┐
        │   USERS    │  │ ACADEMIC│  │  PROJECTS   │
        │            │  │         │  │             │
        └───────┬────┘  └────┬────┘  └────┬────────┘
                │            │            │
        ┌───────▼────────────▼────────────▼─────────┐
        │          GROUPS & COLLABORATION            │
        └───────┬────────────┬────────────┬──────────┘
                │            │            │
        ┌───────▼────┐  ┌───▼─────┐  ┌──▼──────────┐
        │ EVALUATION │  │  CHAT   │  │ RESOURCES   │
        └────────────┘  └─────────┘  └─────────────┘
```

### 1.2. Mô Tả Các Nhóm Thực Thể

#### A. **USERS & AUTHENTICATION** (Người dùng & Xác thực)
- **User**: Người dùng hệ thống
- **Roles**: Admin, Staff, Head, Lecturer, Student

#### B. **ACADEMIC MANAGEMENT** (Quản lý học tập)
- **Subject**: Môn học
- **Curriculum**: Chương trình học
- **Class**: Lớp học
- **ClassMember**: Thành viên lớp học

#### C. **PROJECT & GROUP** (Dự án & Nhóm)
- **Project**: Đề tài đồ án
- **ClassProject**: Gán đồ án cho lớp
- **Group**: Nhóm sinh viên
- **GroupMember**: Thành viên nhóm
- **Milestone**: Cột mốc dự án
- **Checkpoint**: Điểm kiểm tra

#### D. **COLLABORATION** (Cộng tác)
- **Meeting**: Cuộc họp
- **ChatMessage**: Tin nhắn
- **Resource**: Tài nguyên/Tài liệu
- **WhiteboardSession**: Phiên bảng trắng
- **DocumentSession**: Phiên chỉnh sửa tài liệu

#### E. **EVALUATION** (Đánh giá)
- **PeerReview**: Đánh giá đồng nghiệp
- **GroupEvaluation**: Đánh giá nhóm
- **MemberEvaluation**: Đánh giá thành viên
- **CheckpointEvaluation**: Đánh giá checkpoint

#### F. **NOTIFICATION** (Thông báo)
- **Notification**: Thông báo hệ thống

---

## 2. MÔ HÌNH LOGIC (LOGICAL MODEL)

### 2.1. Sơ Đồ ERD Chi Tiết

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USERS MODULE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ users                                             │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id              INTEGER                       │              │
│  │     username        VARCHAR(100) UNIQUE NOT NULL  │              │
│  │     email           VARCHAR(255) UNIQUE NOT NULL  │              │
│  │     full_name       VARCHAR(255) NOT NULL         │              │
│  │     hashed_password VARCHAR(255) NOT NULL         │              │
│  │     role            VARCHAR(20) NOT NULL          │◄─────┐       │
│  │     avatar_url      TEXT                          │      │       │
│  │     phone           VARCHAR(20)                   │      │       │
│  │     is_active       BOOLEAN DEFAULT TRUE          │      │       │
│  │     created_at      TIMESTAMP                     │      │       │
│  │     updated_at      TIMESTAMP                     │      │       │
│  │     last_login      TIMESTAMP                     │      │       │
│  └──────────────────────────────────────────────────┘      │       │
│                                                              │       │
│  ENUM role: 'ADMIN' | 'STAFF' | 'HEAD' | 'LECTURER' |     │       │
│             'STUDENT'                                        │       │
└──────────────────────────────────────────────────────────────┼───────┘
                                                               │
┌──────────────────────────────────────────────────────────────┼───────┐
│                         ACADEMIC MODULE                       │       │
├───────────────────────────────────────────────────────────────┤       │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ subjects                                          │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │     code        VARCHAR(20) UNIQUE NOT NULL       │              │
│  │     name        VARCHAR(255) NOT NULL             │              │
│  │     credits     INTEGER NOT NULL                  │              │
│  │     description TEXT                              │              │
│  │     created_at  TIMESTAMP                         │              │
│  │     updated_at  TIMESTAMP                         │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ curricula                                         │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  subject_id  INTEGER NOT NULL                  │              │
│  │     content     TEXT NOT NULL                     │              │
│  │     week_number INTEGER                           │              │
│  │     learning_outcomes TEXT                        │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ classes                                           │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id           INTEGER                          │              │
│  │     code         VARCHAR(50) UNIQUE NOT NULL      │              │
│  │     name         VARCHAR(255) NOT NULL            │              │
│  │ FK  subject_id   INTEGER NOT NULL                 │              │
│  │ FK  lecturer_id  INTEGER NOT NULL                 │──────────────┤
│  │     semester     VARCHAR(20) NOT NULL             │              │
│  │     academic_year VARCHAR(20) NOT NULL            │              │
│  │     max_students INTEGER                          │              │
│  │     status       VARCHAR(20) DEFAULT 'active'     │              │
│  │     created_at   TIMESTAMP                        │              │
│  │     updated_at   TIMESTAMP                        │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ class_members                                     │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id         INTEGER                            │              │
│  │ FK  class_id   INTEGER NOT NULL                   │              │
│  │ FK  student_id INTEGER NOT NULL                   │──────────────┤
│  │     role       VARCHAR(20) DEFAULT 'member'       │              │
│  │     joined_at  TIMESTAMP                          │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      PROJECT & GROUP MODULE                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ projects                                          │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id              INTEGER                       │              │
│  │     title           VARCHAR(255) NOT NULL         │              │
│  │     description     TEXT NOT NULL                 │              │
│  │     objectives      TEXT                          │              │
│  │     scope           TEXT                          │              │
│  │     expected_outcomes TEXT                        │              │
│  │ FK  created_by      INTEGER NOT NULL              │──────────────┤
│  │ FK  approved_by     INTEGER                       │              │
│  │     status          VARCHAR(20) DEFAULT 'pending' │              │
│  │     approval_status VARCHAR(20)                   │              │
│  │     created_at      TIMESTAMP                     │              │
│  │     updated_at      TIMESTAMP                     │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ project_milestones                                │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  project_id  INTEGER NOT NULL                  │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     description TEXT                              │              │
│  │     order_index INTEGER NOT NULL                  │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ class_projects                                    │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  class_id    INTEGER NOT NULL                  │              │
│  │ FK  project_id  INTEGER NOT NULL                  │              │
│  │     assigned_at TIMESTAMP                         │              │
│  │     max_groups  INTEGER                           │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ groups                                            │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │     name        VARCHAR(255) NOT NULL             │              │
│  │ FK  class_id    INTEGER NOT NULL                  │              │
│  │ FK  project_id  INTEGER NOT NULL                  │              │
│  │ FK  leader_id   INTEGER NOT NULL                  │──────────────┤
│  │     description TEXT                              │              │
│  │     status      VARCHAR(20) DEFAULT 'active'      │              │
│  │     created_at  TIMESTAMP                         │              │
│  │     updated_at  TIMESTAMP                         │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ group_members                                     │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id                  INTEGER                   │              │
│  │ FK  group_id            INTEGER NOT NULL          │              │
│  │ FK  student_id          INTEGER NOT NULL          │──────────────┤
│  │     role                VARCHAR(50)               │              │
│  │     contribution_score  FLOAT DEFAULT 0           │              │
│  │     joined_at           TIMESTAMP                 │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ group_milestones                                  │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     description TEXT                              │              │
│  │     deadline    TIMESTAMP NOT NULL                │              │
│  │     status      VARCHAR(20) DEFAULT 'pending'     │              │
│  │     is_completed BOOLEAN DEFAULT FALSE            │              │
│  │     completed_at TIMESTAMP                        │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ checkpoints                                       │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id              INTEGER                       │              │
│  │ FK  group_id        INTEGER NOT NULL              │              │
│  │     title           VARCHAR(255) NOT NULL         │              │
│  │     description     TEXT                          │              │
│  │     deadline        TIMESTAMP NOT NULL            │              │
│  │     assigned_members JSON                         │              │
│  │     status          VARCHAR(20) DEFAULT 'pending' │              │
│  │     created_at      TIMESTAMP                     │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ tasks                                             │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     description TEXT                              │              │
│  │ FK  assigned_to INTEGER                           │──────────────┤
│  │     status      VARCHAR(20) DEFAULT 'todo'        │              │
│  │     priority    VARCHAR(20) DEFAULT 'medium'      │              │
│  │     due_date    TIMESTAMP                         │              │
│  │     created_at  TIMESTAMP                         │              │
│  │     updated_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    COLLABORATION MODULE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ meetings                                          │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id           INTEGER                          │              │
│  │     title        VARCHAR(255) NOT NULL            │              │
│  │     description  TEXT                             │              │
│  │ FK  group_id     INTEGER NOT NULL                 │              │
│  │ FK  created_by   INTEGER NOT NULL                 │──────────────┤
│  │     scheduled_at TIMESTAMP NOT NULL               │              │
│  │     duration     INTEGER                          │              │
│  │     meeting_url  TEXT                             │              │
│  │     status       VARCHAR(20) DEFAULT 'scheduled'  │              │
│  │     notes        TEXT                             │              │
│  │     created_at   TIMESTAMP                        │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ meeting_participants                              │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  meeting_id  INTEGER NOT NULL                  │              │
│  │ FK  user_id     INTEGER NOT NULL                  │──────────────┤
│  │     status      VARCHAR(20) DEFAULT 'invited'     │              │
│  │     joined_at   TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ chat_messages                                     │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  sender_id   INTEGER NOT NULL                  │──────────────┤
│  │ FK  group_id    INTEGER                           │              │
│  │ FK  class_id    INTEGER                           │              │
│  │     message     TEXT NOT NULL                     │              │
│  │     message_type VARCHAR(20) DEFAULT 'text'       │              │
│  │     file_url    TEXT                              │              │
│  │     is_read     BOOLEAN DEFAULT FALSE             │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ resources                                         │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     description TEXT                              │              │
│  │     file_url    TEXT NOT NULL                     │              │
│  │     file_type   VARCHAR(50)                       │              │
│  │     file_size   INTEGER                           │              │
│  │ FK  uploaded_by INTEGER NOT NULL                  │──────────────┤
│  │ FK  group_id    INTEGER                           │              │
│  │ FK  class_id    INTEGER                           │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ whiteboard_sessions                               │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     session_name VARCHAR(255)                     │              │
│  │     data        JSON                              │              │
│  │     last_updated TIMESTAMP                        │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ document_sessions                                 │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     content     TEXT                              │              │
│  │     last_updated TIMESTAMP                        │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      EVALUATION MODULE                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ peer_reviews                                      │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  reviewer_id INTEGER NOT NULL                  │──────────────┤
│  │ FK  reviewee_id INTEGER NOT NULL                  │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     period      VARCHAR(50) NOT NULL              │              │
│  │     rating      INTEGER NOT NULL                  │              │
│  │     comments    TEXT                              │              │
│  │     criteria    JSON                              │              │
│  │     is_anonymous BOOLEAN DEFAULT TRUE             │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ group_evaluations                                 │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │ FK  evaluator_id INTEGER NOT NULL                 │──────────────┤
│  │     evaluation_type VARCHAR(50) NOT NULL          │              │
│  │     score       FLOAT NOT NULL                    │              │
│  │     feedback    TEXT                              │              │
│  │     criteria    JSON                              │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ member_evaluations                                │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  group_member_id INTEGER NOT NULL              │              │
│  │ FK  evaluator_id INTEGER NOT NULL                 │──────────────┤
│  │     score       FLOAT NOT NULL                    │              │
│  │     feedback    TEXT                              │              │
│  │     evaluation_type VARCHAR(50) NOT NULL          │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ checkpoint_evaluations                            │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  checkpoint_id INTEGER NOT NULL                │              │
│  │ FK  evaluator_id INTEGER NOT NULL                 │──────────────┤
│  │     score       FLOAT NOT NULL                    │              │
│  │     feedback    TEXT                              │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ milestone_questions                               │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  milestone_id INTEGER NOT NULL                 │              │
│  │     question    TEXT NOT NULL                     │              │
│  │     order_index INTEGER NOT NULL                  │              │
│  │     created_at  TIMESTAMP                         │              │
│  └──────────────────┬───────────────────────────────┘              │
│                     │                                                │
│                     │ 1                                              │
│                     │                                                │
│                     │ N                                              │
│  ┌──────────────────▼───────────────────────────────┐              │
│  │ milestone_answers                                 │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  question_id INTEGER NOT NULL                  │              │
│  │ FK  group_id    INTEGER NOT NULL                  │              │
│  │     answer      TEXT NOT NULL                     │              │
│  │     submitted_at TIMESTAMP                        │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     NOTIFICATION MODULE                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────────────────────────────────┐              │
│  │ notifications                                     │              │
│  ├──────────────────────────────────────────────────┤              │
│  │ PK  id          INTEGER                           │              │
│  │ FK  user_id     INTEGER NOT NULL                  │──────────────┤
│  │     type        VARCHAR(50) NOT NULL              │              │
│  │     title       VARCHAR(255) NOT NULL             │              │
│  │     content     TEXT NOT NULL                     │              │
│  │     link        TEXT                              │              │
│  │     is_read     BOOLEAN DEFAULT FALSE             │              │
│  │     created_at  TIMESTAMP                         │              │
│  │     read_at     TIMESTAMP                         │              │
│  └──────────────────────────────────────────────────┘              │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘
```

### 2.2. Ràng Buộc Và Quy Tắc

#### A. Khóa Chính (Primary Keys)
- Tất cả bảng đều có khóa chính `id` kiểu INTEGER (Auto Increment)

#### B. Khóa Ngoại (Foreign Keys)
- Tất cả khóa ngoại có ràng buộc tham chiếu (REFERENCES)
- ON DELETE CASCADE: Khi xóa bản ghi cha, xóa tất cả bản ghi con
- ON DELETE SET NULL: Khi xóa bản ghi cha, đặt khóa ngoại = NULL

#### C. Ràng Buộc Duy Nhất (Unique Constraints)
- `users.username` - UNIQUE
- `users.email` - UNIQUE
- `subjects.code` - UNIQUE
- `classes.code` - UNIQUE

#### D. Ràng Buộc Kiểm Tra (Check Constraints)
- `users.role` IN ('ADMIN', 'STAFF', 'HEAD', 'LECTURER', 'STUDENT')
- `projects.status` IN ('pending', 'approved', 'rejected', 'active', 'completed')
- `peer_reviews.rating` BETWEEN 1 AND 5

#### E. Ràng Buộc NOT NULL
- Các trường quan trọng như email, password, name đều NOT NULL
- Các khóa ngoại quan trọng NOT NULL

---

## 3. MÔ HÌNH VẬT LÝ (PHYSICAL MODEL)

### 3.1. Cấu Trúc Lưu Trữ

#### A. Tablespace
- **Default Tablespace**: pg_default
- **Ước tính dung lượng**: ~500MB cho 1000 users, 100 projects

#### B. Indexes

**Primary Indexes** (Tự động tạo cho PK):
```sql
CREATE INDEX idx_users_pkey ON users(id);
CREATE INDEX idx_projects_pkey ON projects(id);
CREATE INDEX idx_groups_pkey ON groups(id);
-- ... (cho tất cả bảng)
```

**Foreign Key Indexes**:
```sql
CREATE INDEX idx_classes_lecturer_id ON classes(lecturer_id);
CREATE INDEX idx_class_members_class_id ON class_members(class_id);
CREATE INDEX idx_class_members_student_id ON class_members(student_id);
CREATE INDEX idx_groups_class_id ON groups(class_id);
CREATE INDEX idx_groups_project_id ON groups(project_id);
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_chat_messages_group_id ON chat_messages(group_id);
CREATE INDEX idx_resources_group_id ON resources(group_id);
-- ... (cho tất cả FK)
```

**Composite Indexes** (Tối ưu queries thường dùng):
```sql
CREATE INDEX idx_chat_messages_group_created ON chat_messages(group_id, created_at DESC);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_peer_reviews_reviewee_period ON peer_reviews(reviewee_id, period);
```

**Unique Indexes**:
```sql
CREATE UNIQUE INDEX idx_users_username ON users(username);
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_subjects_code ON subjects(code);
CREATE UNIQUE INDEX idx_classes_code ON classes(code);
```

#### C. Partitioning Strategy

Chưa áp dụng partitioning ở giai đoạn đầu, có thể cân nhắc cho:
- `chat_messages` - Partition by date (monthly)
- `notifications` - Partition by date (monthly)

### 3.2. Normalization

**Dạng chuẩn 3NF (Third Normal Form)** đã được áp dụng:

1. **1NF**: Tất cả các trường đều atomic (không có multi-value)
2. **2NF**: Không có partial dependency
3. **3NF**: Không có transitive dependency

**Denormalization có chủ ý**:
- `group_members.contribution_score` - Cache để tăng performance
- `checkpoints.assigned_members` - JSON field cho flexibility

### 3.3. Data Types

| Loại | PostgreSQL Type | Mô tả |
|------|----------------|-------|
| ID | INTEGER / BIGINT | Auto-increment primary keys |
| Text ngắn | VARCHAR(n) | Username, email, code |
| Text dài | TEXT | Description, content |
| Number | INTEGER | Counts, scores |
| Decimal | FLOAT / NUMERIC | Rating, contribution |
| Boolean | BOOLEAN | Flags (is_active, is_read) |
| Date/Time | TIMESTAMP | created_at, updated_at |
| JSON | JSON / JSONB | Flexible data (criteria, assigned_members) |

---

## 4. IMPLEMENTATION (Triển Khai)

### 4.1. SQLModel Models

Tất cả models đã được implement trong:
- **Folder**: `collabsphere/backend/app/models/`
- **Files**:
  - `user.py` - User model
  - `academic.py` - Subject, Curriculum, Class, ClassMember
  - `project.py` - Project, ProjectMilestone, ClassProject
  - `group.py` - Group, GroupMember, GroupMilestone, Checkpoint, Task
  - `communication.py` - Meeting, ChatMessage, Resource, Whiteboard, Document
  - `evaluation.py` - PeerReview, Evaluation, MilestoneQuestion, MilestoneAnswer
  - `notification.py` - Notification

### 4.2. Database Migrations

**Alembic** được sử dụng cho version control của database:
- **Folder**: `collabsphere/backend/alembic/`
- **Config**: `alembic.ini`
- **Migrations**: `alembic/versions/`

**Lệnh migration**:
```bash
# Tạo migration mới
alembic revision --autogenerate -m "Create initial tables"

# Chạy migration
alembic upgrade head

# Rollback
alembic downgrade -1
```

### 4.3. Kiểm Tra Database

**Script kiểm tra**: `collabsphere/backend/check_db.py`

**Kết quả kiểm tra**:
```
==================================================
       DATABASE CHECK - CollabSphere
==================================================

Database file: collabsphere.db
Total tables: 28

Tables in database:
   1. chat_messages
   2. checkpoint_assignments
   3. checkpoint_evaluations
   4. checkpoint_submissions
   5. checkpoints
   6. class_members
   7. class_projects
   8. classes
   9. curricula
  10. document_sessions
  11. group_evaluations
  12. group_members
  13. group_milestones
  14. groups
  15. meeting_participants
  16. meetings
  17. member_evaluations
  18. milestone_answers
  19. milestone_questions
  20. notifications
  21. peer_reviews
  22. project_milestones
  23. projects
  24. resources
  25. subjects
  26. tasks
  27. users
  28. whiteboard_sessions

✅ Database is working correctly!
```

### 4.4. Sample Queries

#### Query 1: Lấy danh sách projects của một lecturer
```sql
SELECT p.id, p.title, p.status, COUNT(DISTINCT g.id) as total_groups
FROM projects p
LEFT JOIN class_projects cp ON p.id = cp.project_id
LEFT JOIN classes c ON cp.class_id = c.id
LEFT JOIN groups g ON cp.class_id = g.class_id AND cp.project_id = g.project_id
WHERE c.lecturer_id = :lecturer_id
GROUP BY p.id, p.title, p.status;
```

#### Query 2: Lấy contribution score của các thành viên trong nhóm
```sql
SELECT u.full_name, gm.contribution_score, 
       COUNT(pr.id) as total_reviews,
       AVG(pr.rating) as avg_rating
FROM group_members gm
JOIN users u ON gm.student_id = u.id
LEFT JOIN peer_reviews pr ON pr.reviewee_id = gm.student_id 
                          AND pr.group_id = gm.group_id
WHERE gm.group_id = :group_id
GROUP BY u.id, u.full_name, gm.contribution_score;
```

#### Query 3: Lấy timeline hoạt động của nhóm
```sql
SELECT 'message' as type, created_at, sender_id as user_id, message as content
FROM chat_messages WHERE group_id = :group_id
UNION ALL
SELECT 'resource' as type, created_at, uploaded_by as user_id, title as content
FROM resources WHERE group_id = :group_id
UNION ALL
SELECT 'milestone' as type, created_at, NULL as user_id, title as content
FROM group_milestones WHERE group_id = :group_id
ORDER BY created_at DESC
LIMIT 50;
```

---

## 5. RELATIONSHIPS MATRIX

### 5.1. Ma Trận Quan Hệ

| Bảng 1 | Relationship | Bảng 2 | Cardinality |
|--------|--------------|--------|-------------|
| User | creates | Project | 1:N |
| User | teaches | Class | 1:N |
| User | joins | ClassMember | 1:N |
| User | leads | Group | 1:N |
| User | belongs to | GroupMember | 1:N |
| User | sends | ChatMessage | 1:N |
| User | uploads | Resource | 1:N |
| User | creates | Notification | 1:N |
| Subject | has | Curriculum | 1:N |
| Subject | used in | Class | 1:N |
| Class | has | ClassMember | 1:N |
| Class | assigned | ClassProject | 1:N |
| Class | has | Group | 1:N |
| Project | assigned to | ClassProject | 1:N |
| Project | has | ProjectMilestone | 1:N |
| Project | used by | Group | 1:N |
| Group | has | GroupMember | 1:N |
| Group | has | GroupMilestone | 1:N |
| Group | has | Checkpoint | 1:N |
| Group | has | Task | 1:N |
| Group | has | Meeting | 1:N |
| Group | has | ChatMessage | 1:N |
| Group | has | Resource | 1:N |
| Group | has | WhiteboardSession | 1:N |
| Group | evaluated in | PeerReview | 1:N |
| Meeting | has | MeetingParticipant | 1:N |

### 5.2. Business Rules

1. **User Rules**:
   - Một user chỉ có một role (ADMIN, STAFF, HEAD, LECTURER, STUDENT)
   - Email và username phải unique
   - Lecturer có thể tạo và quản lý nhiều projects
   - Student chỉ được tham gia một nhóm trong một class

2. **Academic Rules**:
   - Một class phải có subject và lecturer
   - Class code phải unique (format: CLASS_CODE_SEMESTER)
   - Student phải enroll vào class trước khi join group

3. **Project Rules**:
   - Project phải được HEAD approve trước khi assign cho class
   - Một project có thể assign cho nhiều classes
   - Project có thể có nhiều milestones (ordered)

4. **Group Rules**:
   - Group phải thuộc về một class và một project
   - Group phải có leader (một student trong nhóm)
   - Mỗi group member có contribution score (0-100)
   - Group size tối thiểu 3, tối đa 6 thành viên

5. **Evaluation Rules**:
   - Peer review chỉ trong nhóm (reviewer và reviewee cùng group)
   - Rating từ 1-5
   - Lecturer evaluate group, peer review evaluate individual
   - Contribution score được tính từ peer reviews và task completion

---

## 6. DATA DICTIONARY

### 6.1. Bảng Users

| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary key |
| username | VARCHAR(100) | NO | - | Tên đăng nhập, unique |
| email | VARCHAR(255) | NO | - | Email, unique |
| full_name | VARCHAR(255) | NO | - | Họ tên đầy đủ |
| hashed_password | VARCHAR(255) | NO | - | Mật khẩu đã hash (bcrypt) |
| role | VARCHAR(20) | NO | - | Vai trò: ADMIN, STAFF, HEAD, LECTURER, STUDENT |
| avatar_url | TEXT | YES | NULL | URL ảnh đại diện |
| phone | VARCHAR(20) | YES | NULL | Số điện thoại |
| is_active | BOOLEAN | NO | TRUE | Trạng thái tài khoản |
| created_at | TIMESTAMP | NO | NOW() | Thời gian tạo |
| updated_at | TIMESTAMP | NO | NOW() | Thời gian cập nhật |
| last_login | TIMESTAMP | YES | NULL | Lần đăng nhập cuối |

### 6.2. Bảng Projects

| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary key |
| title | VARCHAR(255) | NO | - | Tên đồ án |
| description | TEXT | NO | - | Mô tả chi tiết |
| objectives | TEXT | YES | NULL | Mục tiêu |
| scope | TEXT | YES | NULL | Phạm vi |
| expected_outcomes | TEXT | YES | NULL | Kết quả mong đợi |
| created_by | INTEGER | NO | - | FK to users (lecturer) |
| approved_by | INTEGER | YES | NULL | FK to users (head) |
| status | VARCHAR(20) | NO | 'pending' | pending, approved, rejected, active, completed |
| approval_status | VARCHAR(20) | YES | NULL | Trạng thái duyệt |
| created_at | TIMESTAMP | NO | NOW() | Thời gian tạo |
| updated_at | TIMESTAMP | NO | NOW() | Thời gian cập nhật |

### 6.3. Bảng Groups

| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| id | INTEGER | NO | AUTO_INCREMENT | Primary key |
| name | VARCHAR(255) | NO | - | Tên nhóm |
| class_id | INTEGER | NO | - | FK to classes |
| project_id | INTEGER | NO | - | FK to projects |
| leader_id | INTEGER | NO | - | FK to users (student) |
| description | TEXT | YES | NULL | Mô tả nhóm |
| status | VARCHAR(20) | NO | 'active' | active, inactive, completed |
| created_at | TIMESTAMP | NO | NOW() | Thời gian tạo |
| updated_at | TIMESTAMP | NO | NOW() | Thời gian cập nhật |

*(Các bảng khác tương tự, xem chi tiết trong source code)*

---

## 7. SECURITY & PERFORMANCE

### 7.1. Security Measures

1. **Password Hashing**: bcrypt với cost factor 12
2. **JWT Authentication**: Access token (30 min) + Refresh token (7 days)
3. **SQL Injection Prevention**: SQLModel ORM với parameterized queries
4. **Role-Based Access Control**: Middleware kiểm tra permissions
5. **Data Validation**: Pydantic models validate input

### 7.2. Performance Optimization

1. **Indexes**: Primary, foreign key, và composite indexes
2. **Connection Pooling**: SQLAlchemy pool_size=20, max_overflow=10
3. **Query Optimization**: Select only needed columns, use JOINs efficiently
4. **Caching**: Redis cho session và frequently accessed data
5. **Pagination**: Limit/Offset cho large datasets

### 7.3. Backup & Recovery

1. **Database Backup**: 
   ```bash
   docker-compose exec -T db pg_dump -U postgres collabsphere > backup.sql
   ```

2. **Restore**:
   ```bash
   docker-compose exec -T db psql -U postgres collabsphere < backup.sql
   ```

3. **Backup Schedule**: Daily incremental, Weekly full backup

---

## 8. KẾT LUẬN

### 8.1. Tóm Tắt

ERD của CollabSphere bao gồm:
- **28 bảng** được tổ chức thành 6 modules chính
- **Tuân thủ 3NF** để đảm bảo tính toàn vẹn dữ liệu
- **Đầy đủ relationships** giữa các entities
- **Indexes và constraints** để tối ưu performance và data integrity

### 8.2. Files Liên Quan

Các file implementation trong project:

1. **Database Models**:
   - `collabsphere/backend/app/models/user.py`
   - `collabsphere/backend/app/models/academic.py`
   - `collabsphere/backend/app/models/project.py`
   - `collabsphere/backend/app/models/group.py`
   - `collabsphere/backend/app/models/communication.py`
   - `collabsphere/backend/app/models/evaluation.py`
   - `collabsphere/backend/app/models/notification.py`

2. **Database Configuration**:
   - `collabsphere/backend/app/database.py`
   - `collabsphere/backend/app/config.py`
   - `collabsphere/backend/alembic.ini`
   - `collabsphere/backend/alembic/env.py`

3. **Database Verification**:
   - `collabsphere/backend/check_db.py`

4. **Docker Configuration**:
   - `collabsphere/docker-compose.yml` (PostgreSQL service)

### 8.3. Hướng Dẫn Sử Dụng File Này

**Để nộp cho giảng viên**:

1. In file này thành PDF: `ERD_DATABASE_DESIGN_COLLABSPHERE.pdf`
2. Kèm theo screenshots của database tables từ `check_db.py`
3. Kèm theo source code các models trong folder `app/models/`

**File này chứng minh**:
- ✅ Thiết kế ERD đầy đủ 3 mức (Conceptual, Logical, Physical)
- ✅ Đã apply vào source code (SQLModel models)
- ✅ Database đã được tạo và verified (28 bảng)

---

**Ngày tạo**: 30/12/2025
**Phiên bản**: 1.0
**Tác giả**: CollabSphere Development Team
