# PHẦN MỞ ĐẦU (FRONT MATTER)

---

## CAPSTONE PROJECT DOCUMENT

**CollabSphere - Hệ Thống Hỗ Trợ Học Tập Dựa Trên Dự Án**

**Project-Based Learning Management System**

---

## GROUP MEMBERS

| STT | Full Name | Role | Email | Mobile |
|-----|-----------|------|-------|--------|
| 1   | [Điền tên thành viên 1] | Team Leader / Backend Developer | [email1@example.com] | [0123456789] |
| 2   | [Điền tên thành viên 2] | Frontend Developer | [email2@example.com] | [0987654321] |
| 3   | [Điền tên thành viên 3] | Full-stack Developer | [email3@example.com] | [0912345678] |
| 4   | [Điền tên thành viên 4] | UI/UX Designer & Tester | [email4@example.com] | [0908765432] |

> **Lưu ý**: Vui lòng cập nhật thông tin thành viên thật của team vào bảng trên.

---

## SUPERVISOR

**Tên giảng viên**: [TÊN GIẢNG VIÊN HƯỚNG DẪN]  
**Chức danh**: [Giảng viên/Tiến sĩ/...]  
**Email**: [supervisor@example.com]  
**Số điện thoại**: [0123456789]  
**Khoa**: Công nghệ phần mềm

---

## CAPSTONE PROJECT CODE

**Mã dự án**: SP25SE107  
**Học kỳ**: Spring 2025  
**Năm học**: 2024-2025

---

## TABLE OF CONTENTS

1. **Phần Mở Đầu (Front Matter)** .................................................... 1
   - Group Members ................................................................ 1
   - Supervisor ..................................................................... 1
   - Capstone Project Code ........................................................ 1
   - Table of Contents ............................................................. 2
   - Acknowledgement ............................................................... 3
   - Definition and Acronyms ...................................................... 4

2. **I. Project Introduction (Giới thiệu dự án)** .............................. 5
   - 1.1. Overview ................................................................. 5
   - 1.2. Product Background ....................................................... 6
   - 1.3. Existing Systems ......................................................... 7
   - 1.4. Business Opportunity ..................................................... 8
   - 1.5. Software Product Vision .................................................. 9
   - 1.6. Project Scope & Limitations ............................................. 10

3. **II. Project Management Plan (Kế hoạch quản lý dự án)** .................... 15
   - 2.1. Overview - WBS .......................................................... 15
   - 2.2. Management Approach ..................................................... 18
   - 2.3. Project Deliverables .................................................... 19
   - 2.4. Responsibility Assignments .............................................. 20
   - 2.5. Project Communications .................................................. 21
   - 2.6. Configuration Management ................................................ 22

4. **III. Software Requirement Specification (SRS)** ........................... 25
   - 3.1. Product Overview ........................................................ 25
   - 3.2. User Requirements ....................................................... 26
   - 3.3. Functional Requirements ................................................. 30
   - 3.4. Non-Functional Requirements ............................................. 50
   - 3.5. Requirement Appendix .................................................... 55

5. **IV. Software Design Description (SDD)** ................................... 60
   - 4.1. System Design ........................................................... 60
   - 4.2. Database Design ......................................................... 65
   - 4.3. Detailed Design ......................................................... 75

6. **V. Software Testing Documentation** ....................................... 90
   - 5.1. Scope of Testing ........................................................ 90
   - 5.2. Test Strategy ........................................................... 91
   - 5.3. Test Plan ............................................................... 92
   - 5.4. Test Cases .............................................................. 95
   - 5.5. Test Reports ........................................................... 120

7. **VI. Release Package & User Guides** ...................................... 125
   - 6.1. Deliverable Package .................................................... 125
   - 6.2. Installation Guides .................................................... 126
   - 6.3. User Manual ............................................................ 130

8. **Appendix** .................................................................... 150
   - Appendix A: API Documentation ............................................... 150
   - Appendix B: Database Schema ................................................. 160
   - Appendix C: GUI Screenshots ................................................. 170
   - Appendix D: Source Code Repository .......................................... 180

---

## ACKNOWLEDGEMENT

Chúng em xin gửi lời cảm ơn chân thành đến:

**Quý Thầy/Cô Khoa Công Nghệ Phần Mềm**, đặc biệt là **[Tên Giảng viên hướng dẫn]**, người đã tận tình hướng dẫn, chỉ bảo và động viên nhóm trong suốt quá trình thực hiện đồ án tốt nghiệp. Sự định hướng và góp ý quý báu của Thầy/Cô đã giúp chúng em hoàn thành sản phẩm CollabSphere một cách tốt nhất.

**Gia đình và bạn bè**, những người luôn bên cạnh, động viên và hỗ trợ chúng em về mặt tinh thần trong suốt thời gian học tập và thực hiện dự án.

**Các bạn sinh viên** đã tham gia thử nghiệm và đóng góp ý kiến phản hồi để cải thiện hệ thống.

Dù đã nỗ lực hết mình, nhưng do thời gian và kinh nghiệm còn hạn chế, sản phẩm không tránh khỏi những thiếu sót. Chúng em rất mong nhận được sự thông cảm và những ý kiến đóng góp quý báu từ Quý Thầy/Cô để hoàn thiện hơn.

Chúng em xin chân thành cảm ơn!

**Trân trọng,**  
**Nhóm sinh viên thực hiện dự án CollabSphere**  
**[Tên nhóm - nếu có]**

Ngày [DD] tháng [MM] năm 2025

---

## DEFINITION AND ACRONYMS

| Acronym | Definition | Giải thích |
|---------|------------|------------|
| **COSRE** | CollabSphere | Tên viết tắt của hệ thống |
| **PBL** | Project-Based Learning | Phương pháp học tập dựa trên dự án |
| **SRS** | Software Requirements Specification | Đặc tả yêu cầu phần mềm |
| **SDD** | Software Design Description | Mô tả thiết kế phần mềm |
| **API** | Application Programming Interface | Giao diện lập trình ứng dụng |
| **REST** | Representational State Transfer | Kiến trúc API RESTful |
| **JWT** | JSON Web Token | Token xác thực dạng JSON |
| **RBAC** | Role-Based Access Control | Kiểm soát truy cập dựa trên vai trò |
| **CRUD** | Create, Read, Update, Delete | Các thao tác cơ bản trên dữ liệu |
| **ERD** | Entity Relationship Diagram | Sơ đồ quan hệ thực thể |
| **UML** | Unified Modeling Language | Ngôn ngữ mô hình hóa thống nhất |
| **UI/UX** | User Interface / User Experience | Giao diện người dùng / Trải nghiệm người dùng |
| **SPA** | Single Page Application | Ứng dụng web một trang |
| **HTTPS** | Hypertext Transfer Protocol Secure | Giao thức HTTP bảo mật |
| **WebRTC** | Web Real-Time Communication | Công nghệ giao tiếp thời gian thực |
| **WebSocket** | WebSocket Protocol | Giao thức kết nối hai chiều thời gian thực |
| **AI** | Artificial Intelligence | Trí tuệ nhân tạo |
| **LLM** | Large Language Model | Mô hình ngôn ngữ lớn |
| **AWS** | Amazon Web Services | Dịch vụ đám mây Amazon |
| **ORM** | Object-Relational Mapping | Ánh xạ đối tượng quan hệ |
| **SQL** | Structured Query Language | Ngôn ngữ truy vấn có cấu trúc |
| **MVC** | Model-View-Controller | Mô hình kiến trúc MVC |
| **CI/CD** | Continuous Integration / Continuous Deployment | Tích hợp liên tục / Triển khai liên tục |
| **VCS** | Version Control System | Hệ thống quản lý phiên bản |
| **Git** | Git Version Control | Hệ thống quản lý phiên bản Git |
| **JSON** | JavaScript Object Notation | Định dạng dữ liệu JSON |
| **CSV** | Comma-Separated Values | Định dạng file phân tách bằng dấu phẩy |
| **SMTP** | Simple Mail Transfer Protocol | Giao thức gửi email |
| **WBS** | Work Breakdown Structure | Cấu trúc phân rã công việc |
| **RACI** | Responsible, Accountable, Consulted, Informed | Ma trận phân công trách nhiệm |
| **UAT** | User Acceptance Testing | Kiểm thử chấp nhận người dùng |
| **BA** | Business Analysis | Phân tích nghiệp vụ |
| **QA** | Quality Assurance | Đảm bảo chất lượng |
| **PM** | Project Manager | Quản lý dự án |
| **TLS** | Transport Layer Security | Bảo mật tầng giao vận |
| **DoS** | Denial of Service | Từ chối dịch vụ |
| **DDoS** | Distributed Denial of Service | Từ chối dịch vụ phân tán |
| **CORS** | Cross-Origin Resource Sharing | Chia sẻ tài nguyên cross-origin |
| **CDN** | Content Delivery Network | Mạng phân phối nội dung |
| **IDE** | Integrated Development Environment | Môi trường phát triển tích hợp |
| **OS** | Operating System | Hệ điều hành |
| **DB** | Database | Cơ sở dữ liệu |
| **FE** | Frontend | Giao diện người dùng |
| **BE** | Backend | Phía máy chủ |

---

**Ghi chú**: Tài liệu này tuân thủ theo template yêu cầu của đồ án tốt nghiệp và được cập nhật liên tục trong quá trình phát triển dự án.

---
