# Testing Workflows Guide - CollabSphere

## Mục Đích
Hướng dẫn test các workflow chính giữa các roles để đảm bảo hệ thống hoạt động tốt.

---

## Chuẩn Bị

### 1. Đảm Bảo Backend và Frontend Đang Chạy

**Backend:**
```bash
cd collabsphere/backend
# Should be running on http://localhost:8001
```

**Frontend:**
```bash
cd collabsphere/frontend
# Should be running on http://localhost:3000
```

### 2. Kiểm Tra Test Accounts

Đã có sẵn các tài khoản test trong database:
- **Admin:** admin / admin123
- **Staff:** staff / staff123
- **Head:** head / head123
- **Lecturer:** lecturer / lecturer123
- **Student:** student / student123

Nếu chưa có, chạy:
```bash
cd collabsphere/backend
python create_test_accounts.py
```

---

## Workflow 1: Project Lifecycle (Lecturer → Head → Students)

### Objective
Test quy trình từ tạo đề tài → duyệt → gán lớp

### Steps

#### Step 1: Lecturer Tạo Đề Tài
1. Login as **lecturer / lecturer123**
2. Navigate to **Đề tài > Tạo đề tài mới**
3. Fill form:
   - Tên: "Hệ thống quản lý thư viện số"
   - Mô tả: "Xây dựng web app quản lý mượn/trả sách"
   - Click "Tạo bằng AI" để tự động tạo milestones (hoặc thêm thủ công)
4. Click **Gửi đề tài**

**✅ Expected:**
- Toast success: "Đề tài đã được gửi"
- Redirect to project list
- Status: "Chờ duyệt"

**❌ Errors to Check:**
- If API fails → Toast error (NO mock data)
- If milestones < 3 → Validation error

---

#### Step 2: Head Duyệt Đề Tài
1. Logout, login as **head / head123**
2. Dashboard should show "1 đề tài chờ duyệt"
3. Navigate to **Duyệt đề tài**
4. Find "Hệ thống quản lý thư viện số"
5. Click **Xem chi tiết**
6. Review milestones
7. Click **Duyệt** (or **Từ chối** if testing rejection)

**✅ Expected:**
- Toast success: "Đề tài đã được duyệt"
- Project status changes to "Đã duyệt"
- Dashboard count decrements

**❌ Errors to Check:**
- If already approved → Error: "Đề tài đã được duyệt"
- If API fails → Toast error (NO mock data)

---

#### Step 3: Head Gán Đề Tài Cho Lớp
1. Navigate to **Quản lý lớp học**
2. Click on a class (e.g., "CS101-01")
3. Tab **Đề tài**
4. Click **+ Gán đề tài**
5. Select "Hệ thống quản lý thư viện số"
6. Click **Gán**

**✅ Expected:**
- Toast success: "Đề tài đã được gán cho lớp"
- Project appears in class's project list
- Students in class can now see this project

**❌ Errors to Check:**
- If project already assigned → Error message
- If class not found → Error

---

#### Step 4: Student Xem Đề Tài
1. Logout, login as **student / student123**
2. Navigate to **Nhóm > Danh sách nhóm**
3. Click **+ Tạo nhóm mới**
4. Fill form, click **Chọn đề tài**
5. Should see "Hệ thống quản lý thư viện số" in available projects

**✅ Expected:**
- Project list shows all assigned projects for student's class
- Can select project when creating group

**❌ Errors to Check:**
- If no projects → "Chưa có đề tài nào"
- If API fails → Toast error

---

## Workflow 2: Group Management (Lecturer → Students)

### Objective
Test quy trình tạo nhóm, thêm thành viên, phân công việc

### Steps

#### Step 1: Lecturer Tạo Nhóm
1. Login as **lecturer / lecturer123**
2. Navigate to **Lớp học**
3. Click on a class
4. Tab **Nhóm**
5. Click **+ Tạo nhóm**
6. Fill form:
   - Tên nhóm: "Nhóm 1 - Team Alpha"
   - Chọn đề tài: "Hệ thống quản lý thư viện số"
   - Chọn leader: Select a student
7. Click **Tạo nhóm**

**✅ Expected:**
- Toast success: "Nhóm đã được tạo"
- Group appears in class group list
- Leader can see group in their group list

**❌ Errors to Check:**
- If project already picked → Error
- If student not in class → Error

---

#### Step 2: Lecturer Thêm Thành Viên
1. Click on the group
2. Tab **Thành viên**
3. Click **+ Thêm thành viên**
4. Select students from class
5. Click **Thêm**

**✅ Expected:**
- Members added to group
- Members can see group in their group list

**❌ Errors to Check:**
- If member already in group → Error
- If member not in class → Error

---

#### Step 3: Student Leader Tạo Tasks
1. Login as **student (group leader)**
2. Navigate to **Nhóm > My Groups**
3. Click on "Nhóm 1 - Team Alpha"
4. Tab **Công việc**
5. Click **+ Tạo task**
6. Fill form:
   - Tên: "Thiết kế database schema"
   - Mô tả: "Tạo ERD và SQL schema"
   - Assignee: Select member
   - Status: "Todo"
7. Click **Tạo**

**✅ Expected:**
- Task appears in task list
- Assigned member can see task
- Can update status (todo → in_progress → completed)

**❌ Errors to Check:**
- Only leader can create tasks
- If member not in group → Error

---

#### Step 4: Member Update Task Status
1. Login as assigned member
2. Navigate to group
3. Tab **Công việc**
4. Find assigned task
5. Click **Cập nhật trạng thái**
6. Change to "In Progress"

**✅ Expected:**
- Status updates immediately
- Progress bar updates

**❌ Errors to Check:**
- If not assigned → Cannot update
- If API fails → Toast error

---

## Workflow 3: Resource Sharing

### Objective
Test upload/download tài liệu

### Steps

#### Step 1: Lecturer Upload Class Resources
1. Login as **lecturer**
2. Navigate to class
3. Tab **Tài liệu**
4. Click **+ Tải lên**
5. Fill form:
   - Tên: "Bài giảng tuần 1.pdf"
   - URL: "https://example.com/lecture1.pdf"
   - Type: "document"
6. Click **Upload**

**✅ Expected:**
- File appears in class resource list
- All students in class can see it

**❌ Errors to Check:**
- If URL empty → Validation error
- If not lecturer of class → Permission error

---

#### Step 2: Student View Class Resources
1. Login as **student** in that class
2. Navigate to **Tài liệu**
3. Select group (should show class resources)

**✅ Expected:**
- Can see "Bài giảng tuần 1.pdf"
- Can click to download (opens URL)

**❌ Errors to Check:**
- If student not in class → Cannot see resources

---

#### Step 3: Student Upload Group Resources
1. In same page, switch to group resources tab
2. Click **+ Tải lên**
3. Fill form:
   - Tên: "Báo cáo tiến độ.docx"
   - URL: "https://example.com/report.docx"
4. Click **Upload**

**✅ Expected:**
- File appears in group resource list
- All group members can see it

**❌ Errors to Check:**
- If not in group → Permission error
- If API fails → Toast error

---

## Workflow 4: Chat Communication

### Objective
Test group chat functionality

### Steps

#### Step 1: Student Send Message
1. Login as **student** (group member)
2. Navigate to **Trò chuyện**
3. Click on group "Nhóm 1 - Team Alpha"
4. Type message: "Chào mọi người!"
5. Press Enter or click Send

**✅ Expected:**
- Message appears immediately in chat
- Shows sender name and timestamp
- Auto-scrolls to bottom

**❌ Errors to Check:**
- If not in group → Cannot send
- If empty message → Validation error
- If API fails → Toast error (message not sent)

---

#### Step 2: Another Member Reply
1. Login as another group member
2. Navigate to chat
3. Click same group
4. Type reply: "Hi, sẵn sàng làm việc!"
5. Send

**✅ Expected:**
- Can see previous messages
- New message appears
- Both members see all messages

**❌ Errors to Check:**
- If messages out of order → Check timestamp sorting
- If duplicate messages → Check message IDs

---

#### Step 3: Delete Message
1. Hover over your own message
2. Click **Delete** icon
3. Confirm

**✅ Expected:**
- Message deleted for all members
- Gap in conversation

**❌ Errors to Check:**
- Cannot delete others' messages
- If API fails → Toast error

---

## Workflow 5: Evaluation Process

### Objective
Test milestone submission and evaluation

### Steps

#### Step 1: Student Submit Checkpoint
1. Login as **student** (group member)
2. Navigate to group
3. Tab **Milestones**
4. Find a checkpoint
5. Click **Nộp bài**
6. Fill submission form
7. Click **Submit**

**✅ Expected:**
- Toast success: "Đã nộp bài"
- Checkpoint status → "Đã nộp"
- Lecturer can see submission

**❌ Errors to Check:**
- If already submitted → Error
- If not group member → Permission error

---

#### Step 2: Lecturer Evaluate
1. Login as **lecturer**
2. Navigate to **Đánh giá**
3. Find group "Nhóm 1 - Team Alpha"
4. Click **Đánh giá nhóm**
5. Fill evaluation form:
   - Score: 8.5
   - Comments: "Good work!"
6. Click **Gửi đánh giá**

**✅ Expected:**
- Toast success: "Đánh giá đã được lưu"
- Students can see score and feedback

**❌ Errors to Check:**
- If score out of range (0-10) → Validation error
- If not lecturer of class → Permission error

---

#### Step 3: Student View Evaluation
1. Login as **student**
2. Navigate to group
3. Tab **Đánh giá**
4. Should see score 8.5 and comments

**✅ Expected:**
- Score and feedback visible
- Can see evaluation history

**❌ Errors to Check:**
- If evaluation private → Cannot see yet

---

## Common Issues & Solutions

### Issue 1: "Không thể tải dữ liệu" Toast
**Cause:** Backend API failed or not running
**Solution:**
1. Check backend is running on port 8001
2. Check browser console for API errors
3. Check backend logs for exceptions

---

### Issue 2: Empty Lists (No Data)
**Cause:** Database empty or wrong filters
**Solution:**
1. Check if you're logged in as correct role
2. Check if data exists in database (use check_db.py)
3. Check if filters are too restrictive

---

### Issue 3: Permission Errors
**Cause:** User lacks permission for action
**Solution:**
1. Verify you're logged in as correct role
2. Verify you're member of group/class
3. Check backend authorization logic

---

### Issue 4: Compilation Errors
**Cause:** Frontend code has syntax errors
**Solution:**
1. Check browser console for errors
2. Check terminal running frontend for build errors
3. Run `npm install` if dependencies missing

---

## Success Criteria

### ✅ All Workflows Pass If:

1. **Project Lifecycle:**
   - Lecturer can create projects
   - Head can approve/reject
   - Head can assign to classes
   - Students can see assigned projects

2. **Group Management:**
   - Lecturer can create groups
   - Students can join groups
   - Leader can create tasks
   - Members can update task status

3. **Resource Sharing:**
   - Lecturer can upload class resources
   - Students can view class resources
   - Students can upload group resources
   - All members can access shared files

4. **Chat:**
   - Members can send messages
   - Messages appear in real-time
   - Can delete own messages
   - Message history persists

5. **Evaluation:**
   - Students can submit checkpoints
   - Lecturer can evaluate groups
   - Students can view evaluations
   - Scores and feedback persist

### ❌ Critical Issues:

- Any mock data appears when API fails
- Data doesn't persist after page reload
- Permission checks don't work
- Cross-role workflows broken

---

## Debugging Tips

### 1. Check Browser Console
```javascript
// Look for:
// - API errors (404, 500, 401)
// - JavaScript exceptions
// - Network failures
```

### 2. Check Backend Logs
```bash
cd collabsphere/backend
# Look for:
# - Exception tracebacks
# - SQL errors
# - Authorization failures
```

### 3. Check Database
```bash
python check_db.py
# Verify:
# - Tables exist
# - Test data exists
# - Relationships correct
```

### 4. Check API Directly
```bash
# Test with curl or Postman
curl -X GET http://localhost:8001/api/projects/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Reporting Issues

### When Reporting Bugs, Include:

1. **Steps to reproduce**
   - Exact steps taken
   - Which user role
   - What action triggered error

2. **Expected behavior**
   - What should happen

3. **Actual behavior**
   - What actually happened
   - Error messages (toast, console)

4. **Evidence**
   - Screenshots
   - Console errors
   - Backend logs

5. **Environment**
   - Browser (Chrome, Firefox, etc.)
   - OS (Windows, Mac, Linux)
   - Backend/Frontend versions

---

## Next Steps After Testing

### If All Tests Pass:
✅ System is production-ready
✅ Can deploy to staging/production
✅ Can proceed with user training

### If Some Tests Fail:
1. Document all failures
2. Prioritize by severity (critical → minor)
3. Fix backend issues first
4. Then fix frontend issues
5. Re-test after fixes

### Additional Testing:
- Performance testing (load testing)
- Security testing (penetration testing)
- Usability testing (with real users)
- Cross-browser testing
- Mobile responsiveness testing

---

## Conclusion

Sau khi hoàn thành tất cả workflows test ở trên, bạn sẽ:
- Xác nhận được hệ thống hoạt động đúng
- Phát hiện các bugs còn tồn tại
- Đảm bảo tích hợp giữa các roles hoạt động tốt
- Sẵn sàng cho production deployment

Happy Testing! 🚀
