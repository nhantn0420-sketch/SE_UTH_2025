# 📐 HƯỚNG DẪN VẼ DIAGRAMS - COLLABSPHERE

**Mục đích**: Cung cấp hướng dẫn chi tiết từng bước để vẽ 22 diagrams cho dự án

**Thời gian ước tính**: 2-3 ngày (với 2 người)

---

## 🎯 TỔNG QUAN DIAGRAMS CẦN VẼ

| Giai đoạn | Loại Diagram | Số lượng | File hướng dẫn | Ước tính thời gian |
|-----------|--------------|----------|----------------|-------------------|
| **Giai đoạn 1** | Use Case Diagrams | 5 | `01-USE-CASE-GUIDE.md` | 6 giờ |
| **Giai đoạn 2** | Class Diagrams | 6 | `02-CLASS-GUIDE.md` | 8 giờ |
| **Giai đoạn 3** | Sequence Diagrams | 10 | `03-SEQUENCE-GUIDE.md` | 10 giờ |
| **Giai đoạn 4** | Architecture Diagram | 1 | `04-ARCHITECTURE-GUIDE.md` | 3 giờ |
| **Tổng cộng** | | **22** | | **27 giờ** |

---

## 🛠️ CÔNG CỤ ĐỀ XUẤT

### 1. **Draw.io** (Khuyên dùng cho người mới)
- **Link**: https://app.diagrams.net/
- **Ưu điểm**: 
  - ✅ Miễn phí 100%
  - ✅ Dễ sử dụng, kéo thả
  - ✅ Có sẵn template UML
  - ✅ Export PNG/SVG/PDF
  - ✅ Lưu trên Drive/Desktop
- **Nhược điểm**: 
  - ❌ Phải vẽ thủ công
  - ❌ Không có version control tốt

### 2. **Lucidchart**
- **Link**: https://www.lucidchart.com/
- **Ưu điểm**:
  - ✅ Giao diện đẹp, chuyên nghiệp
  - ✅ Nhiều template có sẵn
  - ✅ Collaboration real-time
- **Nhược điểm**:
  - ❌ Free tier giới hạn 3 documents
  - ❌ Cần đăng ký tài khoản

### 3. **PlantUML** (Cho người thích code)
- **Link**: https://plantuml.com/
- **Ưu điểm**:
  - ✅ Vẽ bằng code (text-based)
  - ✅ Version control friendly
  - ✅ Tự động layout
  - ✅ Dễ chỉnh sửa hàng loạt
- **Nhược điểm**:
  - ❌ Cần học syntax
  - ❌ Ít control về vị trí

### 4. **Visual Paradigm** (Chuyên nghiệp)
- **Link**: https://www.visual-paradigm.com/
- **Ưu điểm**:
  - ✅ Công cụ UML chuyên nghiệp
  - ✅ Có student license miễn phí
  - ✅ Tính năng mạnh mẽ
- **Nhược điểm**:
  - ❌ Phức tạp cho người mới
  - ❌ Cần cài đặt phần mềm

---

## 📋 KẾ HOẠCH THỰC HIỆN

### **TUẦN 1: Use Case Diagrams (6 giờ)**
- **Ngày 1-2**: Vẽ 5 Use Case Diagrams
- **Công việc**: Đọc file `01-USE-CASE-GUIDE.md` và làm theo
- **Output**: 5 file PNG trong `diagrams/use-case/`

### **TUẦN 1-2: Class Diagrams (8 giờ)**  
- **Ngày 3-4**: Vẽ 6 Class Diagrams
- **Công việc**: Đọc file `02-CLASS-GUIDE.md` và làm theo
- **Output**: 6 file PNG trong `diagrams/class/`

### **TUẦN 2: Sequence Diagrams (10 giờ)**
- **Ngày 5-7**: Vẽ 10 Sequence Diagrams
- **Công việc**: Đọc file `03-SEQUENCE-GUIDE.md` và làm theo
- **Output**: 10 file PNG trong `diagrams/sequence/`

### **TUẦN 2: Architecture Diagram (3 giờ)**
- **Ngày 8**: Vẽ 1 Architecture Diagram
- **Công việc**: Đọc file `04-ARCHITECTURE-GUIDE.md` và làm theo
- **Output**: 1 file PNG trong `diagrams/architecture/`

---

## 📂 CẤU TRÚC THỨ MỤC SAU KHI HOÀN THÀNH

```
Documentation/
└── diagrams/
    ├── 00-OVERVIEW.md (file này)
    ├── 01-USE-CASE-GUIDE.md
    ├── 02-CLASS-GUIDE.md
    ├── 03-SEQUENCE-GUIDE.md
    ├── 04-ARCHITECTURE-GUIDE.md
    │
    ├── use-case/
    │   ├── use-case-admin.png
    │   ├── use-case-staff.png
    │   ├── use-case-head.png
    │   ├── use-case-lecturer.png
    │   └── use-case-student.png
    │
    ├── class/
    │   ├── class-user-roles.png
    │   ├── class-academic.png
    │   ├── class-project.png
    │   ├── class-group.png
    │   ├── class-evaluation.png
    │   └── class-communication.png
    │
    ├── sequence/
    │   ├── seq-01-login.png
    │   ├── seq-02-register.png
    │   ├── seq-03-create-project.png
    │   ├── seq-04-approve-project.png
    │   ├── seq-05-create-group.png
    │   ├── seq-06-submit-checkpoint.png
    │   ├── seq-07-chat-message.png
    │   ├── seq-08-video-call.png
    │   ├── seq-09-peer-review.png
    │   └── seq-10-ai-chatbot.png
    │
    └── architecture/
        └── system-architecture.png
```

---

## ✅ CHECKLIST HOÀN THÀNH

### Giai đoạn 1: Use Case Diagrams
- [ ] Đọc hướng dẫn `01-USE-CASE-GUIDE.md`
- [ ] Vẽ Use Case Diagram cho Admin
- [ ] Vẽ Use Case Diagram cho Staff
- [ ] Vẽ Use Case Diagram cho Department Head
- [ ] Vẽ Use Case Diagram cho Lecturer
- [ ] Vẽ Use Case Diagram cho Student
- [ ] Kiểm tra và export 5 file PNG

### Giai đoạn 2: Class Diagrams
- [ ] Đọc hướng dẫn `02-CLASS-GUIDE.md`
- [ ] Vẽ Class Diagram: User & Roles
- [ ] Vẽ Class Diagram: Academic Entities
- [ ] Vẽ Class Diagram: Project Management
- [ ] Vẽ Class Diagram: Group & Collaboration
- [ ] Vẽ Class Diagram: Evaluation System
- [ ] Vẽ Class Diagram: Communication
- [ ] Kiểm tra và export 6 file PNG

### Giai đoạn 3: Sequence Diagrams
- [ ] Đọc hướng dẫn `03-SEQUENCE-GUIDE.md`
- [ ] Vẽ 10 Sequence Diagrams theo danh sách
- [ ] Kiểm tra luồng logic của từng sequence
- [ ] Export 10 file PNG

### Giai đoạn 4: Architecture Diagram
- [ ] Đọc hướng dẫn `04-ARCHITECTURE-GUIDE.md`
- [ ] Vẽ System Architecture Diagram
- [ ] Kiểm tra và export file PNG

---

## 💡 MẸO VÀ GỢI Ý

### 1. **Quy tắc đặt tên file**
- Tên file: chữ thường, dùng dấu gạch ngang `-`
- Format: `[loại]-[tên-mô-tả].png`
- VD: `use-case-admin.png`, `class-user-roles.png`

### 2. **Kích thước và chất lượng**
- Resolution: Tối thiểu 1920x1080 pixels
- Format: PNG (nền trong suốt) hoặc SVG (vector)
- DPI: 150-300 cho export PDF

### 3. **Màu sắc**
- Sử dụng màu nhất quán cho các loại elements
- Actor: Màu xanh dương
- Use Case: Màu xanh lá nhạt
- Class: Màu vàng nhạt
- Component: Màu cam nhạt

### 4. **Font chữ**
- Font: Arial, Helvetica, hoặc Segoe UI
- Size: 11-14pt cho text, 16-18pt cho title
- Đảm bảo dễ đọc khi in ra giấy

### 5. **Layout**
- Căn chỉnh đều đặn
- Khoảng cách hợp lý giữa các elements
- Tránh chồng chéo các đường nối

---

## 🚀 BẮT ĐẦU

**Bước tiếp theo**: Mở file `01-USE-CASE-GUIDE.md` để bắt đầu vẽ Use Case Diagrams

**Câu hỏi**: Nếu có thắc mắc hoặc cần hỗ trợ, hãy tham khảo các file hướng dẫn chi tiết hoặc xem ví dụ trong các công cụ.

**Chúc may mắn!** 🎨
