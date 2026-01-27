# HƯỚNG DẪN VẼ: CLASS DIAGRAM - ACADEMIC MODULE
**File xuất**: `4.3.2-class-academic.png`  
**Thời gian**: ~1 giờ  
**Độ khó**: ⭐⭐⭐ Trung bình

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **Academic Module** bao gồm:
- **Subject** (Môn học)
- **Curriculum** (Đề cương)
- **Class** (Lớp học)
- **ClassMember** (Thành viên lớp)
- Relationships 1:N và M:N

---

## 🛠️ CHUẨN BỊ

- Mở Draw.io: https://app.diagrams.net/
- Template: UML Class Diagram
- Canvas: A4 Landscape (vì có 4 classes cần horizontal layout)
- Enable: UML shapes

---

## 📐 LAYOUT STRATEGY

```
┌──────────┐         ┌──────────────┐         ┌───────────┐
│ Subject  │ 1 ───N  │  Curriculum  │         │   User    │
└──────────┘         └──────────────┘         └───────────┘
     │                                               │
     │ 1                                             │ 1
     │                                               │
     N                                               │
┌──────────┐                                         │
│  Class   │ ───────────────────────────────────────┘
└──────────┘                                    (lecturer_id)
     │
     │ 1
     │
     N
┌──────────────┐     N ───────── 1  ┌───────────┐
│ ClassMember  │ ────────────────────│   User    │
└──────────────┘                     └───────────┘
                                     (student_id)
```

**Legend**:
- 1:N relationships = One-to-Many
- M:N through junction table

---

## 🎨 BƯỚC 1: VẼ SUBJECT CLASS

**Vị trí**: Top left, X: 50, Y: 50

```
┌─────────────────────────────────────┐
│           <<Entity>>                │
│            Subject                  │
├─────────────────────────────────────┤
│ - id: int                           │
│ - code: string                      │
│ - name: string                      │
│ - credits: int                      │
│ - description: string?              │
│ - created_at: datetime              │
├─────────────────────────────────────┤
│ + __init__(code, name, credits)     │
│ + get_curriculum(): List[Curriculum]│
│ + get_classes(): List[Class]        │
│ + to_dict(): dict                   │
└─────────────────────────────────────┘
```

**Styling**:
- Header: **Light Green (#E8F5E9)**
- Border: **Green (#4CAF50)**, 2px
- Width: 350px

**Note**: Thêm constraint note
```
<<constraint>>
{unique: code}
```

---

## 🎨 BƯỚC 2: VẼ CURRICULUM CLASS

**Vị trí**: Top right of Subject, X: 450, Y: 50

```
┌─────────────────────────────────────┐
│           <<Entity>>                │
│          Curriculum                 │
├─────────────────────────────────────┤
│ - id: int                           │
│ - subject_id: int                   │
│ - week_number: int                  │
│ - content: string                   │
│ - learning_outcomes: string         │
│ - created_at: datetime              │
│ - updated_at: datetime              │
├─────────────────────────────────────┤
│ + __init__(subject_id, week_number) │
│ + get_subject(): Subject            │
│ + to_dict(): dict                   │
└─────────────────────────────────────┘
```

**Styling**:
- Header: **Light Green (#E8F5E9)**
- Border: **Green (#4CAF50)**, 2px
- Width: 350px

---

## 🎨 BƯỚC 3: VẼ CLASS (LỚP HỌC)

**Vị trí**: Below Subject, X: 50, Y: 400

```
┌─────────────────────────────────────┐
│           <<Entity>>                │
│             Class                   │
├─────────────────────────────────────┤
│ - id: int                           │
│ - code: string                      │
│ - name: string                      │
│ - subject_id: int                   │
│ - lecturer_id: int                  │
│ - semester: string                  │
│ - academic_year: string             │
│ - max_students: int                 │
│ - status: ClassStatus               │
│ - created_at: datetime              │
│ - updated_at: datetime              │
├─────────────────────────────────────┤
│ + __init__(code, name, subject_id)  │
│ + get_subject(): Subject            │
│ + get_lecturer(): User              │
│ + get_members(): List[ClassMember]  │
│ + add_student(student_id): bool     │
│ + remove_student(student_id): bool  │
│ + is_full(): bool                   │
│ + to_dict(): dict                   │
└─────────────────────────────────────┘
```

**Styling**:
- Header: **Light Blue (#E3F2FD)**
- Border: **Blue (#2196F3)**, 2px
- Width: 350px

---

## 🎨 BƯỚC 4: VẼ CLASSMEMBER CLASS

**Vị trí**: Below Class, X: 50, Y: 750

```
┌─────────────────────────────────────┐
│      <<Entity>> <<Junction>>        │
│          ClassMember                │
├─────────────────────────────────────┤
│ - id: int                           │
│ - class_id: int                     │
│ - student_id: int                   │
│ - role: string                      │
│ - joined_at: datetime               │
│ - status: string                    │
├─────────────────────────────────────┤
│ + __init__(class_id, student_id)    │
│ + get_class(): Class                │
│ + get_student(): User               │
│ + is_active(): bool                 │
│ + to_dict(): dict                   │
└─────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px
- Width: 350px

**Note**: Thêm stereotype `<<Junction>>` vì là M:N table

---

## 🎨 BƯỚC 5: VẼ CLASSSTATUS ENUM

**Vị trí**: Right of Class, X: 450, Y: 450

```
┌─────────────────────────┐
│    <<enumeration>>      │
│      ClassStatus        │
├─────────────────────────┤
│ PLANNING                │
│ ACTIVE                  │
│ COMPLETED               │
│ CANCELLED               │
└─────────────────────────┘
```

**Styling**:
- Header: **Light Yellow (#FFF9C4)**
- Border: **Orange (#FF9800)**, 2px
- Width: 220px

---

## 🔗 BƯỚC 6: VẼ RELATIONSHIPS

### R1: Subject ──────▷ Curriculum (1:N)

**Meaning**: 1 Subject có nhiều Curriculum entries

**Cách vẽ**:
1. Arrow từ **Subject** → **Curriculum**
2. Type: **Plain arrow** (not inheritance)
3. Label near Subject: `1`
4. Label near Curriculum: `*` hoặc `N`
5. Role name: `curricula` (italic)

**Attach point**:
- Từ right side của Subject box
- Đến left side của Curriculum box

---

### R2: Subject ──────▷ Class (1:N)

**Meaning**: 1 Subject có nhiều Classes

**Cách vẽ**:
1. Arrow từ **Subject** → **Class**
2. Vertical line (vì Class ở dưới Subject)
3. Label near Subject: `1`
4. Label near Class: `*`
5. Role name: `classes`

**Attach point**:
- Từ bottom center của Subject
- Đến top center của Class

---

### R3: User ──────▷ Class (1:N)

**Meaning**: 1 Lecturer (User) has many Classes

**Cách vẽ**:
1. Vẽ **User** class phía trên bên phải (hoặc dùng dashed box labeled "User (from User Module)")
2. Arrow từ **User** → **Class**
3. Label near User: `1`
4. Label near Class: `*`
5. Role name: `lecturer`
6. Property label near Class: `lecturer_id: int`

**Tip**: Vì User class ở module khác, có thể:
- Option 1: Vẽ full User class (copy từ User module)
- Option 2: Vẽ dashed rectangle với text "User" (external reference)

---

### R4: Class ──────▷ ClassMember (1:N)

**Cách vẽ**:
1. Arrow từ **Class** → **ClassMember**
2. Vertical line
3. Label near Class: `1`
4. Label near ClassMember: `*`
5. Role name: `members`

---

### R5: User ──────▷ ClassMember (1:N)

**Meaning**: 1 Student (User) có nhiều ClassMember records

**Cách vẽ**:
1. Arrow từ **User** (student) → **ClassMember**
2. Label near User: `1`
3. Label near ClassMember: `*`
4. Role name: `student`
5. Property label: `student_id: int`

---

### R6: Curriculum ──────▷ Subject (N:1) - Composition

**Meaning**: Curriculum strongly depends on Subject

**Cách vẽ**:
1. Arrow từ **Curriculum** → **Subject**
2. Type: **Filled diamond** at Subject end (composition)
3. Line: Solid
4. This indicates Curriculum cannot exist without Subject

---

## 🎨 BƯỚC 7: THÊM CONSTRAINTS

### Note 1: Business Rules

**Vị trí**: Center bottom

```
┌────────────────────────────────────┐
│    <<Business Rules>>              │
├────────────────────────────────────┤
│ 1. Class.max_students >= 0         │
│ 2. Curriculum.week_number: 1-15    │
│ 3. Class.semester: HK1, HK2, HK3   │
│ 4. Student cannot join full class  │
└────────────────────────────────────┘
```

**Connect**: Dashed lines đến relevant classes

---

### Note 2: Indexes

```
┌────────────────────────────────────┐
│       <<Indexes>>                  │
├────────────────────────────────────┤
│ Subject:                           │
│   - code (UNIQUE)                  │
│                                    │
│ Class:                             │
│   - code (UNIQUE)                  │
│   - subject_id                     │
│   - lecturer_id                    │
│                                    │
│ ClassMember:                       │
│   - (class_id, student_id) UNIQUE  │
└────────────────────────────────────┘
```

---

## 🎨 BƯỚC 8: STYLING FINAL

### Color scheme:

- **Subject & Curriculum**: Green theme (academic content)
- **Class**: Blue theme (organizational unit)
- **ClassMember**: Purple theme (junction/relationship)
- **Enums**: Yellow theme

### Typography:

- Class names: **Arial Bold, 14pt**
- Attributes/Methods: **Courier New, 9pt**
- Stereotypes: **Arial Italic, 8pt**
- Labels: **Arial, 9pt**

### Line styles:

- Association: Solid, 1.5px, Black
- Composition: Solid, 2px, filled diamond
- Aggregation: Solid, 1.5px, hollow diamond

---

## 💾 EXPORT

1. **View** → **Fit to Window**
2. **File** → **Export as** → **PNG**
3. Settings:
   - Zoom: **200%**
   - Border: 15px
   - Background: White
4. Filename: `4.3.2-class-academic.png`
5. Save to: `Documentation/04-SDD/diagrams/`

**Also save .drawio**:
- **File** → **Save As** → `4.3.2-class-academic.drawio`

---

## ✅ CHECKLIST

- [ ] 4 entity classes vẽ đầy đủ
- [ ] 1 enum (ClassStatus)
- [ ] 6 relationships với cardinality
- [ ] Composition relationship (Curriculum ♦ Subject)
- [ ] External User class referenced
- [ ] Constraint notes
- [ ] Index notes
- [ ] Business rules
- [ ] Colors theo theme
- [ ] Export PNG + .drawio

---

## 🐛 TROUBLESHOOTING

**Q: Relationship lines bị chồng chéo?**  
A: Adjust waypoints - Click line → kéo các điểm giữa để tạo góc

**Q: Làm sao vẽ filled diamond (composition)?**  
A: Chọn arrow → Format → End Arrow → Composition (filled diamond)

**Q: User class nên vẽ đầy đủ hay chỉ reference?**  
A: Nếu đã có User module diagram riêng, vẽ dashed box với label "User (see User Module)"

---

**THỜI GIAN**: 1 giờ

**TIP**: Vẽ classes trước, relationships sau!
