# HƯỚNG DẪN VẼ: CLASS DIAGRAM - GROUP MODULE
**File xuất**: `4.3.4-class-group.png`  
**Thời gian**: ~1.5 giờ  
**Độ khó**: ⭐⭐⭐⭐ Khó (nhiều classes, complex relationships)

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **Group Module** - MODULE PHỨC TẠP NHẤT! Bao gồm:
- **Group** (Nhóm)
- **GroupMember** (Thành viên nhóm)
- **GroupMilestone** (Milestone thực tế của nhóm)
- **Checkpoint** (Điểm đánh giá)
- **Task** (Công việc)
- Multiple relationships & constraints

---

## 🛠️ CHUẨN BỊ

- Canvas: **A4 Landscape** (hoặc A3 nếu muốn rộng hơn)
- Grid: 10px
- Font: Courier New cho code

---

## 📐 LAYOUT STRATEGY (QUAN TRỌNG!)

```
┌────────────┐     ┌────────────────┐
│  Project   │────▷│     Group      │◁────┌──────────┐
│ (external) │     └────────────────┘     │  Class   │
└────────────┘              │              │(external)│
                            │ 1            └──────────┘
                            │
                ┌───────────┴──────────┬──────────────┐
                │                      │              │
                ▼ N                    ▼ N            ▼ N
        ┌──────────────┐      ┌──────────────┐   ┌────────┐
        │ GroupMember  │      │ Checkpoint   │   │  Task  │
        └──────────────┘      └──────────────┘   └────────┘
                │                                      │
                │ N                                    │
                ▼                                      ▼ 1
        ┌──────────────┐                      ┌──────────────┐
        │    User      │                      │ GroupMember  │
        │  (Student)   │                      │ (assigned_to)│
        └──────────────┘                      └──────────────┘

                ┌──────────────────┐
                │ GroupMilestone   │
                └──────────────────┘
                        │ N
                        ▼ 1
                  ┌──────────┐
                  │  Group   │
                  └──────────┘
```

---

## 🎨 BƯỚC 1: VẼ GROUP CLASS (CORE)

**Vị trí**: Center top, X: 400, Y: 50

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│              Group                       │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - name: string                           │
│ - class_id: int                          │
│ - project_id: int                        │
│ - leader_id: int                         │
│ - description: string?                   │
│ - status: GroupStatus                    │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(name, class_id, project_id)   │
│ + add_member(student_id: int): bool      │
│ + remove_member(member_id: int): bool    │
│ + set_leader(member_id: int): void       │
│ + get_members(): List[GroupMember]       │
│ + get_milestones(): List[GroupMilestone] │
│ + get_checkpoints(): List[Checkpoint]    │
│ + get_tasks(): List[Task]                │
│ + is_member(user_id: int): bool          │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Teal (#E0F2F1)**
- Border: **Teal (#009688)**, 2px
- Width: 400px

---

## 🎨 BƯỚC 2: VẼ GROUPMEMBER CLASS

**Vị trí**: Below left, X: 50, Y: 400

```
┌──────────────────────────────────────────┐
│      <<Entity>> <<Junction>>             │
│          GroupMember                     │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - student_id: int                        │
│ - role: MemberRole                       │
│ - contribution_score: float              │
│ - joined_at: datetime                    │
│ - status: string                         │
├──────────────────────────────────────────┤
│ + __init__(group_id, student_id)         │
│ + get_group(): Group                     │
│ + get_student(): User                    │
│ + is_leader(): bool                      │
│ + update_contribution(score: float): void│
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px
- Width: 400px

---

## 🎨 BƯỚC 3: VẼ GROUPMILESTONE CLASS

**Vị trí**: Right of Group, X: 850, Y: 50

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│        GroupMilestone                    │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - title: string                          │
│ - description: string                    │
│ - deadline: datetime                     │
│ - status: MilestoneStatus                │
│ - is_completed: bool                     │
│ - completed_at: datetime?                │
│ - completion_percentage: int             │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, title, deadline)    │
│ + get_group(): Group                     │
│ + mark_completed(): void                 │
│ + update_progress(percentage: int): void │
│ + is_overdue(): bool                     │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Teal (#E0F2F1)**
- Border: **Teal (#009688)**, 2px

---

## 🎨 BƯỚC 4: VẼ CHECKPOINT CLASS

**Vị trí**: Below Group, X: 400, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│           Checkpoint                     │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - title: string                          │
│ - description: string                    │
│ - deadline: datetime                     │
│ - submission_url: string?                │
│ - status: CheckpointStatus               │
│ - submitted_at: datetime?                │
│ - score: float?                          │
│ - feedback: string?                      │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, title, deadline)    │
│ + submit(url: string): void              │
│ + grade(score: float, feedback: string): void│
│ + is_submitted(): bool                   │
│ + is_overdue(): bool                     │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Cyan (#E0F7FA)**
- Border: **Cyan (#00BCD4)**, 2px

---

## 🎨 BƯỚC 5: VẼ TASK CLASS

**Vị trí**: Right bottom, X: 850, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│              Task                        │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - title: string                          │
│ - description: string                    │
│ - assigned_to: int?                      │
│ - status: TaskStatus                     │
│ - priority: TaskPriority                 │
│ - due_date: datetime?                    │
│ - order_index: int                       │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, title)              │
│ + assign_to(member_id: int): void        │
│ + mark_completed(): void                 │
│ + change_priority(priority: TaskPriority): void│
│ + move_up(): void                        │
│ + move_down(): void                      │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Amber (#FFF8E1)**
- Border: **Amber (#FFC107)**, 2px

---

## 🎨 BƯỚC 6: VẼ ENUMS

### 6.1: GroupStatus

**Vị trí**: Top right, X: 1250, Y: 50

```
┌─────────────────────────┐
│    <<enumeration>>      │
│      GroupStatus        │
├─────────────────────────┤
│ FORMING                 │
│ ACTIVE                  │
│ COMPLETED               │
│ DISBANDED               │
└─────────────────────────┘
```

---

### 6.2: MemberRole

**Vị trí**: X: 1250, Y: 200

```
┌─────────────────────────┐
│    <<enumeration>>      │
│      MemberRole         │
├─────────────────────────┤
│ LEADER                  │
│ MEMBER                  │
│ DEPUTY_LEADER           │
└─────────────────────────┘
```

---

### 6.3: MilestoneStatus

**Vị trí**: X: 1250, Y: 350

```
┌─────────────────────────┐
│    <<enumeration>>      │
│    MilestoneStatus      │
├─────────────────────────┤
│ NOT_STARTED             │
│ IN_PROGRESS             │
│ COMPLETED               │
│ OVERDUE                 │
└─────────────────────────┘
```

---

### 6.4: CheckpointStatus

**Vị trí**: X: 1250, Y: 500

```
┌─────────────────────────┐
│    <<enumeration>>      │
│   CheckpointStatus      │
├─────────────────────────┤
│ PENDING                 │
│ SUBMITTED               │
│ GRADED                  │
│ OVERDUE                 │
└─────────────────────────┘
```

---

### 6.5: TaskStatus

**Vị trí**: X: 1250, Y: 650

```
┌─────────────────────────┐
│    <<enumeration>>      │
│      TaskStatus         │
├─────────────────────────┤
│ TODO                    │
│ IN_PROGRESS             │
│ REVIEW                  │
│ DONE                    │
└─────────────────────────┘
```

---

### 6.6: TaskPriority

**Vị trí**: X: 1250, Y: 800

```
┌─────────────────────────┐
│    <<enumeration>>      │
│     TaskPriority        │
├─────────────────────────┤
│ LOW                     │
│ MEDIUM                  │
│ HIGH                    │
│ URGENT                  │
└─────────────────────────┘
```

**Styling cho tất cả enums**:
- Header: **Light Yellow (#FFF9C4)**
- Border: **Orange (#FF9800)**, 2px

---

## 🔗 BƯỚC 7: VẼ RELATIONSHIPS (CRITICAL!)

### R1: Group ──────▷ GroupMember (1:N Composition)

- From: Group
- To: GroupMember
- Type: **Filled diamond ♦** at Group end
- Labels: `1` → `*`
- Role: `members`

---

### R2: User (Student) ──────▷ GroupMember (1:N)

- From: User (vẽ dashed box "User")
- To: GroupMember
- Labels: `1` → `*`
- Property: `student_id: int`

---

### R3: Group ──────▷ GroupMilestone (1:N Composition)

- From: Group
- To: GroupMilestone
- Type: **Filled diamond ♦**
- Labels: `1` → `*`
- Role: `milestones`

---

### R4: Group ──────▷ Checkpoint (1:N Composition)

- From: Group
- To: Checkpoint
- Type: **Filled diamond ♦**
- Labels: `1` → `*`
- Role: `checkpoints`

---

### R5: Group ──────▷ Task (1:N Composition)

- From: Group
- To: Task
- Type: **Filled diamond ♦**
- Labels: `1` → `*`
- Role: `tasks`

---

### R6: Task ────── GroupMember (Optional Association)

- From: Task.assigned_to
- To: GroupMember
- Type: **Dashed arrow** (optional)
- Labels: `0..1` → `*`
- Role: `assignee`

---

### R7: Group → Class (N:1)

- From: Group.class_id
- To: Class (external, dashed box)
- Labels: `*` → `1`

---

### R8: Group → Project (N:1)

- From: Group.project_id
- To: Project (external, dashed box)
- Labels: `*` → `1`

---

### R9: Group → User (Leader) (N:1)

- From: Group.leader_id
- To: User
- Labels: `*` → `1`
- Role: `leader`

---

## 🎨 BƯỚC 8: THÊM CONSTRAINTS

### Note 1: Business Rules

**Vị trí**: Bottom center

```
┌────────────────────────────────────────────┐
│         <<Business Rules>>                 │
├────────────────────────────────────────────┤
│ 1. Group leader MUST be a GroupMember      │
│ 2. contribution_score range: 0.0 - 10.0    │
│ 3. Task assigned_to MUST be GroupMember    │
│ 4. Checkpoint score range: 0.0 - 10.0      │
│ 5. Milestone completion_percentage: 0-100  │
│ 6. Cannot remove leader without replacement│
│ 7. Group status ACTIVE requires ≥2 members │
└────────────────────────────────────────────┘
```

---

### Note 2: Indexes

```
┌────────────────────────────────────────┐
│            <<Indexes>>                 │
├────────────────────────────────────────┤
│ Group:                                 │
│   - class_id, project_id               │
│   - leader_id                          │
│                                        │
│ GroupMember:                           │
│   - (group_id, student_id) UNIQUE      │
│   - group_id, role                     │
│                                        │
│ Task:                                  │
│   - group_id, assigned_to              │
│   - status, priority                   │
│                                        │
│ Checkpoint:                            │
│   - group_id, deadline                 │
└────────────────────────────────────────┘
```

---

## 🎨 BƯỚC 9: STYLING FINAL

### Color scheme:

- **Group core**: Teal theme (#E0F2F1 / #009688)
- **GroupMember**: Purple theme (junction)
- **Milestones**: Teal theme (same as Group)
- **Checkpoints**: Cyan theme (#E0F7FA / #00BCD4)
- **Tasks**: Amber theme (#FFF8E1 / #FFC107)
- **Enums**: Yellow theme

### Layout tips:

- Sử dụng **vertical spacing: 50px** giữa các hàng
- **Horizontal spacing: 30px** giữa columns
- Align tops của classes cùng hàng
- Group relationships by color

---

## 💾 EXPORT

1. **View** → **Fit to Window**
2. **File** → **Export as** → **PNG**
3. Settings:
   - Zoom: **150%** (vì diagram lớn)
   - Border: 20px
   - Background: White
4. Filename: `4.3.4-class-group.png`
5. Save also: `4.3.4-class-group.drawio`

---

## ✅ CHECKLIST

- [ ] 5 entity classes vẽ đầy đủ
- [ ] 6 enums
- [ ] 9 relationships (3 composition ♦, 1 optional dashed)
- [ ] External references (User, Class, Project)
- [ ] Leader constraint highlighted
- [ ] Business rules note
- [ ] Index note
- [ ] Colors distinguish entity types
- [ ] Cardinality labels đầy đủ
- [ ] Export PNG + .drawio

---

## 🐛 TROUBLESHOOTING

**Q: Diagram quá to không vừa canvas?**  
A: Zoom out (Ctrl + Mouse Wheel), hoặc dùng A3 canvas

**Q: Relationships chồng chéo phức tạp?**  
A: Click line → Add waypoints → Tạo đường đi tránh các class khác

**Q: Filled diamond không hiện?**  
A: Format → End Arrow → "Diamond (filled)" - đảm bảo chọn đúng end

**Q: Làm sao highlight Leader constraint?**  
A: Vẽ bold arrow từ Group.leader_id → GroupMember với note "must exist"

---

**THỜI GIAN**: 1.5 giờ (module phức tạp nhất!)

**TIP**: Vẽ từng "layer" - Core entities trước → Relationships sau → Enums cuối!
