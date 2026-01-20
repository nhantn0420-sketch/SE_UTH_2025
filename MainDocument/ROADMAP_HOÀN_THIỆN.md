# 📋 ROADMAP HOÀN THIỆN TÀI LIỆU - PHẦN CÒN THIẾU

📅 **Ngày đánh giá**: 20/01/2026  
📊 **Độ hoàn thiện hiện tại**: 95-98%  
🎯 **Mục tiêu**: Đạt 100% với Section V và VI

---

## 📌 TRẠNG THÁI HIỆN TẠI

### ✅ ĐÃ CÓ (9 files chính - ~9,672 dòng)

| Section | File | Dòng | Trang | Hoàn thiện | Trạng thái |
|---------|------|------|-------|------------|------------|
| **0** | Front Matter | 178 | ~6 | 95% | ✅ (Cần điền team info) |
| **I** | Project Introduction | 545 | ~18 | 100% | ✅ Hoàn chỉnh |
| **II** | Project Management Plan | 487 | ~16 | 95% | ✅ Hoàn chỉnh |
| **III** | SRS - 3 files | 3,223 | ~107 | 90% | ✅ Hoàn chỉnh |
| | 3.1 Product Overview | 390 | ~13 | 85% | ✅ |
| | 3.2 User Requirements | 1,737 | ~58 | 95% | ✅ |
| | 3.3 Functional Requirements | 1,096 | ~37 | 85% | ✅ |
| **IV** | SDD - 3 files | 5,241 | ~175 | 95% | ✅ Hoàn chỉnh |
| | 4.1 System Design | 874 | ~29 | 98% | ✅ (Vừa thêm RBAC) |
| | 4.2 Database Design | 1,231 | ~41 | 95% | ✅ |
| | 4.3 Detailed Design | 3,136 | ~105 | 98% | ✅ |
| **TỔNG** | **9 files** | **9,672** | **~322** | **95%** | ✅ |

### ❌ CHƯA CÓ (2 sections quan trọng)

| Section | Ước tính | Độ ưu tiên | Thời gian | Trạng thái |
|---------|----------|------------|-----------|------------|
| **V. Testing** | 25-30 trang | 🔴 CAO | 6-8 giờ | ❌ Chưa có |
| **VI. User Guides** | 20-25 trang | 🟡 TRUNG BÌNH | 4-6 giờ | ❌ Chưa có |
| **Appendix** | 10-15 trang | 🟢 THẤP | 2-3 giờ | ⚠️ Một phần |

---

## 🔴 ƯU TIÊN 1: SECTION V - TESTING DOCUMENTATION

### Tại sao quan trọng?
- ✅ Bắt buộc trong hầu hết capstone projects
- ✅ Chứng minh chất lượng và độ tin cậy của hệ thống
- ✅ Thể hiện quy trình kiểm thử chuyên nghiệp
- ✅ Thường chiếm 15-20% điểm đánh giá

### Nội dung cần có

#### **5.1. Test Strategy & Scope** (~5 trang)

**Nội dung:**
```markdown
### 5.1.1. Testing Objectives
- Ensure all functional requirements are implemented correctly
- Validate system meets non-functional requirements (performance, security)
- Identify and fix critical bugs before production
- Achieve minimum 80% code coverage

### 5.1.2. Testing Scope
**In Scope:**
- ✅ Unit Testing: All backend services and utilities
- ✅ Integration Testing: API endpoints, database operations
- ✅ End-to-End Testing: Critical user flows
- ✅ Security Testing: Authentication, authorization, input validation
- ✅ Performance Testing: Load testing with 1000 concurrent users

**Out of Scope:**
- ❌ Third-party services (AWS Bedrock, Cloudinary)
- ❌ Browser compatibility testing (only Chrome/Edge)
- ❌ Mobile responsive testing (future work)

### 5.1.3. Testing Levels
1. **Unit Testing** (Developer responsibility)
   - Framework: pytest (Python), Jest (React)
   - Target: 80% code coverage
   - Run: On every commit (CI/CD)

2. **Integration Testing** (Developer + QA)
   - API testing with Postman/pytest
   - Database integration tests
   - WebSocket connection tests

3. **System Testing** (QA Team)
   - End-to-end scenarios with Playwright/Cypress
   - UI/UX validation
   - Cross-browser testing (Chrome, Edge)

4. **Acceptance Testing** (Product Owner + Users)
   - User acceptance scenarios
   - Real-world workflow validation
```

**Ước tính**: 4-5 trang

---

#### **5.2. Test Plan** (~4 trang)

**Nội dung:**
```markdown
### 5.2.1. Test Environment Setup

**Backend Test Environment:**
- Python 3.11 + FastAPI
- PostgreSQL 15 (test database)
- Docker containers for isolation
- pytest + pytest-cov for coverage

**Frontend Test Environment:**
- Node.js 18 + React 18.2
- Jest + React Testing Library
- Cypress for E2E tests

**CI/CD Pipeline:**
- GitHub Actions
- Run tests on every PR
- Block merge if tests fail or coverage < 80%

### 5.2.2. Test Schedule

| Phase | Duration | Activities | Deliverables |
|-------|----------|------------|--------------|
| **Phase 1: Unit Testing** | Week 1-2 | Write unit tests for all modules | Test suite + 80% coverage |
| **Phase 2: Integration** | Week 3 | API and DB integration tests | API test collection |
| **Phase 3: E2E Testing** | Week 4 | Critical user flows automation | E2E test suite |
| **Phase 4: Bug Fixing** | Week 5 | Fix all critical/high bugs | Stable build |
| **Phase 5: Regression** | Week 6 | Re-test all fixed bugs | Test report |

### 5.2.3. Entry & Exit Criteria

**Entry Criteria:**
- All development completed
- Unit tests written for new features
- Test environment configured

**Exit Criteria:**
- All critical and high bugs fixed
- 80% code coverage achieved
- All E2E tests passing
- Performance benchmarks met
```

**Ước tính**: 3-4 trang

---

#### **5.3. Test Cases** (~10-12 trang)

**Cấu trúc:**

**A. Authentication & Authorization (2 trang)**
```markdown
### TC-AUTH-001: User Login with Valid Credentials
**Priority**: Critical
**Preconditions**: User exists with username "student1" and password "Test123!"
**Steps:**
1. Navigate to login page
2. Enter username "student1"
3. Enter password "Test123!"
4. Click "Login" button
**Expected Results:**
- ✅ Redirect to dashboard
- ✅ JWT token stored in localStorage
- ✅ User info displayed in header
**Actual Results**: PASS
**Status**: ✅ PASS

### TC-AUTH-002: User Login with Invalid Password
**Priority**: High
**Steps:**
1. Navigate to login page
2. Enter username "student1"
3. Enter wrong password "WrongPass"
4. Click "Login"
**Expected Results:**
- ✅ Stay on login page
- ✅ Error message: "Invalid username or password"
- ✅ No token stored
**Status**: ✅ PASS

[... 10-15 test cases cho Auth module]
```

**B. Project Management (2 trang)**
```markdown
### TC-PROJ-001: Lecturer Creates Project
### TC-PROJ-002: Lecturer Edits Pending Project
### TC-PROJ-003: Head Approves Project
### TC-PROJ-004: Student Picks Approved Project
[... 10-12 test cases]
```

**C. Team Collaboration (2 trang)**
```markdown
### TC-TEAM-001: Create Team
### TC-TEAM-002: Add Member to Team
### TC-TEAM-003: Send Chat Message
### TC-TEAM-004: Initiate Video Call
[... 10-12 test cases]
```

**D. Evaluation & Submission (2 trang)**
```markdown
### TC-EVAL-001: Student Submits Checkpoint
### TC-EVAL-002: Lecturer Evaluates Submission
### TC-EVAL-003: Student Submits Peer Review
[... 8-10 test cases]
```

**E. Security & Error Handling (2 trang)**
```markdown
### TC-SEC-001: Unauthorized Access to Protected Route
### TC-SEC-002: SQL Injection Prevention
### TC-SEC-003: XSS Attack Prevention
### TC-ERR-001: Network Timeout Handling
[... 8-10 test cases]
```

**Tổng cộng**: ~50-60 test cases, 10-12 trang

---

#### **5.4. Test Results & Bug Report** (~4 trang)

**Nội dung:**
```markdown
### 5.4.1. Test Execution Summary

**Overall Statistics:**
- Total test cases: 58
- Passed: 54 (93%)
- Failed: 2 (3%)
- Blocked: 2 (4%)
- Execution date: 15/01/2026

**Test Coverage:**
- Backend: 85% (target: 80%)
- Frontend: 78% (target: 80%)
- Critical paths: 100%

### 5.4.2. Bug Summary

| Severity | Open | Fixed | Total |
|----------|------|-------|-------|
| Critical | 0 | 2 | 2 |
| High | 1 | 5 | 6 |
| Medium | 3 | 8 | 11 |
| Low | 5 | 12 | 17 |
| **Total** | **9** | **27** | **36** |

### 5.4.3. Key Bugs Found & Fixed

**BUG-001: Race Condition in Project Picking [CRITICAL - FIXED]**
- Description: Multiple teams could pick same project simultaneously
- Root cause: Missing database lock
- Fix: Added SELECT FOR UPDATE in transaction
- Status: ✅ Fixed, verified

**BUG-002: WebSocket Disconnect Not Handled [HIGH - FIXED]**
- Description: Chat messages lost when connection drops
- Fix: Added message queue and reconnection logic
- Status: ✅ Fixed, verified

[... List 5-8 major bugs]

### 5.4.4. Outstanding Issues

**BUG-015: Slow query on Dashboard [MEDIUM - OPEN]**
- Impact: Dashboard loads in 3-4 seconds with 100+ projects
- Planned fix: Add database index on project.created_at
- Timeline: Next sprint

### 5.4.5. Performance Test Results

**Load Testing (1000 concurrent users):**
- ✅ API response time: 95th percentile < 500ms
- ✅ Database connections: Stable under load
- ✅ WebSocket connections: All maintained
- ⚠️ Memory usage: 2GB (target < 1.5GB) - needs optimization

### 5.4.6. Recommendations
1. ✅ System ready for production with minor issues
2. ⚠️ Monitor memory usage in production
3. 📌 Add more unit tests for edge cases (target 90% coverage)
4. 🔄 Implement automated regression testing
```

**Ước tính**: 3-4 trang

---

#### **5.5. Test Automation & CI/CD** (~2 trang)

**Nội dung:**
```markdown
### 5.5.1. Automated Test Suite

**Backend (pytest):**
```python
# tests/test_auth.py
def test_login_success():
    response = client.post("/auth/login", json={
        "username": "student1",
        "password": "Test123!"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

**Frontend (Jest + RTL):**
```javascript
// src/components/Auth/Login.test.js
test('displays error on invalid credentials', async () => {
  render(<Login />);
  fireEvent.click(screen.getByText('Login'));
  expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
});
```

### 5.5.2. GitHub Actions CI/CD

```yaml
name: Test & Deploy
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Backend Tests
        run: |
          cd backend
          pytest --cov=app --cov-report=term-missing
      - name: Run Frontend Tests
        run: |
          cd frontend
          npm test -- --coverage
      - name: Check Coverage
        run: |
          if [ $COVERAGE -lt 80 ]; then exit 1; fi
```
```

**Ước tính**: 2-3 trang

---

### 📊 Tổng kết Section V

| Phần | Trang | Thời gian | Độ khó |
|------|-------|-----------|--------|
| 5.1 Test Strategy & Scope | 4-5 | 2h | Trung bình |
| 5.2 Test Plan | 3-4 | 1.5h | Dễ |
| 5.3 Test Cases | 10-12 | 3h | Dễ (repetitive) |
| 5.4 Test Results & Bugs | 3-4 | 1.5h | Trung bình |
| 5.5 Test Automation | 2-3 | 1h | Khó |
| **TỔNG** | **22-28** | **9-10h** | |

---

## 🟡 ƯU TIÊN 2: SECTION VI - USER GUIDES

### Tại sao cần?
- ✅ Giúp người dùng sử dụng hệ thống dễ dàng
- ✅ Hướng dẫn cài đặt cho admin/developer
- ✅ Tăng điểm về tính thực tiễn của project
- ✅ Thường chiếm 10-15% điểm

### Nội dung cần có

#### **6.1. Installation Guide** (~5 trang)

**Nội dung:**
```markdown
### 6.1.1. System Requirements

**Minimum Requirements:**
- OS: Windows 10/11, macOS 11+, Ubuntu 20.04+
- RAM: 8GB (16GB recommended)
- Storage: 10GB free space
- Docker Desktop 20.10+
- Git 2.30+

### 6.1.2. Quick Start with Docker

**Step 1: Clone Repository**
```bash
git clone https://github.com/yourusername/collabsphere.git
cd collabsphere
```

**Step 2: Configure Environment**
```bash
cp .env.example .env
# Edit .env file với database credentials, AWS keys, etc.
```

**Step 3: Run with Docker Compose**
```bash
docker-compose up -d
```

**Step 4: Verify Installation**
- Backend API: http://localhost:8000/docs
- Frontend: http://localhost:3000
- Database: localhost:5432

### 6.1.3. Manual Installation (Without Docker)

**Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

**Database Setup:**
```bash
# Install PostgreSQL 15
createdb collabsphere
cd backend
alembic upgrade head  # Run migrations
python create_test_accounts.py  # Seed test data
```

### 6.1.4. Troubleshooting

**Issue 1: Port 5432 already in use**
Solution: Change POSTGRES_PORT in docker-compose.yml

**Issue 2: Frontend cannot connect to backend**
Solution: Update REACT_APP_API_URL in .env

[... 5-7 common issues]
```

**Ước tính**: 4-5 trang

---

#### **6.2. Lecturer User Guide** (~6 trang)

**Nội dung:**
```markdown
### 6.2.1. Getting Started

**Login:**
1. Go to https://collabsphere.example.com
2. Enter lecturer credentials
3. Click "Sign In"

**Dashboard Overview:**
- View all your classes
- Recent projects and submissions
- Pending approvals
- Student activity feed

### 6.2.2. Class Management

**Create New Class:**
1. Click "Classes" → "Create New"
2. Fill form:
   - Class name: "CS401-SE-2024"
   - Subject: Select "Software Engineering"
   - Semester: "Spring 2024"
   - Max students: 40
3. Click "Create"
4. Share enrollment code with students

**Import Students (CSV):**
1. Download template
2. Fill student data
3. Click "Import" → Select CSV file
4. Review and confirm

### 6.2.3. Project Management

**Create Project:**
1. Click "Projects" → "Create New"
2. Enter project details:
   - Title
   - Description
   - Learning objectives
   - Duration (weeks)
3. **Optional**: Click "Generate Milestones with AI"
   - Review AI suggestions
   - Edit as needed
4. Click "Submit for Approval"

**Monitor Team Progress:**
1. Go to "My Classes" → Select class
2. Click "Teams" tab
3. View each team's:
   - Checkpoint submissions
   - Collaboration activity
   - Member contributions

### 6.2.4. Evaluation

**Evaluate Checkpoint:**
1. Go to "Submissions" → Select checkpoint
2. Download submitted files
3. Enter grade (0-10)
4. Provide feedback
5. Click "Submit Evaluation"

**View Peer Reviews:**
1. Go to team details
2. Click "Peer Reviews" tab
3. View anonymous reviews for each member
4. Use data to adjust final grades

### 6.2.5. Communication

**Chat with Students:**
1. Go to class page
2. Click "Chat" icon
3. Send messages to class or specific team

**Schedule Video Meeting:**
1. Click "Meetings" → "Schedule New"
2. Select team/class
3. Set date/time
4. Click "Create" (sends notifications)

[... More features with screenshots]
```

**Ước tính**: 5-6 trang

---

#### **6.3. Student User Guide** (~5 trang)

**Nội dung:**
```markdown
### 6.3.1. Getting Started

**Register:**
1. Get enrollment code from lecturer
2. Go to registration page
3. Fill form (email, password, name, student ID)
4. Enter enrollment code
5. Click "Register"

**Join Class:**
1. Login
2. Enter enrollment code
3. Class appears in dashboard

### 6.3.2. Team Collaboration

**Join/Create Team:**
1. Go to class page
2. Click "Teams" tab
3. Either:
   - Join existing team (if invited)
   - Create new team (enter team name)

**Pick Project:**
1. Go to team workspace
2. Click "Pick Project"
3. Browse approved projects
4. Click "Select This Project"
5. Confirm selection

**Assign Tasks:**
1. In team workspace
2. Click "Tasks" tab
3. Create task:
   - Title
   - Description
   - Assign to member
   - Due date
4. Click "Create Task"

### 6.3.3. Submissions

**Submit Checkpoint:**
1. Go to team milestones
2. Click on checkpoint
3. Enter description
4. Upload files (PDF, DOCX, ZIP)
5. Click "Submit"
6. Wait for lecturer evaluation

**View Grades:**
1. Go to "Grades" tab
2. See checkpoint grades and feedback
3. View final project grade

### 6.3.4. Peer Review

**Submit Peer Review:**
1. When milestone completes → Notification
2. Go to "Peer Reviews"
3. For each team member, rate:
   - Cooperation (1-5 stars)
   - Contribution (1-5 stars)
   - Communication (1-5 stars)
   - Technical skills (1-5 stars)
4. Add optional comments
5. Click "Submit Review" (anonymous)

### 6.3.5. Collaboration Tools

**Real-time Chat:**
1. Go to team workspace
2. Click "Chat" tab
3. Type message and hit Enter
4. Use @mention to notify members

**Video Call:**
1. In team workspace
2. Click "Start Video Call"
3. Wait for members to join
4. Share screen if needed

[... More features]
```

**Ước tính**: 4-5 trang

---

#### **6.4. Admin User Guide** (~3 trang)

**Nội dung:**
```markdown
### 6.4.1. User Management

**Create Lecturer Account:**
1. Login as admin
2. Go to "Users" → "Create User"
3. Select role: "Lecturer"
4. Enter details
5. Click "Create"

**Import Users (Bulk):**
1. Download CSV template
2. Fill user data
3. Go to "Import" → Select CSV
4. Review and confirm

### 6.4.2. System Configuration

**Manage Subjects:**
1. Go to "Subjects"
2. Add/edit/delete subjects
3. Set prerequisites

**Configure Settings:**
- Email notifications on/off
- File upload limits
- Session timeout

### 6.4.3. Monitoring & Reports

**View System Logs:**
1. Go to "Logs"
2. Filter by date/level/user
3. Export to CSV

**Generate Reports:**
1. Go to "Reports"
2. Select type (usage, performance, grades)
3. Set date range
4. Click "Generate"
```

**Ước tính**: 2-3 trang

---

### 📊 Tổng kết Section VI

| Phần | Trang | Thời gian | Screenshots |
|------|-------|-----------|-------------|
| 6.1 Installation Guide | 4-5 | 2h | 2-3 |
| 6.2 Lecturer Guide | 5-6 | 2h | 8-10 |
| 6.3 Student Guide | 4-5 | 1.5h | 8-10 |
| 6.4 Admin Guide | 2-3 | 1h | 3-5 |
| **TỔNG** | **15-19** | **6.5-7h** | **21-28** |

---

## 🟢 ƯU TIÊN 3: APPENDIX (Tùy chọn)

### A. API Documentation
- Đã có Swagger docs tại `/docs`
- Chỉ cần chụp screenshots và mô tả ngắn (2 trang)

### B. Database Schema
- Export ERD diagrams đã có
- Thêm bảng mô tả từng table (3 trang)

### C. GUI Screenshots
- Chụp màn hình các tính năng chính (5-8 trang)

### D. Source Code Repository
- Link GitHub
- Cấu trúc folder
- Hướng dẫn đóng góp (2 trang)

**Tổng Appendix**: 12-15 trang, 2-3 giờ

---

## 📅 TIMELINE ĐỀ XUẤT

### Kịch bản 1: Làm nhanh (3-4 ngày)

| Ngày | Công việc | Giờ | Output |
|------|-----------|-----|--------|
| **Ngày 1** | Section V.1-V.2 (Strategy + Plan) | 3-4h | 7-9 trang |
| **Ngày 2** | Section V.3 (Test Cases - 50% đầu) | 4h | 5-6 trang |
| **Ngày 2** | Section V.3 (Test Cases - 50% sau) | 2h | 5-6 trang |
| **Ngày 3** | Section V.4-V.5 (Results + Automation) | 3h | 5-6 trang |
| **Ngày 3** | Section VI.1 (Installation Guide) | 2h | 4-5 trang |
| **Ngày 4** | Section VI.2-VI.4 (User Guides) | 4-5h | 11-14 trang |
| **Ngày 4** | Review & polish | 1-2h | Final check |
| **TỔNG** | | **19-22h** | **37-46 trang** |

### Kịch bản 2: Làm kỹ (5-7 ngày)

| Ngày | Công việc | Giờ | Output |
|------|-----------|-----|--------|
| **Ngày 1-2** | Section V - Testing (full) | 10h | 25-28 trang |
| **Ngày 3-4** | Section VI - User Guides (full) | 7h | 15-19 trang |
| **Ngày 5** | Appendix | 3h | 12-15 trang |
| **Ngày 6** | Screenshots (20-30 hình) | 3h | - |
| **Ngày 7** | Review, format, polish | 3h | Final |
| **TỔNG** | | **26h** | **52-62 trang** |

---

## 🎯 CHECKLIST HOÀN THIỆN 100%

### Trước khi submit

#### Nội dung
- [ ] Section V: Testing Documentation (25-28 trang)
  - [ ] 5.1 Test Strategy & Scope
  - [ ] 5.2 Test Plan
  - [ ] 5.3 Test Cases (50-60 cases)
  - [ ] 5.4 Test Results & Bug Report
  - [ ] 5.5 Test Automation & CI/CD
- [ ] Section VI: User Guides (15-19 trang)
  - [ ] 6.1 Installation Guide
  - [ ] 6.2 Lecturer Guide
  - [ ] 6.3 Student Guide
  - [ ] 6.4 Admin Guide
- [ ] Appendix (optional - 12-15 trang)
  - [ ] API Documentation
  - [ ] Database Schema
  - [ ] GUI Screenshots (20-30 hình)
  - [ ] Source Code Repository Info

#### Formatting
- [ ] Đánh số trang liên tục
- [ ] Đánh số Figure/Table consistent
- [ ] Table of Contents cập nhật
- [ ] Cross-references hoạt động
- [ ] Tất cả screenshots rõ nét
- [ ] Font consistent (11pt, Times New Roman)
- [ ] Header/Footer có logo và trang

#### Quality Check
- [ ] Spell check toàn bộ
- [ ] Grammar check
- [ ] Technical terms consistent
- [ ] Code snippets có syntax highlighting
- [ ] Tất cả links hoạt động
- [ ] PDF export thành công
- [ ] File size < 50MB

---

## 💡 GỢI Ý THỰC HIỆN

### Nếu thiếu thời gian:

#### Minimum Viable Documentation (MVD)
**Chỉ làm những gì quan trọng nhất:**

1. **Section V (Tối thiểu - 10-12 trang, 4-5 giờ):**
   - 5.1 Test Strategy (2 trang)
   - 5.3 Test Cases - 20 cases quan trọng nhất (6 trang)
   - 5.4 Test Results Summary (2 trang)
   - Skip: Detailed test plan, automation details

2. **Section VI (Tối thiểu - 8-10 trang, 3-4 giờ):**
   - 6.1 Installation Guide (3 trang)
   - 6.2 Quick Start Guide (5 trang - kết hợp cả 3 roles)
   - Skip: Detailed per-role guides

**Total MVD: 18-22 trang, 7-9 giờ**

### Nếu có đủ thời gian:

#### Full Professional Documentation
- Làm đầy đủ như roadmap trên
- Thêm nhiều screenshots
- Viết detailed troubleshooting
- Thêm video tutorials (bonus)

---

## 📞 HỖ TRỢ

Nếu cần tôi giúp:
1. **Tạo template**: Tôi có thể generate template cho Section V hoặc VI
2. **Viết test cases**: Dựa trên functional requirements đã có
3. **Viết user guide**: Based on UI wireframes/screenshots
4. **Review & polish**: Kiểm tra consistency và quality

**Bạn muốn bắt đầu với phần nào trước?**

---

**📌 KẾT LUẬN**

Tài liệu hiện tại: **95-98% hoàn thiện** ✅  
Còn thiếu: **Section V (Testing) + Section VI (User Guides)** ⚠️  
Ước tính thời gian: **Tối thiểu 7-9 giờ**, **Đầy đủ 20-26 giờ**  
Độ ưu tiên: **Section V > Section VI > Appendix**  

**🚀 Ready to start?**
