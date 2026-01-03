# ROLES AND PERMISSIONS - CollabSphere

**Mapping với Use Case Diagram**

Tài liệu này mô tả chi tiết phân quyền cho từng role trong hệ thống, đảm bảo match với Use Case Diagram đã thiết kế.

---

## 🎓 **STUDENT ROLE**

### **Use Cases: UC032-UC042**

### **Permissions:**

#### **1. View & Access (UC032-UC035)**
- ✅ View assigned classes and their details (UC033)
- ✅ View teams they are member of (UC033)
- ✅ View subjects and syllabus for enrolled classes (UC034)
- ✅ View project details assigned to their team
- ✅ View milestones and checkpoints for their team (UC035)
- ✅ View team workspace (cards, tasks, subtasks) (UC017, UC039)
- ✅ View class resources uploaded by lecturer

#### **2. Team Workspace Management (UC039)**
- ✅ Create and manage cards in team workspace
- ✅ Create tasks within cards
- ✅ Create subtasks under tasks
- ✅ Update own tasks/subtasks
- ✅ Delete own tasks/subtasks
- ✅ Assign tasks to team members
- ✅ Change task status (todo → in_progress → done)

#### **3. Milestone & Checkpoint (UC035-UC038, UC040)**
- ✅ **Team Leader Only:** Mark milestones as completed (UC036)
- ✅ **Team Leader Only:** Create checkpoints (UC037)
- ✅ **Team Leader Only:** Assign checkpoints to members (UC037)
- ✅ **All Members:** Submit checkpoint entries (UC038)
- ✅ **All Members:** Answer milestone questions (UC040)
- ✅ **All Members:** View milestone questions and answers

#### **4. Progress Monitoring (UC013-UC014)**
- ✅ Monitor team's overall progress (UC013)
- ✅ View individual member contribution scores (UC014)
- ✅ View completion percentage of milestones
- ✅ View checkpoint status

#### **5. Communication (UC019-UC022)**
- ✅ Send and receive chat messages in team (UC020)
- ✅ Initiate video/audio calls with team (UC021)
- ✅ Schedule meetings (UC021)
- ✅ Use collaborative whiteboard (UC022)
- ✅ Use real-time document editor (UC022)

#### **6. Evaluation (UC041-UC042)**
- ✅ Provide peer reviews for other team members at project end (UC041)
- ✅ View evaluations and feedback received from lecturer (UC042)
- ✅ View evaluations and feedback received from peers (UC042)
- ❌ Cannot view others' peer reviews (privacy)

#### **7. Resources (UC028-UC029)**
- ✅ Upload files/documents to team workspace
- ✅ View and download class resources
- ✅ View and download team resources
- ❌ Cannot delete class resources (lecturer only)

#### **8. AI Assistance (UC030)**
- ✅ Chat with AI for brainstorming and guidance
- ✅ Ask AI for project suggestions
- ✅ Request AI analysis of team progress
- ✅ Get AI feedback on milestone answers

#### **9. Notifications (UC031)**
- ✅ Receive in-app notifications for:
  - New milestones assigned
  - Checkpoint submissions due
  - New messages in team chat
  - Meeting schedules
  - Evaluation feedback received
  - Resource uploads
- ✅ Receive email notifications (when implemented)
- ✅ Mark notifications as read
- ✅ View notification history

### **Restrictions:**
- ❌ Cannot create or edit projects
- ❌ Cannot create or manage classes
- ❌ Cannot create teams (lecturer only)
- ❌ Cannot evaluate other students (only peer review)
- ❌ Cannot approve projects
- ❌ Cannot access teams they are not member of
- ❌ Cannot access classes they are not enrolled in

---

## 👨‍🏫 **LECTURER ROLE**

### **Use Cases: UC001-UC030 (Shared with students UC019-UC022, UC028-UC031)**

### **Permissions:**

#### **1. Project Management (UC001-UC006)**
- ✅ Create new projects based on curriculum (UC002)
- ✅ Edit own projects (pending/draft only) (UC003)
- ✅ View all own projects (pending, approved, denied) (UC003)
- ✅ Submit projects to Head for approval (UC004)
- ✅ Assign approved projects to own classes (UC005)
- ✅ **NEW:** Pick specific projects for specific teams (UC006)
- ✅ View project assignment history
- ❌ Cannot edit approved projects (Head only)
- ❌ Cannot approve own projects

#### **2. AI-Assisted Project Creation (UC001)**
- ✅ Use AI to generate project milestones based on curriculum
- ✅ AI suggests deliverables for each milestone
- ✅ AI recommends week numbers for milestones
- ✅ Edit AI-generated content before saving

#### **3. Class Management (UC007-UC009)**
- ✅ View all assigned classes (UC008)
- ✅ View class details (students, projects, teams) (UC008)
- ✅ Upload resources to classes (files, docs, slides) (UC009)
- ✅ Manage class resources (edit, delete) (UC009)
- ✅ View enrolled students in classes
- ❌ Cannot create classes (Staff/Admin only)
- ❌ Cannot modify class enrollment (Staff/Admin only)

#### **4. Team Management (UC010-UC017)**
- ✅ Create teams in assigned classes (UC011)
- ✅ Edit team information (name, description) (UC011)
- ✅ Add members to teams (UC012)
- ✅ Remove members from teams (UC012)
- ✅ Change member roles (leader/member) (UC012)
- ✅ Delete teams (UC011)
- ✅ Monitor all team progress in assigned classes (UC013)
- ✅ View individual contribution scores (UC014)
- ✅ View team workspaces (cards, tasks, subtasks) (UC017)

#### **5. Milestone Management (UC015-UC016)**
- ✅ Create milestones for projects (UC015)
- ✅ Edit milestones in own projects (UC015)
- ✅ Delete milestones from own projects (UC015)
- ✅ Create questions for milestones (UC016)
- ✅ Edit milestone questions (UC016)
- ✅ Delete milestone questions (UC016)
- ✅ View all student answers to milestone questions

#### **6. Checkpoint Management (UC018)**
- ✅ View all checkpoints in teams (UC018)
- ✅ View checkpoint submissions (UC018)
- ✅ Provide feedback on checkpoint submissions (UC026)
- ❌ Cannot create checkpoints (Team leader only)

#### **7. Communication (UC019-UC022)**
- ✅ Chat with any team in assigned classes (UC020)
- ✅ Join team video/audio calls (UC021)
- ✅ Schedule meetings with teams (UC021)
- ✅ Use collaborative tools in team workspaces (UC022)
- ✅ View chat history of all teams

#### **8. Evaluation & Feedback (UC023-UC027)**
- ✅ Evaluate teams at project end (UC024)
- ✅ Evaluate individual members at project end (UC024)
- ✅ Provide feedback for teams and members (UC024)
- ✅ Evaluate and provide feedback on milestone answers (UC025)
- ✅ Evaluate checkpoint submissions (UC026)
- ✅ View peer evaluations between students (UC027)
- ✅ Use peer evaluations to inform final grades (UC027)
- ✅ View all evaluation history

#### **9. Resources (UC028-UC029)**
- ✅ Upload files to classes
- ✅ Upload files to team workspaces
- ✅ Edit and delete class resources
- ✅ View all resources in assigned classes

#### **10. AI Assistance (UC030)**
- ✅ Use AI to generate project milestones
- ✅ Chat with AI for teaching guidance
- ✅ AI analysis of team performance
- ✅ AI suggestions for evaluation criteria

#### **11. Notifications (UC031)**
- ✅ Receive notifications for:
  - Project approval/rejection by Head
  - New checkpoint submissions
  - Team milestone completions
  - Student questions/messages
  - Resource uploads by students
- ✅ Email notifications (when implemented)

### **Restrictions:**
- ❌ Cannot approve projects (Head only)
- ❌ Cannot access other lecturers' classes
- ❌ Cannot modify other lecturers' projects
- ❌ Cannot create or modify classes (Staff/Admin only)

---

## 👔 **HEAD DEPARTMENT ROLE**

### **Use Cases: UC001, UC005 + Approval workflows**

### **Permissions:**

#### **1. Project Approval (UC001, UC004)**
- ✅ View all pending projects from all lecturers
- ✅ Approve pending projects (UC004)
- ✅ Reject pending projects with reason (UC004)
- ✅ View all projects (approved, pending, rejected, draft)
- ✅ Edit approved projects (special permission)
- ✅ View project approval history
- ✅ View rejection reasons

#### **2. Project Assignment (UC005)**
- ✅ Assign any approved project to any class
- ✅ View all project assignments across departments
- ✅ Reassign projects if needed
- ✅ Unassign projects from classes

#### **3. Oversight & Monitoring**
- ✅ View all classes in department
- ✅ View all teams in all classes
- ✅ View progress of all teams
- ✅ View all evaluations given by lecturers
- ✅ Access all project data
- ✅ Generate department-wide reports

#### **4. Curriculum Management**
- ✅ View all curricula
- ✅ Create and edit curricula
- ✅ Link curricula to subjects
- ✅ View projects by curriculum

#### **5. Communication**
- ✅ View chat logs (if needed for oversight)
- ✅ Access meeting records

#### **6. Notifications**
- ✅ Receive notifications for:
  - New project submissions from lecturers
  - Urgent issues in teams
  - System-wide announcements

### **Restrictions:**
- ⚠️ **Should not interfere** with day-to-day team operations
- ⚠️ Focus on approval and high-level oversight
- ❌ Typically doesn't create teams or evaluate students directly

---

## 🏢 **STAFF ROLE** (Admin/Support)

### **Not in Use Case Diagram - Administrative Role**

### **Permissions:**

#### **1. User Management**
- ✅ Create user accounts (students, lecturers)
- ✅ Edit user information
- ✅ Reset passwords
- ✅ Activate/deactivate accounts
- ✅ Assign roles to users

#### **2. Class Management**
- ✅ Create classes
- ✅ Edit class information
- ✅ Assign lecturers to classes
- ✅ Import students from Excel
- ✅ Manage class enrollment
- ✅ Archive old classes

#### **3. Subject & Curriculum**
- ✅ Create and manage subjects
- ✅ Create and manage curricula
- ✅ Link subjects to curricula

#### **4. System Configuration**
- ✅ Configure system settings
- ✅ Manage notifications templates
- ✅ View system logs

#### **5. Import/Export**
- ✅ Import bulk data (students, classes)
- ✅ Export reports
- ✅ Generate analytics

### **Restrictions:**
- ❌ Cannot create projects (Lecturer only)
- ❌ Cannot evaluate students (Lecturer only)
- ❌ Should not access team workspaces unless for support

---

## 📊 **PERMISSION MATRIX**

| Feature | Student | Lecturer | Head | Staff |
|---------|---------|----------|------|-------|
| **Projects** |
| View approved projects | ✅ | ✅ | ✅ | ✅ |
| Create projects | ❌ | ✅ | ❌ | ❌ |
| Edit own projects | ❌ | ✅ | ❌ | ❌ |
| Submit for approval | ❌ | ✅ | ❌ | ❌ |
| Approve/Reject | ❌ | ❌ | ✅ | ❌ |
| **Classes** |
| View enrolled classes | ✅ | ✅ Own | ✅ All | ✅ |
| Create classes | ❌ | ❌ | ❌ | ✅ |
| Manage enrollment | ❌ | ❌ | ❌ | ✅ |
| Upload class resources | ❌ | ✅ | ❌ | ❌ |
| **Teams** |
| View own team | ✅ | ✅ All | ✅ All | ✅ |
| Create teams | ❌ | ✅ | ❌ | ❌ |
| Manage members | ❌ Leader | ✅ | ❌ | ❌ |
| Pick project for team | ❌ | ✅ | ❌ | ❌ |
| **Workspace** |
| Create cards | ✅ | ✅ | ❌ | ❌ |
| Create tasks | ✅ | ✅ | ❌ | ❌ |
| Create subtasks | ✅ | ✅ | ❌ | ❌ |
| View workspace | ✅ Own | ✅ All | ✅ | ⚠️ Support |
| **Milestones** |
| Create milestones | ❌ | ✅ | ❌ | ❌ |
| Mark complete | ✅ Leader | ❌ | ❌ | ❌ |
| Create questions | ❌ | ✅ | ❌ | ❌ |
| Answer questions | ✅ | ❌ | ❌ | ❌ |
| **Checkpoints** |
| Create checkpoints | ✅ Leader | ❌ | ❌ | ❌ |
| Submit checkpoint | ✅ | ❌ | ❌ | ❌ |
| Evaluate checkpoint | ❌ | ✅ | ❌ | ❌ |
| **Communication** |
| Team chat | ✅ | ✅ | ⚠️ | ⚠️ |
| Video meetings | ✅ | ✅ | ⚠️ | ❌ |
| Collaborative tools | ✅ | ✅ | ❌ | ❌ |
| **Evaluation** |
| Evaluate teams | ❌ | ✅ | ❌ | ❌ |
| Evaluate members | ❌ | ✅ | ❌ | ❌ |
| Peer review | ✅ | ❌ | ❌ | ❌ |
| View evaluations | ✅ Own | ✅ All | ✅ All | ❌ |
| **AI** |
| AI chat | ✅ | ✅ | ✅ | ❌ |
| Generate milestones | ❌ | ✅ | ❌ | ❌ |
| **Admin** |
| User management | ❌ | ❌ | ⚠️ Limited | ✅ |
| System config | ❌ | ❌ | ❌ | ✅ |
| Import data | ❌ | ❌ | ❌ | ✅ |

---

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### **Implementation:**

```python
# In app/utils/dependencies.py

async def get_current_user() -> User:
    """Get authenticated user from JWT token"""
    # Verify token and return user

async def get_current_student() -> User:
    """Ensure current user is STUDENT role"""
    user = await get_current_user()
    if user.role != UserRole.STUDENT:
        raise HTTPException(403, "Student access required")
    return user

async def get_current_lecturer() -> User:
    """Ensure current user is LECTURER role"""
    user = await get_current_user()
    if user.role != UserRole.LECTURER:
        raise HTTPException(403, "Lecturer access required")
    return user

async def get_current_head() -> User:
    """Ensure current user is HEAD role"""
    user = await get_current_user()
    if user.role != UserRole.HEAD:
        raise HTTPException(403, "Head Department access required")
    return user

async def get_current_lecturer_or_head() -> User:
    """Allow both LECTURER and HEAD roles"""
    user = await get_current_user()
    if user.role not in [UserRole.LECTURER, UserRole.HEAD]:
        raise HTTPException(403, "Lecturer or Head access required")
    return user
```

---

## 📝 **NOTES**

1. **Team Leader** is a special role within Student - has extra permissions for team management
2. **Staff** role is not in use case diagram but needed for system administration
3. **Head Department** focuses on approval and oversight, not day-to-day operations
4. All roles can view their relevant notifications and use appropriate AI features
5. Communication features (chat, meetings) are shared between Students and Lecturers

---

**Document Version:** 1.0  
**Last Updated:** January 3, 2026  
**Status:** ✅ Matches Use Case Diagram
