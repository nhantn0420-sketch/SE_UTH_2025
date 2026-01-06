# HƯỚNG DẪN VẼ: DATABASE ERD (37 TABLES)
**File xuất**: `4.2-erd-full.png`  
**Thời gian**: ~4-5 giờ  
**Độ khó**: ⭐⭐⭐⭐⭐ Rất khó (nhiều tables & relationships phức tạp)

---

## 🎯 MỤC TIÊU

Vẽ ERD đầy đủ cho CollabSphere database gồm **37 tables** được nhóm thành **6 modules**:
1. Users & Academic (7 tables) - Thêm ClassProject junction
2. Projects & Groups (15 tables) - Thêm WorkspaceCard, Checkpoint tables
3. Collaboration (7 tables) - Thêm MeetingParticipant, Whiteboard, Document
4. Evaluation (6 tables) - Thêm CheckpointEvaluation
5. Notifications (1 table)
6. Additional (1 table) - Giữ activity_logs, xóa project_tags

---

## 🛠️ CHUẨN BỊ

### Bước 1: Mở Draw.io
1. Truy cập: https://app.diagrams.net/
2. **Create New Diagram**
3. Tên: `CollabSphere-ERD`
4. Template: **"Entity Relation"** (nếu có) hoặc **"Blank Diagram"**

### Bước 2: Thiết lập Canvas
1. **File** → **Page Setup**
2. **Paper Size**: A3 Landscape (420mm × 297mm) - VÌ CÓ 28 TABLES!
3. **Background**: Light Gray (#F5F5F5)
4. **Grid**: 20px
5. **Apply**

### Bước 3: Enable Entity Relation Shapes
1. Click **"More Shapes"** (góc trái dưới)
2. Tìm và enable: **"Entity Relation"**
3. Shapes sẽ xuất hiện ở thanh bên trái

---

## 📐 LAYOUT STRATEGY

Vì có 37 tables, sẽ chia thành **6 zones theo modules**:

```
┌──────────────────────────────────────────────────────────────┐
│  ZONE 1: Users & Academic (Top Left)                        │
│  7 tables: users, subjects, curricula, classes,             │
│            class_members, class_projects                     │
├──────────────────────────────────────────────────────────────┤
│  ZONE 2: Projects & Groups (Top Right)                      │
│  15 tables: projects, milestones, milestone_questions,      │
│             groups, members, group_milestones, checkpoints,  │
│             checkpoint_assignments, checkpoint_submissions,  │
│             workspace_cards, tasks                           │
├──────────────────────────────────────────────────────────────┤
│  ZONE 3: Collaboration (Middle Left)                        │
│  7 tables: chat, meetings, meeting_participants, resources, │
│            whiteboard_sessions, document_sessions            │
├──────────────────────────────────────────────────────────────┤
│  ZONE 4: Evaluation (Middle Right)                          │
│  6 tables: peer_reviews, group_evaluations,                 │
│            member_evaluations, milestone_answers,            │
│            checkpoint_evaluations                            │
├──────────────────────────────────────────────────────────────┤
│  ZONE 5: Notifications (Bottom)                             │
│  1 table: notifications                                      │
├──────────────────────────────────────────────────────────────┤
│  ZONE 6: Additional (Bottom Right)                          │
│  1 table: activity_logs                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 CÁCH VẼ MỘT TABLE (TEMPLATE)

### Cấu trúc chuẩn của 1 table:

```
┌─────────────────────────┐
│  table_name             │  ← Header (Bold, màu nền)
├─────────────────────────┤
│ 🔑 PK  id: INTEGER      │  ← Primary Key (icon 🔑, màu vàng)
│ 🔗 FK  user_id: INTEGER │  ← Foreign Key (icon 🔗, màu xanh)
│    username: VARCHAR    │  ← Regular column
│    email: VARCHAR       │
│    created_at: TIMESTAMP│
└─────────────────────────┘
```

### Bước vẽ 1 table:

1. **Kéo shape "Table"** từ Entity Relation palette
2. **Resize**: Width ~250px, Height tùy số columns
3. **Header**:
   - Text: Tên table (lowercase, với underscores)
   - Font: **Arial Bold, 12pt**
   - Background: **Blue (#2196F3)** cho header
   - Text color: **White**

4. **Thêm columns**:
   - Double-click vào body của table
   - Format: `🔑 PK  column_name: DATA_TYPE`
   - Font: **Courier New, 10pt** (monospace)

5. **Color coding**:
   - Primary Key row: **Light Yellow (#FFF9C4)**
   - Foreign Key row: **Light Blue (#E3F2FD)**
   - Regular rows: **White**

---

## 🎨 ZONE 1: USERS & ACADEMIC MODULE

### Table 1: users

**Vị trí**: X: 50, Y: 50

**Cấu trúc**:
```
┌─────────────────────────────┐
│  users                      │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    username: VARCHAR(50)    │
│    email: VARCHAR(100)      │
│    hashed_password: VARCHAR │
│    full_name: VARCHAR(100)  │
│    role: ENUM               │
│    avatar_url: VARCHAR      │
│    phone: VARCHAR(20)       │
│    is_active: BOOLEAN       │
│    last_login: TIMESTAMP    │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Định dạng**:
- Header background: **Dark Blue (#1565C0)**
- Add indexes note: "🔍 Indexes: username, email"
- Add note: "ENUM role: admin, staff, head, lecturer, student"

---

### Table 2: subjects

**Vị trí**: X: 350, Y: 50 (bên phải users)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  subjects                   │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    code: VARCHAR(20)        │
│    name: VARCHAR(200)       │
│    credits: INTEGER         │
│    description: TEXT        │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Định dạng**:
- Header background: **Green (#4CAF50)**
- Add note: "UNIQUE: code"

---

### Table 3: curricula

**Vị trí**: X: 650, Y: 50 (bên phải subjects)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  curricula                  │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 subject_id: INTEGER      │
│    week_number: INTEGER     │
│    content: TEXT            │
│    learning_outcomes: TEXT  │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `subject_id` → `subjects.id`

---

### Table 4: classes

**Vị trí**: X: 50, Y: 300 (dưới users)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  classes                    │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    code: VARCHAR(20)        │
│    name: VARCHAR(200)       │
│ 🔗 subject_id: INTEGER      │
│ 🔗 lecturer_id: INTEGER     │
│    semester: ENUM           │
│    academic_year: VARCHAR   │
│    max_students: INTEGER    │
│    is_active: BOOLEAN       │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `subject_id` → `subjects.id`
- `lecturer_id` → `users.id`

**Note**: "ENUM semester: spring, summer, fall | UNIQUE: code"

---

### Table 5: class_members

**Vị trí**: X: 350, Y: 300 (bên phải classes)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  class_members              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 class_id: INTEGER        │
│ 🔗 user_id: INTEGER         │
│    joined_at: TIMESTAMP     │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `user_id` → `users.id` (students only)

**Note**: "🔗 Junction table (M:N) giữa classes ↔ users"

---

### Table 6: class_projects

**Vị trí**: X: 650, Y: 300 (bên phải class_members)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  class_projects             │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 class_id: INTEGER        │
│ 🔗 project_id: INTEGER      │
│ 🔗 assigned_by: INTEGER     │
│    assigned_at: TIMESTAMP   │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `project_id` → `projects.id`
- `assigned_by` → `users.id` (Head/Lecturer who assigned)

**Note**: "🔗 Junction table (M:N) giữa classes ↔ projects"

---

## 🎨 ZONE 2: PROJECTS & GROUPS MODULE

### Table 7: projects

**Vị trí**: X: 1000, Y: 50 (top right)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  projects                   │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    goals: TEXT              │
│    requirements: TEXT       │
│ 🔗 curriculum_id: INTEGER   │
│ 🔗 creator_id: INTEGER      │
│    duration_weeks: INTEGER  │
│    max_group_size: INTEGER  │
│    min_group_size: INTEGER  │
│    status: ENUM             │
│ 🔗 approved_by: INTEGER     │
│    approved_at: TIMESTAMP   │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `curriculum_id` → `curricula.id`
- `creator_id` → `users.id` (Lecturer)
- `approved_by` → `users.id` (Head)

**Note**: "ENUM status: draft, pending, approved, rejected"

---

### Table 8: project_milestones

**Vị trí**: X: 1300, Y: 50

**Cấu trúc**:
```
┌─────────────────────────────┐
│  project_milestones         │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 project_id: INTEGER      │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    week_number: INTEGER     │
│    deliverables: TEXT       │
│    order: INTEGER           │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `project_id` → `projects.id`

---

### Table 9: milestone_questions

**Vị trí**: X: 1600, Y: 50

**Cấu trúc**:
```
┌─────────────────────────────┐
│  milestone_questions        │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 milestone_id: INTEGER    │
│    question: TEXT           │
│    description: TEXT        │
│    order: INTEGER           │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `milestone_id` → `project_milestones.id`

---

### Table 10: groups

**Vị trí**: X: 1300, Y: 300

**Cấu trúc**:
```
┌─────────────────────────────┐
│  groups                     │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    name: VARCHAR(100)       │
│ 🔗 class_id: INTEGER        │
│ 🔗 project_id: INTEGER      │
│    description: TEXT        │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `project_id` → `projects.id`

**Note**: "Leader được xác định qua group_members.role = 'leader'"

---

### Table 11: group_members

**Vị trí**: X: 1600, Y: 300

**Cấu trúc**:
```
┌─────────────────────────────┐
│  group_members              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 user_id: INTEGER         │
│    role: ENUM               │
│    contribution_score: FLOAT│
│    joined_at: TIMESTAMP     │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `user_id` → `users.id`

**Note**: "ENUM role: leader, member"

---

### Table 12: group_milestones

**Vị trí**: X: 1000, Y: 550

**Cấu trúc**:
```
┌─────────────────────────────┐
│  group_milestones           │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 milestone_id: INTEGER    │
│    is_completed: BOOLEAN    │
│    completed_at: TIMESTAMP  │
│ 🔗 completed_by: INTEGER     │
│    notes: TEXT              │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `milestone_id` → `project_milestones.id`
- `completed_by` → `users.id`

---

### Table 13: checkpoints

**Vị trí**: X: 1300, Y: 550

**Cấu trúc**:
```
┌─────────────────────────────┐
│  checkpoints                │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    due_date: TIMESTAMP      │
│    status: ENUM             │
│ 🔗 created_by: INTEGER      │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `created_by` → `users.id`

**Note**: "ENUM status: not_started, in_progress, submitted, completed"

---

### Table 14: checkpoint_assignments

**Vị trí**: X: 1000, Y: 750

**Cấu trúc**:
```
┌─────────────────────────────┐
│  checkpoint_assignments     │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 checkpoint_id: INTEGER   │
│ 🔗 user_id: INTEGER         │
│    assigned_at: TIMESTAMP   │
└─────────────────────────────┘
```

**Foreign Keys**:
- `checkpoint_id` → `checkpoints.id`
- `user_id` → `users.id`

---

### Table 15: checkpoint_submissions

**Vị trí**: X: 1300, Y: 750

**Cấu trúc**:
```
┌─────────────────────────────┐
│  checkpoint_submissions     │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 checkpoint_id: INTEGER   │
│ 🔗 submitted_by: INTEGER    │
│    content: TEXT            │
│    file_url: VARCHAR        │
│    submitted_at: TIMESTAMP  │
└─────────────────────────────┘
```

**Foreign Keys**:
- `checkpoint_id` → `checkpoints.id`
- `submitted_by` → `users.id`

---

### Table 16: workspace_cards

**Vị trí**: X: 1600, Y: 750

**Cấu trúc**:
```
┌─────────────────────────────┐
│  workspace_cards            │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    title: VARCHAR(100)      │
│    description: TEXT        │
│    position: INTEGER        │
│    color: VARCHAR(20)       │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `group_id` → `groups.id`

**Note**: "UC039: Kanban columns (To Do, In Progress, Done)"

---

### Table 17: tasks

**Vị trí**: X: 1900, Y: 750

**Cấu trúc**:
```
┌─────────────────────────────┐
│  tasks                      │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 card_id: INTEGER         │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    status: ENUM             │
│    priority: ENUM           │
│ 🔗 assigned_to: INTEGER     │
│    due_date: TIMESTAMP      │
│ 🔗 created_by: INTEGER      │
│ 🔗 parent_task_id: INTEGER  │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `card_id` → `workspace_cards.id`
- `assigned_to` → `users.id`
- `created_by` → `users.id`
- `parent_task_id` → `tasks.id` (self-reference for subtasks)

**Note**: "ENUM status: todo, in_progress, done | ENUM priority: low, medium, high"

---

## 🎨 ZONE 3: COLLABORATION MODULE

### Table 18: meetings

**Vị trí**: X: 50, Y: 600

**Cấu trúc**:
```
┌─────────────────────────────┐
│  meetings                   │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│ 🔗 group_id: INTEGER        │
│ 🔗 created_by: INTEGER      │
│    scheduled_at: TIMESTAMP  │
│    duration: INTEGER        │
│    meeting_url: VARCHAR     │
│    status: VARCHAR(20)      │
└─────────────────────────────┘
```

---

### Table 19: meeting_participants

**Vị trí**: X: 350, Y: 600

**Cấu trúc**:
```
┌─────────────────────────────┐
│  meeting_participants       │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 meeting_id: INTEGER      │
│ 🔗 user_id: INTEGER         │
│    is_host: BOOLEAN         │
│    joined_at: TIMESTAMP     │
│    left_at: TIMESTAMP       │
└─────────────────────────────┘
```

**Foreign Keys**:
- `meeting_id` → `meetings.id`
- `user_id` → `users.id`

**Note**: "🔗 Junction table giữa meetings ↔ users"

---

### Table 20: chat_messages

**Vị trí**: X: 50, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  chat_messages              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 sender_id: INTEGER       │
│    content: TEXT            │
│    message_type: VARCHAR    │
│    file_url: VARCHAR        │
│    is_edited: BOOLEAN       │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `sender_id` → `users.id`

**Note**: "💬 Real-time chat"

---

### Table 21: resources

**Vị trí**: X: 350, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  resources                  │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    name: VARCHAR(255)       │
│    description: TEXT        │
│    file_url: VARCHAR        │
│    file_size: INTEGER       │
│    file_type: VARCHAR       │
│    resource_type: ENUM      │
│ 🔗 class_id: INTEGER        │
│ 🔗 group_id: INTEGER        │
│ 🔗 uploaded_by: INTEGER     │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id` (optional)
- `group_id` → `groups.id` (optional)
- `uploaded_by` → `users.id`

**Note**: "ENUM resource_type: document, slide, image, video, audio, archive, other"

---

### Table 22: whiteboard_sessions

**Vị trí**: X: 650, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  whiteboard_sessions        │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    name: VARCHAR(200)       │
│    data: TEXT               │
│ 🔗 created_by: INTEGER      │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `created_by` → `users.id`

---

### Table 23: document_sessions

**Vị trí**: X: 950, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  document_sessions          │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    title: VARCHAR(200)      │
│    content: TEXT            │
│ 🔗 created_by: INTEGER      │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `created_by` → `users.id`

---

## 🎨 ZONE 4: EVALUATION MODULE

### Table 24: peer_reviews

**Vị trí**: X: 1900, Y: 50

**Cấu trúc**:
```
┌─────────────────────────────┐
│  peer_reviews               │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 reviewer_id: INTEGER     │
│ 🔗 reviewee_id: INTEGER     │
│ 🔗 group_id: INTEGER        │
│    score: FLOAT             │
│    cooperation_score: FLOAT │
│    contribution_score: FLOAT│
│    communication_score: FLOAT│
│    feedback: TEXT           │
│    is_anonymous: BOOLEAN    │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `reviewer_id` → `users.id`
- `reviewee_id` → `users.id`
- `group_id` → `groups.id`

**Note**: "🔒 Anonymous to students"

---

### Table 25: group_evaluations

**Vị trí**: X: 1900, Y: 300

**Cấu trúc**:
```
┌─────────────────────────────┐
│  group_evaluations          │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 evaluator_id: INTEGER    │
│    score: FLOAT             │
│    feedback: TEXT           │
│    criteria_scores: TEXT    │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `evaluator_id` → `users.id` (Lecturer)

---

### Table 26: member_evaluations

**Vị trí**: X: 1900, Y: 500

**Cấu trúc**:
```
┌─────────────────────────────┐
│  member_evaluations         │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 member_id: INTEGER       │
│ 🔗 evaluator_id: INTEGER    │
│ 🔗 group_id: INTEGER        │
│    score: FLOAT             │
│    contribution_assessment: TEXT│
│    feedback: TEXT           │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `member_id` → `users.id`
- `evaluator_id` → `users.id` (Lecturer)
- `group_id` → `groups.id`

---

### Table 27: milestone_answers

**Vị trí**: X: 1900, Y: 700

**Cấu trúc**:
```
┌─────────────────────────────┐
│  milestone_answers          │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 question_id: INTEGER     │
│ 🔗 user_id: INTEGER         │
│ 🔗 group_id: INTEGER        │
│    answer: TEXT             │
│    feedback: TEXT           │
│    score: FLOAT             │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `question_id` → `milestone_questions.id`
- `user_id` → `users.id`
- `group_id` → `groups.id`

---

### Table 28: checkpoint_evaluations

**Vị trí**: X: 1900, Y: 900

**Cấu trúc**:
```
┌─────────────────────────────┐
│  checkpoint_evaluations     │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 checkpoint_id: INTEGER   │
│ 🔗 evaluator_id: INTEGER    │
│    score: FLOAT             │
│    feedback: TEXT           │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `checkpoint_id` → `checkpoints.id`
- `evaluator_id` → `users.id` (Lecturer)

---

## 🎨 ZONE 5: NOTIFICATIONS MODULE

### Table 26: notifications

**Vị trí**: X: 50, Y: 1100

**Cấu trúc**:
```
┌─────────────────────────────┐
│  notifications              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 user_id: INTEGER         │
│    type: VARCHAR(50)        │
│    title: VARCHAR(200)      │
│    content: TEXT            │
│    link: VARCHAR            │
│    is_read: BOOLEAN         │
│    read_at: TIMESTAMP       │
│    created_at: TIMESTAMP    │
---

## 🎨 ZONE 5: NOTIFICATIONS MODULE

### Table 29: notifications

**Vị trí**: X: 50, Y: 1100

**Cấu trúc**:
```
┌─────────────────────────────┐
│  notifications              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 user_id: INTEGER         │
│    type: ENUM               │
│    title: VARCHAR(200)      │
│    message: TEXT            │
│    link: VARCHAR            │
│    is_read: BOOLEAN         │
│    is_email_sent: BOOLEAN   │
│    created_at: TIMESTAMP    │
│    read_at: TIMESTAMP       │
└─────────────────────────────┘
```

**Foreign Key**:
- `user_id` → `users.id`

**Note**: "ENUM type: project_*, group_*, evaluation_*, resource_*, meeting_*, system_*"

---

## 🎨 ZONE 6: ADDITIONAL MODULE

### Table 30: activity_logs (OPTIONAL)

**Vị trí**: X: 350, Y: 1100

**Cấu trúc**:
```
┌─────────────────────────────┐
│  activity_logs              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 user_id: INTEGER         │
│    action: VARCHAR(100)     │
│    entity_type: VARCHAR(50) │
│    entity_id: INTEGER       │
│    details: TEXT            │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `user_id` → `users.id`

**Note**: "Table này OPTIONAL - nếu không cần có thể bỏ"

---

## 🔗 BƯỚC QUAN TRỌNG: VẼ RELATIONSHIPS

### Cách vẽ 1 relationship:

1. **Chọn Connector tool** (arrow với đuôi crow's foot)
2. **Click vào FK column** của table con
3. **Kéo đến PK column** của table cha

### Relationship styles:

**One-to-Many (1:N)**:
- Từ table cha → crow's foot đến table con
- Ví dụ: `users.id` → `projects.created_by`

**Many-to-Many (M:N)**:
- Qua junction table
- Ví dụ: `classes` ↔ `class_members` ↔ `students`

### Format relationships:

- **Line**: Solid, 1.5px
- **Color**: Gray (#757575)
- **Label**: FK column name (small, 9pt)
- **Cardinality**: Thêm text "1" và "N" ở 2 đầu

---

## 🎨 STYLING FINAL

### Background colors cho zones:

1. **Zone 1 (Users/Academic)**: Light Blue background (#E3F2FD)
2. **Zone 2 (Projects/Groups)**: Light Orange (#FFF3E0)
3. **Zone 3 (Collaboration)**: Light Green (#E8F5E9)
4. **Zone 4 (Evaluation)**: Light Purple (#F3E5F5)
5. **Zone 5 (Notifications)**: Light Yellow (#FFF9C4)
6. **Zone 6 (Additional)**: Light Gray (#FAFAFA)

**Cách làm**:
1. Vẽ rectangle lớn bao quanh cả zone
2. **Arrange** → **Send to Back**
3. Opacity: 30%

---

## 💾 EXPORT

1. **View** → **Fit Page**
2. **File** → **Export as** → **PNG**
3. Settings:
   - Zoom: **150%** (vì A3 rất lớn)
   - Border: 20
   - Transparent: ❌ No
4. Tên: `4.2-erd-full.png`
5. Save vào: `Documentation/04-SDD/diagrams/`

---

## ✅ CHECKLIST

### Tables (37 total)
- [ ] **Zone 1 - Users & Academic (7 tables)**:
  - [ ] users (12 fields)
  - [ ] subjects
  - [ ] curricula
  - [ ] classes
  - [ ] class_members
  - [ ] class_projects (junction)
  
- [ ] **Zone 2 - Projects & Groups (15 tables)**:
  - [ ] projects (15 fields with curriculum_id, goals, requirements)
  - [ ] project_milestones (with week_number, deliverables)
  - [ ] milestone_questions
  - [ ] groups (NO leader_id, NO status)
  - [ ] group_members (role ENUM: leader/member)
  - [ ] group_milestones (milestone_id, completed_by)
  - [ ] checkpoints (with created_by, due_date)
  - [ ] checkpoint_assignments
  - [ ] checkpoint_submissions
  - [ ] workspace_cards (Kanban columns)
  - [ ] tasks (with card_id, parent_task_id, created_by)
  
- [ ] **Zone 3 - Collaboration (7 tables)**:
  - [ ] meetings (with started_at, ended_at)
  - [ ] meeting_participants (junction)
  - [ ] chat_messages (content, is_edited, updated_at)
  - [ ] resources (name, resource_type ENUM)
  - [ ] whiteboard_sessions
  - [ ] document_sessions
  
- [ ] **Zone 4 - Evaluation (6 tables)**:
  - [ ] peer_reviews (4 score fields)
  - [ ] group_evaluations
  - [ ] member_evaluations
  - [ ] milestone_answers
  - [ ] checkpoint_evaluations
  
- [ ] **Zone 5 - Notifications (1 table)**:
  - [ ] notifications (with type ENUM, is_email_sent)
  
- [ ] **Zone 6 - Additional (1 table - OPTIONAL)**:
  - [ ] activity_logs (OPTIONAL)

### Keys & Relationships
- [ ] Mỗi table có PK (🔑) rõ ràng
- [ ] Mỗi FK (🔗) vẽ line đến PK tương ứng
- [ ] Junction tables (6): class_projects, class_members, group_members, checkpoint_assignments, meeting_participants
- [ ] Self-reference: tasks.parent_task_id → tasks.id
- [ ] Data types chính xác (INTEGER, VARCHAR, TEXT, BOOLEAN, ENUM, FLOAT, TIMESTAMP)
- [ ] ENUM values note rõ (role, status, resource_type, notification_type)

### Visual Elements
- [ ] 6 zones có màu nền phân biệt
- [ ] Indexes được note (🔍)
- [ ] Legend/Key giải thích icons (🔑, 🔗, 🔍)
- [ ] Relationships vẽ đúng cardinality (1:N, M:N)
- [ ] Export PNG resolution cao (150-200%)

---

**THỜI GIAN**: 4-5 giờ (tăng từ 3-4h do thêm 9 tables)

**TIP**: Vẽ từng zone một, save thường xuyên! Kiểm tra lại code ở `/collabsphere/backend/app/models/` nếu có thắc mắc.
