# Use Case Specification: Hệ thống Nhập Điểm của Giảng Viên

## 1. Tổng Quan

### 1.1. Mục đích
Hệ thống cho phép giảng viên nhập và quản lý điểm của sinh viên trong lớp học, bao gồm các loại điểm khác nhau (checkpoint, giữa kỳ, cuối kỳ, dự án) và tích hợp với hệ thống E-Learning.

### 1.2. Actors
- **Primary Actor**: Giảng viên (Lecturer)
- **Secondary Actors**: 
  - Hệ thống E-Learning (External)
  - Hệ thống Email (External)
  - Trưởng khoa (Head) - cho phê duyệt mở khóa điểm

### 1.3. Stakeholders
- **Giảng viên**: Muốn nhập điểm nhanh chóng, chính xác, có thể import/export
- **Sinh viên**: Muốn nhận thông báo điểm kịp thời
- **Trưởng khoa**: Muốn giám sát quá trình chấm điểm, đảm bảo công bằng
- **Nhà trường**: Muốn đồng bộ điểm với E-Learning, lưu trữ lịch sử

---

## 2. Use Case Chính: Nhập và Quản lý Điểm

### UC-GRD-001: Nhập và Quản lý Điểm (Main Use Case)

**Mô tả**: Giảng viên đăng nhập vào hệ thống, chọn học kỳ và lớp học, sau đó nhập điểm cho sinh viên.

**Preconditions**:
- Giảng viên đã có tài khoản trong hệ thống
- Giảng viên được phân công dạy lớp học
- Lớp học đã có danh sách sinh viên
- Học kỳ đang hoạt động

**Postconditions**:
- Điểm được lưu vào hệ thống
- Điểm tổng kết được tính toán tự động
- Sinh viên có thể xem điểm (nếu đã công bố)
- Lịch sử thay đổi điểm được ghi lại

**Main Flow**:
1. Giảng viên đăng nhập vào hệ thống
2. Hệ thống xác thực và hiển thị Dashboard giảng viên
3. Giảng viên chọn "Quản lý điểm" từ menu
4. Hệ thống hiển thị form lọc:
   - Dropdown chọn học kỳ (mặc định: học kỳ hiện tại)
   - Dropdown chọn lớp học (chỉ hiển thị lớp giảng viên đang dạy)
5. Giảng viên chọn học kỳ
6. Giảng viên chọn lớp học
7. Hệ thống hiển thị danh sách sinh viên dạng bảng với các cột:
   - STT
   - MSSV
   - Họ và tên
   - Nhóm dự án
   - Điểm checkpoint (có thể có nhiều lần)
   - Điểm giữa kỳ
   - Điểm dự án
   - Điểm cuối kỳ
   - Điểm peer review
   - Điểm tổng kết (tự động tính)
   - Ghi chú
   - Trạng thái (Đã lưu / Chưa lưu / Đã khóa)
8. Giảng viên nhập điểm vào các ô tương ứng
9. Hệ thống validate điểm (0-10, format số)
10. Hệ thống tự động tính điểm tổng kết theo công thức
11. Giảng viên click "Lưu điểm"
12. Hệ thống lưu điểm và hiển thị thông báo thành công
13. Use case kết thúc

**Alternative Flows**:

**A1: Nhập điểm không hợp lệ (tại bước 9)**
- 9a. Hệ thống phát hiện điểm không hợp lệ (< 0 hoặc > 10, hoặc không phải số)
- 9b. Hệ thống highlight ô điểm màu đỏ và hiển thị thông báo lỗi
- 9c. Quay lại bước 8

**A2: Lỗi khi lưu điểm (tại bước 12)**
- 12a. Hệ thống không thể lưu điểm (lỗi database, mạng)
- 12b. Hệ thống hiển thị thông báo lỗi chi tiết
- 12c. Điểm được lưu tạm trong localStorage của browser
- 12d. Giảng viên có thể thử lại sau
- 12e. Quay lại bước 11

**A3: Điểm đã bị khóa (tại bước 8)**
- 8a. Giảng viên thấy các ô điểm bị disable (màu xám)
- 8b. Hệ thống hiển thị thông báo "Điểm đã khóa, liên hệ Trưởng khoa để mở khóa"
- 8c. Giảng viên có thể xem nhưng không thể sửa
- 8d. Use case kết thúc

**Extension Points**:
- **Export to Excel**: Tại bước 7, giảng viên có thể export danh sách ra Excel
- **Import from Excel**: Tại bước 7, giảng viên có thể import điểm từ file Excel
- **Sync E-Learning**: Tại bước 7, giảng viên có thể đồng bộ điểm với E-Learning
- **View History**: Tại bước 7, giảng viên có thể xem lịch sử thay đổi điểm
- **Send Notification**: Tại bước 12, hệ thống có thể gửi thông báo điểm cho sinh viên
- **Lock Grade**: Sau bước 12, giảng viên có thể khóa điểm

---

## 3. Use Cases Con (Sub Use Cases)

### UC-GRD-002: Xuất điểm ra Excel

**Mô tả**: Giảng viên export danh sách điểm ra file Excel để lưu trữ hoặc chỉnh sửa offline.

**Preconditions**:
- Giảng viên đã chọn lớp học
- Danh sách sinh viên đã được hiển thị

**Main Flow**:
1. Giảng viên click nút "Xuất Excel"
2. Hệ thống tạo file Excel với định dạng:
   - Sheet 1: Danh sách điểm chi tiết
   - Sheet 2: Thống kê (điểm trung bình, cao nhất, thấp nhất, phân bố)
3. Hệ thống download file về máy giảng viên
4. Use case kết thúc

**File Excel Format**:
```
| STT | MSSV | Họ tên | Checkpoint 1 | Checkpoint 2 | Giữa kỳ | Dự án | Cuối kỳ | Peer Review | Tổng kết | Ghi chú |
```

---

### UC-GRD-003: Nhập điểm từ Excel

**Mô tả**: Giảng viên import điểm từ file Excel đã chuẩn bị sẵn.

**Preconditions**:
- Giảng viên đã chọn lớp học
- Giảng viên đã chuẩn bị file Excel đúng format

**Main Flow**:
1. Giảng viên click nút "Nhập từ Excel"
2. Hệ thống hiển thị dialog upload file
3. Giảng viên chọn file Excel và click "Upload"
4. Hệ thống đọc và validate file:
   - Kiểm tra format (có đúng các cột yêu cầu không)
   - Kiểm tra MSSV có tồn tại trong lớp không
   - Kiểm tra điểm có hợp lệ không (0-10)
5. Hệ thống hiển thị preview dữ liệu sẽ import (dạng bảng)
6. Hệ thống hiển thị cảnh báo nếu có lỗi:
   - Sinh viên không tồn tại: highlight màu vàng
   - Điểm không hợp lệ: highlight màu đỏ
7. Giảng viên xem lại và click "Xác nhận import"
8. Hệ thống import điểm vào database
9. Hệ thống tính lại điểm tổng kết
10. Hệ thống hiển thị kết quả: "Import thành công X/Y sinh viên"
11. Use case kết thúc

**Alternative Flows**:

**A1: File không hợp lệ (tại bước 4)**
- 4a. File không đúng format hoặc không phải Excel
- 4b. Hệ thống hiển thị lỗi chi tiết
- 4c. Quay lại bước 2

---

### UC-GRD-004: Đồng bộ với E-Learning

**Mô tả**: Giảng viên kéo điểm từ E-Learning về hoặc đẩy điểm lên E-Learning.

**Preconditions**:
- Giảng viên đã liên kết tài khoản E-Learning
- Lớp học đã được mapping với course trên E-Learning

**Main Flow (Pull from E-Learning)**:
1. Giảng viên click nút "Đồng bộ E-Learning"
2. Hệ thống hiển thí dialog với 2 options:
   - Kéo điểm từ E-Learning về
   - Đẩy điểm lên E-Learning
3. Giảng viên chọn "Kéo điểm từ E-Learning về"
4. Hệ thống kết nối với E-Learning API
5. Hệ thống lấy danh sách grade items từ E-Learning:
   - Quiz scores
   - Assignment scores
   - Forum participation
6. Hệ thống hiển thị dialog mapping:
   - Chọn grade item từ E-Learning
   - Map với cột điểm trong CollabSphere (Checkpoint/Midterm/Final)
7. Giảng viên chọn mapping và click "Kéo về"
8. Hệ thống import điểm từ E-Learning
9. Hệ thống hiển thị preview điểm đã kéo về
10. Giảng viên xác nhận
11. Hệ thống lưu điểm và tính lại điểm tổng kết
12. Use case kết thúc

**Main Flow (Push to E-Learning)**:
1-2. (Tương tự)
3. Giảng viên chọn "Đẩy điểm lên E-Learning"
4. Hệ thống hiển thị danh sách cột điểm:
   - Checkpoint 1, 2, ...
   - Midterm
   - Project
   - Final
5. Giảng viên chọn cột điểm muốn đẩy lên
6. Hệ thống hiển thị dialog chọn grade item trên E-Learning (hoặc tạo mới)
7. Giảng viên chọn và click "Đẩy lên"
8. Hệ thống push điểm lên E-Learning qua API
9. Hệ thống hiển thị kết quả "Đẩy thành công X/Y sinh viên"
10. Use case kết thúc

---

### UC-GRD-005: Tính điểm tổng kết

**Mô tả**: Hệ thống tự động tính điểm tổng kết dựa trên công thức đã cấu hình.

**Preconditions**:
- Giảng viên đã nhập điểm thành phần
- Công thức điểm đã được cấu hình cho môn học

**Main Flow**:
1. Trigger: Giảng viên nhập xong một điểm thành phần
2. Hệ thống lấy công thức điểm từ cấu hình môn học:
   ```
   Final Grade = (Checkpoint × w1) + (Midterm × w2) + (Project × w3) + (Final Exam × w4) + (Peer Review × w5)
   
   Mặc định:
   - Checkpoint: 20% (có thể có nhiều checkpoint, lấy trung bình)
   - Midterm: 20%
   - Project: 40%
   - Final Exam: 20%
   - Peer Review: Bonus 0-10%
   ```
3. Hệ thống kiểm tra xem đã có đủ điểm thành phần chưa:
   - Nếu thiếu điểm: hiển thị "--" hoặc "N/A"
   - Nếu đủ điểm: tính toán
4. Hệ thống tính toán:
   - Tính trung bình các checkpoint (nếu có nhiều)
   - Áp dụng công thức weighted average
   - Làm tròn đến 2 chữ số thập phân
5. Hệ thống kiểm tra điều kiện đặc biệt:
   - Nếu điểm cuối kỳ < 4.0 → Điểm tổng kết không được > 4.0
   - Nếu điểm giữa kỳ hoặc cuối kỳ = 0 (nghỉ thi) → F
6. Hệ thống cập nhật điểm tổng kết và xếp loại:
   - 8.5 - 10: Excellent (A)
   - 7.0 - 8.4: Good (B)
   - 5.5 - 6.9: Average (C)
   - 4.0 - 5.4: Below Average (D)
   - 0 - 3.9: Fail (F)
7. Hệ thống hiển thị điểm tổng kết trong bảng
8. Use case kết thúc

**Business Rules**:
- **BR-GRD-001**: Điểm cuối kỳ < 4.0 → Điểm tổng kết tối đa là 4.0
- **BR-GRD-002**: Nghỉ thi (điểm = 0) → Tổng kết = F
- **BR-GRD-003**: Peer review chỉ là điểm cộng (bonus), không tính vào công thức chính
- **BR-GRD-004**: Điểm tổng kết làm tròn đến 2 chữ số thập phân

---

### UC-GRD-006: Khóa điểm

**Mô tả**: Giảng viên khóa điểm sau khi hoàn tất nhập điểm, điểm đã khóa không thể chỉnh sửa.

**Preconditions**:
- Giảng viên đã nhập xong tất cả điểm
- Điểm chưa bị khóa

**Main Flow**:
1. Giảng viên click nút "Khóa điểm"
2. Hệ thống kiểm tra:
   - Có sinh viên nào chưa có điểm tổng kết không?
   - Có điểm nào đang ở trạng thái "Chưa lưu" không?
3. Nếu có vấn đề, hệ thống hiển thị cảnh báo:
   - Danh sách sinh viên chưa có điểm
   - Yêu cầu xác nhận
4. Hệ thống hiển thị dialog xác nhận:
   - "Bạn có chắc muốn khóa điểm? Sau khi khóa, bạn không thể sửa được nữa."
   - Checkbox: "Gửi thông báo điểm cho sinh viên"
   - Nút: "Khóa điểm" và "Hủy"
5. Giảng viên tick checkbox và click "Khóa điểm"
6. Hệ thống:
   - Cập nhật trạng thái điểm = "Locked"
   - Lưu timestamp và user khóa điểm
   - Gửi request phê duyệt cho Trưởng khoa (nếu cấu hình yêu cầu)
7. Nếu đã tick "Gửi thông báo":
   - Hệ thống gửi email cho từng sinh viên
   - Gửi thông báo trong app
8. Hệ thống hiển thị thông báo "Khóa điểm thành công"
9. Use case kết thúc

---

### UC-GRD-007: Mở khóa điểm

**Mô tả**: Giảng viên yêu cầu mở khóa điểm để chỉnh sửa (cần phê duyệt từ Trưởng khoa).

**Preconditions**:
- Điểm đã bị khóa
- Giảng viên cần chỉnh sửa điểm

**Main Flow**:
1. Giảng viên click nút "Yêu cầu mở khóa"
2. Hệ thống hiển thị form yêu cầu:
   - Lý do mở khóa (bắt buộc)
   - Danh sách sinh viên cần sửa (optional)
3. Giảng viên điền lý do và click "Gửi yêu cầu"
4. Hệ thống tạo request và gửi thông báo cho Trưởng khoa
5. Hệ thống hiển thị "Yêu cầu đã gửi, chờ phê duyệt"
6. Use case tạm dừng, chờ Trưởng khoa phê duyệt
7. Khi Trưởng khoa phê duyệt:
   - Hệ thống cập nhật trạng thái điểm = "Unlocked"
   - Gửi thông báo cho giảng viên
   - Giảng viên có thể sửa điểm trong 24 giờ
8. Sau 24 giờ hoặc khi giảng viên click "Khóa lại":
   - Hệ thống tự động khóa lại điểm
9. Use case kết thúc

---

### UC-GRD-008: Xem lịch sử thay đổi điểm

**Mô tả**: Giảng viên xem lịch sử tất cả các lần thay đổi điểm.

**Main Flow**:
1. Giảng viên click nút "Xem lịch sử"
2. Hệ thống hiển thị dialog/modal với bảng lịch sử:
   - Timestamp
   - User (ai đã thay đổi)
   - Sinh viên (MSSV - Họ tên)
   - Loại điểm (Checkpoint/Midterm/Final/Project)
   - Điểm cũ
   - Điểm mới
   - Lý do (nếu có)
   - IP Address
3. Giảng viên có thể filter theo:
   - Sinh viên
   - Loại điểm
   - Thời gian (từ ngày - đến ngày)
4. Giảng viên có thể export lịch sử ra Excel
5. Use case kết thúc

---

### UC-GRD-009: Gửi thông báo điểm

**Mô tả**: Hệ thống gửi thông báo điểm cho sinh viên qua email và in-app notification.

**Preconditions**:
- Điểm đã được lưu
- Giảng viên chọn gửi thông báo

**Main Flow**:
1. Trigger: Giảng viên click "Gửi thông báo điểm"
2. Hệ thống hiển thị dialog:
   - Checkbox: Chọn sinh viên (hoặc chọn tất cả)
   - Checkbox: Gửi qua Email
   - Checkbox: Gửi qua App
   - Template thông báo (có thể chỉnh sửa)
3. Giảng viên chọn options và click "Gửi"
4. Hệ thống tạo notification jobs vào queue
5. Background worker xử lý gửi email:
   - Lấy email template
   - Personalize với thông tin sinh viên và điểm
   - Gửi qua SMTP
6. Background worker xử lý gửi in-app notification:
   - Tạo notification record trong database
   - Push qua WebSocket cho client đang online
7. Hệ thống track trạng thái gửi:
   - Email sent / failed
   - Notification delivered / failed
8. Hệ thống hiển thị kết quả: "Đã gửi thông báo cho X/Y sinh viên"
9. Use case kết thúc

**Email Template**:
```
Subject: [CollabSphere] Thông báo điểm môn học {subject_name}

Xin chào {student_name},

Giảng viên {lecturer_name} đã cập nhật điểm cho môn {subject_name} - Lớp {class_name}.

Chi tiết điểm của bạn:
- Điểm checkpoint: {checkpoint_grades}
- Điểm giữa kỳ: {midterm_grade}
- Điểm dự án: {project_grade}
- Điểm cuối kỳ: {final_grade}
- Điểm peer review: {peer_review_grade}
-------------------
Điểm tổng kết: {final_average} ({grade_letter})

Bạn có thể xem chi tiết tại: {link_to_grade_page}

Nếu có thắc mắc, vui lòng liên hệ giảng viên qua email: {lecturer_email}

Trân trọng,
CollabSphere System
```

---

## 4. Business Rules

### Grade Validation Rules
- **BR-GRD-001**: Điểm phải nằm trong khoảng [0, 10]
- **BR-GRD-002**: Điểm có thể có tối đa 2 chữ số thập phân (ví dụ: 8.75)
- **BR-GRD-003**: Điểm không thể âm
- **BR-GRD-004**: Nếu sinh viên nghỉ thi, nhập 0 và đánh dấu "Absent"

### Grade Calculation Rules
- **BR-GRD-005**: Điểm tổng kết = Weighted average của các điểm thành phần
- **BR-GRD-006**: Nếu điểm cuối kỳ < 4.0, điểm tổng kết tối đa là 4.0
- **BR-GRD-007**: Nếu nghỉ thi (absent), điểm tổng kết = F (0)
- **BR-GRD-008**: Peer review chỉ là điểm cộng (0-10% bonus)

### Grade Lock Rules
- **BR-GRD-009**: Điểm tự động khóa sau 7 ngày kể từ ngày nhập
- **BR-GRD-010**: Điểm đã khóa chỉ có thể mở bởi Trưởng khoa
- **BR-GRD-011**: Mở khóa chỉ có hiệu lực trong 24 giờ
- **BR-GRD-012**: Mọi thay đổi điểm đều được ghi log

### Notification Rules
- **BR-GRD-013**: Sinh viên chỉ nhận thông báo khi điểm đã được khóa
- **BR-GRD-014**: Email gửi đến email sinh viên đã đăng ký
- **BR-GRD-015**: In-app notification gửi real-time nếu sinh viên đang online

---

## 5. Data Model

### Grade Table Structure
```sql
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id),
    class_id INTEGER REFERENCES classes(id),
    subject_id INTEGER REFERENCES subjects(id),
    semester_id INTEGER REFERENCES semesters(id),
    
    -- Grade components
    checkpoint_1 DECIMAL(4,2),
    checkpoint_2 DECIMAL(4,2),
    checkpoint_3 DECIMAL(4,2),
    midterm_grade DECIMAL(4,2),
    project_grade DECIMAL(4,2),
    final_exam_grade DECIMAL(4,2),
    peer_review_grade DECIMAL(4,2),
    
    -- Calculated final grade
    final_grade DECIMAL(4,2),
    grade_letter VARCHAR(2), -- A, B, C, D, F
    
    -- Status
    status VARCHAR(20), -- 'draft', 'locked', 'unlocked'
    is_absent BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    notes TEXT,
    locked_at TIMESTAMP,
    locked_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    updated_by INTEGER REFERENCES users(id)
);

CREATE TABLE grade_history (
    id SERIAL PRIMARY KEY,
    grade_id INTEGER REFERENCES grades(id),
    field_name VARCHAR(50), -- 'checkpoint_1', 'midterm_grade', etc.
    old_value DECIMAL(4,2),
    new_value DECIMAL(4,2),
    reason TEXT,
    changed_by INTEGER REFERENCES users(id),
    changed_at TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45)
);
```

---

## 6. UI Mockup Description

### Grade Management Screen

```
+-----------------------------------------------------------------------------------+
|  CollabSphere - Quản lý Điểm                                        [Logout]     |
+-----------------------------------------------------------------------------------+
| Dashboard > Quản lý Điểm                                                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  Học kỳ: [Dropdown: HK1 2025-2026 ▼]     Lớp học: [Dropdown: SE101 - SE ▼]     |
|                                                                                   |
|  [🔄 Đồng bộ E-Learning] [📥 Nhập Excel] [📤 Xuất Excel] [📜 Lịch sử] [🔒 Khóa điểm] |
|                                                                                   |
+-----------------------------------------------------------------------------------+
| STT | MSSV     | Họ và tên      | Nhóm | CP1 | CP2 | Giữa kỳ | Dự án | Cuối kỳ |  |
+-----------------------------------------------------------------------------------+
| 1   | 2021001  | Nguyễn Văn A   | G1   | 8.5 | 9.0 | 8.0     | 9.0   | 8.5     |  |
| 2   | 2021002  | Trần Thị B     | G1   | 7.0 | 8.0 | 7.5     | 8.5   | 8.0     |  |
| 3   | 2021003  | Lê Văn C       | G2   | 9.0 | 8.5 | 8.5     | 9.5   | 9.0     |  |
|     |          |                |      |     |     |         |       |         |  |
+-----------------------------------------------------------------------------------+
(continued...)

+-----------------------------------------------------------------------------------+
| Peer Review | Tổng kết | Xếp loại | Trạng thái  | Ghi chú          | Hành động  |
+-----------------------------------------------------------------------------------+
| 9.0         | 8.70     | A        | 💾 Đã lưu   | Xuất sắc         | [Sửa] [Log]|
| 8.5         | 8.00     | B        | 💾 Đã lưu   |                  | [Sửa] [Log]|
| 9.5         | 9.00     | A        | 🔒 Đã khóa  | Top 1 lớp        | [Log]      |
|             |          |          |             |                  |            |
+-----------------------------------------------------------------------------------+

[💾 Lưu tất cả]  [🔔 Gửi thông báo]  [📊 Thống kê]
```

---

## 7. Validation & Error Messages

### Input Validation
- **Điểm < 0**: "Điểm không được âm. Vui lòng nhập từ 0 đến 10."
- **Điểm > 10**: "Điểm không được vượt quá 10."
- **Không phải số**: "Vui lòng nhập số hợp lệ (ví dụ: 8.5)"
- **Quá nhiều chữ số thập phân**: "Điểm chỉ được có tối đa 2 chữ số thập phân."

### System Errors
- **Lỗi lưu database**: "Không thể lưu điểm. Vui lòng kiểm tra kết nối mạng và thử lại."
- **Lỗi đồng bộ E-Learning**: "Không thể kết nối với hệ thống E-Learning. Vui lòng thử lại sau."
- **Lỗi import Excel**: "File Excel không đúng định dạng. Vui lòng tải template mẫu."

### Business Rule Violations
- **Điểm đã khóa**: "Điểm đã bị khóa. Vui lòng liên hệ Trưởng khoa để mở khóa."
- **Không đủ quyền**: "Bạn không có quyền chỉnh sửa điểm lớp này."
- **Sinh viên không tồn tại**: "Không tìm thấy sinh viên với MSSV: {mssv}"

---

## 8. Non-Functional Requirements

### Performance
- **NFR-GRD-001**: Trang quản lý điểm phải load trong < 2 giây với 100 sinh viên
- **NFR-GRD-002**: Tính điểm tổng kết tự động trong < 100ms
- **NFR-GRD-003**: Import 500 dòng Excel trong < 5 giây
- **NFR-GRD-004**: Export Excel trong < 3 giây

### Security
- **NFR-GRD-005**: Giảng viên chỉ xem/sửa điểm lớp mình dạy
- **NFR-GRD-006**: Mọi thay đổi điểm phải được ghi log (audit trail)
- **NFR-GRD-007**: Mật khẩu phải được hash khi lưu trong database
- **NFR-GRD-008**: API phải được bảo vệ bằng JWT token

### Usability
- **NFR-GRD-009**: UI phải responsive, hỗ trợ mobile/tablet
- **NFR-GRD-010**: Có keyboard shortcuts (Ctrl+S để lưu, Tab để di chuyển giữa các ô)
- **NFR-GRD-011**: Highlight điểm không hợp lệ màu đỏ real-time
- **NFR-GRD-012**: Auto-save mỗi 30 giây (lưu vào localStorage)

### Reliability
- **NFR-GRD-013**: Hệ thống phải có uptime > 99.5%
- **NFR-GRD-014**: Backup điểm mỗi ngày
- **NFR-GRD-015**: Có retry mechanism khi gửi email/notification

---

## 9. Integration Points

### E-Learning System Integration
- **API Endpoint**: `/api/elearning/sync`
- **Authentication**: OAuth 2.0
- **Data Format**: JSON
- **Operations**:
  - GET `/courses/{courseId}/grades` - Lấy điểm từ E-Learning
  - POST `/courses/{courseId}/grades` - Đẩy điểm lên E-Learning

### Email System Integration
- **Protocol**: SMTP
- **Port**: 587 (TLS)
- **Provider**: Gmail / SendGrid
- **Rate Limit**: 100 emails / minute

### Redis for Caching
- **Cache Keys**:
  - `grade:class:{classId}` - Cache danh sách điểm lớp (TTL: 5 phút)
  - `grade:student:{studentId}` - Cache điểm sinh viên (TTL: 10 phút)
- **Invalidation**: Khi có thay đổi điểm

---

## 10. Testing Scenarios

### Test Case 1: Nhập điểm hợp lệ
**Steps**:
1. Login as Lecturer
2. Select HK1 2025-2026
3. Select class SE101
4. Enter grade 8.5 for checkpoint 1 of student 2021001
5. Click Save

**Expected**: Grade saved successfully, final grade calculated automatically

### Test Case 2: Nhập điểm không hợp lệ
**Steps**:
1. Enter grade 15 (> 10)
2. Click Save

**Expected**: Error message "Điểm không được vượt quá 10", cell highlighted red

### Test Case 3: Import Excel
**Steps**:
1. Click "Nhập Excel"
2. Upload valid Excel file
3. Review preview
4. Click "Xác nhận"

**Expected**: Grades imported, success message shown

### Test Case 4: Khóa điểm
**Steps**:
1. Click "Khóa điểm"
2. Confirm dialog
3. Try to edit grade

**Expected**: Grades locked, cells disabled, cannot edit

### Test Case 5: Đồng bộ E-Learning
**Steps**:
1. Click "Đồng bộ E-Learning"
2. Select "Kéo về"
3. Map grade items
4. Confirm

**Expected**: Grades pulled from E-Learning, displayed in table

---

## 11. Future Enhancements

1. **Mobile App**: Giảng viên có thể nhập điểm trên app mobile
2. **Voice Input**: Nhập điểm bằng giọng nói (speech-to-text)
3. **AI Grading Assistant**: AI suggest điểm dựa trên performance trong checkpoint
4. **Grade Analytics**: Dashboard phân tích xu hướng điểm theo thời gian
5. **Peer Grading**: Sinh viên có thể chấm điểm lẫn nhau (với weight thấp)
6. **Video Review**: Giảng viên có thể xem lại video presentation khi chấm điểm dự án
7. **Blockchain**: Lưu trữ điểm trên blockchain để đảm bảo tính bất biến

---

## Phụ lục: Công thức tính điểm

### Công thức cơ bản
```
Final Grade = (AVG(Checkpoints) × 0.2) + (Midterm × 0.2) + (Project × 0.4) + (Final Exam × 0.2)
```

### Với Peer Review Bonus
```
Final Grade = Base Grade + (Peer Review × 0.1)
Max Final Grade = 10.0
```

### Điều kiện đặc biệt
```python
def calculate_final_grade(checkpoints, midterm, project, final_exam, peer_review):
    # Calculate base grade
    checkpoint_avg = sum(checkpoints) / len(checkpoints) if checkpoints else 0
    base_grade = (checkpoint_avg * 0.2) + (midterm * 0.2) + (project * 0.4) + (final_exam * 0.2)
    
    # Add peer review bonus
    final_grade = base_grade + (peer_review * 0.1)
    final_grade = min(final_grade, 10.0)  # Cap at 10.0
    
    # Apply special rules
    if final_exam < 4.0:
        final_grade = min(final_grade, 4.0)  # Cap at 4.0 if final exam < 4.0
    
    if midterm == 0 or final_exam == 0:  # Absent
        final_grade = 0
    
    return round(final_grade, 2)

def get_grade_letter(final_grade):
    if final_grade >= 8.5:
        return 'A'
    elif final_grade >= 7.0:
        return 'B'
    elif final_grade >= 5.5:
        return 'C'
    elif final_grade >= 4.0:
        return 'D'
    else:
        return 'F'
```

---

**Tài liệu được tạo bởi**: CollabSphere Development Team  
**Ngày tạo**: 06/01/2026  
**Phiên bản**: 1.0
