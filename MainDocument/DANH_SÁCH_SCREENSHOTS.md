# 📸 DANH SÁCH SCREENSHOTS CẦN BỔ SUNG

**Ngày tạo**: 20/01/2026  
**Trạng thái**: ❌ **17 screenshots chưa có**

---

## 🎯 TỔNG QUAN

### Tình trạng hiện tại

| Loại hình ảnh | Số lượng | Trạng thái | Ghi chú |
|---------------|----------|------------|---------|
| **Diagrams (Design)** | 31 PNG | ✅ Hoàn thành | Tất cả có trong `Images/` |
| **Screenshots (Web UI)** | 17 PNG | ❌ **Chưa có** | Đang reference nhưng chưa tồn tại |
| **Tổng cộng** | 48 | 🟡 65% | Cần chụp 17 screenshots |

---

## ❌ SCREENSHOTS CHƯA CÓ (17 ảnh)

Tất cả screenshots sau đây đang được **reference** trong Section VI (User Guides) nhưng **chưa tồn tại** trong thư mục `Images/Screenshots/`:

### 📊 **Authentication & General** (2 screenshots)

1. ❌ `lecturer-dashboard.png`
   - **Vị trí**: Section 6.3.1 (Lecturer Guide)
   - **Nội dung**: Dashboard của giảng viên sau khi login
   - **Yêu cầu**: 
     - Sidebar với menu items (Projects, Classes, Submissions, etc.)
     - Statistics cards (Total Projects, Pending Approvals, Active Teams)
     - Recent activity list
     - Calendar/Timeline view
   - **Độ ưu tiên**: 🔴 HIGH

2. ❌ `student-dashboard.png`
   - **Vị trí**: Section 6.3.2 (Student Guide)
   - **Nội dung**: Dashboard của sinh viên
   - **Yêu cầu**:
     - My Teams section
     - Current Project progress
     - Upcoming deadlines
     - Notifications panel
   - **Độ ưu tiên**: 🔴 HIGH

---

### 👨‍🏫 **Lecturer Features** (5 screenshots)

3. ❌ `create-project-manual.png`
   - **Vị trí**: Section 6.3.1.2 (Creating Projects)
   - **Nội dung**: Form tạo project thủ công
   - **Yêu cầu**:
     - Title field
     - Description textarea (với Markdown preview)
     - Subject dropdown
     - Duration weeks input
     - Manual milestone list
     - "Submit for Approval" button
   - **Độ ưu tiên**: 🔴 HIGH

4. ❌ `ai-milestone-generation.png`
   - **Vị trí**: Section 6.3.1.2 (AI-Assisted Creation)
   - **Nội dung**: AI đang generate milestones
   - **Yêu cầu**:
     - "✨ Generate Milestones with AI" button (highlighted)
     - Loading spinner/indicator
     - AI-generated milestones list (4-6 items)
     - Edit icons on each milestone
     - Professional, modern UI
   - **Độ ưu tiên**: 🔴 HIGH (Feature đặc biệt của hệ thống)

5. ❌ `team-progress.png`
   - **Vị trí**: Section 6.3.1.4 (Monitoring Team Progress)
   - **Nội dung**: Dashboard theo dõi tiến độ team
   - **Yêu cầu**:
     - Progress bar/chart (% completion)
     - Milestone timeline
     - Submitted checkpoints list
     - Team members list
     - Activity log
   - **Độ ưu tiên**: 🟡 MEDIUM

6. ❌ `evaluation-form.png`
   - **Vị trí**: Section 6.3.1.5 (Evaluating Checkpoints)
   - **Nói dung**: Form đánh giá checkpoint
   - **Yêu cầu**:
     - Grade input (0-10)
     - Feedback textarea (rich text editor)
     - Submission details (date, files)
     - "Submit Evaluation" button
   - **Độ ưu tiên**: 🔴 HIGH

7. ❌ `peer-review-aggregated.png`
   - **Vị trí**: Section 6.3.1.6 (Viewing Peer Reviews)
   - **Nội dung**: Aggregated peer review results
   - **Yêu cầu**:
     - Student list với average scores
     - 4 categories: Cooperation, Contribution, Communication, Technical Skills
     - Radar chart hoặc bar chart
     - Anonymous comments section
   - **Độ ưu tiên**: 🟡 MEDIUM

---

### 🎓 **Student Features** (6 screenshots)

8. ❌ `create-team.png`
   - **Vị trí**: Section 6.3.2.2 (Joining a Team)
   - **Nội dung**: Form tạo team
   - **Yêu cầu**:
     - Team name input
     - "Create Team" button
     - Simple, clean UI
   - **Độ ưu tiên**: 🟡 MEDIUM

9. ❌ `browse-projects.png`
   - **Vị trí**: Section 6.3.2.4 (Picking a Project)
   - **Nội dung**: Danh sách projects có thể chọn
   - **Yêu cầu**:
     - Project cards (title, description preview, lecturer name)
     - Filter/search bar
     - "View Details" buttons
     - Available/Picked status indicators
   - **Độ ưu tiên**: 🔴 HIGH

10. ❌ `team-chat.png`
    - **Vị trí**: Section 6.3.2.5 (Team Collaboration)
    - **Nội dung**: Real-time chat interface
    - **Yêu cầu**:
      - Message list với timestamps
      - Sender names
      - @mention highlights
      - Input box với Send button
      - Online/offline indicators
    - **Độ ưu tiên**: 🔴 HIGH

11. ❌ `video-call.png`
    - **Vị trí**: Section 6.3.2.5 (Team Collaboration - Video Calls)
    - **Nội dung**: Video call interface đang hoạt động
    - **Yêu cầu**:
      - 2-4 video tiles (participant cameras)
      - Control buttons (mute, camera, screen share, leave)
      - Participant names
      - Professional video call UI
    - **Độ ưu tiên**: 🔴 HIGH (Feature đặc biệt)

12. ❌ `submit-checkpoint.png`
    - **Vị trí**: Section 6.3.2.6 (Submitting Checkpoints)
    - **Nội dung**: Form submit checkpoint
    - **Yêu cầu**:
      - Submission text area
      - File upload area (drag & drop)
      - Uploaded files list
      - "Submit" button
      - Deadline countdown (optional)
    - **Độ ưu tiên**: 🔴 HIGH

13. ❌ `view-grade-feedback.png`
    - **Vị trí**: Section 6.3.2.7 (Viewing Grades & Feedback)
    - **Nội dung**: Hiển thị grade và feedback
    - **Yêu cầu**:
      - Grade display (8.5/10) - prominent
      - Feedback text (từ lecturer)
      - Evaluation date
      - Checkpoint details
    - **Độ ưu tiên**: 🔴 HIGH

14. ❌ `peer-review-form.png`
    - **Vị trí**: Section 6.3.2.8 (Peer Review)
    - **Nội dung**: Form đánh giá peer review
    - **Yêu cầu**:
      - Teammate list (excluding self)
      - 4 rating categories (1-5 scale) với star/slider
      - Comments textarea (optional)
      - "Submit Reviews" button
    - **Độ ưu tiên**: 🟡 MEDIUM

---

### 👨‍💼 **Admin Features** (3 screenshots)

15. ❌ `admin-dashboard.png`
    - **Vị trí**: Section 6.3.3.1 (Admin Dashboard)
    - **Nội dung**: Admin dashboard overview
    - **Yêu cầu**:
      - System statistics (users, projects, teams)
      - Charts (daily active users, API requests)
      - Recent activity logs
      - System alerts panel
    - **Độ ưu tiên**: 🟡 MEDIUM

16. ❌ `user-management.png`
    - **Vị trí**: Section 6.3.3.2 (User Management)
    - **Nội dung**: User management table
    - **Yêu cầu**:
      - User list với columns (Name, Email, Role, Status)
      - Action buttons (Edit, Reset Password, Suspend)
      - Filter/search bar
      - "+ Add User" button
    - **Độ ưu tiên**: 🟡 MEDIUM

17. ❌ `system-settings.png`
    - **Vị trí**: Section 6.3.3.4 (System Configuration)
    - **Nội dung**: System settings page
    - **Yêu cầu**:
      - Tabs: General, Features, File Upload, Email, Security
      - Settings form (inputs, toggles, dropdowns)
      - "Save Changes" button
      - Feature toggles UI
    - **Độ ưu tiên**: 🟡 MEDIUM

---

## 📁 THÔNG TIN FOLDER

### Hiện tại
```
MainDocument/Images/
├── [31 PNG diagrams] ✅
└── Screenshots/ ❌ CHƯA TỒN TẠI
```

### Cần tạo
```
MainDocument/Images/
├── [31 PNG diagrams] ✅
└── Screenshots/
    ├── lecturer-dashboard.png
    ├── student-dashboard.png
    ├── create-project-manual.png
    ├── ai-milestone-generation.png
    ├── team-progress.png
    ├── evaluation-form.png
    ├── peer-review-aggregated.png
    ├── create-team.png
    ├── browse-projects.png
    ├── team-chat.png
    ├── video-call.png
    ├── submit-checkpoint.png
    ├── view-grade-feedback.png
    ├── peer-review-form.png
    ├── admin-dashboard.png
    ├── user-management.png
    └── system-settings.png
```

---

## 🎯 PHÂN LOẠI THEO ĐỘ ƯU TIÊN

### 🔴 HIGH Priority (10 screenshots) - BẮT BUỘC
**Các tính năng core của hệ thống**

1. `lecturer-dashboard.png`
2. `student-dashboard.png`
3. `create-project-manual.png`
4. `ai-milestone-generation.png` ⭐ Đặc biệt
5. `evaluation-form.png`
6. `browse-projects.png`
7. `team-chat.png`
8. `video-call.png` ⭐ Đặc biệt
9. `submit-checkpoint.png`
10. `view-grade-feedback.png`

**Ước tính thời gian**: 2-2.5 giờ (12-15 phút/screenshot)

---

### 🟡 MEDIUM Priority (7 screenshots) - NÊN CÓ
**Tính năng bổ sung, quan trọng nhưng không critical**

11. `team-progress.png`
12. `peer-review-aggregated.png`
13. `create-team.png`
14. `peer-review-form.png`
15. `admin-dashboard.png`
16. `user-management.png`
17. `system-settings.png`

**Ước tính thời gian**: 1.5-2 giờ (10-12 phút/screenshot)

---

## 🛠️ HƯỚNG DẪN CHỤP SCREENSHOTS

### Chuẩn bị

**Option 1: Chụp từ hệ thống thật** (Recommended)
- ✅ Chạy CollabSphere (Docker hoặc manual)
- ✅ Seed sample data
- ✅ Login với các roles khác nhau
- ✅ Chụp màn hình thật

**Option 2: Mockup/Wireframe** (Nếu hệ thống chưa hoàn thiện UI)
- Use Figma, Sketch, hoặc Adobe XD
- Tạo mockups professional
- Export as PNG

**Option 3: Mix** (Realistic approach)
- Chụp những phần đã làm xong
- Mockup những phần chưa hoàn thiện
- Đảm bảo consistent style

---

### Công cụ chụp

**Trên Windows**:
- Windows Snipping Tool (Win + Shift + S)
- ShareX (free, powerful)
- Greenshot (free)

**Trên macOS**:
- Command + Shift + 4 (built-in)
- CleanShot X (paid, professional)

**Chrome DevTools**:
- F12 → Toggle device toolbar
- Set viewport size: 1920×1080
- Capture screenshot (Ctrl+Shift+P → "Capture screenshot")

---

### Quy cách

**Kích thước**:
- Độ phân giải: 1920×1080 hoặc 1440×900
- Format: PNG (lossless)
- File size: < 500KB (optimize nếu cần)

**Chất lượng**:
- Clear, readable text
- No sensitive data (use fake data)
- Professional appearance
- Consistent UI theme

**Naming convention**:
- Lowercase
- Hyphens (không dùng spaces, underscores)
- Descriptive names (theo danh sách trên)

**Editing**:
- Crop unnecessary parts (browser chrome, desktop)
- Add annotations nếu cần (arrows, highlights)
- Blur sensitive info
- Consistent dimensions

---

### Workflow đề xuất

**Step 1: Tạo folder** (1 phút)
```bash
mkdir "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"
```

**Step 2: Chụp HIGH priority screenshots** (2-2.5 giờ)
- Start với 10 screenshots quan trọng nhất
- Focus on core features
- Test trong document (update paths nếu cần)

**Step 3: Chụp MEDIUM priority screenshots** (1.5-2 giờ)
- Complete remaining 7 screenshots
- Ensure consistency với batch 1

**Step 4: Review & optimize** (30 phút)
- Check tất cả screenshots display correctly
- Optimize file sizes (use TinyPNG, Squoosh.app)
- Verify paths trong markdown files
- Test trong PDF export

---

### Script tạo folder và check

```powershell
# Tạo folder Screenshots
$screenshotsPath = "C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots"
if (!(Test-Path $screenshotsPath)) {
    New-Item -ItemType Directory -Path $screenshotsPath
    Write-Host "✅ Created Screenshots folder" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Screenshots folder already exists" -ForegroundColor Yellow
}

# List missing screenshots
$requiredScreenshots = @(
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

$missing = @()
foreach ($file in $requiredScreenshots) {
    $fullPath = Join-Path $screenshotsPath $file
    if (!(Test-Path $fullPath)) {
        $missing += $file
    }
}

Write-Host "`n📊 Screenshot Status:" -ForegroundColor Cyan
Write-Host "Total required: $($requiredScreenshots.Count)" -ForegroundColor White
Write-Host "Missing: $($missing.Count)" -ForegroundColor Red
Write-Host "Completed: $($requiredScreenshots.Count - $missing.Count)" -ForegroundColor Green

if ($missing.Count -gt 0) {
    Write-Host "`n❌ Missing screenshots:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "   - $_" -ForegroundColor Yellow }
} else {
    Write-Host "`n✅ All screenshots complete!" -ForegroundColor Green
}
```

---

## 📋 CHECKLIST

**Trước khi chụp**:
- [ ] Tạo folder `MainDocument/Images/Screenshots/`
- [ ] Chạy CollabSphere (hoặc chuẩn bị mockup tool)
- [ ] Seed sample data với meaningful content
- [ ] Chuẩn bị screenshot tool

**Trong quá trình chụp**:
- [ ] Chụp đủ 10 HIGH priority screenshots
- [ ] Chụp đủ 7 MEDIUM priority screenshots
- [ ] Check resolution & file size
- [ ] Consistent style & theme
- [ ] No sensitive/personal data

**Sau khi chụp**:
- [ ] Tất cả 17 files tồn tại trong folder
- [ ] File names match exactly với references
- [ ] Test hiển thị trong markdown preview
- [ ] Optimize file sizes (< 500KB each)
- [ ] Update TỔNG_KẾT_TÀI_LIỆU.md (mark screenshots complete)

---

## 🎯 TÓM TẮT

| Loại | Số lượng | Ước tính thời gian | Độ ưu tiên |
|------|----------|-------------------|------------|
| **HIGH priority** | 10 | 2-2.5 giờ | 🔴 Bắt buộc |
| **MEDIUM priority** | 7 | 1.5-2 giờ | 🟡 Nên có |
| **Tổng cộng** | **17** | **3.5-4.5 giờ** | - |

---

## 🚀 NEXT STEPS

**Để hoàn thành screenshots**:

1. **Tạo folder** (1 phút):
   ```bash
   mkdir MainDocument\Images\Screenshots
   ```

2. **Chọn approach**:
   - **Option A**: Chụp từ hệ thống thật (recommended)
   - **Option B**: Tạo mockups (nếu UI chưa ready)
   - **Option C**: Mix (realistic)

3. **Execute**:
   - Batch 1: 10 HIGH priority (2-2.5h)
   - Batch 2: 7 MEDIUM priority (1.5-2h)

4. **Verify**:
   - Run PowerShell script check
   - Preview trong markdown
   - Test PDF export

**Bạn muốn tôi**:
- **A.** Tạo folder ngay + run check script
- **B.** Hướng dẫn setup mockup tools (Figma templates)
- **C.** Tạo dummy screenshots (placeholders) tạm thời
- **D.** Tiếp tục làm Appendix (skip screenshots tạm thời)

Chọn option nào? 😊
