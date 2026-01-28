# 🤖 CollabSphere Automation Testing

Automated testing và screenshot capture cho toàn bộ hệ thống CollabSphere.

---

## 🎯 Mục đích

Script này tự động:
1. **Test toàn bộ workflow**: Admin → Lecturer → Head → Student
2. **Chụp 17 screenshots** cần thiết cho documentation
3. **Tạo dữ liệu test** realistic (projects, teams, submissions, grades)
4. **Verify completeness** sau khi chạy xong

---

## 📋 Yêu cầu

### Phần mềm cần có:

- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **Docker Desktop** - Đang chạy với 4 containers
- **Chrome hoặc Edge** - Browser automation
- **PowerShell** - Windows 10/11

### Dependencies Python:

```
selenium==4.16.0
webdriver-manager==4.0.1
Pillow==10.1.0
requests==2.31.0
```

*(Sẽ tự động cài đặt khi chạy script)*

---

## 🚀 Cách sử dụng

### Option 1: PowerShell Script (KHUYÊN DÙNG)

```powershell
# Vào thư mục automation
cd C:\Users\LENOVO\Desktop\SE\collabsphere\automation

# Chạy script
.\run_automation.ps1
```

**Script sẽ tự động**:
- ✅ Check Python installed
- ✅ Check Docker running
- ✅ Install dependencies
- ✅ Start containers (nếu chưa chạy)
- ✅ Run automation test
- ✅ Verify screenshots captured

### Option 2: Manual Python

```powershell
# Install dependencies
pip install -r requirements.txt

# Run automation
python automation_test.py
```

---

## ⏱️ Thời gian thực hiện

| Phase | Time | Screenshots |
|-------|------|-------------|
| Setup | 2 min | - |
| Admin | 3 min | 3 (#15-17) |
| Lecturer | 5 min | 3 (#1, 3-4) |
| Head | 2 min | - |
| Student | 5 min | 5 (#2, 5-6, 8, 13) |
| Collaboration | 3 min | 2 (#7, 11) |
| Grading | 4 min | 2 (#9-10) |
| Peer Review | 3 min | 2 (#12, 14) |
| **TOTAL** | **~30 min** | **17/17** |

---

## 📸 Screenshots Output

Tất cả screenshots sẽ được lưu vào:

```
C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots\
```

Danh sách 17 files:

```
✓ admin-dashboard.png
✓ user-management.png
✓ system-settings.png
✓ lecturer-dashboard.png
✓ create-project-manual.png
✓ ai-milestone-generation.png
✓ student-dashboard.png
✓ browse-projects.png
✓ team-chat.png
✓ video-call.png
✓ submit-checkpoint.png
✓ evaluation-form.png
✓ view-grade-feedback.png
✓ team-progress.png
✓ peer-review-aggregated.png
✓ create-team.png
✓ peer-review-form.png
```

---

## 🧪 Test Coverage

### Phase 1: Admin (3 tests)
- [x] Admin dashboard overview
- [x] User management table
- [x] System settings/configuration

### Phase 2: Lecturer (4 tests)
- [x] Lecturer dashboard
- [x] Create project manually with milestones
- [x] AI milestone generation (UI test)
- [x] Submit projects for approval

### Phase 3: Head (1 test)
- [x] Approve projects workflow

### Phase 4: Students (3 tests)
- [x] Student dashboard
- [x] Browse available projects
- [x] Create team and pick project

### Phase 5: Collaboration (3 tests)
- [x] Team chat interface
- [x] Video call / meetings
- [x] Team progress tracking (lecturer view)

### Phase 6: Checkpoints & Grading (3 tests)
- [x] Submit checkpoint with deliverables
- [x] Lecturer grade checkpoint
- [x] Student view grade and feedback

### Phase 7: Peer Review (2 tests)
- [x] Student submit peer review
- [x] Lecturer view aggregated results

**Total: 19 test cases covering all major features**

---

## 🔧 Troubleshooting

### ❌ Error: "Python not found"

**Solution**:
```powershell
# Install Python
winget install Python.Python.3.11

# Or download from python.org
```

### ❌ Error: "Docker not running"

**Solution**:
```powershell
# Start Docker Desktop
# Wait until all 4 containers are UP

docker compose up -d
docker compose ps
```

### ❌ Error: "ChromeDriver version mismatch"

**Solution**:
```powershell
# webdriver-manager sẽ tự động download đúng version
# Nếu vẫn lỗi, update Chrome:
# Settings → About Chrome → Update
```

### ❌ Error: "Element not found"

**Cause**: UI đã thay đổi, selectors outdated

**Solution**:
1. Check `automation_test.py` line number trong error
2. Update CSS selector hoặc XPath
3. Test lại trên browser manual trước

### ❌ Error: "Screenshot directory permission denied"

**Solution**:
```powershell
# Run PowerShell as Administrator
# Or change SCREENSHOT_DIR in config.py
```

### ⚠️ Warning: "Some screenshots missing"

**Causes**:
- Feature chưa triển khai (AI, Video)
- UI elements not found
- Test failed mid-way

**Solution**:
- Review automation log
- Manually capture missing screenshots
- Update config.py selectors

---

## 📝 Customization

### Thay đổi test data

Edit `config.py`:

```python
PROJECT_1 = {
    "title": "Your Project Title",
    "description": "...",
    # ...
}

CHAT_MESSAGES = [
    "Your message 1",
    "Your message 2"
]
```

### Thay đổi screenshot location

Edit `config.py`:

```python
SCREENSHOT_DIR = r"D:\Your\Custom\Path"
```

### Thay đổi timing

Edit `config.py`:

```python
WAIT_SHORT = 2      # Faster
WAIT_MEDIUM = 5     # Default
WAIT_LONG = 10      # Slower
```

### Chạy chế độ headless (background)

```python
automation = CollabSphereAutomation(headless=True)
```

---

## 🎨 Screenshot Quality

### Specifications:

- **Resolution**: 1920x1080 (Full HD)
- **Format**: PNG (lossless)
- **Size**: < 500KB (automatically optimized)
- **Naming**: Lowercase with hyphens (e.g., `lecturer-dashboard.png`)

### Tips for better screenshots:

1. **Zoom level**: Browser tự động set 100%
2. **Window size**: Maximized to 1920x1080
3. **Scroll position**: Auto scroll to top before capture
4. **Timing**: 1 second delay cho UI settle

---

## 🔄 Re-running Tests

### Chạy lại toàn bộ:

```powershell
.\run_automation.ps1
```

### Chạy lại specific phase:

Edit `automation_test.py`:

```python
def run_all_tests(self):
    # Comment out phases you don't want
    # self.test_admin_dashboard()  # Skip admin
    self.test_lecturer_dashboard()  # Only lecturer
```

### Chụp lại một screenshot:

```python
automation = CollabSphereAutomation()
automation.login("lecturer")
# Navigate to page...
automation.take_screenshot("lecturer-dashboard.png", "Description")
```

---

## 📊 Output Example

```
========================================
COLLABSPHERE AUTOMATION TESTING
Starting automated test & screenshot capture...
========================================

============================================================
PHASE 1: ADMIN SETUP
============================================================

🔐 Logging in as ADMIN (admin)...
✅ Logged in as admin

📸 Screenshot: admin-dashboard.png
   → Admin dashboard overview

📋 User Management...
📸 Screenshot: user-management.png
   → User management table

⚙️  System Settings...
📸 Screenshot: system-settings.png
   → System configuration

============================================================
PHASE 2: LECTURER - CREATE PROJECTS
============================================================

🚪 Logging out...
✅ Logged out

🔐 Logging in as LECTURER (lecturer)...
✅ Logged in as lecturer

📸 Screenshot: lecturer-dashboard.png
   → Lecturer dashboard with stats

📝 Creating Project 1 (Manual)...
📸 Screenshot: create-project-manual.png
   → Project form filled (before submit)
✅ Project 1 saved as draft

✨ Testing AI Milestone Generation...
📸 Screenshot: ai-milestone-generation.png
   → AI button before click

...

============================================================
VERIFICATION
============================================================

📊 SCREENSHOT PROGRESS:
✅ Completed: 17/17
❌ Missing: 0/17

✅ Captured:
   ✓ lecturer-dashboard.png
   ✓ student-dashboard.png
   ✓ create-project-manual.png
   ...

📈 Completion: 100.0%

🎉 ALL SCREENSHOTS COMPLETE!
Ready for documentation!

============================================================
TEST SUMMARY
============================================================
⏱️  Total time: 472.3 seconds
📸 Screenshots: 17/17 completed
📁 Location: C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots

🎉 SUCCESS! All tests passed and screenshots captured!
```

---

## 🎓 Next Steps

Sau khi automation complete:

1. ✅ **Verify screenshots**:
   ```powershell
   cd C:\Users\LENOVO\Desktop\SE\MainDocument\Images\Screenshots
   dir *.png
   ```

2. ✅ **Update documentation**:
   - Open `DANH_SÁCH_SCREENSHOTS.md`
   - Change ❌ to ✅ for captured screenshots

3. ✅ **Insert into User Guides**:
   - Section VI: User Guides
   - Add `![Description](Images/Screenshots/filename.png)`

4. ✅ **Generate PDF**:
   - Combine all sections
   - Include all 17 screenshots
   - Export final documentation

---

## 📞 Support

Nếu gặp vấn đề:

1. Check troubleshooting section above
2. Review automation logs
3. Test manually trước với browser
4. Check Docker logs: `docker compose logs backend`
5. Check browser console (F12) for errors

---

## 🔐 Security Note

**Test accounts used**:
- admin/admin123
- lecturer/lecturer123
- head/head123
- student/student123

⚠️ **CHỈ SỬ DỤNG CHO TEST!** Không dùng passwords này cho production.

---

## 📈 Performance

**Minimum Requirements**:
- RAM: 4GB (8GB recommended)
- CPU: 2 cores
- Disk: 5GB free space
- Network: Localhost only

**Optimizations**:
- Headless mode: 20% faster
- Parallel tests: Not recommended (race conditions)
- Skip delays: May cause missed elements

---

**Created**: 26/01/2026  
**Version**: 1.0.0  
**License**: MIT  
**Author**: CollabSphere Team

---

🚀 **Ready to automate? Run `.\run_automation.ps1` now!** 🎉
