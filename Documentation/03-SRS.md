# III. SOFTWARE REQUIREMENT SPECIFICATION (SRS)

**Đặc tả Yêu cầu Phần mềm - CollabSphere**

---

## DOCUMENT INFORMATION

| Thông tin | Nội dung |
|-----------|----------|
| **Document Title** | Software Requirements Specification (SRS) |
| **Project Name** | CollabSphere - Project-Based Learning Management System |
| **Project Code** | SP25SE107 |
| **Version** | 1.0 |
| **Date** | January 3, 2026 |
| **Status** | Draft |

---

## TABLE OF CONTENTS

### [3.1. Product Overview](03-SRS/3.1-ProductOverview.md)
Tổng quan về sản phẩm CollabSphere, mục đích, phạm vi, và tầm nhìn hệ thống.

### [3.2. User Requirements](03-SRS/3.2-UserRequirements.md)
Yêu cầu người dùng chi tiết qua 42 Use Cases, mô tả các chức năng từ góc nhìn người dùng.

### [3.3. Functional Requirements](03-SRS/3.3-FunctionalRequirements.md)
Yêu cầu chức năng chi tiết - 72 Features (FE-01 → FE-72) phân loại theo 8 modules chính.

### [3.4. Non-Functional Requirements](03-SRS/3.4-NonFunctionalRequirements.md)
Yêu cầu phi chức năng về Performance, Security, Usability, Reliability, và Scalability.

### [3.5. Requirement Appendix](03-SRS/3.5-RequirementAppendix.md)
Phụ lục bao gồm Business Rules, Data Dictionary, và Traceability Matrix.

---

## DOCUMENT OVERVIEW

Tài liệu này mô tả **đầy đủ các yêu cầu chức năng và phi chức năng** của hệ thống CollabSphere - một nền tảng hỗ trợ học tập dựa trên dự án (Project-Based Learning).

### Mục đích tài liệu

1. **Làm rõ yêu cầu**: Định nghĩa chi tiết những gì hệ thống phải làm và cách thức hoạt động
2. **Cơ sở thiết kế**: Cung cấp input cho giai đoạn thiết kế (SDD) và implementation
3. **Chuẩn cho testing**: Làm căn cứ để viết test cases và kiểm thử chấp nhận
4. **Tài liệu tham khảo**: Cho developers, testers, và stakeholders hiểu rõ hệ thống

### Đối tượng đọc

- **Nhóm phát triển**: Developers, designers, testers
- **Giảng viên hướng dẫn**: Để review và góp ý
- **Stakeholders**: Sinh viên, giảng viên sẽ sử dụng hệ thống
- **Người bảo trì**: Để hiểu hệ thống khi maintenance sau này

### Cấu trúc tài liệu

Tài liệu được chia thành **5 phần chính**:

#### **Section 3.1: Product Overview** 
Giới thiệu tổng quan về CollabSphere, bối cảnh, vấn đề cần giải quyết, và solution overview.

#### **Section 3.2: User Requirements**
Mô tả **42 Use Cases** chi tiết từ góc nhìn người dùng, bao gồm:
- UC001-UC031: Use cases cho Lecturer và Student
- UC032-UC042: Use cases bổ sung cho Student
- Flow diagram và preconditions/postconditions cho mỗi use case

#### **Section 3.3: Functional Requirements**
Chi tiết **72 Functional Features** (FE-01 → FE-72) được phân loại theo:
- Authentication & Account Management (FE-01 ~ FE-04)
- Administrative Functions (FE-05 ~ FE-07)
- Staff Functions (FE-08 ~ FE-19)
- Head of Department Functions (FE-20 ~ FE-28)
- Lecturer Functions (FE-29 ~ FE-47)
- Student Functions (FE-48 ~ FE-63)
- Real-time Collaboration (FE-64 ~ FE-69)
- Notification System (FE-70 ~ FE-72)

#### **Section 3.4: Non-Functional Requirements**
Yêu cầu về chất lượng hệ thống:
- **Performance**: Response time, throughput, resource usage
- **Security**: Authentication, authorization, data protection
- **Usability**: UI/UX standards, accessibility
- **Reliability**: Availability, fault tolerance, recovery
- **Scalability**: Growth capacity, load handling

#### **Section 3.5: Requirement Appendix**
Thông tin bổ sung:
- **Business Rules** (BR-01 ~ BR-20): Các quy tắc nghiệp vụ
- **Data Dictionary**: Định nghĩa các entities và attributes
- **Traceability Matrix**: Ánh xạ Use Cases → Features → Test Cases

---

## ASSUMPTIONS AND DEPENDENCIES

### Assumptions (Giả định)

1. **Người dùng có kết nối internet**: Hệ thống yêu cầu internet liên tục cho real-time features
2. **Browser hiện đại**: Users sử dụng Chrome 90+, Firefox 88+, Edge 90+, hoặc Safari 14+
3. **Thiết bị phù hợp**: Desktop/laptop với màn hình tối thiểu 1366x768
4. **Kỹ năng cơ bản**: Users có kỹ năng sử dụng máy tính và web browser cơ bản
5. **Email hợp lệ**: Mỗi user có email address để nhận thông báo
6. **Dữ liệu chính xác**: Import data (subjects, classes) từ Staff đúng format và chính xác

### Dependencies (Phụ thuộc)

1. **External Services**:
   - AWS Bedrock (Claude) cho AI chatbot
   - Cloudinary hoặc AWS S3 cho file storage
   - SMTP server cho email notifications
   - WebRTC infrastructure cho video calls

2. **Third-party Libraries**:
   - React 18+ cho frontend
   - FastAPI cho backend REST API
   - SQLModel/SQLAlchemy cho ORM
   - Socket.IO cho real-time communication

3. **Infrastructure**:
   - PostgreSQL database server
   - Redis cho caching (optional)
   - Docker cho containerization
   - Cloud platform (Azure/AWS) cho deployment

4. **Data Dependencies**:
   - Subject và curriculum data từ Staff
   - User accounts (lecturers, students) được tạo trước
   - Class assignments từ hệ thống quản lý sinh viên

---

## TERMINOLOGY AND CONVENTIONS

### Naming Conventions

- **Use Case ID**: `UC###` (ví dụ: UC001, UC042)
- **Feature ID**: `FE-##` (ví dụ: FE-01, FE-72)
- **Business Rule ID**: `BR-##` (ví dụ: BR-01, BR-20)
- **Limitation ID**: `LI-##` (ví dụ: LI-01, LI-15)
- **Non-Functional Req ID**: `NFR-##` (ví dụ: NFR-01, NFR-30)

### Priority Levels

| Priority | Description | Implementation Timing |
|----------|-------------|----------------------|
| **MUST** | Critical, required for MVP | Sprint 1-4 |
| **SHOULD** | Important, high value | Sprint 5-6 |
| **COULD** | Nice to have, lower priority | Sprint 7-8 |
| **WON'T** | Out of scope for this version | Future releases |

### Requirement Status

| Status | Meaning |
|--------|---------|
| **Proposed** | Đang đề xuất, chưa approved |
| **Approved** | Đã được approval, ready for implementation |
| **Implemented** | Đã code xong |
| **Tested** | Đã test và pass |
| **Deferred** | Hoãn lại cho version sau |
| **Rejected** | Không implement |

---

## REFERENCES

### Internal Documents

1. [00-FrontMatter.md](00-FrontMatter.md) - Project information and team
2. [01-ProjectIntroduction.md](01-ProjectIntroduction.md) - Business context and scope
3. [02-ProjectManagementPlan.md](02-ProjectManagementPlan.md) - Project management approach
4. [Doc/usecase.md](../Doc/usecase.md) - Use case specifications
5. [Doc/ss2.drawio.png](../Doc/ss2.drawio.png) - Use case diagram
6. [ERD_DATABASE_DESIGN_COLLABSPHERE.md](../ERD_DATABASE_DESIGN_COLLABSPHERE.md) - Database design

### External Standards

1. **IEEE 830-1998**: IEEE Recommended Practice for Software Requirements Specifications
2. **ISO/IEC 25010**: Systems and software Quality Requirements and Evaluation (SQuaRE)
3. **WCAG 2.1**: Web Content Accessibility Guidelines
4. **OWASP Top 10**: Web application security risks

---

## REVISION HISTORY

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 0.1 | Dec 20, 2025 | Team | Initial draft with use cases |
| 0.5 | Dec 28, 2025 | Team | Added functional requirements |
| 1.0 | Jan 3, 2026 | Team | Complete SRS with all sections |

---

## APPROVAL

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Team Leader** | [Name] | _____________ | ______ |
| **Supervisor** | [Lecturer Name] | _____________ | ______ |
| **Reviewer** | [Name] | _____________ | ______ |

---

**[← Back to Documentation Index](README.md)** | **[Next: Section 3.1 Product Overview →](03-SRS/3.1-ProductOverview.md)**
