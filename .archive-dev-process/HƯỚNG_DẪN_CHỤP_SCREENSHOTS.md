# 📸 HƯỚNG DẪN CHỤP SCREENSHOTS CHO COLLABSPHERE

**Ngày tạo**: 26/01/2026  
**Mục đích**: Hoàn thiện Section VI (User Guides) với 17 screenshots

---

## 🎯 CHUẨN BỊ TRƯỚC KHI BẮT ĐẦU

### 1. Kiểm tra hệ thống đang chạy

```powershell
# Kiểm tra Docker containers
docker compose ps

# Kết quả mong đợi: 4 containers UP
# - frontend: http://localhost:80
# - backend: http://localhost:8000
# - db: PostgreSQL
# - redis: Redis
```

### 2. Tài khoản test (đã có trong DB)

| Role | Username | Password | Email |
|------|----------|----------|-------|
| **Lecturer** | lecturer | lecturer123 | lecturer@collabsphere.com |
| **Student** | student | student123 | student@collabsphere.com |
| **Admin** | admin | admin123 | admin@collabsphere.com |
| **Head** | head | head123 | head@collabsphere.com |

### 3. Công cụ chụp màn hình

**Windows**: Dùng `Snipping Tool` hoặc `Win + Shift + S`

**Cài đặt chụp**:
- **Độ phân giải**: 1920x1080 hoặc 1280x720
- **Format**: PNG (nén tốt, quality cao)
- **Kích thước**: < 500KB mỗi ảnh
- **Lưu vào**: `C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots\`

---

## 📋 DANH SÁCH 17 SCREENSHOTS CẦN CHỤP

### ✅ Checklist tổng quan

- [ ] **Dashboards** (2): lecturer-dashboard, student-dashboard
- [ ] **Lecturer Features** (5): create-project, ai-milestone, team-progress, evaluation-form, peer-review-aggregated
- [ ] **Student Features** (6): create-team, browse-projects, team-chat, video-call, submit-checkpoint, view-grade-feedback, peer-review-form
- [ ] **Admin Features** (3): admin-dashboard, user-management, system-settings

---

## 🔴 PHẦN 1: HIGH PRIORITY - CHỤP TRƯỚC (10 ảnh)

### 📊 Screenshot 1: `lecturer-dashboard.png`

**Thao tác**:
1. Mở trình duyệt → `http://localhost:80`
2. Click **Login**
3. Nhập:
   - Username: `lecturer`
   - Password: `lecturer123`
4. Click **Submit**
5. Sau khi vào dashboard:
   - ✅ Đảm bảo thấy Sidebar menu
   - ✅ Có statistics cards (Projects, Approvals, Teams)
   - ✅ Có danh sách recent activity
6. Chụp toàn màn hình (hoặc chỉ phần main content)
7. Lưu: `lecturer-dashboard.png`

---

### 📊 Screenshot 2: `student-dashboard.png`

**Thao tác**:
1. Logout khỏi lecturer account
2. Login lại với:
   - Username: `student`
   - Password: `student123`
3. Vào dashboard:
   - ✅ Thấy "My Teams" section
   - ✅ Có project progress
   - ✅ Có notifications panel
4. Chụp màn hình
5. Lưu: `student-dashboard.png`

---

### 📝 Screenshot 3: `create-project-manual.png`

**Thao tác**:
1. Login với **lecturer** account
2. Vào **Projects** → Click **Create New Project**
3. Điền form:
   ```
   Title: Smart Campus IoT System
   Description: Hệ thống IoT quản lý campus thông minh với sensors, automation...
   Subject: (chọn môn có sẵn)
   Duration: 12 weeks
   Goals: Xây dựng hệ thống IoT...
   ```
4. **QUAN TRỌNG**: Thêm ít nhất 2-3 milestones thủ công:
   - Milestone 1: Research & Planning (Week 1-2)
   - Milestone 2: Hardware Setup (Week 3-4)
   - Milestone 3: Software Development (Week 5-8)
5. Chụp màn hình khi form đầy đủ (CHƯA submit)
6. Lưu: `create-project-manual.png`

---

### ✨ Screenshot 4: `ai-milestone-generation.png` ⭐ (FEATURE ĐẶC BIỆT)

**⚠️ Chú ý**: AI chưa hoạt động (thiếu AWS credentials), nhưng vẫn chụp UI

**Thao tác**:
1. Trong form create project (screenshot 3)
2. Tìm nút **"✨ Generate Milestones with AI"**
3. Click vào nút đó
4. **Có 2 trường hợp**:

   **Trường hợp A**: Nếu có loading spinner/modal
   - Chụp ngay khi loading xuất hiện
   - Hoặc chụp error message "AI service unavailable"
   
   **Trường hợp B**: Nếu không có gì xảy ra
   - Chụp màn hình với nút AI được highlight (hover)
   - Note: "AI feature - Awaiting AWS Bedrock setup"

5. Lưu: `ai-milestone-generation.png`

**💡 Tip**: Nếu muốn fake AI response để chụp đẹp:
- Mở Browser DevTools (F12)
- Console tab, paste:
```javascript
// Giả lập AI response
const milestones = [
  {title: "Project Planning & Requirements", week: 1},
  {title: "System Design & Architecture", week: 3},
  {title: "Hardware Prototyping", week: 5},
  {title: "Software Development", week: 7},
  {title: "Integration & Testing", week: 10}
];
console.table(milestones);
```
- Chụp màn hình DevTools showing table (optional)

---

### 📋 Screenshot 5: `browse-projects.png`

**Thao tác**:
1. Login với **student** account
2. Vào **Projects** hoặc **Browse Projects**
3. Nên có:
   - ✅ Danh sách 2-3 project cards
   - ✅ Project details: title, description, lecturer name
   - ✅ Status: Available/Picked
   - ✅ "View Details" button
4. Chụp màn hình
5. Lưu: `browse-projects.png`

**💡 Nếu không có projects**:
- Quay lại lecturer account → Create 1-2 projects → Submit for approval
- Login head account → Approve projects
- Quay lại student → Browse

---

### 💬 Screenshot 6: `team-chat.png`

**Thao tác**:
1. Login **student** account
2. Vào **My Teams** → Click vào một team
3. Vào tab **Chat** hoặc **Communication**
4. **Nếu có chat UI**:
   - Gửi vài tin nhắn test:
     ```
     Student 1: "Chào mọi người!"
     Student 1: "Hôm nay chúng ta làm gì?"
     Student 1: "@all Meeting lúc 2pm nhé"
     ```
   - Chụp màn hình chat interface
5. **Nếu không có chat UI**:
   - Chụp page "Chat - Coming soon" hoặc placeholder
6. Lưu: `team-chat.png`

**⚠️ Lưu ý**: Real-time WebSocket chưa hoạt động, nhưng REST API chat có thể dùng

---

### 📹 Screenshot 7: `video-call.png` ⭐ (FEATURE ĐẶC BIỆT)

**Thao tác**:
1. Trong team page, tìm **Meetings** hoặc **Video Call** tab
2. Click **Start Meeting** hoặc **Schedule Meeting**
3. **Trường hợp A**: Nếu có video call UI
   - Chụp màn hình video call interface (có thể blank)
   - Cần có: control buttons (mic, camera, screenshare, leave)
   
4. **Trường hợp B**: Nếu không có video UI
   - Chụp meetings list hoặc schedule form
   - Note: "Video call feature - Requires WebRTC setup"

5. Lưu: `video-call.png`

**💡 Alternative**: Chụp meeting schedule page nếu video chưa có

---

### 📤 Screenshot 8: `submit-checkpoint.png`

**Thao tác**:
1. Login **student**, vào team
2. Vào **Checkpoints** hoặc **Milestones** tab
3. Tìm nút **Submit Checkpoint** hoặc **Upload Deliverable**
4. Điền form:
   ```
   Checkpoint: Milestone 1 - Research Report
   Description: Đã hoàn thành research về IoT protocols...
   Files: (drag & drop hoặc click upload)
   ```
5. **Nếu có file upload**:
   - Upload 1-2 files test (pdf, docx, hoặc code)
   - Chụp màn hình form với files đã upload
6. **Nếu không có upload**:
   - Chụp form submit với text description
7. Lưu: `submit-checkpoint.png`

---

### 📊 Screenshot 9: `evaluation-form.png`

**Thao tác**:
1. Login **lecturer** account
2. Vào **Submissions** hoặc **Checkpoints**
3. Chọn một checkpoint đã submit từ student
4. Click **Grade** hoặc **Evaluate**
5. Điền form:
   ```
   Grade: 8.5 / 10
   Feedback: 
   - Report rất chi tiết
   - Thiếu phần analysis về security
   - Đề xuất: Thêm threat modeling
   ```
6. Chụp màn hình form evaluation
7. Lưu: `evaluation-form.png`

**⚠️ Lưu ý**: CHƯA submit, chỉ chụp form

---

### 📈 Screenshot 10: `view-grade-feedback.png`

**Thao tác**:
1. **Submit** evaluation từ screenshot 9 (lecturer)
2. Logout, login lại **student**
3. Vào **My Grades** hoặc **Checkpoints**
4. Click vào checkpoint đã được chấm
5. Màn hình nên hiển thị:
   - ✅ Grade: 8.5/10 (nổi bật, màu xanh/xanh lá)
   - ✅ Feedback từ lecturer
   - ✅ Evaluation date
   - ✅ Checkpoint details
6. Chụp màn hình
7. Lưu: `view-grade-feedback.png`

---

## 🟡 PHẦN 2: MEDIUM PRIORITY - CÓ THỜI GIAN MỚI CHỤP (7 ảnh)

### 📊 Screenshot 11: `team-progress.png`

**Thao tác**:
1. Login **lecturer**
2. Vào **Teams** hoặc **My Classes**
3. Click vào một team đang hoạt động
4. Xem **Progress Dashboard**:
   - Progress bar (% completion)
   - Milestone timeline
   - Member contributions
5. Chụp màn hình
6. Lưu: `team-progress.png`

---

### 📊 Screenshot 12: `peer-review-aggregated.png`

**Thao tác**:
1. Login **lecturer**
2. Vào **Peer Reviews** hoặc team → **Evaluations**
3. Xem aggregated results (nếu có):
   - Student list với average scores
   - Categories: Cooperation, Contribution, Communication, Technical
   - Charts (bar/radar)
4. Chụp màn hình
5. Lưu: `peer-review-aggregated.png`

**⚠️ Lưu ý**: Cần có peer reviews data trước

---

### 👥 Screenshot 13: `create-team.png`

**Thao tác**:
1. Login **student**
2. Vào **Teams** → **Create New Team**
3. Điền form:
   ```
   Team Name: Team Alpha
   Description: (optional)
   ```
4. Chụp form (chưa submit)
5. Lưu: `create-team.png`

---

### 👥 Screenshot 14: `peer-review-form.png`

**Thao tác**:
1. Login **student**
2. Vào **My Team** → **Peer Review**
3. Form đánh giá teammates:
   ```
   Teammate: Student 2
   - Cooperation: ⭐⭐⭐⭐⭐ (5/5)
   - Contribution: ⭐⭐⭐⭐ (4/5)
   - Communication: ⭐⭐⭐⭐⭐ (5/5)
   - Technical: ⭐⭐⭐⭐ (4/5)
   Comments: Làm việc rất tốt, nhiệt tình...
   ```
4. Chụp màn hình
5. Lưu: `peer-review-form.png`

---

### 👨‍💼 Screenshot 15: `admin-dashboard.png`

**Thao tác**:
1. Login **admin** account
2. Vào **Admin Dashboard**
3. Nên có:
   - System statistics (users, projects, teams)
   - Charts (activity, API calls)
   - Recent logs
4. Chụp màn hình
5. Lưu: `admin-dashboard.png`

---

### 👨‍💼 Screenshot 16: `user-management.png`

**Thao tác**:
1. Login **admin**
2. Vào **Users** hoặc **User Management**
3. Table danh sách users:
   - Columns: Name, Email, Role, Status
   - Action buttons: Edit, Reset Password
   - "+ Add User" button
4. Chụp màn hình
5. Lưu: `user-management.png`

---

### 👨‍💼 Screenshot 17: `system-settings.png`

**Thao tác**:
1. Login **admin**
2. Vào **Settings** hoặc **System Configuration**
3. Settings page với:
   - General settings
   - Email configuration
   - AWS/AI settings
   - Database settings
4. Chụp màn hình
5. Lưu: `system-settings.png`

---

## 🔧 XỬ LÝ CÁC TRƯỜNG HỢP ĐẶC BIỆT

### ❓ Nếu trang không tồn tại

**Giải pháp**:
1. Chụp màn hình "Coming soon" page
2. Hoặc chụp gần nhất (ví dụ: danh sách thay vì details)
3. Note trong caption: "UI Mockup - Under development"

### ❓ Nếu không có dữ liệu

**Giải pháp**:
1. Tạo data test trước:
   ```powershell
   cd C:\Users\LENOVO\Desktop\SE\collabsphere\backend
   python create_test_data.py  # (nếu có script)
   ```
2. Hoặc manual:
   - Lecturer: Tạo 2-3 projects
   - Head: Approve projects
   - Student: Tạo team, chọn project, submit checkpoints

### ❓ Nếu feature chưa hoạt động (AI, Video, WebSocket)

**Giải pháp**:
1. **Option A**: Chụp UI placeholder/disabled state
2. **Option B**: Dùng browser DevTools để fake UI:
   ```javascript
   // Ví dụ: Fake loading state
   document.querySelector('.ai-button').classList.add('loading');
   ```
3. **Option C**: Chụp design mockup từ Figma/wireframe (nếu có)
4. Note rõ: "Feature mockup - Integration pending"

---

## 📐 CHUẨN KỸ THUẬT SCREENSHOTS

### ✅ Yêu cầu bắt buộc

- **Độ phân giải**: 1920x1080 (Full HD) hoặc 1280x720 (HD)
- **Format**: PNG (không dùng JPG - quality thấp)
- **Kích thước file**: < 500KB (nén nếu cần)
- **Tên file**: Đúng tên trong danh sách (lowercase, dấu gạch ngang)

### ✅ Yêu cầu nội dung

- **Sạch sẽ**: Không có DevTools, tabs riêng tư, bookmarks bar
- **Focus**: Chỉ chụp phần content chính (có thể crop)
- **Readable**: Text rõ ràng, không bị mờ
- **Professional**: URL bar có thể giữ hoặc crop tùy ý

### ✅ Yêu cầu context

- **Data realistic**: Dùng dữ liệu có ý nghĩa (không phải "asdf", "test123")
- **UI state**: Hover/focus states nếu cần highlight
- **Timestamps**: Nếu có, để thời gian gần gần (Jan 2026)

---

## 🎨 CÁCH CHỤP ĐẸP VỚI SNIPPING TOOL (Windows)

### Bước 1: Mở Snipping Tool

```
Cách 1: Win + Shift + S (quick capture)
Cách 2: Tìm "Snipping Tool" trong Start Menu
Cách 3: Win + R → "snippingtool" → Enter
```

### Bước 2: Chọn chế độ chụp

- **Rectangle Snip**: Kéo chọn vùng cần chụp (KHUYÊN DÙNG)
- **Window Snip**: Chụp toàn bộ cửa sổ browser
- **Fullscreen**: Chụp toàn màn hình (có thể crop sau)

### Bước 3: Chụp và edit

1. Kéo chọn vùng cần chụp
2. Ảnh tự động mở trong Snipping Tool
3. (Optional) Dùng pen tool để highlight
4. Click **File** → **Save As**
5. Chọn:
   - **Format**: PNG
   - **Location**: `C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots\`
   - **File name**: Đúng tên trong danh sách (ví dụ: `lecturer-dashboard.png`)

### Bước 4: Kiểm tra chất lượng

```powershell
# Kiểm tra kích thước file
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots\*.png" | Select-Object Name, Length

# Nếu file > 500KB, nén bằng:
# - TinyPNG: https://tinypng.com/
# - Hoặc ImageOptim
```

---

## 🚀 QUY TRÌNH CHỤP NHANH (FAST TRACK)

### Chiến lược 30 phút (10 screenshots quan trọng nhất)

```
⏱️ 0-5 phút: Chuẩn bị
- Start Docker: docker compose up -d
- Mở browser: http://localhost:80
- Chuẩn bị Snipping Tool

⏱️ 5-15 phút: Lecturer flow (5 screenshots)
1. Login lecturer → Dashboard → CHỤP (1)
2. Create Project → Fill form → CHỤP (3)
3. Click AI button → CHỤP (4)
4. Go to Submissions → Evaluation form → CHỤP (9)
5. View Team Progress → CHỤP (11 - optional)

⏱️ 15-25 phút: Student flow (4 screenshots)
1. Logout → Login student → Dashboard → CHỤP (2)
2. Browse Projects → CHỤP (5)
3. My Team → Chat → CHỤP (6)
4. Submit Checkpoint → CHỤP (8)
5. View Grades → CHỤP (10)

⏱️ 25-30 phút: Admin (1 screenshot)
1. Login admin → Dashboard → CHỤP (15)

✅ XONG 10 screenshots HIGH priority!
```

### Chiến lược 60 phút (17 screenshots đầy đủ)

- 30 phút đầu: 10 screenshots HIGH (như trên)
- 30 phút sau: 7 screenshots MEDIUM (theo danh sách Phần 2)

---

## 📋 CHECKLIST SAU KHI CHỤP XONG

### ✅ Kiểm tra completeness

```powershell
# Script kiểm tra file
$required = @(
    "lecturer-dashboard.png",
    "student-dashboard.png",
    "create-project-manual.png",
    "ai-milestone-generation.png",
    "team-progress.png",
    "evaluation-form.png",
    "peer-review-aggregated.png",
    "create-team.png",
    "browse-projects.png",
    "team-chat.png",
    "video-call.png",
    "submit-checkpoint.png",
    "view-grade-feedback.png",
    "peer-review-form.png",
    "admin-dashboard.png",
    "user-management.png",
    "system-settings.png"
)

$path = "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots\"
$missing = @()

foreach ($file in $required) {
    if (-not (Test-Path "$path$file")) {
        $missing += $file
    }
}

if ($missing.Count -eq 0) {
    Write-Host "✅ ALL 17 SCREENSHOTS COMPLETE!" -ForegroundColor Green
} else {
    Write-Host "❌ Missing $($missing.Count) files:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
}
```

### ✅ Kiểm tra quality

```powershell
# Kiểm tra kích thước files
Get-ChildItem "$path*.png" | ForEach-Object {
    $sizeKB = [math]::Round($_.Length / 1KB, 2)
    $status = if ($sizeKB -gt 500) { "⚠️" } else { "✅" }
    Write-Host "$status $($_.Name): $sizeKB KB"
}
```

### ✅ Cập nhật documentation

Sau khi chụp xong, update file [DANH_SÁCH_SCREENSHOTS.md](DANH_SÁCH_SCREENSHOTS.md):
- Đổi ❌ thành ✅
- Update trạng thái tổng quan
- Ghi chú nếu có screenshots alternative

---

## 💡 MẸO VÀ TRICKS

### 🎨 Làm UI đẹp hơn trước khi chụp

1. **Zoom browser**: Ctrl + 0 (reset zoom về 100%)
2. **Fullscreen mode**: F11 (ẩn URL bar, tabs)
3. **Hide scrollbar**: 
   ```javascript
   document.body.style.overflow = 'hidden'
   ```
4. **Dark/Light theme**: Chọn theme matching với brand

### 🔧 Fake data nhanh với DevTools

```javascript
// Console (F12)

// Fake notifications count
document.querySelector('.notification-badge').textContent = '5';

// Fake progress bar
document.querySelector('.progress-bar').style.width = '75%';

// Fake loading state
document.querySelector('.ai-button').innerHTML = 
    '<span class="spinner"></span> Generating...';

// Fake stats numbers
document.querySelector('.stat-projects').textContent = '12';
document.querySelector('.stat-teams').textContent = '8';
```

### 📸 Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Win + Shift + S` | Quick screenshot (Windows 11) |
| `F11` | Fullscreen browser |
| `Ctrl + Shift + I` | DevTools |
| `Ctrl + +/-` | Zoom in/out |
| `Ctrl + 0` | Reset zoom |

---

## 🆘 TROUBLESHOOTING

### ❓ Browser không mở được localhost

```powershell
# Kiểm tra Docker
docker compose ps

# Restart nếu cần
docker compose restart frontend backend

# Kiểm tra logs
docker compose logs frontend --tail 20
```

### ❓ Login không được

```powershell
# Kiểm tra users trong database
cd backend
python check_users.py

# Hoặc reset password
python create_test_accounts.py
```

### ❓ Không thấy projects/teams

**Giải pháp**: Tạo data test
1. Login lecturer → Create project → Submit
2. Login head → Approve project
3. Login student → Create team → Pick project

### ❓ Screenshots bị mờ/nhòe

**Nguyên nhân**: Zoom browser sai
**Giải pháp**: 
- Nhấn `Ctrl + 0` để reset zoom về 100%
- Hoặc chụp ở resolution cao hơn (1920x1080)

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Đọc lại hướng dẫn section tương ứng
2. Check Troubleshooting
3. Xem file `TỔNG_HỢP_TÍNH_NĂNG_TRIỂN_KHAI.md` để biết feature nào đã hoạt động
4. Note lại screenshot nào không chụp được và lý do

---

**🎯 MỤC TIÊU**: 17 screenshots đầy đủ cho Section VI  
**⏱️ THỜI GIAN ƯỚC TÍNH**: 30-60 phút  
**📊 PROGRESS**: 0/17 (0%) → Bắt đầu ngay! 🚀

---

_Good luck! 💪 Chụp thật đẹp để documentation professional!_ 📸✨
