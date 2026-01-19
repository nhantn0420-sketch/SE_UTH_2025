# 📊 HƯỚNG DẪN MAPPING HÌNH ẢNH CHO 3.2-UserRequirements.md

## ✅ HIỆN TẠI ĐÃ CÓ

### Line 13: UseCaseDiagramSummary.drawio.png
- **Figure 3.2.1**: Overall Use Case Diagram
- **Trạng thái**: ✅ CORRECT - Đã có và đúng vị trí

---

## 🔴 CẦN THÊM - DANH SÁCH CHI TIẾT

### **CATEGORY 1: PROJECT MANAGEMENT (Lines 38-307)**

#### 1️⃣ CreateProjectFlowwithAIMilestoneGeneration.png
- **Vị trí**: Sau line 82 (sau header `#### **UC002: Create Projects**`)
- **Figure Number**: 3.2.2
- **Caption đề xuất**: 
  ```markdown
  ![Figure 3.2.2: UC002 - Create Project Flow with AI Milestone Generation](../../../Images/CreateProjectFlowwithAIMilestoneGeneration.png)
  
  *Figure 3.2.2: Activity diagram showing the flow of creating a project with AI-assisted milestone generation*
  ```
- **Lý do**: UC002 mô tả quy trình tạo project phức tạp với AI generate milestones - cần diagram để minh họa
- **Priority**: 🔥 HIGH

---

#### 2️⃣ ApproveProjectFlow.png
- **Vị trí**: Sau line 176 (sau header `#### **UC004: Submit Pending Projects**`)
- **Figure Number**: 3.2.3
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.3: UC004 - Project Approval Workflow](../../../Images/ApproveProjectFlow.png)
  
  *Figure 3.2.3: Activity diagram illustrating the project submission and approval process flow*
  ```
- **Lý do**: UC004 mô tả flow Submit → Review → Approve/Deny - diagram giúp hiểu rõ workflow
- **Priority**: 🔥 HIGH

---

#### 3️⃣ StudentPicksProjectforTeam.png
- **Vị trí**: Sau line 261 (sau header `#### **UC006: Pick Projects for Teams**`)
- **Figure Number**: 3.2.4
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.4: UC006 - Student Picks Project for Team](../../../Images/StudentPicksProjectforTeam.png)
  
  *Figure 3.2.4: Activity diagram showing how students select and assign projects to their teams*
  ```
- **Lý do**: UC006 mô tả student pick project từ approved list - workflow cần visualization
- **Priority**: 🔥 HIGH

---

### **CATEGORY 3: TEAM & WORKSPACE MANAGEMENT (Lines 440-705)**

#### 4️⃣ CreateTeamandAddMembersFlow.png
- **Vị trí**: Sau line 495 (sau header `#### **UC011: Create/Manage Teams**`)
- **Figure Number**: 3.2.5
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.5: UC011 - Create Team and Add Members Flow](../../../Images/CreateTeamandAddMembersFlow.png)
  
  *Figure 3.2.5: Activity diagram depicting the process of team creation and member management*
  ```
- **Lý do**: UC011 mô tả lecturer tạo team và add members - process phức tạp cần diagram
- **Priority**: 🔥 HIGH

---

#### 5️⃣ SubmitCheckpointwithFile.png
- **Vị trí**: Sau line 746 (trong phần `#### **UC018: Manage Checkpoints**`)
- **Figure Number**: 3.2.6
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.6: UC018 - Submit Checkpoint with File](../../../Images/SubmitCheckpointwithFile.png)
  
  *Figure 3.2.6: Activity diagram showing student checkpoint submission process including file uploads*
  ```
- **Lý do**: UC018 có nhiều actors và flows (Create, Submit, Evaluate) - diagram giúp làm rõ student submission flow
- **Priority**: 🔥 HIGH

---

### **CATEGORY 4: COMMUNICATION (Lines 797-930)**

#### 6️⃣ Real-time ChatwithWebSocket.png
- **Vị trí**: Sau line 835 (sau header `#### **UC020: Chat with Teams**`)
- **Figure Number**: 3.2.7
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.7: UC020 - Real-time Chat with WebSocket](../../../Images/Real-time%20ChatwithWebSocket.png)
  
  *Figure 3.2.7: Sequence diagram illustrating the real-time chat communication flow using WebSocket protocol*
  ```
- **Lý do**: UC020 mô tả real-time chat với WebSocket - sequence diagram cần thiết để hiểu message flow
- **Priority**: 🔥 HIGH
- **Lưu ý**: Encode space trong path: `Real-time%20ChatwithWebSocket.png`

---

#### 7️⃣ VideoCallwithWebRTC.png
- **Vị trí**: Sau line 878 (sau header `#### **UC021: Call/Schedule Meetings**`)
- **Figure Number**: 3.2.8
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.8: UC021 - Video Call with WebRTC](../../../Images/VideoCallwithWebRTC.png)
  
  *Figure 3.2.8: Sequence diagram showing WebRTC-based video call establishment and communication flow*
  ```
- **Lý do**: UC021 mô tả video call với WebRTC - complex peer-to-peer connection cần sequence diagram
- **Priority**: 🔥 HIGH

---

### **CATEGORY 5: EVALUATION & GRADING**

#### 8️⃣ EvaluateCheckpointSubmission.png
- **Vị trí**: Sau line ~1050 (trong phần `#### **UC024: Evaluate Milestones**`)
- **Figure Number**: 3.2.9
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.9: UC024 - Evaluate Checkpoint Submission](../../../Images/EvaluateCheckpointSubmission.png)
  
  *Figure 3.2.9: Activity diagram illustrating lecturer's process of evaluating milestone checkpoints*
  ```
- **Lý do**: UC024 mô tả evaluation workflow với multiple criteria - diagram giúp hiểu quy trình
- **Priority**: 🟡 MEDIUM

---

#### 9️⃣ PeerReviewFlow.png
- **Vị trí**: Sau line ~1150 (trong phần `#### **UC025: Peer Review**`)
- **Figure Number**: 3.2.10
- **Caption đề xuất**:
  ```markdown
  ![Figure 3.2.10: UC025 - Peer Review Flow](../../../Images/PeerReviewFlow.png)
  
  *Figure 3.2.10: Activity diagram showing the peer review process among team members*
  ```
- **Lý do**: UC025 mô tả peer review workflow - complex interaction cần visualization
- **Priority**: 🟡 MEDIUM

---

## 🚫 KHÔNG THÊM VÀO 3.2-UserRequirements.md (Thuộc SDD)

### Class Diagrams (6 files)
❌ **KHÔNG** đặt trong 3.2 User Requirements
✅ **NÊN** đặt trong **04-SDD.md** (Software Design Document) - Section 4.3 Detailed Design

1. User&AuthenticationModule-ClassDiagram.png → SDD Section 4.3.1
2. ProjectModule-ClassDiagram.png → SDD Section 4.3.2
3. GroupModule-ClassDiagram.png → SDD Section 4.3.3
4. EvaluationModule-ClassDiagram.png → SDD Section 4.3.4
5. CollaborationModule-ClassDiagram.png → SDD Section 4.3.5
6. AcademicModule-ClassDiagram.png → SDD Section 4.3.6

### System/Architecture Diagrams (4 files)
❌ **KHÔNG** đặt trong 3.2 User Requirements
✅ **NÊN** đặt trong **04-SDD.md** - Section 4.2 System Architecture

1. EntityRelationshipDiagram.png → SDD Section 4.4 Database Design
2. SystemArchitecture.png → SDD Section 4.2.1 System Overview
3. SystemContextDiagram-CollabSphere.png → SDD Section 4.2.2 Context Diagram
4. ModuleStructureDiagram_3-TierModularArchitecture.png → SDD Section 4.2.3 Module Structure

### Timeline/Project Management (1 file)
❌ **KHÔNG** đặt trong 3.2 User Requirements
✅ **NÊN** đặt trong **02-ProjectManagementPlan.md** - Section 4 Development Process

1. ProjectTimeline.png → ProjectManagementPlan Section 4.1 Timeline Overview

### Authentication Flow (1 file)
❓ **CÂN NHẮC**: UserAuthenticationFlow.png
- **Option A**: Đặt trong **03-SRS.md** Section 3.1 Functional Requirements (General Features)
- **Option B**: Đặt trong **04-SDD.md** Section 4.3.1 Authentication Module Design
- **Recommendation**: Option B (SDD) vì đây là sequence diagram mô tả implementation detail

---

## 📝 HƯỚNG DẪN THỰC HIỆN

### Bước 1: Kiểm tra Line Numbers chính xác
```bash
# Tìm exact line numbers cho các UC headers
grep -n "#### \*\*UC002" Documentation/03-SRS/3.2-UserRequirements.md
grep -n "#### \*\*UC004" Documentation/03-SRS/3.2-UserRequirements.md
grep -n "#### \*\*UC006" Documentation/03-SRS/3.2-UserRequirements.md
# ... repeat for UC011, UC018, UC020, UC021, UC024, UC025
```

### Bước 2: Chèn Diagrams theo thứ tự
Sử dụng công cụ `replace_string_in_file` để chèn markdown image syntax vào đúng vị trí.

**Template để chèn**:
```markdown
#### **UC0XX: [Use Case Name]**

[Attributes table...]

![Figure 3.2.X: UC0XX - [Description]](../../../Images/[filename].png)

*Figure 3.2.X: [Detailed caption explaining what the diagram shows]*

**Preconditions:**
...
```

### Bước 3: Kiểm tra Path
- **Hiện tại file reference**: `diagrams/3.2-usecase-overall.png`
- **Đề xuất path mới**: `../../../Images/[filename].png` (relative từ 03-SRS/3.2-UserRequirements.md)
- **Hoặc**: Move tất cả files từ `Images/` sang `Documentation/diagrams/` để nhất quán

### Bước 4: Verify Links
Sau khi chèn xong, test trong markdown preview:
1. Open 3.2-UserRequirements.md in VS Code
2. Ctrl+Shift+V để preview
3. Kiểm tra tất cả images hiển thị đúng

---

## 📊 TỔNG KẾT

### Thống kê
- **Tổng diagrams**: 22 files
- **Đã có trong 3.2**: 1 diagram (UseCaseDiagramSummary)
- **Cần thêm vào 3.2**: 9 diagrams (activity + sequence)
- **Thuộc SDD**: 11 diagrams (class + system/architecture)
- **Thuộc ProjectPlan**: 1 diagram (timeline)

### Priority Implementation
1. **🔥 HIGH Priority** (7 diagrams): UC002, UC004, UC006, UC011, UC018, UC020, UC021
   - Lý do: Core workflows, frequent use cases, minh họa complex processes
   
2. **🟡 MEDIUM Priority** (2 diagrams): UC024, UC025
   - Lý do: Important but less frequent workflows

### Expected Result
- **Before**: 1701 lines, 1 diagram, text-heavy
- **After**: 1701+ lines, 10 diagrams, well-illustrated professional document
- **Impact**: Improved comprehension, easier review, better presentation quality

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **Path Consistency**
   - Hiện tại: File 3.2-UserRequirements.md reference `diagrams/` folder
   - Images hiện ở: `c:\Users\LENOVO\Desktop\SE\Images\`
   - **Cần quyết định**: Move images hoặc update paths

2. **Figure Numbering**
   - Tiếp tục từ Figure 3.2.2 (vì 3.2.1 đã dùng)
   - Đảm bảo sequential: 3.2.2, 3.2.3, ..., 3.2.10

3. **File Name Encoding**
   - File có space: `Real-time ChatwithWebSocket.png`
   - Trong markdown URL: `Real-time%20ChatwithWebSocket.png`

4. **Caption Style**
   - Bold figure number: `**Figure 3.2.X**:`
   - Italic explanation: `*Figure 3.2.X: Detailed description*`
   - Consistent với existing Figure 3.2.1

5. **SDD Diagrams**
   - Class diagrams cần separate mapping cho SDD
   - Tạo file DIAGRAM_MAPPING_SDD.md riêng nếu cần

---

## 🚀 NEXT STEPS

1. ✅ Review mapping này
2. ⏳ Xác nhận line numbers chính xác
3. ⏳ Quyết định path strategy (move files vs update paths)
4. ⏳ Implement diagram insertions theo priority
5. ⏳ Verify all images render correctly
6. ⏳ Create similar mapping guide for SDD diagrams

---

*Document created: [Current Date]*  
*Purpose: Guide for integrating diagrams into 3.2-UserRequirements.md*  
*Status: READY FOR IMPLEMENTATION*
