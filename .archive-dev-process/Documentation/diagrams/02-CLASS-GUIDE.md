# 📐 GIAI ĐOẠN 2: CLASS DIAGRAMS

**Thời gian ước tính**: 8 giờ (6 diagrams)  
**Công cụ khuyên dùng**: Draw.io hoặc Visual Paradigm  
**Output**: 6 file PNG trong folder `diagrams/class/`

---

## 🎯 MỤC TIÊU

Vẽ 6 Class Diagrams cho các nhóm thực thể trong hệ thống:
1. User & Roles (Người dùng và vai trò)
2. Academic Entities (Môn học, lớp học)
3. Project Management (Quản lý dự án)
4. Group & Collaboration (Nhóm và cộng tác)
5. Evaluation System (Hệ thống đánh giá)
6. Communication (Giao tiếp và chat)

---

## 📖 KIẾN THỨC CƠ BẢN

### Class Diagram là gì?
- Mô tả **cấu trúc tĩnh** của hệ thống
- Thể hiện **các lớp** (classes), **thuộc tính** (attributes), **phương thức** (methods)
- Thể hiện **mối quan hệ** giữa các lớp

### Các thành phần chính:

#### 1. **Class** (Lớp)
```
┌────────────────────┐
│    ClassName       │ ← Tên lớp (PascalCase)
├────────────────────┤
│ - attribute1: Type │ ← Thuộc tính (private: -)
│ + attribute2: Type │ ← Thuộc tính (public: +)
│ # attribute3: Type │ ← Thuộc tính (protected: #)
├────────────────────┤
│ + method1(): Type  │ ← Phương thức (public)
│ - method2(): Type  │ ← Phương thức (private)
└────────────────────┘
```

#### 2. **Visibility** (Phạm vi truy cập)
- `+` Public (truy cập từ mọi nơi)
- `-` Private (chỉ trong class)
- `#` Protected (trong class và subclass)
- `~` Package (trong cùng package)

#### 3. **Relationships** (Mối quan hệ)

**a. Association (Liên kết)**
```
ClassA ────────── ClassB
       1       *
```
- Đường thẳng liền
- Multiplicity: 1, *, 0..1, 1..*, 0..*, 2..5

**b. Aggregation (Tập hợp - Has-a, không bắt buộc)**
```
ClassA ◇────────── ClassB
     (whole)    (part)
```
- Kim cương rỗng ở phía "whole"
- Part có thể tồn tại độc lập

**c. Composition (Thành phần - Has-a, bắt buộc)**
```
ClassA ◆────────── ClassB
     (whole)    (part)
```
- Kim cương đặc ở phía "whole"
- Part không thể tồn tại mà không có whole

**d. Inheritance (Kế thừa - Is-a)**
```
ParentClass
     △
     │
     │
ChildClass
```
- Mũi tên tam giác rỗng chỉ về parent
- Child kế thừa tất cả attributes/methods từ parent

**e. Dependency (Phụ thuộc)**
```
ClassA ┄┄┄┄┄> ClassB
```
- Đường đứt nét + mũi tên
- ClassA sử dụng ClassB (tạm thời)

**f. Realization (Thực thi - implements)**
```
<<Interface>>
InterfaceName
     △
     ┊
     ┊
ClassName
```
- Đường đứt nét + mũi tên tam giác
- Class implement Interface

---

## 🚀 HƯỚNG DẪN VẼ BẰNG DRAW.IO

### Bước 1: Chuẩn bị
1. Mở https://app.diagrams.net/
2. Create New Diagram → UML → Class Diagram
3. Sidebar trái có các shapes: Class, Interface, Relationships

### Bước 2: Vẽ Class
1. Kéo "Class" shape từ sidebar
2. Double-click để edit:
   ```
   ClassName
   ────────────
   - id: UUID
   - name: String
   + created_at: DateTime
   ────────────
   + save(): void
   + delete(): void
   ```
3. Resize cho vừa nội dung

### Bước 3: Vẽ Relationships
1. Chọn loại relationship từ sidebar
2. Nối từ class này sang class khác
3. Double-click vào đường để thêm label (VD: "1..*")

### Bước 4: Sắp xếp Layout
- Parent class ở trên, child class ở dưới (cho inheritance)
- Class quan trọng ở giữa
- Align để đẹp: Right-click → Arrange → Align

---

## 📝 DIAGRAM 1: USER & ROLES

### **File name**: `class-user-roles.png`

### **Mô tả**: 
Hệ thống phân quyền với 5 roles: Admin, Staff, Head, Lecturer, Student

### **Classes cần vẽ**:

```
                    ┌─────────────────────────┐
                    │      <<Abstract>>       │
                    │         User            │
                    ├─────────────────────────┤
                    │ # id: UUID              │
                    │ # username: String      │
                    │ # email: String         │
                    │ # full_name: String     │
                    │ # hashed_password: String│
                    │ # role: UserRole (enum) │
                    │ # avatar_url: String    │
                    │ # is_active: Boolean    │
                    │ # created_at: DateTime  │
                    │ # updated_at: DateTime  │
                    ├─────────────────────────┤
                    │ + authenticate(): Boolean│
                    │ + deactivate(): void    │
                    │ + activate(): void      │
                    │ + update_profile(): void│
                    └─────────────────────────┘
                              △
              ┌───────────────┼───────────────┐
              │               │               │
              │               │               │
    ┌─────────┴────┐  ┌──────┴──────┐  ┌────┴─────────┐
    │    Admin     │  │    Staff    │  │     Head     │
    ├──────────────┤  ├─────────────┤  ├──────────────┤
    │              │  │             │  │              │
    ├──────────────┤  ├─────────────┤  ├──────────────┤
    │+ view_logs() │  │+ import_    │  │+ approve_    │
    │+ manage_     │  │  data()     │  │  project()   │
    │  users()     │  │+ manage_    │  │+ assign_     │
    └──────────────┘  │  classes()  │  │  project()   │
                       └─────────────┘  └──────────────┘
         
              ┌───────────────┬───────────────┐
              │               │               │
    ┌─────────┴────┐  ┌──────┴──────┐        │
    │   Lecturer   │  │   Student   │        │
    ├──────────────┤  ├─────────────┤        │
    │              │  │             │        │
    ├──────────────┤  ├─────────────┤        │
    │+ create_     │  │+ view_      │        │
    │  project()   │  │  classes()  │        │
    │+ evaluate_   │  │+ submit_    │        │
    │  students()  │  │  work()     │        │
    │+ track_      │  │+ peer_      │        │
    │  progress()  │  │  review()   │        │
    └──────────────┘  └─────────────┘        │

                    ┌─────────────────────────┐
                    │    <<Enumeration>>      │
                    │       UserRole          │
                    ├─────────────────────────┤
                    │ ADMIN                   │
                    │ STAFF                   │
                    │ HEAD                    │
                    │ LECTURER                │
                    │ STUDENT                 │
                    └─────────────────────────┘
```

### **Chi tiết thực hiện**:

1. **Vẽ User class (abstract)**
   - Đánh dấu <<Abstract>> ở trên tên class
   - Hoặc để tên class in nghiêng
   - Thuộc tính: protected (#)
   - Phương thức: public (+)

2. **Vẽ 5 child classes**
   - Admin, Staff, Head, Lecturer, Student
   - Nối với User bằng inheritance (mũi tên tam giác rỗng)
   - Mỗi class có thêm methods riêng

3. **Vẽ UserRole enum**
   - Đánh dấu <<Enumeration>>
   - List 5 giá trị constants

4. **Relationship**:
   - User có association với UserRole (1 - 1)

---

## 📝 DIAGRAM 2: ACADEMIC ENTITIES

### **File name**: `class-academic.png`

### **Classes cần vẽ**:

```
┌──────────────────────┐
│      Subject         │
├──────────────────────┤
│ - id: UUID           │
│ - code: String       │ ← VD: "SE501"
│ - name: String       │ ← VD: "Software Engineering"
│ - description: Text  │
│ - credits: Integer   │
│ - created_at: DateTime│
├──────────────────────┤
│ + create(): void     │
│ + update(): void     │
│ + delete(): void     │
└──────────────────────┘
         △
         │ 1
         │
         │ *
┌──────────────────────┐
│     Curriculum       │
├──────────────────────┤
│ - id: UUID           │
│ - subject_id: UUID   │ FK
│ - content: Text      │
│ - learning_outcomes: Text│
│ - week_number: Integer│
│ - created_at: DateTime│
├──────────────────────┤
│ + create(): void     │
│ + update(): void     │
└──────────────────────┘


┌──────────────────────┐         ┌──────────────────────┐
│       Class          │  *   1  │      Lecturer        │
├──────────────────────┤─────────┤  (from User)         │
│ - id: UUID           │ teaches │                      │
│ - code: String       │         └──────────────────────┘
│ - name: String       │
│ - semester: String   │         ┌──────────────────────┐
│ - academic_year: String│    *  │     ClassMember      │
│ - lecturer_id: UUID  │◆───────┤                      │
│ - created_at: DateTime│   1    ├──────────────────────┤
├──────────────────────┤         │ - class_id: UUID     │FK
│ + create(): void     │         │ - student_id: UUID   │FK
│ + assign_students():void│      │ - role: String       │
│ + assign_project():void│       │ - joined_at: DateTime│
└──────────────────────┘         ├──────────────────────┤
         │                        │ + add(): void        │
         │ 1                      │ + remove(): void     │
         │                        └──────────────────────┘
         │                                   │
         │ *                                 │ *
         │                                   │
         └───────────────┐         ┌────────┘
                         │         │ 1
                 ┌───────▼─────────▼────────┐
                 │       Student            │
                 │    (from User)           │
                 └──────────────────────────┘
```

### **Relationships**:

1. **Subject → Curriculum**: 1-to-Many (One subject has many curriculum items)
2. **Lecturer → Class**: 1-to-Many (One lecturer teaches many classes)
3. **Class → ClassMember**: Composition 1-to-Many (Class owns members)
4. **Student → ClassMember**: 1-to-Many (One student in many classes)

### **Lưu ý**:
- `FK` = Foreign Key
- Composition (◆) giữa Class và ClassMember
- Association với Lecturer và Student (references từ User)

---

## 📝 DIAGRAM 3: PROJECT MANAGEMENT

### **File name**: `class-project.png`

### **Classes cần vẽ**:

```
┌──────────────────────────────┐
│         Project              │
├──────────────────────────────┤
│ - id: UUID                   │
│ - title: String              │
│ - description: Text          │
│ - objectives: Text           │
│ - scope: Text                │
│ - lecturer_id: UUID          │ FK
│ - status: ProjectStatus      │ (enum)
│ - approved_by: UUID          │ FK (Head)
│ - approved_at: DateTime      │
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + submit_for_approval(): void│
│ + approve(): void            │
│ + reject(): void             │
│ + assign_to_class(): void    │
│ + generate_milestones_ai():void│
└──────────────────────────────┘
        │ 1
        │ creates
        │
        ▼ *
┌──────────────────────────────┐
│       Milestone              │
├──────────────────────────────┤
│ - id: UUID                   │
│ - project_id: UUID           │ FK
│ - title: String              │
│ - description: Text          │
│ - deadline: DateTime         │
│ - order_index: Integer       │
│ - is_completed: Boolean      │
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + mark_complete(): void      │
│ + add_question(): void       │
└──────────────────────────────┘
        │ 1
        │
        ▼ *
┌──────────────────────────────┐
│    MilestoneQuestion         │
├──────────────────────────────┤
│ - id: UUID                   │
│ - milestone_id: UUID         │ FK
│ - question_text: Text        │
│ - order_index: Integer       │
│ - created_at: DateTime       │
└──────────────────────────────┘


┌──────────────────────────────┐         ┌────────────────────┐
│       ClassProject           │  *   *  │       Class        │
│   (Association Table)        │─────────┤                    │
├──────────────────────────────┤         └────────────────────┘
│ - class_id: UUID             │ FK
│ - project_id: UUID           │ FK      ┌────────────────────┐
│ - assigned_by: UUID          │ FK  *   │     Project        │
│ - assigned_at: DateTime      │─────────┤                    │
└──────────────────────────────┘     *   └────────────────────┘


┌────────────────────────────────────┐
│      <<Enumeration>>               │
│       ProjectStatus                │
├────────────────────────────────────┤
│ DRAFT                              │
│ SUBMITTED                          │
│ APPROVED                           │
│ REJECTED                           │
│ IN_PROGRESS                        │
│ COMPLETED                          │
└────────────────────────────────────┘
```

### **Relationships**:

1. **Project → Milestone**: Composition 1-to-Many
2. **Milestone → MilestoneQuestion**: Composition 1-to-Many
3. **Project ↔ Class**: Many-to-Many (qua ClassProject)
4. **Project → ProjectStatus**: Association (enum)

---

## 📝 DIAGRAM 4: GROUP & COLLABORATION

### **File name**: `class-group.png`

### **Classes cần vẽ**:

```
┌──────────────────────────────┐
│          Group               │
├──────────────────────────────┤
│ - id: UUID                   │
│ - name: String               │
│ - class_id: UUID             │ FK
│ - project_id: UUID           │ FK
│ - leader_id: UUID            │ FK
│ - created_by: UUID           │ FK (Lecturer)
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + add_member(): void         │
│ + remove_member(): void      │
│ + set_leader(): void         │
│ + view_progress(): Progress  │
└──────────────────────────────┘
        │ 1
        │
        ▼ *
┌──────────────────────────────┐         ┌────────────────────┐
│       GroupMember            │  *   1  │      Student       │
├──────────────────────────────┤─────────┤                    │
│ - group_id: UUID             │ FK      └────────────────────┘
│ - student_id: UUID           │ FK
│ - role: String               │ (Leader/Member)
│ - contribution_score: Float  │
│ - joined_at: DateTime        │
├──────────────────────────────┤
│ + assign_task(): void        │
│ + track_contribution(): Float│
└──────────────────────────────┘


┌──────────────────────────────┐
│        Checkpoint            │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - milestone_id: UUID         │ FK
│ - title: String              │
│ - description: Text          │
│ - due_date: DateTime         │
│ - status: CheckpointStatus   │ (enum)
│ - submitted_at: DateTime     │
│ - created_by: UUID           │ FK
├──────────────────────────────┤
│ + create(): void             │
│ + submit(): void             │
│ + mark_complete(): void      │
└──────────────────────────────┘
        │ 1
        │
        ▼ *
┌──────────────────────────────┐
│    CheckpointSubmission      │
├──────────────────────────────┤
│ - id: UUID                   │
│ - checkpoint_id: UUID        │ FK
│ - submitted_by: UUID         │ FK
│ - submission_text: Text      │
│ - file_url: String           │
│ - submitted_at: DateTime     │
└──────────────────────────────┘


┌──────────────────────────────┐
│          Task                │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - title: String              │
│ - description: Text          │
│ - assigned_to: UUID          │ FK (Student)
│ - status: TaskStatus         │ (enum)
│ - priority: String           │
│ - due_date: DateTime         │
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + assign(): void             │
│ + update_status(): void      │
└──────────────────────────────┘
```

### **Relationships**:

1. **Group → GroupMember**: Composition 1-to-Many
2. **GroupMember → Student**: Many-to-One
3. **Group → Checkpoint**: Composition 1-to-Many
4. **Checkpoint → CheckpointSubmission**: Composition 1-to-Many
5. **Group → Task**: Composition 1-to-Many
6. **Task → Student**: Association (assigned_to)

---

## 📝 DIAGRAM 5: EVALUATION SYSTEM

### **File name**: `class-evaluation.png`

### **Classes cần vẽ**:

```
┌──────────────────────────────┐
│      GroupEvaluation         │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - evaluator_id: UUID         │ FK (Lecturer)
│ - criteria: JSON             │
│ - scores: JSON               │
│ - total_score: Float         │
│ - feedback: Text             │
│ - evaluated_at: DateTime     │
├──────────────────────────────┤
│ + create(): void             │
│ + calculate_total(): Float   │
└──────────────────────────────┘


┌──────────────────────────────┐
│     MemberEvaluation         │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - student_id: UUID           │ FK
│ - evaluator_id: UUID         │ FK (Lecturer)
│ - criteria: JSON             │
│ - scores: JSON               │
│ - contribution_score: Float  │
│ - attendance_score: Float    │
│ - quality_score: Float       │
│ - total_score: Float         │
│ - feedback: Text             │
│ - evaluated_at: DateTime     │
├──────────────────────────────┤
│ + create(): void             │
│ + calculate_total(): Float   │
└──────────────────────────────┘


┌──────────────────────────────┐
│       PeerReview             │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - reviewer_id: UUID          │ FK (Student)
│ - reviewee_id: UUID          │ FK (Student)
│ - milestone_id: UUID         │ FK
│ - criteria: JSON             │
│ - scores: JSON               │
│ - comments: Text             │
│ - is_anonymous: Boolean      │
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + calculate_average(): Float │
└──────────────────────────────┘


┌──────────────────────────────┐
│   CheckpointEvaluation       │
├──────────────────────────────┤
│ - id: UUID                   │
│ - checkpoint_id: UUID        │ FK
│ - evaluator_id: UUID         │ FK (Lecturer)
│ - score: Float               │
│ - feedback: Text             │
│ - evaluated_at: DateTime     │
├──────────────────────────────┤
│ + create(): void             │
│ + update(): void             │
└──────────────────────────────┘


    Relationships with:
    - Group (1-to-Many for GroupEvaluation)
    - Student (Many-to-One for MemberEvaluation, PeerReview)
    - Lecturer (Many-to-One for all evaluations)
    - Checkpoint (1-to-Many for CheckpointEvaluation)
    - Milestone (1-to-Many for PeerReview)
```

---

## 📝 DIAGRAM 6: COMMUNICATION

### **File name**: `class-communication.png`

### **Classes cần vẽ**:

```
┌──────────────────────────────┐
│        ChatMessage           │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - sender_id: UUID            │ FK
│ - message: Text              │
│ - message_type: MessageType  │ (enum)
│ - file_url: String           │
│ - reply_to: UUID             │ FK (self-reference)
│ - is_edited: Boolean         │
│ - created_at: DateTime       │
│ - updated_at: DateTime       │
├──────────────────────────────┤
│ + send(): void               │
│ + edit(): void               │
│ + delete(): void             │
│ + reply(): void              │
└──────────────────────────────┘


┌──────────────────────────────┐
│         Meeting              │
├──────────────────────────────┤
│ - id: UUID                   │
│ - group_id: UUID             │ FK
│ - title: String              │
│ - scheduled_at: DateTime     │
│ - duration: Integer          │ (minutes)
│ - meeting_url: String        │
│ - status: MeetingStatus      │ (enum)
│ - created_by: UUID           │ FK
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + start(): void              │
│ + end(): void                │
│ + generate_url(): String     │
└──────────────────────────────┘
        │ 1
        │
        ▼ *
┌──────────────────────────────┐
│      MeetingParticipant      │
├──────────────────────────────┤
│ - meeting_id: UUID           │ FK
│ - user_id: UUID              │ FK
│ - joined_at: DateTime        │
│ - left_at: DateTime          │
│ - duration: Integer          │
└──────────────────────────────┘


┌──────────────────────────────┐
│        Notification          │
├──────────────────────────────┤
│ - id: UUID                   │
│ - user_id: UUID              │ FK
│ - type: NotificationType     │ (enum)
│ - title: String              │
│ - message: Text              │
│ - related_id: UUID           │
│ - related_type: String       │
│ - is_read: Boolean           │
│ - created_at: DateTime       │
├──────────────────────────────┤
│ + create(): void             │
│ + mark_read(): void          │
│ + delete(): void             │
└──────────────────────────────┘


┌────────────────────────────────────┐
│      <<Enumeration>>               │
│       MessageType                  │
├────────────────────────────────────┤
│ TEXT                               │
│ FILE                               │
│ IMAGE                              │
│ CODE                               │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│      <<Enumeration>>               │
│       MeetingStatus                │
├────────────────────────────────────┤
│ SCHEDULED                          │
│ IN_PROGRESS                        │
│ COMPLETED                          │
│ CANCELLED                          │
└────────────────────────────────────┘
```

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] **Diagram 1**: User & Roles (5 classes + 1 enum) - 1.5 giờ
- [ ] **Diagram 2**: Academic Entities (4 classes) - 1 giờ
- [ ] **Diagram 3**: Project Management (5 classes + 1 enum) - 1.5 giờ
- [ ] **Diagram 4**: Group & Collaboration (5 classes) - 1.5 giờ
- [ ] **Diagram 5**: Evaluation System (4 classes) - 1 giờ
- [ ] **Diagram 6**: Communication (4 classes + 2 enums) - 1.5 giờ

**Tổng**: ~8 giờ

---

## 💡 MẸO VẼ CLASS DIAGRAM

### 1. **Bắt đầu từ class chính**
- Vẽ class trung tâm trước (VD: User, Project, Group)
- Sau đó mới vẽ class liên quan

### 2. **Sắp xếp layout**
- Parent class ở trên, child classes ở dưới
- Main class ở giữa, related classes xung quanh
- Association table ở giữa hai classes liên quan

### 3. **Đặt tên chuẩn**
- Class: PascalCase (VD: GroupMember)
- Attribute: snake_case (VD: created_at)
- Method: snake_case (VD: mark_complete())
- Enum: UPPER_CASE (VD: DRAFT, APPROVED)

### 4. **Kiểm tra relationships**
- FK phải trỏ đúng class
- Multiplicity đúng (1, *, 0..1, 1..*)
- Composition vs Aggregation: Có thể tồn tại độc lập không?
- Inheritance: Có phải "is-a" relationship?

### 5. **Tham khảo code thực tế**
- Xem `collabsphere/backend/app/models/` để lấy chính xác attributes
- Xem `collabsphere/backend/app/routers/` để lấy methods

---

## 📚 TÀI LIỆU THAM KHẢO

### Từ dự án của bạn:
- **ERD**: `C:\Users\LENOVO\Desktop\SE\ERD_DATABASE_DESIGN_COLLABSPHERE.md`
- **Models**: `C:\Users\LENOVO\Desktop\SE\collabsphere\backend\app\models\`

### Online resources:
- **Draw.io Tutorial**: https://www.youtube.com/results?search_query=drawio+class+diagram
- **UML Class Diagram**: https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-class-diagram/

---

## 🚀 BƯỚC TIẾP THEO

Sau khi hoàn thành 6 Class Diagrams, chuyển sang:
→ **File tiếp theo**: `03-SEQUENCE-GUIDE.md` (Sequence Diagrams)
