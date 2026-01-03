# 📐 GIAI ĐOẠN 1: USE CASE DIAGRAMS

**Thời gian ước tính**: 6 giờ (5 diagrams)  
**Công cụ khuyên dùng**: Draw.io hoặc Lucidchart  
**Output**: 5 file PNG trong folder `diagrams/use-case/`

---

## 🎯 MỤC TIÊU

Vẽ 5 Use Case Diagrams cho 5 roles trong hệ thống CollabSphere:
1. Administrator
2. Staff
3. Department Head
4. Lecturer
5. Student

---

## 📖 KIẾN THỨC CƠ BẢN

### Use Case Diagram là gì?
- Mô tả **chức năng hệ thống** từ góc nhìn người dùng
- Thể hiện **tương tác** giữa Actor và Use Case
- Thể hiện **mối quan hệ** giữa các Use Cases (include, extend, generalization)

### Các thành phần chính:
1. **Actor** (Người dùng): Hình người que
2. **Use Case** (Chức năng): Hình elip/oval
3. **System Boundary** (Ranh giới hệ thống): Hình chữ nhật
4. **Relationships** (Mối quan hệ):
   - Association (liên kết): Đường thẳng
   - Include (bao gồm): Đường đứt nét + `<<include>>`
   - Extend (mở rộng): Đường đứt nét + `<<extend>>`
   - Generalization (kế thừa): Đường liền + mũi tên tam giác rỗng

---

## 🚀 HƯỚNG DẪN TỪNG BƯỚC

### **Bước 1: Mở Draw.io**
1. Truy cập: https://app.diagrams.net/
2. Chọn "Create New Diagram"
3. Chọn template "UML" → "Use Case Diagram"
4. Đặt tên file theo convention: `use-case-[role].drawio`

### **Bước 2: Chuẩn bị Canvas**
1. Vẽ hình chữ nhật lớn (System Boundary)
2. Đặt tên: "CollabSphere System"
3. Đặt Actor bên ngoài hình chữ nhật

### **Bước 3: Vẽ Actor và Use Cases**
- Kéo thả các thành phần từ thanh công cụ bên trái
- Căn chỉnh vị trí hợp lý
- Nối Actor với Use Cases bằng Association

### **Bước 4: Thêm Relationships**
- Sử dụng `<<include>>` cho use case bắt buộc
- Sử dụng `<<extend>>` cho use case tùy chọn

### **Bước 5: Export**
1. File → Export as → PNG
2. Resolution: 300 DPI
3. Transparent background: Checked
4. Lưu vào: `Documentation/diagrams/use-case/`

---

## 📝 DIAGRAM 1: ADMINISTRATOR USE CASE

### **File name**: `use-case-admin.png`

### **Actor**:
- 👤 **Administrator** (System Admin)

### **Use Cases** (8 chức năng):

```
┌─────────────────────────────────────────────────────────────┐
│                   CollabSphere System                        │
│                                                               │
│   ┌─────────────────────┐    ┌──────────────────────┐      │
│   │ View All Accounts   │    │ View System Reports  │      │
│   └─────────────────────┘    └──────────────────────┘      │
│                                                               │
│   ┌─────────────────────┐    ┌──────────────────────┐      │
│   │ Search User         │    │ View System Logs     │      │
│   └─────────────────────┘    └──────────────────────┘      │
│                                                               │
│   ┌─────────────────────┐    ┌──────────────────────┐      │
│   │ Activate Account    │    │ Dashboard Analytics  │      │
│   └─────────────────────┘    └──────────────────────┘      │
│                                                               │
│   ┌─────────────────────┐    ┌──────────────────────┐      │
│   │ Deactivate Account  │    │ Manage System Config │      │
│   └─────────────────────┘    └──────────────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
      ↑          ↑         ↑         ↑         ↑         ↑
      │          │         │         │         │         │
      └──────────┴─────────┴─────────┴─────────┴─────────┘
                           │
                        [Admin]
```

### **Relationships**:
- Tất cả Use Cases đều có Association với Admin Actor
- Không có include/extend trong diagram này (đơn giản)

### **Chi tiết Use Cases**:

1. **View All Accounts**
   - Hiển thị danh sách tất cả người dùng
   - Filter theo role, status

2. **Search User**
   - Tìm kiếm user theo username, email, name
   
3. **Activate Account**
   - Kích hoạt tài khoản đã bị deactivate

4. **Deactivate Account**
   - Vô hiệu hóa tài khoản vi phạm

5. **View System Reports**
   - Báo cáo tổng quan: số user, project, group

6. **View System Logs**
   - Xem log hoạt động hệ thống

7. **Dashboard Analytics**
   - Thống kê sử dụng hệ thống

8. **Manage System Config**
   - Cấu hình thông số hệ thống

---

## 📝 DIAGRAM 2: STAFF USE CASE

### **File name**: `use-case-staff.png`

### **Actor**:
- 👤 **Staff** (Academic Staff)

### **Use Cases** (15 chức năng - chia 3 nhóm):

#### **Nhóm 1: Subject Management**
```
┌──────────────────────────────┐
│ Manage Subjects              │
│  ├─ View Subjects            │
│  ├─ Create Subject           │
│  ├─ Update Subject           │
│  ├─ Delete Subject           │
│  └─ Import Subjects from CSV │
└──────────────────────────────┘
```

#### **Nhóm 2: Curriculum Management**
```
┌──────────────────────────────┐
│ Manage Curricula             │
│  ├─ View Curricula           │
│  ├─ Create Curriculum        │
│  ├─ Update Curriculum        │
│  ├─ Delete Curriculum        │
│  └─ Import Curricula from CSV│
└──────────────────────────────┘
```

#### **Nhóm 3: Class Management**
```
┌──────────────────────────────┐
│ Manage Classes               │
│  ├─ View Classes             │
│  ├─ Create Class             │
│  ├─ Update Class             │
│  ├─ Import Classes from CSV  │
│  ├─ Assign Lecturer to Class │
│  └─ Assign Students to Class │
└──────────────────────────────┘
```

### **Cách vẽ trong Draw.io**:

1. **Tạo 3 Use Case tổng quát** (parent):
   - "Manage Subjects"
   - "Manage Curricula"
   - "Manage Classes"

2. **Tạo các Use Case chi tiết** (child):
   - Dùng relationship `<<include>>` hoặc generalization
   - Hoặc vẽ riêng biệt nhưng nhóm gần nhau

3. **Đặt Actor Staff** nối với 3 use case chính

### **Lưu ý**:
- Có thể vẽ đơn giản hơn: Chỉ vẽ 3 use case tổng quát
- Hoặc chi tiết hơn: Vẽ tất cả 15 use cases riêng lẻ
- Khuyến nghị: **Vẽ ở mức trung bình** (3 nhóm chính + import features)

---

## 📝 DIAGRAM 3: DEPARTMENT HEAD USE CASE

### **File name**: `use-case-head.png`

### **Actor**:
- 👤 **Department Head** (Head of Department)

### **Use Cases** (10 chức năng):

```
CollabSphere System
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  PROJECT APPROVAL                                         │
│  ┌──────────────────┐    ┌────────────────────┐        │
│  │ View All Projects│    │ View Project Detail│        │
│  └──────────────────┘    └────────────────────┘        │
│                                                           │
│  ┌──────────────────┐    ┌────────────────────┐        │
│  │ Approve Project  │    │ Reject Project     │        │
│  └──────────────────┘    └────────────────────┘        │
│            │                       │                     │
│            └───────┬───────────────┘                     │
│                    ↓ <<include>>                         │
│          ┌──────────────────┐                           │
│          │ Provide Feedback │                           │
│          └──────────────────┘                           │
│                                                           │
│  ┌──────────────────┐                                   │
│  │ Update Approved  │                                   │
│  │ Project          │                                   │
│  └──────────────────┘                                   │
│                                                           │
│  CLASS & PROJECT ASSIGNMENT                              │
│  ┌──────────────────┐    ┌────────────────────┐        │
│  │ View All Classes │    │ Assign Project to  │        │
│  │                  │    │ Classes            │        │
│  └──────────────────┘    └────────────────────┘        │
│                                                           │
│  VIEW & MONITOR                                          │
│  ┌──────────────────┐    ┌────────────────────┐        │
│  │ View Subjects &  │    │ View Department    │        │
│  │ Curricula        │    │ Reports            │        │
│  └──────────────────┘    └────────────────────┘        │
│                                                           │
└─────────────────────────────────────────────────────────┘
                            ↑
                            │
                    [Department Head]
```

### **Chi tiết Use Cases**:

1. **View All Projects**: Xem danh sách tất cả đồ án đã được submit
2. **View Project Detail**: Xem chi tiết 1 đồ án
3. **Approve Project**: Phê duyệt đồ án
4. **Reject Project**: Từ chối đồ án
5. **Provide Feedback**: Cung cấp feedback (include trong Approve/Reject)
6. **Update Approved Project**: Chỉnh sửa đồ án đã phê duyệt
7. **View All Classes**: Xem danh sách lớp học
8. **Assign Project to Classes**: Gán đồ án cho các lớp
9. **View Subjects & Curricula**: Xem môn học và chương trình
10. **View Department Reports**: Xem báo cáo tổng quan khoa

### **Relationships**:
- "Provide Feedback" `<<include>>` từ "Approve Project" và "Reject Project"

---

## 📝 DIAGRAM 4: LECTURER USE CASE

### **File name**: `use-case-lecturer.png`

### **Actor**:
- 👤 **Lecturer** (Giảng viên)

### **Use Cases** (35+ chức năng - NHIỀU NHẤT):

**Lưu ý**: Đây là role phức tạp nhất, có nhiều chức năng. Có thể:
- **Option 1**: Vẽ tất cả use cases (rất đầy đủ nhưng diagram sẽ lớn)
- **Option 2**: Nhóm thành các use case tổng quát (đơn giản hơn)

### **Option 2 (Khuyên dùng) - Nhóm thành 8 use case chính**:

```
CollabSphere System
┌─────────────────────────────────────────────────────────┐
│                                                           │
│  ┌────────────────────┐    ┌──────────────────────┐    │
│  │ Manage Projects    │    │ Manage Groups        │    │
│  │ (Create, Submit,   │    │ (Create, Assign      │    │
│  │  View, AI Generate)│    │  Members, Track)     │    │
│  └────────────────────┘    └──────────────────────┘    │
│                                                           │
│  ┌────────────────────┐    ┌──────────────────────┐    │
│  │ Manage Milestones  │    │ Manage Resources     │    │
│  │ & Checkpoints      │    │ (Upload, Share,      │    │
│  │                    │    │  Organize)           │    │
│  └────────────────────┘    └──────────────────────┘    │
│                                                           │
│  ┌────────────────────┐    ┌──────────────────────┐    │
│  │ Evaluate Students  │    │ Communication        │    │
│  │ (Group, Member,    │    │ (Chat, Meeting,      │    │
│  │  Checkpoint, Peer) │    │  Video Call)         │    │
│  └────────────────────┘    └──────────────────────┘    │
│                                                           │
│  ┌────────────────────┐    ┌──────────────────────┐    │
│  │ Track Progress     │    │ AI Assistant         │    │
│  │ & Analytics        │    │ (Chatbot, Analysis)  │    │
│  └────────────────────┘    └──────────────────────┘    │
│                                                           │
└─────────────────────────────────────────────────────────┘
                            ↑
                            │
                       [Lecturer]
```

### **Chi tiết từng nhóm** (để tham khảo, không cần vẽ hết):

#### 1. **Manage Projects**
- Create Project
- AI Generate Milestones
- Submit Project for Approval
- View Own Projects
- Assign Project to Class
- Update Project

#### 2. **Manage Groups**
- Create Groups
- Add/Remove Group Members
- Assign Project to Group
- View Group Details
- Set Group Leader

#### 3. **Manage Milestones & Checkpoints**
- Create Milestone Questions
- View Milestone Answers
- Mark Milestones Complete
- View Checkpoint Submissions
- Evaluate Checkpoints

#### 4. **Manage Resources**
- Upload Class Resources
- Upload Group Resources
- Organize Resource Folders
- Share Resources

#### 5. **Evaluate Students**
- Evaluate Groups
- Evaluate Members
- Evaluate Checkpoints
- View Peer Reviews
- Grade Submissions

#### 6. **Communication**
- Chat with Groups
- Schedule Meetings
- Join Video Meetings
- Send Notifications

#### 7. **Track Progress & Analytics**
- View Group Progress
- Track Member Contribution
- AI Progress Analysis
- View Group Workspace
- Generate Reports

#### 8. **AI Assistant**
- Use AI Chatbot
- AI Generate Milestones
- AI Progress Analysis

---

## 📝 DIAGRAM 5: STUDENT USE CASE

### **File name**: `use-case-student.png`

### **Actors**:
- 👤 **Student** (Sinh viên thường)
- 👤 **Group Leader** (extends Student) - Có thêm quyền

### **Use Cases** (20+ chức năng):

```
CollabSphere System
┌──────────────────────────────────────────────────────────┐
│                                                            │
│  VIEW & INFORMATION                                        │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ View Classes    │    │ View Group Details   │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ View Projects   │    │ View Group Progress  │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  MILESTONE & CHECKPOINT (GROUP LEADER ONLY)               │
│  ┌───────────────────────────┐                           │
│  │ Mark Milestone Complete   │ [Leader Only]             │
│  └───────────────────────────┘                           │
│                                                            │
│  ┌───────────────────────────┐                           │
│  │ Answer Milestone Questions│ [All Students]            │
│  └───────────────────────────┘                           │
│                                                            │
│  ┌───────────────────────────┐                           │
│  │ Create Checkpoint         │ [Leader Only]             │
│  └───────────────────────────┘                           │
│                                                            │
│  ┌───────────────────────────┐                           │
│  │ Submit Checkpoint         │ [All Students]            │
│  └───────────────────────────┘                           │
│                                                            │
│  TASK MANAGEMENT                                          │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ View Tasks      │    │ Create Task          │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ Assign Task     │    │ Update Task Status   │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  RESOURCES & EVALUATION                                   │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ View Resources  │    │ Upload Resources     │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ Peer Review     │    │ View Evaluations     │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  COLLABORATION                                            │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ Chat with Group │    │ Join Video Meeting   │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  ┌─────────────────┐    ┌──────────────────────┐        │
│  │ Use Whiteboard  │    │ Use Code Editor      │        │
│  └─────────────────┘    └──────────────────────┘        │
│                                                            │
│  ┌─────────────────┐                                     │
│  │ Use AI Chatbot  │                                     │
│  └─────────────────┘                                     │
│                                                            │
└──────────────────────────────────────────────────────────┘
         ↑                           ↑
         │                           │
     [Student] ───────────────── [Group Leader]
                 (generalization)
```

### **Relationships**:
- **Group Leader** kế thừa từ **Student** (generalization)
- Group Leader có thêm 2 use cases riêng:
  - Mark Milestone Complete
  - Create Checkpoint

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] **Diagram 1**: Admin Use Case (8 use cases) - 1 giờ
- [ ] **Diagram 2**: Staff Use Case (15 use cases nhóm 3 nhóm) - 1.5 giờ
- [ ] **Diagram 3**: Department Head Use Case (10 use cases) - 1 giờ
- [ ] **Diagram 4**: Lecturer Use Case (8 nhóm chính) - 1.5 giờ
- [ ] **Diagram 5**: Student Use Case (20 use cases + generalization) - 1.5 giờ

**Tổng**: ~6 giờ

---

## 💡 MẸO VẼ HIỆU QUẢ

### 1. **Bắt đầu đơn giản**
- Vẽ System Boundary trước
- Đặt Actor
- Thêm Use Cases chính
- Sau đó mới thêm relationships

### 2. **Sắp xếp hợp lý**
- Use Cases liên quan gần nhau
- Use Cases quan trọng ở giữa
- Include/Extend ở phía dưới hoặc bên cạnh

### 3. **Kiểm tra lại**
- Tất cả Actor có nối với Use Case?
- Relationship đúng hướng?
- Tên Use Case rõ ràng (verb + object)?
- System Boundary bao toàn bộ Use Cases?

### 4. **Export chất lượng cao**
- Resolution: 300 DPI
- Format: PNG với nền trong suốt
- Kích thước: 1920x1080 trở lên

---

## 📚 TÀI LIỆU THAM KHẢO

- **Draw.io Tutorial**: https://www.youtube.com/results?search_query=drawio+use+case+diagram
- **UML Use Case**: https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/
- **Best Practices**: https://creately.com/guides/use-case-diagram-tutorial/

---

## 🚀 BƯỚC TIẾP THEO

Sau khi hoàn thành 5 Use Case Diagrams, chuyển sang:
→ **File tiếp theo**: `02-CLASS-GUIDE.md` (Class Diagrams)
