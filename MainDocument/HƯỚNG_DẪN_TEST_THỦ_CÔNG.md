# HƯỚNG DẪN THỰC HIỆN TEST VÀ CHỤP SCREENSHOTS THỦ CÔNG

## 📋 THÔNG TIN CHUNG

**Mục tiêu:** Thực hiện 17 test cases và chụp 17 screenshots cho tài liệu

**Thời gian ước tính:** 45-60 phút

**URL hệ thống:** http://localhost:80

**Thư mục lưu screenshots:** `C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots`

## 🔑 TẤT CẢ TÀI KHOẢN CẦN DÙNG

```
ADMIN:
- Username: admin
- Password: admin123

GIẢNG VIÊN:
- Username: giangvien1
- Password: gv123456

TRƯỞNG KHOA:
- Username: truongkhoa1
- Password: tk123456

SINH VIÊN:
- Username: sinhvien1
- Password: sv123456
```

## 🎨 QUY TẮC CHỤP SCREENSHOT

1. **Độ phân giải:** Toàn màn hình (F11) hoặc cửa sổ tối đa
2. **Format:** PNG
3. **Công cụ:** Windows Snipping Tool (Win + Shift + S) hoặc Print Screen
4. **Lưu ý:** 
   - Đảm bảo giao diện đã load xong
   - Không có popup/error che khuất
   - Thanh cuộn ở vị trí phù hợp để hiển thị nội dung quan trọng

---

# 📝 CÁC BƯỚC THỰC HIỆN CHI TIẾT

---

## PHASE 1: QUẢN TRỊ HỆ THỐNG (ADMIN)

### 🔐 ĐĂNG NHẬP ADMIN

1. Mở trình duyệt Chrome
2. Truy cập: `http://localhost:80/login`
3. Nhập:
   - Username: `admin`
   - Password: `admin123`
4. Click **Đăng nhập**

---

### ✅ TEST CASE 1: Admin Dashboard

**Mục đích:** Hiển thị tổng quan hệ thống

**Các bước:**
1. Sau khi đăng nhập, bạn sẽ thấy trang Admin Dashboard
2. Đợi trang load hoàn toàn (khoảng 2-3 giây)
3. Kiểm tra xem có các thống kê sau không:
   - Tổng số người dùng
   - Tổng số dự án
   - Số lượng nhóm
   - Biểu đồ/thống kê khác

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `admin-dashboard.png`
- **Nội dung:** Toàn bộ trang dashboard với các thống kê
- **Vị trí:** Trang chủ admin sau khi đăng nhập

**Ghi chú:** Screenshot này nên hiển thị đầy đủ sidebar menu và các card thống kê

---

### ✅ TEST CASE 2: Quản Lý Người Dùng

**Mục đích:** Xem danh sách và quản lý người dùng

**Các bước:**
1. Từ Admin Dashboard, tìm và click vào menu **Users** hoặc **Người dùng**
2. Nếu không thấy menu, thử các URL sau:
   - `http://localhost:80/admin/users`
   - `http://localhost:80/users`
3. Đợi trang load hiển thị danh sách người dùng
4. Kiểm tra xem có các thông tin:
   - Danh sách users (tên, email, vai trò)
   - Các nút thao tác (Thêm, Sửa, Xóa)
   - Bộ lọc/tìm kiếm

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `user-management.png`
- **Nội dung:** Trang quản lý người dùng với danh sách users
- **Vị trí:** Admin > Users

**Ghi chú:** Nếu có nhiều users, cuộn để thấy ít nhất 5-7 users trong ảnh

---

### ✅ TEST CASE 3: Cài Đặt Hệ Thống

**Mục đích:** Hiển thị trang cấu hình hệ thống

**Các bước:**
1. Từ menu admin, click vào **Settings** hoặc **Cài đặt**
2. Nếu không thấy, thử URL:
   - `http://localhost:80/admin/settings`
   - `http://localhost:80/settings`
3. Đợi trang load hiển thị các cài đặt
4. Kiểm tra các phần:
   - Cài đặt chung (tên hệ thống, logo...)
   - Cài đặt email/thông báo
   - Các tùy chọn khác

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `system-settings.png`
- **Nội dung:** Trang cài đặt hệ thống
- **Vị trí:** Admin > Settings

**Ghi chú:** Screenshot nên hiển thị các form cài đặt

---

### 🚪 ĐĂNG XUẤT ADMIN

1. Click vào avatar/tên người dùng góc phải trên
2. Click **Đăng xuất** hoặc **Logout**
3. Hoặc truy cập trực tiếp: `http://localhost:80/logout`

---

## PHASE 2: GIẢNG VIÊN - QUẢN LÝ DỰ ÁN

### 🔐 ĐĂNG NHẬP GIẢNG VIÊN

1. Truy cập: `http://localhost:80/login`
2. Nhập:
   - Username: `giangvien1`
   - Password: `gv123456`
3. Click **Đăng nhập**

---

### ✅ TEST CASE 4: Lecturer Dashboard

**Mục đích:** Trang tổng quan của giảng viên

**Các bước:**
1. Sau khi đăng nhập, bạn sẽ thấy Lecturer Dashboard
2. Đợi trang load đầy đủ
3. Kiểm tra:
   - Danh sách dự án của giảng viên
   - Thống kê nhóm đang quản lý
   - Các thông báo/công việc cần làm

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `lecturer-dashboard.png`
- **Nội dung:** Trang chủ giảng viên
- **Vị trí:** Lecturer Dashboard sau đăng nhập

---

### ✅ TEST CASE 5: Tạo Dự Án Thủ Công

**Mục đích:** Tạo dự án mới không dùng AI

**Các bước:**
1. Tìm và click nút **Create Project** hoặc **Tạo dự án mới**
2. Nếu không thấy, thử các URL:
   - `http://localhost:80/lecturer/projects/create`
   - `http://localhost:80/projects/create`
   - `http://localhost:80/projects/new`
3. Trang sẽ hiển thị form tạo dự án với các trường:
   - Tên dự án
   - Mô tả
   - Lớp/môn học
   - Ngày bắt đầu/kết thúc
   - Các milestone (có thể)

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `create-project-manual.png`
- **Nội dung:** Form tạo dự án thủ công
- **Vị trí:** Lecturer > Projects > Create

**Ghi chú:** KHÔNG cần điền form, chỉ cần hiển thị form trống hoặc một phần đã điền

---

### ✅ TEST CASE 6: Giao Diện AI Tạo Milestone

**Mục đích:** Hiển thị tính năng AI tạo milestone tự động

**Các bước:**
1. Nếu đang ở trang Create Project:
   - Tìm phần **AI Generate Milestones** hoặc nút có icon robot/AI
   - Hoặc tìm tab **AI Generation**
2. Nếu không tìm thấy, quay về danh sách dự án:
   - `http://localhost:80/lecturer/projects`
   - `http://localhost:80/projects`
3. Click vào một dự án bất kỳ và tìm chức năng AI

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `ai-milestone-generation.png`
- **Nội dung:** Giao diện AI tạo milestone (có thể là form input hoặc danh sách milestones được tạo)
- **Vị trí:** Projects > AI Generate hoặc trong form tạo dự án

**Ghi chú:** Nếu AI không hoạt động (hiển thị lỗi), vẫn chụp giao diện đó. Quan trọng là có **UI của tính năng AI**, không cần kết quả thực tế.

---

### 🚪 ĐĂNG XUẤT GIẢNG VIÊN

1. Đăng xuất như hướng dẫn trên
2. Hoặc: `http://localhost:80/logout`

---

## PHASE 3: TRƯỞNG KHOA - PHẢI DUYỆT

### 🔐 ĐĂNG NHẬP TRƯỞNG KHOA

1. Truy cập: `http://localhost:80/login`
2. Nhập:
   - Username: `truongkhoa1`
   - Password: `tk123456`
3. Click **Đăng nhập**

---

### ✅ TEST CASE 7: Phê Duyệt Dự Án

**Mục đích:** Trưởng khoa phê duyệt dự án

**Các bước:**
1. Sau khi đăng nhập, tìm trang phê duyệt:
   - Menu: **Approvals**, **Phê duyệt**, hoặc **Pending Projects**
   - URL: `http://localhost:80/head/approvals` hoặc `/approvals`
2. Trang hiển thị danh sách dự án chờ phê duyệt
3. Mỗi dự án có nút **Approve/Reject**

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `head-approve-projects.png`
- **Nội dung:** Trang phê duyệt dự án của trưởng khoa
- **Vị trí:** Head > Approvals

**Ghi chú:** Nếu không có dự án nào chờ duyệt, vẫn chụp trang trống với thông báo "No pending projects"

---

### 🚪 ĐĂNG XUẤT TRƯỞNG KHOA

---

## PHASE 4: SINH VIÊN - ĐĂNG KÝ & TẠO NHÓM

### 🔐 ĐĂNG NHẬP SINH VIÊN

1. Truy cập: `http://localhost:80/login`
2. Nhập:
   - Username: `sinhvien1`
   - Password: `sv123456`
3. Click **Đăng nhập**

---

### ✅ TEST CASE 8: Student Dashboard

**Mục đích:** Trang chủ sinh viên

**Các bước:**
1. Sau đăng nhập, xem Student Dashboard
2. Kiểm tra:
   - Dự án đã đăng ký
   - Nhóm của sinh viên
   - Tiến độ
   - Thông báo

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `student-dashboard.png`
- **Nội dung:** Trang chủ sinh viên
- **Vị trí:** Student Dashboard

---

### ✅ TEST CASE 9: Duyệt Danh Sách Dự Án

**Mục đích:** Sinh viên xem các dự án có sẵn để đăng ký

**Các bước:**
1. Tìm menu **Projects**, **Dự án**, hoặc **Browse Projects**
2. URL: 
   - `http://localhost:80/student/projects`
   - `http://localhost:80/projects`
   - `http://localhost:80/projects/browse`
3. Trang hiển thị danh sách dự án với:
   - Tên dự án
   - Giảng viên hướng dẫn
   - Mô tả ngắn
   - Số nhóm đã đăng ký
   - Nút **Register** hoặc **Đăng ký**

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `browse-projects.png`
- **Nội dung:** Danh sách dự án có sẵn
- **Vị trí:** Student > Projects

---

### ✅ TEST CASE 10: Tạo Nhóm

**Mục đích:** Sinh viên tạo nhóm làm dự án

**Các bước:**
1. Tìm menu **Teams**, **Groups**, **Nhóm**
2. URL:
   - `http://localhost:80/teams`
   - `http://localhost:80/groups`
   - `http://localhost:80/student/teams`
3. Click nút **Create Team** hoặc **Tạo nhóm**
4. Form hiển thị:
   - Tên nhóm
   - Chọn dự án
   - Mời thành viên
   - Mô tả nhóm

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `team-formation.png`
- **Nội dung:** Form tạo nhóm hoặc danh sách nhóm
- **Vị trí:** Student > Teams > Create

**Ghi chú:** Chụp form tạo nhóm hoặc trang quản lý nhóm

---

## PHASE 5: CÔNG CỤ CỘNG TÁC

### ✅ TEST CASE 11: Chat Nhóm

**Mục đích:** Giao diện chat real-time của nhóm

**Các bước:**
1. Tìm menu **Chat**, **Messages**, **Trò chuyện**
2. URL:
   - `http://localhost:80/chat`
   - `http://localhost:80/messages`
   - `http://localhost:80/communication`
3. Giao diện chat hiển thị:
   - Danh sách nhóm/người nhắn
   - Khung chat
   - Box nhập tin nhắn
   - File đính kèm

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `team-chat.png`
- **Nội dung:** Giao diện chat nhóm
- **Vị trí:** Student > Chat

**Ghi chú:** Nếu chat trống, vẫn chụp giao diện. Có thể gõ 1-2 tin nhắn test để làm đẹp ảnh.

---

### ✅ TEST CASE 12: Video Call

**Mục đích:** Giao diện họp video

**Các bước:**
1. Tìm menu **Meeting**, **Video Call**, **Họp online**
2. URL:
   - `http://localhost:80/meeting`
   - `http://localhost:80/video-call`
   - `http://localhost:80/meetings`
3. Giao diện hiển thị:
   - Khu vực video
   - Danh sách participants
   - Các nút điều khiển (mic, camera, share screen)

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `video-call.png`
- **Nội dung:** Giao diện video meeting
- **Vị trí:** Student > Meeting

**Ghi chú:** Không cần bật camera thật, chỉ cần giao diện. Nếu hiển thị placeholder "Camera off" thì OK.

---

### ✅ TEST CASE 13: Theo Dõi Tiến Độ

**Mục đích:** Xem tiến độ milestone của nhóm

**Các bước:**
1. Tìm menu **Progress**, **Milestones**, **Tiến độ**
2. URL:
   - `http://localhost:80/progress`
   - `http://localhost:80/milestones`
   - `http://localhost:80/team/progress`
3. Trang hiển thị:
   - Danh sách milestones
   - Trạng thái (To Do, In Progress, Done)
   - Timeline/Gantt chart
   - Phần trăm hoàn thành

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `team-progress.png`
- **Nội dung:** Bảng theo dõi tiến độ milestone
- **Vị trí:** Student > Progress

---

## PHASE 6: NỘP BÀI & CHẤM ĐIỂM

### ✅ TEST CASE 14: Nộp Checkpoint

**Mục đích:** Sinh viên nộp bài checkpoint

**Các bước:**
1. Từ tài khoản sinh viên, tìm menu **Submissions**, **Checkpoints**, **Nộp bài**
2. URL:
   - `http://localhost:80/submissions`
   - `http://localhost:80/checkpoints`
   - `http://localhost:80/submit`
3. Form nộp bài có:
   - Chọn checkpoint/milestone
   - Upload file
   - Mô tả/ghi chú
   - Link GitHub/demo
   - Nút Submit

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `submit-checkpoint.png`
- **Nội dung:** Form nộp bài checkpoint
- **Vị trí:** Student > Submissions

**Ghi chú:** KHÔNG cần nộp bài thật, chỉ chụp form

---

### 🚪 ĐĂNG XUẤT VÀ CHUYỂN SANG GIẢNG VIÊN

1. Đăng xuất tài khoản sinh viên
2. Đăng nhập lại bằng tài khoản giảng viên (giangvien1/gv123456)

---

### ✅ TEST CASE 15: Chấm Điểm Checkpoint

**Mục đích:** Giảng viên chấm bài sinh viên nộp

**Các bước:**
1. Từ tài khoản giảng viên, tìm **Evaluations**, **Grading**, **Chấm điểm**
2. URL:
   - `http://localhost:80/lecturer/evaluations`
   - `http://localhost:80/evaluations`
   - `http://localhost:80/grading`
3. Trang hiển thị:
   - Danh sách bài nộp chờ chấm
   - Chi tiết từng bài
   - Form chấm điểm (điểm số, nhận xét)

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `grade-checkpoint.png`
- **Nội dung:** Trang chấm điểm của giảng viên
- **Vị trí:** Lecturer > Evaluations

---

### 🚪 CHUYỂN LẠI SANG SINH VIÊN

1. Đăng xuất giảng viên
2. Đăng nhập lại bằng sinh viên (sinhvien1/sv123456)

---

### ✅ TEST CASE 16: Xem Điểm

**Mục đích:** Sinh viên xem điểm đã được chấm

**Các bước:**
1. Từ tài khoản sinh viên, tìm **Grades**, **Evaluations**, **Điểm**
2. URL:
   - `http://localhost:80/grades`
   - `http://localhost:80/evaluations`
   - `http://localhost:80/my-grades`
3. Trang hiển thị:
   - Danh sách checkpoint đã nộp
   - Điểm số
   - Nhận xét của giảng viên
   - Tiêu chí chấm điểm

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `view-grades.png`
- **Nội dung:** Trang xem điểm của sinh viên
- **Vị trí:** Student > Grades

---

## PHASE 7: ĐÁNH GIÁ ĐỒNG ĐẲNG

### ✅ TEST CASE 17: Form Đánh Giá Đồng Đẳng

**Mục đích:** Sinh viên đánh giá thành viên trong nhóm

**Các bước:**
1. Từ tài khoản sinh viên, tìm **Peer Review**, **Đánh giá nhóm**
2. URL:
   - `http://localhost:80/peer-review`
   - `http://localhost:80/reviews`
   - `http://localhost:80/team/review`
3. Form đánh giá có:
   - Danh sách thành viên nhóm
   - Các tiêu chí đánh giá (contribution, teamwork, communication...)
   - Thang điểm (1-5 sao hoặc số)
   - Nhận xét

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `peer-review-form.png`
- **Nội dung:** Form đánh giá đồng đẳng
- **Vị trí:** Student > Peer Review

---

### ✅ TEST CASE 18: Kết Quả Đánh Giá Tổng Hợp

**Mục đích:** Xem kết quả đánh giá đồng đẳng đã được tổng hợp

**Các bước:**
1. Từ menu Peer Review, tìm tab **Results** hoặc **Kết quả**
2. Hoặc URL:
   - `http://localhost:80/peer-review/results`
   - `http://localhost:80/reviews/results`
   - `http://localhost:80/peer-results`
3. Trang hiển thị:
   - Điểm trung bình của mỗi thành viên
   - Biểu đồ
   - Nhận xét tổng hợp
   - So sánh giữa các thành viên

**📸 CHỤP SCREENSHOT:**
- **Tên file:** `peer-review-aggregated.png`
- **Nội dung:** Kết quả đánh giá đồng đẳng tổng hợp
- **Vị trí:** Student > Peer Review > Results

**Ghi chú:** Đây là screenshot CUỐI CÙNG!

---

## 🎯 KIỂM TRA SAU KHI HOÀN THÀNH

Sau khi hoàn thành tất cả 18 test cases, kiểm tra lại:

### ✅ Checklist

```powershell
# Chạy lệnh này để kiểm tra số lượng screenshots:
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots" -Filter "*.png" | Measure-Object | Select-Object -ExpandProperty Count
```

**Kết quả mong đợi:** 18 files

### 📋 Danh sách đầy đủ screenshots cần có:

```
✅  1. admin-dashboard.png
✅  2. user-management.png
✅  3. system-settings.png
✅  4. lecturer-dashboard.png
✅  5. create-project-manual.png
✅  6. ai-milestone-generation.png
✅  7. head-approve-projects.png
✅  8. student-dashboard.png
✅  9. browse-projects.png
✅ 10. team-formation.png
✅ 11. team-chat.png
✅ 12. video-call.png
✅ 13. team-progress.png
✅ 14. submit-checkpoint.png
✅ 15. grade-checkpoint.png
✅ 16. view-grades.png
✅ 17. peer-review-form.png
✅ 18. peer-review-aggregated.png
```

### 🔍 Kiểm tra chi tiết từng file:

```powershell
# Xem danh sách với kích thước:
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots" -Filter "*.png" | Select-Object Name, @{Name="SizeKB";Expression={[math]::Round($_.Length/1KB, 2)}} | Sort-Object Name | Format-Table -AutoSize
```

**Lưu ý quan trọng:**
- Các file KHÔNG nên có kích thước giống hệt nhau (nếu giống hệt = bị trùng)
- Mỗi file nên từ 50KB đến 500KB
- Nếu có file < 10KB = có thể bị lỗi

---

## 💡 MẸO CHỤP SCREENSHOT ĐẸP

### 1. Chuẩn bị trước
- Đóng tất cả tab không cần thiết
- Zoom browser về 100% (Ctrl + 0)
- Ẩn bookmarks bar (Ctrl + Shift + B)
- Dùng chế độ fullscreen (F11) cho ảnh đẹp hơn

### 2. Timing
- Đợi trang load xong hoàn toàn (không còn loading spinner)
- Đợi animations chạy xong
- Với biểu đồ, đợi render xong

### 3. Nội dung
- Đảm bảo thông tin quan trọng nằm trong khung hình
- Nếu trang dài, chụp phần quan trọng nhất (header + nội dung chính)
- Tránh chụp lúc có error popup (trừ khi đó là phần cần test)

### 4. Công cụ chụp ảnh
**Windows Snipping Tool (Khuyên dùng):**
- Phím tắt: `Win + Shift + S`
- Chọn vùng cần chụp
- Ảnh tự động copy vào clipboard
- Mở Paint (Win + R, gõ `mspaint`)
- Paste (Ctrl + V)
- Save as PNG với tên đúng

**Hoặc Print Screen:**
- `PrtScn`: Chụp toàn màn hình
- `Alt + PrtScn`: Chụp cửa sổ đang active
- Paste vào Paint và crop

---

## 🚨 XỬ LÝ SỰ CỐ

### Không tìm thấy menu/trang?
1. Thử các URL được liệt kê trong hướng dẫn
2. Kiểm tra xem có đăng nhập đúng vai trò không
3. Xem console browser (F12) có lỗi không
4. Thử refresh trang (F5 hoặc Ctrl + F5)

### Trang bị lỗi/không load?
1. Kiểm tra Docker containers còn chạy không:
   ```powershell
   docker compose ps
   ```
2. Restart containers nếu cần:
   ```powershell
   cd C:\Users\LENOVO\Desktop\SE\collabsphere
   docker compose restart
   ```
3. Chờ 10 giây rồi thử lại

### Không login được?
1. Kiểm tra lại username/password
2. Clear cookies: Ctrl + Shift + Delete > Cookies
3. Thử private/incognito mode: Ctrl + Shift + N
4. Kiểm tra backend còn chạy:
   ```powershell
   curl http://localhost:8000/docs
   ```

### Một số trang không tồn tại?
- Nếu trang thực sự không có, chụp trang gần nhất có thể
- VD: Không có `/team/progress` → chụp `/projects` hoặc dashboard
- Ghi chú lại trang nào bị thiếu để báo cáo

---

## 📝 GHI CHÚ QUAN TRỌNG

1. **Thứ tự thực hiện:** Nên làm theo đúng thứ tự từ Phase 1 → 7 để logic
2. **Login/Logout:** Nhớ đăng xuất trước khi đổi tài khoản
3. **Đặt tên file:** Phải ĐÚNG tên file được chỉ định (lowercase, dấu gạch ngang)
4. **Format:** Chỉ dùng PNG, không dùng JPG
5. **Thời gian:** Mỗi phase mất ~5-10 phút, tổng ~45-60 phút
6. **Kiểm tra:** Sau mỗi 3-4 screenshots, kiểm tra lại file có lưu đúng không

---

## 🎓 KẾT LUẬN

Sau khi hoàn thành 18 screenshots, bạn có thể:

1. **Kiểm tra lại:** Chạy lệnh kiểm tra số lượng ở trên
2. **Review:** Mở từng file xem có rõ ràng, đúng nội dung không
3. **Tiếp tục:** Chèn screenshots vào tài liệu chính
4. **Tạo PDF:** Export tài liệu cuối cùng

**Chúc bạn thực hiện thành công! 🚀**

---

**Nếu có vấn đề, tham khảo:**
- `TỔNG_HỢP_TÍNH_NĂNG_TRIỂN_KHAI.md` - Danh sách API endpoints
- Backend logs: `docker compose logs backend`
- Frontend: Mở DevTools (F12) xem lỗi
