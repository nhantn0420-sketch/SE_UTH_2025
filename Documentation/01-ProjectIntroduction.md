# I. PROJECT INTRODUCTION (GIỚI THIỆU DỰ ÁN)

---

## 1.1. OVERVIEW (Tổng quan)

### Project Information

| Thông tin | Nội dung |
|-----------|----------|
| **Tên dự án (Tiếng Việt)** | Hệ thống hỗ trợ việc học theo phương pháp học tập dự án |
| **Tên dự án (Tiếng Anh)** | CollabSphere - Project-Based Learning Management System |
| **Viết tắt** | COSRE |
| **Mã dự án** | SP25SE107 |
| **Loại phần mềm** | Web Application (Single Page Application) |
| **Học kỳ** | Spring 2025 |
| **Thời gian thực hiện** | [MM/YYYY] - [MM/YYYY] (4 tháng) |
| **Nhà trường** | FPT University |
| **Khoa** | Software Engineering |

### Project Team

| STT | Họ và tên | Vai trò | Trách nhiệm chính | Email |
|-----|-----------|---------|-------------------|-------|
| 1 | [Tên thành viên 1] | Team Leader, Backend Developer | Quản lý dự án, Backend API, Database | [email1] |
| 2 | [Tên thành viên 2] | Frontend Developer | React UI, Component Development | [email2] |
| 3 | [Tên thành viên 3] | Full-stack Developer | Integration, Real-time Features | [email3] |
| 4 | [Tên thành viên 4] | UI/UX Designer, Tester | Design, Testing, Documentation | [email4] |

### Supervisor

| Thông tin | Nội dung |
|-----------|----------|
| **Họ và tên** | [Tên giảng viên] |
| **Chức danh** | [Giảng viên/Tiến sĩ] |
| **Email** | [supervisor@fpt.edu.vn] |
| **Số điện thoại** | [0123456789] |

---

## 1.2. PRODUCT BACKGROUND (Nền tảng sản phẩm)

### Bối cảnh và Vấn đề cần giải quyết

Trong bối cảnh giáo dục hiện đại, **Phương pháp học tập dựa trên dự án (Project-Based Learning - PBL)** đã trở thành một xu hướng quan trọng, giúp sinh viên phát triển:
- Kỹ năng thực hành và ứng dụng kiến thức vào thực tế
- Tư duy phản biện và giải quyết vấn đề
- Khả năng làm việc nhóm và giao tiếp
- Kỹ năng quản lý dự án và thời gian

Tuy nhiên, việc quản lý và tổ chức các dự án nhóm theo phương pháp PBL hiện nay đang gặp phải **nhiều thách thức đáng kể**:

#### 1. **Phân mảnh công cụ (Tool Fragmentation)**
- Sinh viên và giảng viên phải sử dụng **nhiều nền tảng độc lập** cho các mục đích khác nhau:
  - **Microsoft Teams/Zoom**: Họp video và cuộc gọi
  - **Slack/Discord**: Chat nhóm và giao tiếp
  - **Google Drive/OneDrive**: Chia sẻ tài liệu
  - **Trello/Jira**: Quản lý task và tiến độ
  - **Miro/Figma**: Bảng trắng và brainstorming
  - **Google Docs**: Soạn thảo tài liệu đồng thời
  - **Email**: Thông báo và liên lạc chính thức

- **Hậu quả**: 
  - Mất thời gian chuyển đổi giữa các ứng dụng
  - Thông tin bị phân tán, khó theo dõi
  - Chi phí đăng ký nhiều dịch vụ
  - Gián đoạn quy trình làm việc (workflow disruption)

#### 2. **Thiếu tích hợp và đồng bộ hóa**
- Các công cụ hiện tại **không được tối ưu hóa** cho môi trường PBL:
  - Không có hệ thống tích hợp quản lý dự án từ khởi tạo đến đánh giá
  - Thiếu khả năng cộng tác real-time trên nhiều mô-đun (whiteboard + chat + video)
  - Không có cơ chế theo dõi đóng góp cá nhân một cách minh bạch

#### 3. **Khó khăn trong theo dõi và đánh giá**
- Giảng viên gặp khó khăn khi:
  - Theo dõi tiến độ thực tế của từng nhóm
  - Đánh giá đóng góp công bằng của từng thành viên
  - Thu thập feedback và peer review một cách có tổ chức
  - Phát hiện sớm các nhóm gặp vấn đề

#### 4. **Thiếu hỗ trợ tự động hóa**
- Không có công cụ AI hỗ trợ:
  - Tạo milestone và lộ trình dự án tự động
  - Gợi ý giải pháp và hướng dẫn dự án
  - Phân tích tiến độ và đưa ra cảnh báo sớm

### Tầm quan trọng của giải pháp

Việc xây dựng một **nền tảng thống nhất, toàn diện** cho PBL sẽ:
- ✅ Giảm thiểu thời gian và công sức chuyển đổi giữa các công cụ
- ✅ Tăng hiệu quả cộng tác và giao tiếp trong nhóm
- ✅ Cải thiện khả năng theo dõi và quản lý dự án
- ✅ Đảm bảo đánh giá công bằng và minh bạch
- ✅ Nâng cao chất lượng học tập và kết quả dự án

---

## 1.3. EXISTING SYSTEMS (Hệ thống hiện có)

### Phân tích các giải pháp tương tự

#### 1. **Microsoft Teams for Education**

**Mô tả**:
- Nền tảng cộng tác và học tập trực tuyến của Microsoft
- Tích hợp với Office 365 (Word, Excel, PowerPoint, OneNote)
- Hỗ trợ video call, chat, chia sẻ file, assignments

**Ưu điểm**:
- ✅ Tích hợp tốt với hệ sinh thái Microsoft
- ✅ Bảo mật cao, tuân thủ GDPR
- ✅ Video conferencing chất lượng cao (Azure backend)
- ✅ Miễn phí cho tổ chức giáo dục

**Nhược điểm**:
- ❌ **Không tối ưu cho PBL**: Thiếu tính năng quản lý milestone, checkpoint cụ thể
- ❌ **Không có hệ thống đánh giá đóng góp cá nhân**: Không theo dõi được tỷ lệ đóng góp từng thành viên
- ❌ **Thiếu công cụ brainstorming real-time**: Không có whiteboard tương tác mạnh mẽ như Miro
- ❌ **Không có AI hỗ trợ**: Không có chatbot hoặc auto-generate project milestones
- ❌ **Interface phức tạp**: Quá nhiều tính năng, khó sử dụng cho học sinh

#### 2. **Google Classroom + Google Workspace**

**Mô tả**:
- Hệ thống quản lý lớp học trực tuyến của Google
- Kết hợp với Google Meet, Drive, Docs, Sheets

**Ưu điểm**:
- ✅ Giao diện đơn giản, dễ sử dụng
- ✅ Tích hợp mạnh mẽ với Google ecosystem
- ✅ Miễn phí, không giới hạn dung lượng Drive cho edu
- ✅ Google Docs hỗ trợ collaborative editing tốt

**Nhược điểm**:
- ❌ **Không phải PBL-focused**: Thiết kế cho assignment-based learning, không phải project management
- ❌ **Không có task board**: Không quản lý tasks như Trello/Jira
- ❌ **Thiếu peer review system**: Không có cơ chế đánh giá ngang hàng có cấu trúc
- ❌ **Không có whiteboard native**: Phải dùng Jamboard riêng (kém tích hợp)
- ❌ **Thiếu AI assistance**: Không có chatbot hoặc AI suggestions

#### 3. **Slack + Trello + Zoom (Combined Approach)**

**Mô tả**:
- Kết hợp nhiều công cụ: Slack (chat), Trello (task management), Zoom (video)

**Ưu điểm**:
- ✅ Mỗi công cụ mạnh trong lĩnh vực riêng
- ✅ Trello có Kanban board trực quan
- ✅ Slack có nhiều integration và bot
- ✅ Zoom có chất lượng video tốt

**Nhược điểm**:
- ❌ **Phân mảnh nghiêm trọng**: Phải chuyển đổi giữa 3+ apps khác nhau
- ❌ **Không có single source of truth**: Dữ liệu nằm rải rác
- ❌ **Chi phí cao**: Mỗi tool cần subscription riêng (Slack Pro, Trello Premium, Zoom Pro)
- ❌ **Không có evaluation system**: Không có tính năng đánh giá built-in
- ❌ **Khó setup và maintain**: Cần admin quản lý nhiều platform

#### 4. **Moodle + BigBlueButton**

**Mô tả**:
- LMS (Learning Management System) mã nguồn mở
- Tích hợp BigBlueButton cho video conferencing

**Ưu điểm**:
- ✅ Mã nguồn mở, miễn phí
- ✅ Có thể tự host và customize
- ✅ Hỗ trợ assignments và quizzes

**Nhược điểm**:
- ❌ **UI/UX lỗi thời**: Giao diện không hiện đại, kém trực quan
- ❌ **Không real-time collaboration**: Không có whiteboard, document editor sync
- ❌ **Performance kém**: Chậm với nhiều users
- ❌ **Không có AI features**: Thiếu hoàn toàn AI support
- ❌ **Khó deploy và maintain**: Cần kỹ năng sysadmin cao

#### 5. **Notion for Education**

**Mô tả**:
- All-in-one workspace cho note-taking, wiki, task management

**Ưu điểm**:
- ✅ Linh hoạt, có thể customize cao
- ✅ Có database, kanban, calendar views
- ✅ Collaborative editing real-time
- ✅ Notion AI có thể hỗ trợ writing

**Nhược điểm**:
- ❌ **Không có video call built-in**: Vẫn cần Zoom/Meet riêng
- ❌ **Không có whiteboard**: Chỉ có text và database
- ❌ **Không có evaluation system**: Không track contribution hoặc peer review
- ❌ **Learning curve cao**: Khó học và setup cho beginners
- ❌ **Không tối ưu cho education workflow**: Thiết kế cho general productivity

### Bảng so sánh tổng hợp

| Tính năng | MS Teams | Google Classroom | Slack+Trello+Zoom | Moodle+BBB | Notion | **CollabSphere** |
|-----------|----------|------------------|-------------------|------------|--------|------------------|
| Video Conference | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Real-time Chat | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ |
| Task Management | ⚠️ | ❌ | ✅ | ⚠️ | ✅ | ✅ |
| Whiteboard | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ✅ |
| Doc Collaboration | ✅ | ✅ | ❌ | ⚠️ | ✅ | ✅ |
| Milestone Tracking | ❌ | ❌ | ⚠️ | ❌ | ⚠️ | ✅ |
| Peer Review System | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| Contribution Tracking | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| AI Assistant | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ |
| Project Approval Workflow | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| PBL-Optimized | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| **Unified Platform** | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ | ✅ |

**Chú thích**: ✅ Hỗ trợ tốt | ⚠️ Hỗ trợ một phần | ❌ Không hỗ trợ

### Kết luận

Các hệ thống hiện có đều có những **hạn chế lớn** khi áp dụng cho môi trường PBL:
1. **Không có giải pháp nào tích hợp đầy đủ** tất cả công cụ cần thiết
2. **Thiếu tính năng đặc thù cho PBL** như milestone tracking, contribution scoring, peer review
3. **Không có AI hỗ trợ** việc tạo và quản lý dự án
4. **Yêu cầu kết hợp nhiều công cụ**, gây phân mảnh và giảm hiệu quả

➡️ **CollabSphere được xây dựng để giải quyết triệt để các vấn đề này**, cung cấp một nền tảng thống nhất, tối ưu hóa cho PBL với đầy đủ tính năng từ quản lý dự án, cộng tác real-time, đến đánh giá và AI hỗ trợ.

---

## 1.4. BUSINESS OPPORTUNITY (Cơ hội kinh doanh)

### Lợi ích của sản phẩm

#### 1. **Cho Sinh viên**
- 📌 **Workspace tập trung**: Tất cả công cụ cần thiết trong một nền tảng duy nhất
- 📌 **Cộng tác hiệu quả**: Real-time chat, video, whiteboard, document editing
- 📌 **Quản lý dự án dễ dàng**: Task board, milestone tracking, checkpoint submissions
- 📌 **Đánh giá minh bạch**: Xem được đóng góp của bản thân và nhận feedback
- 📌 **AI hỗ trợ**: Chatbot giúp brainstorming ý tưởng và giải quyết vấn đề
- 📌 **Học kỹ năng thực tế**: Làm quen với quy trình làm việc chuyên nghiệp

#### 2. **Cho Giảng viên**
- 👨‍🏫 **Quản lý dễ dàng**: Theo dõi nhiều nhóm, nhiều dự án trong một hệ thống
- 👨‍🏫 **Theo dõi tiến độ real-time**: Biết được nhóm nào đang gặp khó khăn để hỗ trợ kịp thời
- 👨‍🏫 **Đánh giá công bằng**: Hệ thống contribution tracking giúp đánh giá chính xác
- 👨‍🏫 **Tiết kiệm thời gian**: AI auto-generate milestones, tự động thông báo
- 👨‍🏫 **Peer review system**: Thu thập feedback từ sinh viên một cách có cấu trúc
- 👨‍🏫 **Xem workspace**: Quan sát cách nhóm làm việc mà không gián đoạn

#### 3. **Cho Nhà trường (Head of Department, Staff)**
- 🏫 **Quản lý curriculum**: Import và quản lý môn học, giáo trình một cách tập trung
- 🏫 **Phê duyệt dự án**: Workflow rõ ràng cho việc approve/reject projects
- 🏫 **Báo cáo và analytics**: Thống kê hiệu quả giảng dạy, tỷ lệ hoàn thành dự án
- 🏫 **Tiết kiệm chi phí**: Không cần mua nhiều subscription cho các công cụ khác nhau
- 🏫 **Dễ triển khai**: Cloud-based, không cần infrastructure phức tạp
- 🏫 **Scalable**: Có thể mở rộng cho toàn trường, nhiều khoa

### Thị trường mục tiêu

#### **Primary Market (Thị trường chính)**
- 🎯 **Các trường đại học áp dụng PBL**: 
  - FPT University (4 cơ sở, ~30,000 sinh viên)
  - RMIT Vietnam, VGU, Fulbright University Vietnam
  - Các trường công lập chuyển đổi sang PBL (HCMUT, UIT, FIT)
  
- 🎯 **Các khoa kỹ thuật, công nghệ**:
  - Software Engineering
  - Computer Science
  - Information Technology
  - Data Science

#### **Secondary Market (Thị trường phụ)**
- Các trung tâm đào tạo lập trình (CodeGym, MindX, Techmaster)
- Bootcamps và online courses
- Corporate training programs (đào tạo nội bộ doanh nghiệp)

### Mô hình kinh doanh tiềm năng

#### **Giai đoạn 1: MVP và Pilot (6-12 tháng đầu)**
- ✅ Triển khai thử nghiệm tại FPT University (1-2 lớp)
- ✅ Thu thập feedback và cải thiện
- ✅ Hoàn toàn miễn phí để xây dựng user base

#### **Giai đoạn 2: Mở rộng và Monetization**
- 💰 **Freemium Model**:
  - Free tier: Giới hạn 50 users/organization, 5GB storage
  - Pro tier: $5/user/month - Unlimited users, 100GB storage, priority support
  - Enterprise tier: Custom pricing - White-label, on-premise deployment, SLA

- 💰 **Add-on Services**:
  - AI credits: $10/100 requests (cho AI milestone generation, chatbot)
  - Additional storage: $0.10/GB/month
  - Custom integrations: Professional services

#### **Giai đoạn 3: Mở rộng khu vực**
- Mở rộng sang các trường đại học khác tại Việt Nam
- Phát triển phiên bản quốc tế (English, multi-language)
- Thâm nhập thị trường Đông Nam Á (Singapore, Thailand, Indonesia)

### ROI (Return on Investment) ước tính

#### **Chi phí vận hành**
- Cloud hosting (Azure/AWS): $200-500/month cho 500-1000 users
- AI API costs (AWS Bedrock): $50-200/month
- Maintenance và support: $1000-2000/month

#### **Doanh thu tiềm năng (sau 2 năm)**
- 10 trường đại học × 500 users × $3/user/month = **$15,000/month**
- 5 enterprise clients × $500/month = **$2,500/month**
- **Tổng: ~$17,500/month = $210,000/năm**

---

## 1.5. SOFTWARE PRODUCT VISION (Tầm nhìn sản phẩm)

### Vision Statement

> **"CollabSphere aspires to be the leading all-in-one platform for Project-Based Learning, empowering students and educators to collaborate seamlessly, manage projects efficiently, and achieve learning excellence through innovative technology."**

> **"CollabSphere hướng tới trở thành nền tảng hàng đầu cho Học tập dựa trên Dự án, trao quyền cho sinh viên và giảng viên cộng tác liền mạch, quản lý dự án hiệu quả, và đạt được sự xuất sắc trong học tập thông qua công nghệ đổi mới."**

### Mission

Cung cấp một **hệ thống tích hợp toàn diện** giúp:
1. **Đơn giản hóa quy trình PBL**: Từ khởi tạo dự án đến đánh giá cuối cùng
2. **Nâng cao chất lượng cộng tác**: Thông qua các công cụ real-time hiện đại
3. **Đảm bảo đánh giá công bằng**: Với hệ thống theo dõi đóng góp minh bạch
4. **Tận dụng sức mạnh AI**: Để hỗ trợ học tập và quản lý dự án thông minh hơn

### Core Values

1. **🎓 Education-Focused**: Thiết kế đặc biệt cho môi trường giáo dục, không phải enterprise
2. **🤝 Collaboration-First**: Ưu tiên trải nghiệm cộng tác và teamwork
3. **📊 Transparency**: Minh bạch trong theo dõi tiến độ và đánh giá đóng góp
4. **🚀 Innovation**: Không ngừng cải tiến với công nghệ mới (AI, real-time)
5. **💡 Simplicity**: Giao diện đơn giản, dễ sử dụng cho mọi đối tượng

### Long-term Goals (3-5 năm)

#### **Year 1-2: Establish Foundation**
- ✅ Hoàn thiện MVP và triển khai tại FPT University
- ✅ Đạt 1,000+ active users
- ✅ Đạt 80%+ user satisfaction rate
- ✅ Thu thập 500+ project data cho AI training

#### **Year 3: Scale và Monetize**
- 📈 Mở rộng ra 10+ trường đại học tại Việt Nam
- 📈 Đạt 10,000+ active users
- 📈 Ra mắt Premium và Enterprise tiers
- 📈 Tích hợp với LMS phổ biến (Moodle, Canvas)

#### **Year 4-5: Regional Expansion**
- 🌏 Phát triển multi-language support
- 🌏 Thâm nhập thị trường ASEAN (Singapore, Thailand, Malaysia)
- 🌏 Xây dựng marketplace cho project templates
- 🌏 Phát triển mobile apps (iOS, Android)

### Success Metrics (KPIs)

| Metric | Target Year 1 | Target Year 3 |
|--------|---------------|---------------|
| Active Users | 1,000 | 10,000 |
| Active Groups | 200 | 2,000 |
| Projects Created | 500 | 5,000 |
| User Retention Rate | 70% | 85% |
| Average Session Time | 30 min | 45 min |
| NPS (Net Promoter Score) | 50 | 70 |
| System Uptime | 99% | 99.9% |

---

## 1.6. PROJECT SCOPE & LIMITATIONS (Phạm vi và Giới hạn)

### 1.6.1. Major Features (Tính năng chính)

Các tính năng được phân loại theo vai trò người dùng và đánh số theo format **FE-XX** (Functional Feature).

#### **A. Authentication & Account Management (Xác thực và Quản lý tài khoản)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-01** | User Registration & Login | Đăng ký tài khoản, đăng nhập với email/password, JWT authentication | All |
| **FE-02** | Role-Based Access Control | Phân quyền theo 5 vai trò: Admin, Staff, Head, Lecturer, Student | All |
| **FE-03** | Profile Management | Xem và chỉnh sửa thông tin cá nhân, avatar, password | All |
| **FE-04** | Account Activation/Deactivation | Admin có thể hủy kích hoạt tài khoản người dùng | Admin |

#### **B. Administrative Functions (Chức năng quản trị)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-05** | View All Accounts | Admin xem danh sách tất cả users (Staff, Head, Lecturer, Student) | Admin |
| **FE-06** | System Reports | Xem báo cáo lỗi và feedback từ users qua email | Admin |
| **FE-07** | Dashboard Analytics | Thống kê tổng quan hệ thống (số users, projects, groups) | Admin |

#### **C. Staff Functions (Chức năng nhân viên)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-08** | Import Subjects from File | Upload CSV/Excel để tự động tạo môn học (code, name, description) | Staff |
| **FE-09** | Manage Subjects | CRUD operations cho môn học | Staff |
| **FE-10** | Import Curricula from File | Upload file để tạo giáo trình liên kết với môn học | Staff |
| **FE-11** | Manage Curricula | CRUD operations cho giáo trình | Staff |
| **FE-12** | Import Classes from File | Tạo lớp học hàng loạt từ file | Staff |
| **FE-13** | Manage Classes | Quản lý thông tin lớp học (code, name, semester) | Staff |
| **FE-14** | Import Users from File | Tạo tài khoản giảng viên và sinh viên hàng loạt | Staff |
| **FE-15** | Assign Lecturer to Class | Phân công giảng viên dạy lớp | Staff |
| **FE-16** | Assign Students to Class | Thêm sinh viên vào lớp học | Staff |

#### **D. Department Head Functions (Chức năng trưởng khoa)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-17** | View All Projects | Xem danh sách tất cả dự án (pending, approved, rejected) | Head |
| **FE-18** | Approve/Reject Projects | Phê duyệt hoặc từ chối dự án đang chờ với lý do | Head |
| **FE-19** | Update Approved Projects | Chỉnh sửa thông tin dự án đã được phê duyệt | Head |
| **FE-20** | Assign Projects to Classes | Phân công dự án cho các lớp học từ danh sách approved | Head |
| **FE-21** | View All Classes | Xem danh sách và chi tiết tất cả lớp học | Head |

#### **E. Lecturer Functions (Chức năng giảng viên)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-22** | Create Project | Tạo dự án mới (title, description, goals, milestones) | Lecturer |
| **FE-23** | AI Generate Milestones | Sử dụng AI để tự động tạo milestones dựa trên curriculum | Lecturer |
| **FE-24** | Submit Project for Approval | Gửi dự án pending lên Head để phê duyệt | Lecturer |
| **FE-25** | View Own Projects | Xem danh sách dự án của mình (pending, approved, rejected) | Lecturer |
| **FE-26** | Assign Project to Class | Chọn dự án từ approved list gán cho lớp mình dạy | Lecturer |
| **FE-27** | Create Groups | Tạo nhóm trong lớp, chọn leader, thêm members | Lecturer |
| **FE-28** | Manage Group Members | Thêm/xóa thành viên khỏi nhóm | Lecturer |
| **FE-29** | Assign Project to Group | Chọn dự án cho từng nhóm trong lớp | Lecturer |
| **FE-30** | Track Group Progress | Xem tiến độ milestones và completion rate của nhóm | Lecturer |
| **FE-31** | Track Member Contribution | Xem contribution score của từng thành viên (tasks completed, attendance) | Lecturer |
| **FE-32** | AI Progress Analysis | Sử dụng AI để phân tích tiến độ và nhận recommendations | Lecturer |
| **FE-33** | Manage Group Milestones | Tạo, chỉnh sửa milestones cho nhóm dựa trên project template | Lecturer |
| **FE-34** | Create Milestone Questions | Tạo câu hỏi cho từng milestone để nhóm trả lời | Lecturer |
| **FE-35** | View Milestone Answers | Xem câu trả lời của students cho milestone questions | Lecturer |
| **FE-36** | View Checkpoint Submissions | Xem bài nộp checkpoint của nhóm | Lecturer |
| **FE-37** | View Group Workspace | Xem task board và workspace của nhóm (read-only) | Lecturer |
| **FE-38** | Manage Class Resources | Upload/download tài liệu cho lớp (slides, documents) | Lecturer |
| **FE-39** | Manage Group Resources | Upload/download tài liệu cho từng nhóm | Lecturer |
| **FE-40** | Evaluate Groups | Đánh giá nhóm khi kết thúc dự án (score, feedback) | Lecturer |
| **FE-41** | Evaluate Members | Đánh giá từng thành viên (score, feedback) | Lecturer |
| **FE-42** | Evaluate Checkpoints | Đánh giá checkpoint submissions với comments | Lecturer |
| **FE-43** | View Peer Reviews | Xem đánh giá ngang hàng giữa các students | Lecturer |
| **FE-44** | Chat with Groups | Gửi tin nhắn real-time cho nhóm qua chat system | Lecturer |
| **FE-45** | Schedule Meetings | Tạo cuộc họp video cho nhóm, gửi thông báo | Lecturer |
| **FE-46** | Join Video Meetings | Tham gia video call với nhóm | Lecturer |
| **FE-47** | Use AI Chatbot | Sử dụng AI assistant để brainstorm và hỗ trợ giảng dạy | Lecturer |

#### **F. Student Functions (Chức năng sinh viên)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-48** | View Assigned Classes | Xem danh sách lớp học được phân công | Student |
| **FE-49** | View Group Details | Xem thông tin nhóm, members, assigned project | Student |
| **FE-50** | View Group Progress | Xem tiến độ milestones và contribution chart | Student |
| **FE-51** | Mark Milestones Complete | Group leader đánh dấu milestone hoàn thành | Student (Leader) |
| **FE-52** | Answer Milestone Questions | Trả lời câu hỏi của giảng viên cho từng milestone | Student |
| **FE-53** | Create Checkpoints | Group leader tạo checkpoint, assign members | Student (Leader) |
| **FE-54** | Submit Checkpoints | Thành viên nộp bài cho checkpoint | Student |
| **FE-55** | Mark Checkpoints Complete | Assigned members đánh dấu checkpoint hoàn thành | Student |
| **FE-56** | Manage Tasks | Tạo, chỉnh sửa, xóa tasks trong workspace (Kanban board) | Student |
| **FE-57** | Assign Tasks | Phân công tasks cho thành viên | Student |
| **FE-58** | Update Task Status | Di chuyển task giữa các columns (To Do, In Progress, Done) | Student |
| **FE-59** | View/Upload Group Resources | Xem và upload tài liệu cho nhóm | Student |
| **FE-60** | Peer Review | Đánh giá các thành viên khác trong nhóm (rating, comments) | Student |
| **FE-61** | Review Milestone Answers | Đánh giá câu trả lời milestone của thành viên khác | Student |
| **FE-62** | View Evaluations | Xem đánh giá từ giảng viên và peer reviews | Student |
| **FE-63** | Use AI Chatbot | Chat với AI để hỏi đáp, brainstorming ý tưởng | Student |

#### **G. Real-time Collaboration (Cộng tác thời gian thực)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-64** | Real-time Chat | Gửi/nhận tin nhắn text trong nhóm qua WebSocket | Lecturer, Student |
| **FE-65** | Video Conferencing | Cuộc gọi video/audio chất lượng cao với WebRTC | Lecturer, Student |
| **FE-66** | Screen Sharing | Chia sẻ màn hình trong cuộc họp | Lecturer, Student |
| **FE-67** | Interactive Whiteboard | Vẽ, brainstorm trên bảng trắng real-time đồng bộ | Lecturer, Student |
| **FE-68** | Collaborative Text Editor | Soạn thảo document đồng thời (Google Docs-like) | Lecturer, Student |
| **FE-69** | Meeting Scheduling | Lên lịch họp trong tương lai, gửi thông báo nhắc nhở | Lecturer, Student |

#### **H. Notification System (Hệ thống thông báo)**

| Feature ID | Feature Name | Description | User Role |
|------------|--------------|-------------|-----------|
| **FE-70** | Email Notifications | Thông báo qua email cho các events quan trọng | All |
| **FE-71** | Real-time Notifications | Thông báo trong app (toast/bell icon) với WebSocket | All |
| **FE-72** | Notification History | Xem lịch sử thông báo, mark as read | All |

### 1.6.2. Limitations & Exclusions (Giới hạn và Loại trừ)

Các giới hạn được đánh số theo format **LI-XX** (Limitation).

| Limit ID | Limitation | Reason / Explanation |
|----------|------------|----------------------|
| **LI-01** | Không xác thực email FPT | Không tích hợp với hệ thống SSO của trường do giới hạn quyền truy cập API |
| **LI-02** | Chỉ hỗ trợ tiếng Việt và tiếng Anh | Multi-language cho nhiều ngôn ngữ khác sẽ được phát triển trong phiên bản tương lai |
| **LI-03** | Không có mobile app native | Chỉ có responsive web app, iOS/Android app sẽ phát triển sau |
| **LI-04** | Giới hạn file upload 100MB/file | Để tiết kiệm storage cost và tránh abuse |
| **LI-05** | AI chatbot chỉ support tiếng Anh | Do model AWS Bedrock được train chủ yếu trên English data |
| **LI-06** | Không hỗ trợ offline mode | Yêu cầu internet connection liên tục cho real-time features |
| **LI-07** | Video call tối đa 20 người | Giới hạn bởi WebRTC peer connections và bandwidth |
| **LI-08** | Whiteboard không hỗ trợ image import | Chỉ hỗ trợ drawing và shapes, image upload sẽ bổ sung sau |
| **LI-09** | Không tích hợp với calendar bên ngoài | Không sync với Google Calendar, Outlook Calendar |
| **LI-10** | Không có plagiarism detection | Không kiểm tra đạo văn trong submissions |
| **LI-11** | Backup thủ công | Không có auto-backup, admin cần export data định kỳ |
| **LI-12** | Chỉ hỗ trợ PostgreSQL | Không support MySQL, MongoDB hoặc DB khác |
| **LI-13** | Real-time sync delay <2s | Không đảm bảo instant sync cho collaborative editor |
| **LI-14** | Không có version control cho documents | Không có history/restore cho collaborative docs |
| **LI-15** | Notification email không customizable | Template email cố định, không cho phép user tùy chỉnh |

### 1.6.3. Out of Scope (Ngoài phạm vi)

Các tính năng **không nằm trong phạm vi** đồ án này (có thể phát triển sau):

❌ Tích hợp thanh toán (payment gateway)  
❌ Marketplace cho project templates  
❌ Gamification (badges, leaderboards, achievements)  
❌ Advanced analytics và BI dashboard  
❌ LTI integration với LMS (Moodle, Canvas)  
❌ LDAP/Active Directory integration  
❌ Custom domain và white-label  
❌ API public cho third-party developers  
❌ Mobile push notifications  
❌ Advanced security features (2FA, SSO, SAML)  
❌ Compliance certifications (SOC 2, ISO 27001)  
❌ Multi-tenancy architecture  
❌ Advanced AI features (code review, auto-grading)

### 1.6.4. Technical Constraints (Ràng buộc kỹ thuật)

| Constraint | Description |
|------------|-------------|
| **Browser Support** | Chrome 90+, Firefox 88+, Edge 90+, Safari 14+ |
| **Screen Resolution** | Tối thiểu 1366x768, tối ưu cho 1920x1080 |
| **Internet Speed** | Tối thiểu 2 Mbps cho video call, 1 Mbps cho các tính năng khác |
| **Concurrent Users** | Hệ thống thiết kế cho tối đa 500 concurrent users (có thể scale) |
| **Data Storage** | 100GB miễn phí/organization, $0.10/GB/month thêm |
| **API Rate Limit** | 100 requests/minute/user để tránh abuse |
| **Session Timeout** | 24 giờ cho JWT token, auto-refresh khi active |
| **File Types Allowed** | PDF, DOCX, XLSX, PPTX, PNG, JPG, MP4 (không cho .exe, .bat) |

---

**END OF SECTION I - PROJECT INTRODUCTION**

---
