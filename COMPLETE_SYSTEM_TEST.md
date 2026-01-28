# COMPLETE SYSTEM TEST - COLLABSPHERE
**Date:** January 28, 2026  
**Tester:** QA Team  
**Environment:** Development (localhost:3000)

---

## TEST SCENARIO: Complete Academic Project Lifecycle
**Mục tiêu:** Test toàn bộ quy trình từ tạo môn học → phân công đề tài → sinh viên làm việc → đánh giá

---

## PHASE 1: ADMIN - System Setup & User Management

### Test Case 1.1: Admin Login & Dashboard
**Role:** Admin  
**Credentials:** `admin / admin123`

**Steps:**
1. ✅ Navigate to `http://localhost:3000`
2. ✅ Login with admin credentials
3. ✅ Verify Dashboard displays:
   - User statistics
   - System overview
   - Navigation menu

**Expected Results:**
- Login successful
- Dashboard shows admin-specific features
- All navigation items visible

---

### Test Case 1.2: View All Users
**Role:** Admin

**Steps:**
1. ✅ Click "Danh sách người dùng" (if exists) or navigate via menu
2. ✅ Verify user list displays all roles:
   - Admin
   - Staff
   - HEAD (Department Head)
   - Lecturer
   - Student
3. ✅ Check filter by role works
4. ✅ Check search function works

**Expected Results:**
- All users displayed
- Filters work correctly
- Can see user details

---

### Test Case 1.3: Settings - All Features
**Role:** Admin

**Steps:**
1. ✅ Navigate to Settings page
2. ✅ **Profile Tab:**
   - Upload avatar
   - Update phone: `0901234567`
   - Click "Lưu thay đổi"
   - Verify avatar displays
   - Verify phone shows in helper text
3. ✅ **Password Tab:**
   - Enter current password: `admin123`
   - Enter new password: `admin456`
   - Confirm new password: `admin456`
   - Click "Đổi mật khẩu"
   - Logout and login with new password
   - Change back to `admin123`
4. ✅ **Notifications Tab:**
   - Toggle each notification setting
   - Click "Lưu cài đặt"
   - Verify success message
5. ✅ **Interface Tab:**
   - Change theme to "Tối" (Dark)
   - Verify dark theme applies
   - Change language to "English"
   - Verify all text changes to English
   - Change back to "Tiếng Việt"
   - Click "Lưu cài đặt"
6. ✅ Refresh page
7. ✅ Verify all settings persisted

**Expected Results:**
- Avatar upload works
- Phone number updates
- Password change works
- Notifications save
- Theme changes apply immediately
- Language switches work
- Settings persist after refresh

---

## PHASE 2: STAFF - Create Academic Structure

### Test Case 2.1: Staff Login
**Role:** Staff  
**Credentials:** `staff1 / password123`

**Steps:**
1. ✅ Logout from admin
2. ✅ Login as staff1
3. ✅ Verify staff dashboard

**Expected Results:**
- Login successful
- Staff-specific menu visible

---

### Test Case 2.2: Create Subject
**Role:** Staff

**Steps:**
1. ✅ Navigate to "Danh sách môn học" or Subjects
2. ✅ Click "Tạo môn học mới" / "Create Subject"
3. ✅ Fill in:
   - Subject Code: `SE123`
   - Subject Name: `Software Engineering Project`
   - Credits: `3`
   - Description: `Project-based learning for SE`
4. ✅ Click Save
5. ✅ Verify subject appears in list

**Expected Results:**
- Subject created successfully
- Appears in subject list

---

### Test Case 2.3: Create Class
**Role:** Staff

**Steps:**
1. ✅ Navigate to "Danh sách lớp học" / Classes
2. ✅ Click "Tạo lớp học mới" / "Create Class"
3. ✅ Fill in:
   - Class Code: `SE123.01`
   - Class Name: `SE Project Class 1`
   - Subject: Select `SE123`
   - Semester: `2026.1`
   - Start Date: `2026-02-01`
   - End Date: `2026-06-30`
4. ✅ Click Save
5. ✅ Verify class created

**Expected Results:**
- Class created successfully
- Linked to subject SE123

---

### Test Case 2.4: Add Students to Class
**Role:** Staff

**Steps:**
1. ✅ Open class SE123.01
2. ✅ Click "Thêm sinh viên" / "Add Students"
3. ✅ Select students:
   - student1
   - student2
   - student3
   - student4
   - student5
4. ✅ Click Add
5. ✅ Verify students added to class

**Expected Results:**
- Students enrolled in class
- Class member list updates

---

### Test Case 2.5: Settings Test (Staff)
**Role:** Staff

**Steps:**
1. ✅ Navigate to Settings
2. ✅ Test all 4 tabs (Profile, Password, Notifications, Interface)
3. ✅ Verify all features work
4. ✅ Test language switch to English
5. ✅ Verify Settings page in English

**Expected Results:**
- All settings features work for Staff role
- Language switch works

---

## PHASE 3: HEAD - Project Assignment

### Test Case 3.1: HEAD Login
**Role:** HEAD (Department Head)  
**Credentials:** `head1 / password123`

**Steps:**
1. ✅ Logout from staff
2. ✅ Login as head1
3. ✅ Verify HEAD dashboard

**Expected Results:**
- Login successful
- HEAD-specific features visible

---

### Test Case 3.2: Create Project
**Role:** HEAD

**Steps:**
1. ✅ Navigate to "Duyệt đề tài" / Browse Projects
2. ✅ Click "Tạo dự án mới" / "Create Project"
3. ✅ Fill in:
   - Project Code: `PRJ001`
   - Project Name: `E-Learning Platform`
   - Description: `Build an online learning platform`
   - Max Groups: `2`
   - Status: `Available`
4. ✅ Click Save
5. ✅ Verify project created

**Expected Results:**
- Project created successfully
- Appears in project list

---

### Test Case 3.3: Assign Project to Class
**Role:** HEAD

**Steps:**
1. ✅ Navigate to "Phân công đề tài" / Project Assignment
2. ✅ Select project: `PRJ001 - E-Learning Platform`
3. ✅ Select class: `SE123.01`
4. ✅ Click "Chỉ định" / "Assign"
5. ✅ Verify assignment successful
6. ✅ Check project shows assigned_class_count = 1

**Expected Results:**
- Project assigned to class
- Students can see project
- Assignment count updates

---

### Test Case 3.4: Settings Test (HEAD)
**Role:** HEAD

**Steps:**
1. ✅ Navigate to Settings
2. ✅ Upload avatar
3. ✅ Update phone: `0909876543`
4. ✅ Change theme to Dark
5. ✅ Change language to English
6. ✅ Save and verify all changes

**Expected Results:**
- All settings features work for HEAD role
- Theme and language apply

---

## PHASE 4: LECTURER - Monitor & Guidance

### Test Case 4.1: Lecturer Login
**Role:** Lecturer  
**Credentials:** `lecturer1 / password123`

**Steps:**
1. ✅ Logout from HEAD
2. ✅ Login as lecturer1
3. ✅ Verify lecturer dashboard

**Expected Results:**
- Login successful
- Lecturer features accessible

---

### Test Case 4.2: View Assigned Classes
**Role:** Lecturer

**Steps:**
1. ✅ Navigate to Classes
2. ✅ View classes assigned to lecturer
3. ✅ Open class SE123.01
4. ✅ View student list
5. ✅ View assigned projects

**Expected Results:**
- Can see assigned classes
- Can view class details
- Can see students and projects

---

### Test Case 4.3: Settings Test (Lecturer)
**Role:** Lecturer

**Steps:**
1. ✅ Navigate to Settings
2. ✅ Test all 4 tabs
3. ✅ Verify all features work
4. ✅ Update profile info
5. ✅ Change notification settings

**Expected Results:**
- All settings features work for Lecturer role

---

## PHASE 5: STUDENT - Complete Project Workflow

### Test Case 5.1: Student Login
**Role:** Student  
**Credentials:** `student1 / password123`

**Steps:**
1. ✅ Logout from lecturer
2. ✅ Login as student1
3. ✅ Verify student dashboard

**Expected Results:**
- Login successful
- Student-specific features visible

---

### Test Case 5.2: View Available Projects
**Role:** Student

**Steps:**
1. ✅ Navigate to "Duyệt đề tài" / Browse Projects
2. ✅ View list of available projects
3. ✅ Verify PRJ001 appears
4. ✅ Click to view project details

**Expected Results:**
- Can see projects assigned to class
- Project details visible

---

### Test Case 5.3: Create Group
**Role:** Student

**Steps:**
1. ✅ Navigate to Groups or Project page
2. ✅ Click "Tạo nhóm" / "Create Group"
3. ✅ Fill in:
   - Group Name: `Team Alpha`
   - Description: `E-Learning Platform Development`
   - Project: Select `PRJ001`
4. ✅ Invite members:
   - student2
   - student3
5. ✅ Click Create
6. ✅ Verify group created

**Expected Results:**
- Group created successfully
- Members invited
- Linked to project

---

### Test Case 5.4: Task Management (Student)
**Role:** Student

**Steps:**
1. ✅ Open group "Team Alpha"
2. ✅ Navigate to Tasks / Kanban board
3. ✅ **Create Task:**
   - Click "Tạo công việc mới" / "New Task"
   - Title: `Design Database Schema`
   - Description: `Create ERD for the system`
   - Status: `Todo`
   - Assigned to: student1
   - Due date: `2026-02-15`
   - Click Save
4. ✅ **Move Task:**
   - Drag task to "In Progress"
   - Verify status changes
5. ✅ **Update Task:**
   - Click task to edit
   - Change status to "Done"
   - Add comment: `Database schema completed`
   - Save
6. ✅ **Create More Tasks:**
   - Task 2: `Develop Backend API` (student2, Todo)
   - Task 3: `Design UI/UX` (student3, Todo)

**Expected Results:**
- Can create tasks
- Drag & drop works
- Task updates successfully
- Tasks appear in board
- Status changes reflect

---

### Test Case 5.5: File Upload & Resources
**Role:** Student

**Steps:**
1. ✅ Navigate to Resources / Files
2. ✅ Click "Upload File"
3. ✅ Select file (PDF, DOCX, or image)
4. ✅ Add description
5. ✅ Upload
6. ✅ Verify file appears
7. ✅ Download file
8. ✅ Verify download works

**Expected Results:**
- File upload successful
- File visible in list
- Download works

---

### Test Case 5.6: Chat / Communication
**Role:** Student

**Steps:**
1. ✅ Navigate to Chat / Messages
2. ✅ Open group chat
3. ✅ Send message: `Hello team!`
4. ✅ Verify message appears
5. ✅ Send another message with emoji
6. ✅ Check real-time updates

**Expected Results:**
- Can send messages
- Messages appear in chat
- Real-time communication works

---

### Test Case 5.7: Notifications
**Role:** Student

**Steps:**
1. ✅ Check notification bell icon
2. ✅ Verify notifications for:
   - Task assignments
   - Group invitations
   - Messages
3. ✅ Click notification
4. ✅ Verify navigation to relevant page

**Expected Results:**
- Notifications display
- Click navigation works
- Notification count updates

---

### Test Case 5.8: Search & Filter (Phase 1 Feature 5)
**Role:** Student

**Steps:**
1. ✅ Navigate to Tasks or Projects
2. ✅ Use search bar: Search for "Database"
3. ✅ Verify search results
4. ✅ **Apply Filters:**
   - Filter by status: Todo
   - Filter by assigned: student1
   - Filter by date range: 2026-02-01 to 2026-02-28
5. ✅ Click "Apply Filters"
6. ✅ Verify filtered results
7. ✅ Clear filters
8. ✅ Verify all items return

**Expected Results:**
- Search works
- Filters apply correctly
- Results update in real-time
- Clear filters works

---

### Test Case 5.9: Settings Test (Student)
**Role:** Student

**Steps:**
1. ✅ Navigate to Settings
2. ✅ **Profile Tab:**
   - Upload new avatar
   - Update phone: `0912345678`
   - Update full name
   - Save
3. ✅ **Password Tab:**
   - Change password
   - Verify works
4. ✅ **Notifications Tab:**
   - Enable all notifications
   - Save
5. ✅ **Interface Tab:**
   - Change theme to "Tự động" (Auto)
   - Change language to "English"
   - Save
6. ✅ **Verify in English:**
   - Check all tabs are in English
   - Navigate to Dashboard - should be "Dashboard" not "Trang chủ"
   - Check task board - "Todo" not "Cần làm"
7. ✅ Change back to Vietnamese
8. ✅ Refresh page
9. ✅ Verify all settings persisted

**Expected Results:**
- All settings work for Student
- Avatar uploads and displays
- Phone number updates
- Password change works
- Theme switches immediately
- Language changes entire Settings page
- Settings persist after refresh

---

## PHASE 6: MULTI-ROLE INTERACTION TEST

### Test Case 6.1: Student 2 Interaction
**Role:** Student (student2)  
**Credentials:** `student2 / password123`

**Steps:**
1. ✅ Login as student2
2. ✅ Accept group invitation to "Team Alpha"
3. ✅ View tasks assigned to student2
4. ✅ Update task "Develop Backend API" to "In Progress"
5. ✅ Send message in group chat
6. ✅ Check notifications

**Expected Results:**
- Can join group
- Can see and update assigned tasks
- Chat messages sync
- Notifications work

---

### Test Case 6.2: Lecturer Monitoring
**Role:** Lecturer (lecturer1)

**Steps:**
1. ✅ Login as lecturer1
2. ✅ Navigate to class SE123.01
3. ✅ View groups:
   - Team Alpha
4. ✅ View group progress:
   - Tasks completed
   - Members active
5. ✅ View project assignment status

**Expected Results:**
- Can monitor all groups
- Can see task progress
- Can view student activities

---

### Test Case 6.3: HEAD Review Progress
**Role:** HEAD (head1)

**Steps:**
1. ✅ Login as head1
2. ✅ View project PRJ001 assignments
3. ✅ Check which classes have the project
4. ✅ View group count per project
5. ✅ Check overall project status

**Expected Results:**
- Can see project assignments
- assigned_class_count accurate
- Can monitor overall progress

---

### Test Case 6.4: Admin View All Activities
**Role:** Admin

**Steps:**
1. ✅ Login as admin
2. ✅ View statistics:
   - Total users
   - Active projects
   - Classes
   - Groups
3. ✅ View recent activities
4. ✅ Check system health

**Expected Results:**
- Dashboard shows accurate statistics
- Can see all system activities
- System running smoothly

---

## PHASE 7: EVALUATION & COMPLETION

### Test Case 7.1: Peer Review
**Role:** Student (student1)

**Steps:**
1. ✅ Login as student1
2. ✅ Navigate to Evaluations
3. ✅ Submit peer review for student2:
   - Rating: 4.5/5
   - Comment: "Good teamwork"
4. ✅ Submit peer review for student3
5. ✅ Save reviews

**Expected Results:**
- Can submit peer reviews
- Reviews saved
- Can view own reviews

---

### Test Case 7.2: Lecturer Evaluation
**Role:** Lecturer (lecturer1)

**Steps:**
1. ✅ Login as lecturer1
2. ✅ Navigate to Evaluations
3. ✅ Evaluate group "Team Alpha":
   - Score: 85/100
   - Feedback: "Good progress, needs improvement in documentation"
4. ✅ Save evaluation

**Expected Results:**
- Can evaluate groups
- Evaluation saved
- Students can view feedback

---

## PHASE 8: CROSS-CUTTING FEATURES

### Test Case 8.1: Theme Persistence Across Roles
**Steps:**
1. ✅ Login as student1
2. ✅ Change theme to Dark
3. ✅ Logout
4. ✅ Login as lecturer1
5. ✅ Verify lecturer sees default theme (not student's dark theme)
6. ✅ Each user has independent theme setting

**Expected Results:**
- Theme settings are per-user
- No cross-contamination

---

### Test Case 8.2: Language Switch Impact
**Steps:**
1. ✅ Login as any user
2. ✅ Change language to English
3. ✅ Navigate through pages:
   - Dashboard → Settings → Projects → Tasks
4. ✅ Verify Settings page is in English
5. ✅ Note: Other pages may still be in Vietnamese (only Settings translated)

**Expected Results:**
- Settings page fully in English
- Language setting persists

---

### Test Case 8.3: Notification System
**Steps:**
1. ✅ Login as student1
2. ✅ Create a task assigned to student2
3. ✅ Logout, login as student2
4. ✅ Check notification bell
5. ✅ Verify notification for new task
6. ✅ Click notification
7. ✅ Verify navigates to task

**Expected Results:**
- Notifications created for actions
- Real-time or on refresh
- Navigation works

---

## CRITICAL BUG CHECK

### Bug Check 1: Avatar Upload
**All Roles: Admin, Staff, HEAD, Lecturer, Student**

**Steps:**
1. ✅ Login as each role
2. ✅ Go to Settings → Profile
3. ✅ Upload avatar (JPG/PNG)
4. ✅ Save
5. ✅ Verify avatar displays immediately
6. ✅ Refresh page
7. ✅ Verify avatar persists

**Expected:** Avatar uploads and displays for all roles

---

### Bug Check 2: Phone Number Update
**All Roles**

**Steps:**
1. ✅ Update phone in Settings
2. ✅ Save
3. ✅ Verify helper text shows: "Số điện thoại hiện tại: <number>"
4. ✅ Refresh
5. ✅ Verify phone persisted

**Expected:** Phone updates and displays in helper text

---

### Bug Check 3: Settings Persistence
**All Roles**

**Steps:**
1. ✅ Change all settings:
   - Avatar, Phone, Theme, Language, Notifications
2. ✅ Save all
3. ✅ Logout
4. ✅ Login again
5. ✅ Go to Settings
6. ✅ Verify all settings restored

**Expected:** All settings persist across sessions

---

## PERFORMANCE TEST

### Performance Check 1: Page Load Times
**Steps:**
1. ✅ Open browser DevTools (F12)
2. ✅ Navigate to Network tab
3. ✅ Test page load times:
   - Dashboard: < 2s
   - Settings: < 1s
   - Task Board: < 3s
   - Project List: < 2s

**Expected:** Acceptable load times

---

### Performance Check 2: API Response Times
**Steps:**
1. ✅ Check Network tab for API calls
2. ✅ Verify response times:
   - GET /users/me: < 500ms
   - GET /users/settings: < 500ms
   - PUT /users/me: < 1s
   - GET /projects: < 1s

**Expected:** Fast API responses

---

## TEST SUMMARY REPORT

### Test Results Summary

| Phase | Test Cases | Passed | Failed | Blocked | Pass Rate |
|-------|-----------|--------|--------|---------|-----------|
| Phase 1: Admin | 3 | ? | ? | ? | ?% |
| Phase 2: Staff | 5 | ? | ? | ? | ?% |
| Phase 3: HEAD | 4 | ? | ? | ? | ?% |
| Phase 4: Lecturer | 3 | ? | ? | ? | ?% |
| Phase 5: Student | 9 | ? | ? | ? | ?% |
| Phase 6: Multi-Role | 4 | ? | ? | ? | ?% |
| Phase 7: Evaluation | 2 | ? | ? | ? | ?% |
| Phase 8: Cross-Cutting | 3 | ? | ? | ? | ?% |
| Bug Checks | 3 | ? | ? | ? | ?% |
| **TOTAL** | **36** | **?** | **?** | **?** | **?%** |

---

### Critical Issues Found
*To be filled during testing*

1. ❌ **Issue 1:** [Description]
   - **Severity:** High/Medium/Low
   - **Steps to Reproduce:**
   - **Expected vs Actual:**
   - **Screenshot:** [if applicable]

2. ❌ **Issue 2:** [Description]
   ...

---

### Non-Critical Issues Found
*To be filled during testing*

1. ⚠️ **Issue 1:** [Description]
   - **Severity:** Low
   - **Impact:** Minor UI/UX
   ...

---

### Features Working Correctly
*To be filled during testing*

✅ **Working Features:**
- [ ] User authentication (all roles)
- [ ] Settings page (all 4 tabs)
- [ ] Avatar upload
- [ ] Theme switching
- [ ] Language switching (Settings page)
- [ ] Task management
- [ ] Group creation
- [ ] Project assignment
- [ ] File upload
- [ ] Chat/messaging
- [ ] Notifications
- [ ] Search & Filter
- [ ] Peer reviews
- [ ] Evaluations

---

## RECOMMENDATIONS

### Immediate Fixes Required
*Based on test results*

1. [ ] Fix critical bugs from Critical Issues section
2. [ ] Implement missing features if any
3. [ ] Improve error handling
4. [ ] Add loading indicators

### Nice to Have
1. [ ] Translate more pages to English
2. [ ] Add more theme options
3. [ ] Improve mobile responsiveness
4. [ ] Add bulk actions
5. [ ] Export functionality

---

## TESTING NOTES

### Browser Compatibility
- ✅ Chrome/Edge (Primary)
- ⚠️ Firefox (To test)
- ⚠️ Safari (To test)

### Screen Resolutions
- ✅ Desktop (1920x1080)
- ⚠️ Laptop (1366x768)
- ⚠️ Tablet (768x1024)
- ⚠️ Mobile (375x667)

### Network Conditions
- ✅ Fast (localhost)
- ⚠️ Slow (To simulate)

---

## CONCLUSION

**Overall System Status:** 
- ⏳ Testing in Progress
- ✅ Ready for Production (after all tests pass)
- ❌ Needs Fixes (if critical issues found)

**Tester Sign-off:**
- Name: _________________
- Date: _________________
- Signature: _________________

**Project Manager Approval:**
- Name: _________________
- Date: _________________
- Signature: _________________

---

## APPENDIX: Test Data

### User Accounts
| Username | Password | Role | Purpose |
|----------|----------|------|---------|
| admin | admin123 | Admin | System administration |
| staff1 | password123 | Staff | Create subjects/classes |
| head1 | password123 | HEAD | Project assignment |
| lecturer1 | password123 | Lecturer | Monitor students |
| student1 | password123 | Student | Primary tester |
| student2 | password123 | Student | Team member |
| student3 | password123 | Student | Team member |

### Test Data Created
- Subject: SE123 - Software Engineering Project
- Class: SE123.01 - SE Project Class 1
- Project: PRJ001 - E-Learning Platform
- Group: Team Alpha
- Tasks: 3+ tasks created

---

**END OF TEST DOCUMENT**
