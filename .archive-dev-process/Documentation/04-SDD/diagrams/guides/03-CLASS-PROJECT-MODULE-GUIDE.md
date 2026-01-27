# HƯỚNG DẪN VẼ: CLASS DIAGRAM - PROJECT MODULE
**File xuất**: `4.3.3-class-project.png`  
**Thời gian**: ~1 giờ  
**Độ khó**: ⭐⭐⭐ Trung bình

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **Project Module** bao gồm:
- **Project** (Đồ án)
- **ProjectMilestone** (Milestone template)
- **ClassProject** (Junction: Class ↔ Project)
- **ProjectStatus**, **ApprovalStatus** enums
- Approval workflow

---

## 🛠️ CHUẨN BỊ

- Canvas: A4 Landscape
- Enable UML shapes
- Grid: 10px

---

## 📐 LAYOUT

```
┌───────────┐                    ┌──────────────────┐
│   User    │ 1 ────────────N    │     Project      │
│(Lecturer) │                    │                  │
└───────────┘      created_by    └──────────────────┘
                                          │ 1
┌───────────┐                             │
│   User    │ 1 ───────────────────────N  │
│  (Head)   │        approved_by          │
└───────────┘                             │
                                          │
                                          N
                                 ┌──────────────────┐
                                 │ ProjectMilestone │
                                 └──────────────────┘

┌───────────┐         ┌──────────────────┐         ┌──────────┐
│   Class   │ N ──────│  ClassProject    │────── N │ Project  │
└───────────┘         └──────────────────┘         └──────────┘
           (from Academic)  <<Junction>>
```

---

## 🎨 BƯỚC 1: VẼ PROJECT CLASS

**Vị trí**: Center, X: 400, Y: 100

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│             Project                      │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - title: string                          │
│ - description: string                    │
│ - objectives: string                     │
│ - scope: string                          │
│ - expected_outcomes: string              │
│ - created_by: int                        │
│ - status: ProjectStatus                  │
│ - approval_status: ApprovalStatus        │
│ - approved_by: int?                      │
│ - approval_date: datetime?               │
│ - rejection_reason: string?              │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(title, description, ...)      │
│ + submit_for_approval(): void            │
│ + approve(approver_id: int): void        │
│ + reject(reason: string): void           │
│ + is_approved(): bool                    │
│ + is_pending(): bool                     │
│ + can_be_edited_by(user_id: int): bool   │
│ + get_milestones(): List[ProjectMilestone]│
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Orange (#FFF3E0)**
- Border: **Orange (#FF9800)**, 2px
- Width: 400px

---

## 🎨 BƯỚC 2: VẼ PROJECTMILESTONE CLASS

**Vị trí**: Below Project, X: 400, Y: 550

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│        ProjectMilestone                  │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - project_id: int                        │
│ - title: string                          │
│ - description: string                    │
│ - order_index: int                       │
│ - duration_weeks: int                    │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(project_id, title, order)     │
│ + get_project(): Project                 │
│ + move_up(): void                        │
│ + move_down(): void                      │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Orange (#FFF3E0)**
- Border: **Orange (#FF9800)**, 2px
- Width: 400px

---

## 🎨 BƯỚC 3: VẼ CLASSPROJECT CLASS (JUNCTION)

**Vị trí**: Left, X: 50, Y: 300

```
┌──────────────────────────────────────────┐
│      <<Entity>> <<Junction>>             │
│          ClassProject                    │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - class_id: int                          │
│ - project_id: int                        │
│ - assigned_at: datetime                  │
├──────────────────────────────────────────┤
│ + __init__(class_id, project_id)         │
│ + get_class(): Class                     │
│ + get_project(): Project                 │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px
- Width: 350px

**Note**: Junction table cho M:N relationship

---

## 🎨 BƯỚC 4: VẼ PROJECTSTATUS ENUM

**Vị trí**: Right of Project, X: 850, Y: 120

```
┌─────────────────────────┐
│    <<enumeration>>      │
│     ProjectStatus       │
├─────────────────────────┤
│ DRAFT                   │
│ TEMPLATE                │
│ ARCHIVED                │
└─────────────────────────┘
```

**Styling**:
- Header: **Light Yellow (#FFF9C4)**
- Border: **Orange (#FF9800)**, 2px

---

## 🎨 BƯỚC 5: VẼ APPROVALSTATUS ENUM

**Vị trí**: Below ProjectStatus, X: 850, Y: 300

```
┌─────────────────────────┐
│    <<enumeration>>      │
│    ApprovalStatus       │
├─────────────────────────┤
│ PENDING                 │
│ APPROVED                │
│ REJECTED                │
│ REVISION_REQUESTED      │
└─────────────────────────┘
```

**Styling**: Same as ProjectStatus

---

## 🔗 BƯỚC 6: VẼ RELATIONSHIPS

### R1: Project ──────▷ ProjectMilestone (1:N Composition)

**Cách vẽ**:
1. Arrow từ **Project** → **ProjectMilestone**
2. **Filled diamond** ♦ at Project end (composition)
3. Vertical line
4. Labels: `1` at Project, `*` at ProjectMilestone
5. Role name: `milestones`

**Meaning**: Milestones cannot exist without Project (strong ownership)

---

### R2: User (Lecturer) ──────▷ Project (1:N)

**Cách vẽ**:
1. Draw **User** box ở top left (or use dashed reference)
2. Arrow từ **User** → **Project**
3. Labels: `1` at User, `*` at Project
4. Role name: `creator`
5. Property: `created_by: int` in Project

---

### R3: User (Head) ──────▷ Project (1:N)

**Cách vẽ**:
1. Draw another **User** box ở top right (or same User with multiple roles)
2. Arrow từ **User** → **Project**
3. Labels: `1` at User, `*` at Project
4. Role name: `approver`
5. Property: `approved_by: int?` in Project
6. Dashed arrow (optional relationship)

**Tip**: Có thể vẽ 1 User box với 2 arrows khác role

---

### R4: Class ↔ ClassProject ↔ Project (M:N)

**Cách vẽ**:
1. **Class** (external, dashed box) ở left
2. Arrow từ **Class** → **ClassProject**: `1` to `*`
3. Arrow từ **ClassProject** → **Project**: `*` to `1`

**Labels**:
- ClassProject side: `class_id`
- Project side: `project_id`

---

### R5: Project → ProjectStatus (Association)

**Cách vẽ**:
1. Arrow từ **Project.status** → **ProjectStatus enum**
2. Plain arrow
3. Label: `status`

---

### R6: Project → ApprovalStatus (Association)

**Cách vẽ**:
1. Arrow từ **Project.approval_status** → **ApprovalStatus enum**
2. Plain arrow
3. Label: `approval_status`

---

## 🎨 BƯỚC 7: THÊM WORKFLOW DIAGRAM (OPTIONAL)

**Vị trí**: Bottom right corner

**State Machine cho Approval**:

```
┌────────────────────────────────────┐
│   Project Approval Workflow        │
├────────────────────────────────────┤
│                                    │
│   DRAFT ──submit──▷ PENDING        │
│                         │          │
│           ┌─────────────┴───┐      │
│           ▼                 ▼      │
│       APPROVED          REJECTED   │
│                                    │
│   REJECTED ──revise──▷ PENDING     │
└────────────────────────────────────┘
```

**Cách vẽ**:
1. Rectangle container
2. Rounded rectangles cho states
3. Arrows với labels (submit, approve, reject, revise)

---

## 🎨 BƯỚC 8: THÊM CONSTRAINTS

### Note: Business Rules

```
┌──────────────────────────────────────┐
│      <<Business Rules>>              │
├──────────────────────────────────────┤
│ 1. Only LECTURER can create projects │
│ 2. Only HEAD can approve/reject      │
│ 3. APPROVED projects cannot be edited│
│ 4. Milestones order_index: sequential│
│ 5. Milestone duration_weeks > 0      │
│ 6. Project title: max 200 chars      │
└──────────────────────────────────────┘
```

---

### Note: Indexes

```
┌──────────────────────────────────────┐
│         <<Indexes>>                  │
├──────────────────────────────────────┤
│ Project:                             │
│   - created_by                       │
│   - approved_by                      │
│   - status                           │
│   - approval_status                  │
│                                      │
│ ProjectMilestone:                    │
│   - project_id, order_index (UNIQUE) │
│                                      │
│ ClassProject:                        │
│   - (class_id, project_id) UNIQUE    │
└──────────────────────────────────────┘
```

---

## 🎨 BƯỚC 9: STYLING FINAL

### Colors:

- **Project entities**: Orange theme (#FFF3E0 / #FF9800)
- **Junction table**: Purple theme (#F3E5F5 / #9C27B0)
- **Enums**: Yellow theme (#FFF9C4 / #FFA000)

### Typography:

- Class names: **Arial Bold, 14pt**
- Methods: **Courier New, 9pt**
- Stereotypes: **Arial Italic, 8pt**

### Special notation:

- **Composition**: Filled diamond ♦
- **Optional FK**: `approved_by: int?` (nullable)
- **Dashed arrow**: Optional relationship

---

## 💾 EXPORT

1. **File** → **Export as** → **PNG**
2. Settings:
   - Zoom: **200%**
   - Border: 15px
   - Background: White
3. Filename: `4.3.3-class-project.png`
4. Save also: `4.3.3-class-project.drawio`

---

## ✅ CHECKLIST

- [ ] 3 entity classes (Project, ProjectMilestone, ClassProject)
- [ ] 2 enums (ProjectStatus, ApprovalStatus)
- [ ] Composition relationship (Project ♦ ProjectMilestone)
- [ ] 6 relationships total
- [ ] User references (Lecturer & Head roles)
- [ ] Approval workflow diagram (optional)
- [ ] Business rules note
- [ ] Index note
- [ ] Colors theo theme
- [ ] Export PNG + .drawio

---

## 🐛 TROUBLESHOOTING

**Q: Filled diamond không xuất hiện?**  
A: Click arrow → Format panel → End Arrow → "Diamond (filled)"

**Q: Nullable attribute ký hiệu thế nào?**  
A: Thêm `?` sau type: `approved_by: int?`

**Q: State machine diagram nên vẽ riêng không?**  
A: Có thể vẽ trong cùng 1 file như Note, hoặc tạo file riêng `4.3.3b-project-workflow.png`

---

**THỜI GIAN**: 1 giờ

**TIP**: Approval workflow rất quan trọng - highlight bằng màu!
