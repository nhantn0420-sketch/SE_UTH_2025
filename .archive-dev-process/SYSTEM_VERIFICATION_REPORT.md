# 🔍 KIỂM TRA TOÀN DIỆN HỆ THỐNG COLLABSPHERE

**Ngày kiểm tra**: 26/01/2026  
**Trạng thái**: Backend & Frontend đang chạy  
**Mục đích**: Đảm bảo frontend-backend match và chức năng hoạt động đầy đủ

---

## 📊 TỔNG QUAN API ENDPOINTS

### Backend có **121 API endpoints** chia theo 12 routers:

| Router | Số endpoints | Frontend Service | Status |
|--------|--------------|------------------|--------|
| **auth.py** | 6 | authService.js | ✅ Match |
| **projects.py** | 15 | projectService.js | ⚠️ Cần kiểm tra |
| **groups.py** | 38 | groupService.js | ⚠️ Cần kiểm tra |
| **classes.py** | 10 | classService.js | ⚠️ Cần kiểm tra |
| **users.py** | 13 | userService.js | ⚠️ Cần kiểm tra |
| **subjects.py** | 10 | subjectService.js | ⚠️ Cần kiểm tra |
| **evaluations.py** | 9 | evaluationService.js | ⚠️ Cần kiểm tra |
| **chat.py** | 3 | chatService.js | ⚠️ Cần kiểm tra |
| **meetings.py** | 6 | meetingService.js | ⚠️ Cần kiểm tra |
| **notifications.py** | 6 | notificationService.js | ⚠️ Cần kiểm tra |
| **resources.py** | 6 | resourceService.js | ⚠️ Cần kiểm tra |
| **ai.py** | 4 | aiService.js | ⚠️ Cần kiểm tra |

---

## 🔴 VẤN ĐỀ ĐÃ PHÁT HIỆN

### 1. **MILESTONE API MISMATCH** ✅ ĐÃ SỬA
- **Backend**: Nhận form parameters
- **Frontend**: Gửi JSON body
- **Fix**: Đã thêm `MilestoneCreate` schema và sửa endpoint

### 2. **CẦN KIỂM TRA CHI TIẾT**

---

## 📋 DANH SÁCH API CẦN KIỂM TRA CHI TIẾT

### 🟢 AUTHENTICATION (6 endpoints)
- ✅ POST /auth/register
- ✅ POST /auth/login
- ✅ POST /auth/refresh
- ✅ GET /auth/me
- ✅ POST /auth/change-password
- ✅ POST /auth/logout

### 🟡 PROJECTS (15 endpoints)
- ✅ GET /projects/my
- ✅ GET /projects/
- ✅ GET /projects/{project_id}
- ✅ POST /projects/
- ✅ PATCH /projects/{project_id}
- ✅ POST /projects/{project_id}/submit
- ✅ GET /projects/pending
- ✅ POST /projects/{project_id}/approve
- ✅ POST /projects/{project_id}/reject
- ✅ POST /projects/{project_id}/assign-to-class/{class_id}
- ✅ GET /projects/{project_id}/assigned-classes
- ✅ GET /projects/{project_id}/milestones
- ✅ POST /projects/{project_id}/milestones (ĐÃ SỬA)
- ❓ PATCH /projects/milestones/{milestone_id}
- ❓ DELETE /projects/milestones/{milestone_id}

### 🟡 GROUPS (38 endpoints - NHIỀU NHẤT)
- ✅ GET /groups/
- ✅ GET /groups/{group_id}
- ✅ POST /groups/
- ✅ PATCH /groups/{group_id}
- ✅ POST /groups/{group_id}/pick-project/{project_id}
- ✅ GET /groups/{group_id}/members
- ✅ POST /groups/{group_id}/members
- ✅ PATCH /groups/{group_id}/members/{user_id}/role
- ✅ DELETE /groups/{group_id}/members/{user_id}
- ✅ GET /groups/{group_id}/milestones
- ✅ POST /groups/{group_id}/milestones/{milestone_id}/complete
- ✅ GET /groups/{group_id}/progress
- ✅ GET /groups/{group_id}/cards (Workspace)
- ✅ POST /groups/{group_id}/cards
- ✅ PATCH /groups/cards/{card_id}
- ✅ DELETE /groups/cards/{card_id}
- ✅ GET /groups/{group_id}/checkpoints
- ✅ POST /groups/{group_id}/checkpoints
- ✅ POST /groups/{group_id}/checkpoints/{checkpoint_id}/submit
- ✅ GET /groups/{group_id}/tasks
- ✅ POST /groups/{group_id}/tasks
- ✅ PATCH /groups/{group_id}/tasks/{task_id}
- ✅ DELETE /groups/{group_id}/tasks/{task_id}
- ✅ GET /groups/{group_id}/milestones/{milestone_id}/questions
- ✅ POST /groups/{group_id}/milestones/{milestone_id}/questions
- ✅ PATCH /groups/{group_id}/milestones/{milestone_id}/questions/{question_id}
- ✅ DELETE /groups/{group_id}/milestones/{milestone_id}/questions/{question_id}

### 🟡 CLASSES (10 endpoints)
- ✅ GET /classes/
- ✅ GET /classes/{class_id}
- ✅ POST /classes/
- ✅ PATCH /classes/{class_id}
- ✅ POST /classes/import
- ✅ GET /classes/{class_id}/members
- ✅ POST /classes/{class_id}/members
- ✅ POST /classes/{class_id}/members/bulk
- ✅ DELETE /classes/{class_id}/members/{user_id}
- ✅ POST /classes/{class_id}/assign-lecturer

### 🟡 USERS (13 endpoints)
- ✅ GET /users/
- ✅ GET /users/stats
- ✅ PATCH /users/{user_id}/deactivate
- ✅ PATCH /users/{user_id}/activate
- ✅ POST /users/import
- ✅ POST /users/create
- ✅ GET /users/lecturers
- ✅ GET /users/students
- ✅ GET /users/{user_id}
- ✅ PATCH /users/{user_id}
- ✅ GET /users/me
- ✅ PUT /users/me
- ✅ POST /users/change-password

### 🟡 EVALUATIONS (9 endpoints)
- ✅ GET /evaluations/groups/{group_id}
- ✅ POST /evaluations/groups/{group_id}
- ✅ GET /evaluations/members/{user_id}
- ✅ POST /evaluations/members/{user_id}
- ✅ GET /evaluations/peer-reviews/{group_id}
- ✅ POST /evaluations/peer-reviews
- ✅ GET /evaluations/milestone-answers/{group_id}
- ✅ POST /evaluations/milestone-answers
- ✅ PATCH /evaluations/milestone-answers/{answer_id}/feedback

### 🟡 AI (4 endpoints)
- ✅ POST /ai/chat
- ✅ POST /ai/projects/{project_id}/generate-milestones
- ✅ POST /ai/groups/{group_id}/analyze-progress
- ✅ POST /ai/groups/{group_id}/analyze-contributions

---

## 🎯 KIỂM TRA TỪNG ROLE

### 👨‍🏫 LECTURER ROLE

**Chức năng chính:**
1. ✅ Login/Logout
2. ⚠️ Xem dashboard (cần kiểm tra data)
3. ⚠️ Tạo project mới
4. ⚠️ Thêm milestones (ĐÃ SỬA API)
5. ⚠️ Submit project for approval
6. ⚠️ Xem projects của mình
7. ⚠️ Đánh giá checkpoint submissions
8. ⚠️ Xem peer reviews

**API liên quan:**
- POST /projects/ (tạo project)
- POST /projects/{id}/milestones (thêm milestone)
- POST /projects/{id}/submit (submit)
- GET /projects/my (xem projects)
- GET /evaluations/peer-reviews/{group_id}

### 👨‍🎓 STUDENT ROLE

**Chức năng chính:**
1. ✅ Login/Logout
2. ⚠️ Xem dashboard
3. ⚠️ Browse available projects
4. ⚠️ Tạo/Join team
5. ⚠️ Pick project cho team
6. ⚠️ Làm việc với workspace (cards/tasks)
7. ⚠️ Submit checkpoints
8. ⚠️ Chat với team
9. ⚠️ Video call
10. ⚠️ Peer review đồng đội

**API liên quan:**
- GET /projects/ (browse)
- POST /groups/ (tạo team)
- POST /groups/{id}/members (join team)
- POST /groups/{id}/pick-project/{project_id}
- GET/POST /groups/{id}/cards
- POST /groups/{id}/checkpoints/{id}/submit
- GET/POST /chat/groups/{id}/messages
- POST /evaluations/peer-reviews

### 👨‍💼 HEAD/ADMIN ROLE

**Chức năng chính:**
1. ✅ Login/Logout
2. ⚠️ Xem pending projects
3. ⚠️ Approve/Reject projects
4. ⚠️ Assign projects to classes
5. ⚠️ Quản lý users
6. ⚠️ Quản lý classes
7. ⚠️ Quản lý subjects
8. ⚠️ Import data (bulk)

**API liên quan:**
- GET /projects/pending
- POST /projects/{id}/approve
- POST /projects/{id}/reject
- POST /projects/{id}/assign-to-class/{class_id}
- GET/POST /users/
- GET/POST /classes/
- POST /users/import
- POST /classes/import

---

## ❌ CÁC VẤN ĐỀ CẦN SỬA NGAY

### 1. **Milestone API** ✅ ĐÃ SỬA
- Backend đã được update để nhận JSON body

### 2. **CẦN KIỂM TRA TIẾP**
Tôi sẽ kiểm tra chi tiết từng service để tìm mismatch...

---

## 📝 GHI CHÚ

- Backend có 121 endpoints
- Frontend có 15 services
- Cần test từng luồng chính của mỗi role
- Cần test tương tác giữa các roles

