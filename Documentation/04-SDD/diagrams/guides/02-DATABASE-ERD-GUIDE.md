# HƯỚNG DẪN VẼ: DATABASE ERD (28 TABLES)
**File xuất**: `4.2-erd-full.png`  
**Thời gian**: ~3-4 giờ  
**Độ khó**: ⭐⭐⭐⭐ Khó (nhiều tables)

---

## 🎯 MỤC TIÊU

Vẽ ERD đầy đủ cho CollabSphere database gồm **28 tables** được nhóm thành **6 modules**:
1. Users & Academic (5 tables)
2. Projects & Groups (8 tables)
3. Collaboration (6 tables)
4. Evaluation (6 tables)
5. Notifications (1 table)
6. Additional (2 tables)

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

Vì có 28 tables, sẽ chia thành **6 zones theo modules**:

```
┌──────────────────────────────────────────────────────────────┐
│  ZONE 1: Users & Academic (Top Left)                        │
│  5 tables: users, subjects, curricula, classes, members     │
├──────────────────────────────────────────────────────────────┤
│  ZONE 2: Projects & Groups (Top Right)                      │
│  8 tables: projects, milestones, groups, tasks...           │
├──────────────────────────────────────────────────────────────┤
│  ZONE 3: Collaboration (Middle Left)                        │
│  6 tables: chat, meetings, resources, whiteboard...         │
├──────────────────────────────────────────────────────────────┤
│  ZONE 4: Evaluation (Middle Right)                          │
│  6 tables: peer_reviews, evaluations, checkpoints...        │
├──────────────────────────────────────────────────────────────┤
│  ZONE 5: Notifications (Bottom Left)                        │
│  1 table: notifications                                      │
├──────────────────────────────────────────────────────────────┤
│  ZONE 6: Additional (Bottom Right)                          │
│  2 tables: project_tags, activity_logs                      │
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
│    semester: VARCHAR(20)    │
│    academic_year: VARCHAR   │
│    max_students: INTEGER    │
│    status: ENUM             │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `subject_id` → `subjects.id`
- `lecturer_id` → `users.id`

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
│ 🔗 student_id: INTEGER      │
│    role: VARCHAR(20)        │
│    joined_at: TIMESTAMP     │
│    status: VARCHAR(20)      │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `student_id` → `users.id`

**Note**: "🔗 Junction table (M:N)"

---

## 🎨 ZONE 2: PROJECTS & GROUPS MODULE

### Table 6: projects

**Vị trí**: X: 1000, Y: 50 (top right)

**Cấu trúc**:
```
┌─────────────────────────────┐
│  projects                   │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    objectives: TEXT         │
│    scope: TEXT              │
│    expected_outcomes: TEXT  │
│ 🔗 created_by: INTEGER      │
│    status: ENUM             │
│    approval_status: ENUM    │
│ 🔗 approved_by: INTEGER     │
│    rejection_reason: TEXT   │
│    approved_at: TIMESTAMP   │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `created_by` → `users.id` (Lecturer)
- `approved_by` → `users.id` (Head)

---

### Table 7: project_milestones

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
│    order_index: INTEGER     │
│    duration_weeks: INTEGER  │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Key**:
- `project_id` → `projects.id`

---

### Table 8: class_projects

**Vị trí**: X: 1000, Y: 300

**Cấu trúc**:
```
┌─────────────────────────────┐
│  class_projects             │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 class_id: INTEGER        │
│ 🔗 project_id: INTEGER      │
│    assigned_at: TIMESTAMP   │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `project_id` → `projects.id`

**Note**: "🔗 Junction table"

---

### Table 9: groups

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
│ 🔗 leader_id: INTEGER       │
│    description: TEXT        │
│    status: ENUM             │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Foreign Keys**:
- `class_id` → `classes.id`
- `project_id` → `projects.id`
- `leader_id` → `users.id`

---

### Table 10: group_members

**Vị trí**: X: 1600, Y: 300

**Cấu trúc**:
```
┌─────────────────────────────┐
│  group_members              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 student_id: INTEGER      │
│    role: VARCHAR(20)        │
│    contribution_score: FLOAT│
│    joined_at: TIMESTAMP     │
│    status: VARCHAR(20)      │
└─────────────────────────────┘
```

**Foreign Keys**:
- `group_id` → `groups.id`
- `student_id` → `users.id`

---

### Table 11: group_milestones

**Vị trí**: X: 1000, Y: 550

**Cấu trúc**:
```
┌─────────────────────────────┐
│  group_milestones           │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    deadline: TIMESTAMP      │
│    status: ENUM             │
│    is_completed: BOOLEAN    │
│    completed_at: TIMESTAMP  │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

---

### Table 12: checkpoints

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
│    deadline: TIMESTAMP      │
│    submission_url: VARCHAR  │
│    status: VARCHAR(20)      │
│    submitted_at: TIMESTAMP  │
└─────────────────────────────┘
```

---

### Table 13: tasks

**Vị trí**: X: 1600, Y: 550

**Cấu trúc**:
```
┌─────────────────────────────┐
│  tasks                      │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│ 🔗 assigned_to: INTEGER     │
│    status: ENUM             │
│    priority: ENUM           │
│    due_date: TIMESTAMP      │
│    order_index: INTEGER     │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

---

## 🎨 ZONE 3: COLLABORATION MODULE

### Table 14: meetings

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

### Table 15: meeting_participants

**Vị trí**: X: 350, Y: 600

**Cấu trúc**:
```
┌─────────────────────────────┐
│  meeting_participants       │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 meeting_id: INTEGER      │
│ 🔗 user_id: INTEGER         │
│    status: VARCHAR(20)      │
│    joined_at: TIMESTAMP     │
└─────────────────────────────┘
```

---

### Table 16: chat_messages

**Vị trí**: X: 50, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  chat_messages              │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│ 🔗 sender_id: INTEGER       │
│    message: TEXT            │
│    message_type: VARCHAR    │
│    file_url: VARCHAR        │
│    is_read: BOOLEAN         │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Note**: "💬 Real-time chat"

---

### Table 17: resources

**Vị trí**: X: 350, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  resources                  │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│    title: VARCHAR(200)      │
│    description: TEXT        │
│    file_url: VARCHAR        │
│    file_type: VARCHAR(50)   │
│    file_size: BIGINT        │
│ 🔗 uploaded_by: INTEGER     │
│ 🔗 group_id: INTEGER        │
│ 🔗 class_id: INTEGER        │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

---

### Table 18: whiteboard_sessions

**Vị trí**: X: 650, Y: 850

**Cấu trúc**:
```
┌─────────────────────────────┐
│  whiteboard_sessions        │
├─────────────────────────────┤
│ 🔑 id: INTEGER              │
│ 🔗 group_id: INTEGER        │
│    session_name: VARCHAR    │
│    session_data: JSONB      │
│ 🔗 created_by: INTEGER      │
│    created_at: TIMESTAMP    │
│    updated_at: TIMESTAMP    │
└─────────────────────────────┘
```

---

### Table 19: document_sessions

**Vị trí**: X: 950, Y: 850

**Cấu trúc**: (Tương tự whiteboard_sessions)

---

## 🎨 ZONE 4: EVALUATION MODULE

### Table 20: peer_reviews

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
│    period: VARCHAR(20)      │
│    rating: INTEGER          │
│    comments: TEXT           │
│    is_anonymous: BOOLEAN    │
│    created_at: TIMESTAMP    │
└─────────────────────────────┘
```

**Note**: "🔒 Anonymous to students"

---

### Table 21-25: (Tương tự cấu trúc)
- group_evaluations
- member_evaluations
- checkpoint_evaluations
- milestone_questions
- milestone_answers

**Vị trí**: Arrange vertically dưới peer_reviews

---

## 🎨 ZONE 5 & 6: NOTIFICATIONS & ADDITIONAL

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
└─────────────────────────────┘
```

---

### Table 27: project_tags

**Vị trí**: X: 1900, Y: 1100

---

### Table 28: activity_logs

**Vị trí**: X: 2200, Y: 1100

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

- [ ] 28 tables vẽ đầy đủ
- [ ] Mỗi table có PK (🔑) và FK (🔗) rõ ràng
- [ ] Data types chính xác
- [ ] Indexes được note
- [ ] Relationships vẽ đúng (1:N, M:N)
- [ ] 6 zones có màu nền phân biệt
- [ ] Legend/Key giải thích icons
- [ ] Export PNG resolution cao

---

**THỜI GIAN**: 3-4 giờ (có thể chia làm nhiều lần)

**TIP**: Vẽ từng zone một, save thường xuyên!
