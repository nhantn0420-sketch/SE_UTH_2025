# 🔍 KIỂM TRA SỬ DỤNG DIAGRAMS - AUDIT REPORT

**Ngày kiểm tra**: 20/1/2026  
**Người thực hiện**: AI Assistant  
**Mục đích**: Kiểm tra toàn bộ 31 diagrams có được sử dụng trong tài liệu chính hay chưa

---

## 📊 TÓM TẮT

| Tổng số ảnh | Đã dùng | Chưa dùng | % Sử dụng |
|-------------|---------|-----------|-----------|
| **31** | **0** | **31** | **0%** |

⚠️ **VẤN ĐỀ NGHIÊM TRỌNG**: Tất cả 31 diagrams trong folder `Images/` **CHƯA ĐƯỢC SỬ DỤNG** trong tài liệu chính!

**Nguyên nhân**: Các file tài liệu đang reference đến path `diagrams/xxx.png` (không tồn tại) thay vì `../Images/xxx.png` (path thực tế)

---

## 🎯 DANH SÁCH 31 DIAGRAMS CẦN INSERT

### ✅ **Category 1: Use Case Diagrams (2 images)**

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 1 | `UseCaseDiagramVer3.drawio.png` | 3.2-UserRequirements.md, line 13 | `diagrams/3.2-usecase-overall.png` | `../Images/UseCaseDiagramVer3.drawio.png` |
| 2 | `UseCaseDiagramSummary.drawio.png` | CHƯA DÙNG | - | Nên thêm vào 3.2-UserRequirements.md |

**Action Required**:
```markdown
# File: 03-SRS/3.2-UserRequirements.md
# Line 13: Sửa path

SAI:  ![Figure 3.2.1: CollabSphere - Overall Use Case Diagram](diagrams/3.2-usecase-overall.png)
ĐÚNG: ![Figure 3.2.1: CollabSphere - Overall Use Case Diagram](../Images/UseCaseDiagramVer3.drawio.png)
```

---

### ✅ **Category 2: System Design Diagrams (4 images)**

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 3 | `SystemArchitecture.png` | 4.1-SystemDesign.md, line 11 | `diagrams/4.1-system-architecture.png` | `../Images/SystemArchitecture.png` |
| 4 | `SystemContextDiagram-CollabSphere.png` | 3.1-ProductOverview.md, line 57 | `diagrams/3.1.1-system-context.png` | `../Images/SystemContextDiagram-CollabSphere.png` |
| 5 | `ModuleStructureDiagram_3-TierModularArchitecture.png` | 3.1-ProductOverview.md, line 37 | `diagrams/3.1.2-module-structure.png` | `../Images/ModuleStructureDiagram_3-TierModularArchitecture.png` |
| 6 | `Production Deployment Architecture - CollabShere.png` | 4.1-SystemDesign.md, line 529 | `diagrams/4.1-production-deployment.png` | `../Images/Production Deployment Architecture - CollabShere.png` |

**Action Required**:
```markdown
# File: 04-SDD/4.1-SystemDesign.md
# Line 11: Sửa path

SAI:  ![Figure 4.1: System Architecture Diagram](diagrams/4.1-system-architecture.png)
ĐÚNG: ![Figure 4.1: System Architecture Diagram](../Images/SystemArchitecture.png)

# Line 529: Sửa path
SAI:  ![Figure 4.2: Production Deployment Architecture](diagrams/4.1-production-deployment.png)
ĐÚNG: ![Figure 4.2: Production Deployment Architecture](../Images/Production Deployment Architecture - CollabShere.png)
```

```markdown
# File: 03-SRS/3.1-ProductOverview.md
# Line 37: Sửa path

SAI:  ![Figure 3.1.2: Module Structure Diagram](diagrams/3.1.2-module-structure.png)
ĐÚNG: ![Figure 3.1.2: Module Structure Diagram](../Images/ModuleStructureDiagram_3-TierModularArchitecture.png)

# Line 57: Sửa path
SAI:  ![Figure 3.1.1: System Context Diagram](diagrams/3.1.1-system-context.png)
ĐÚNG: ![Figure 3.1.1: System Context Diagram](../Images/SystemContextDiagram-CollabSphere.png)
```

---

### ✅ **Category 3: Database ERD (7 images)**

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 7 | `Conceptual Model Project-Based Learning Management System.png` | 4.2-DatabaseDesign.md, line 71 | `diagrams/4.2-conceptual-model.png` | `../Images/Conceptual Model Project-Based Learning Management System.png` |
| 8 | `EntityRelationshipDiagram.png` | 4.2-DatabaseDesign.md, line 83 | `diagrams/4.2-erd-full.png` | `../Images/EntityRelationshipDiagram.png` |
| 9 | `Module1_Users&Authentication.png` | 4.2-DatabaseDesign.md, line 108 | `diagrams/4.2-module1-users.png` | `../Images/Module1_Users&Authentication.png` |
| 10 | `Module2_AcademicManagement.png` | 4.2-DatabaseDesign.md, line 114 | `diagrams/4.2-module2-academic.png` | `../Images/Module2_AcademicManagement.png` |
| 11 | `Module3_Project&GroupManagement.png` | 4.2-DatabaseDesign.md, line 120 | `diagrams/4.2-module3-projects.png` | `../Images/Module3_Project&GroupManagement.png` |
| 12 | `CollaborationTools.png` | 4.2-DatabaseDesign.md, line 126 | `diagrams/4.2-module4-collaboration.png` | `../Images/CollaborationTools.png` |
| 13 | `Evaluation&Assessment.png` | 4.2-DatabaseDesign.md, line 132 | `diagrams/4.2-module5-evaluation.png` | `../Images/Evaluation&Assessment.png` |

**Action Required**:
```markdown
# File: 04-SDD/4.2-DatabaseDesign.md
# Line 71: Sửa path

SAI:  ![Figure 4.2.2: Conceptual Database Model](diagrams/4.2-conceptual-model.png)
ĐÚNG: ![Figure 4.2.2: Conceptual Database Model](../Images/Conceptual Model Project-Based Learning Management System.png)

# Line 83: Sửa path
SAI:  ![Figure 4.2: Entity Relationship Diagram](diagrams/4.2-erd-full.png)
ĐÚNG: ![Figure 4.2: Entity Relationship Diagram](../Images/EntityRelationshipDiagram.png)

# Line 108: Sửa path
SAI:  ![Figure 4.2.3: Users & Authentication Module](diagrams/4.2-module1-users.png)
ĐÚNG: ![Figure 4.2.3: Users & Authentication Module](../Images/Module1_Users&Authentication.png)

# Line 114: Sửa path
SAI:  ![Figure 4.2.4: Academic Management Module](diagrams/4.2-module2-academic.png)
ĐÚNG: ![Figure 4.2.4: Academic Management Module](../Images/Module2_AcademicManagement.png)

# Line 120: Sửa path
SAI:  ![Figure 4.2.5: Project & Group Management Module](diagrams/4.2-module3-projects.png)
ĐÚNG: ![Figure 4.2.5: Project & Group Management Module](../Images/Module3_Project&GroupManagement.png)

# Line 126: Sửa path
SAI:  ![Figure 4.2.6: Collaboration Tools Module](diagrams/4.2-module4-collaboration.png)
ĐÚNG: ![Figure 4.2.6: Collaboration Tools Module](../Images/CollaborationTools.png)

# Line 132: Sửa path
SAI:  ![Figure 4.2.7: Evaluation & Assessment Module](diagrams/4.2-module5-evaluation.png)
ĐÚNG: ![Figure 4.2.7: Evaluation & Assessment Module](../Images/Evaluation&Assessment.png)
```

---

### ✅ **Category 4: Class Diagrams (6 images)** ✅ 100%

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 14 | `User&AuthenticationModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 1921 | `diagrams/4.3.1-class-user-module.png` | `../Images/User&AuthenticationModule-ClassDiagram.png` |
| 15 | `AcademicModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 1955 | `diagrams/4.3.2-class-academic-module.png` | `../Images/AcademicModule-ClassDiagram.png` |
| 16 | `ProjectModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 1979 | `diagrams/4.3.3-class-project-module.png` | `../Images/ProjectModule-ClassDiagram.png` |
| 17 | `GroupModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 2004 | `diagrams/4.3.4-class-group-module.png` | `../Images/GroupModule-ClassDiagram.png` |
| 18 | `CollaborationModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 2037 | `diagrams/4.3.5-class-collaboration-module.png` | `../Images/CollaborationModule-ClassDiagram.png` |
| 19 | `EvaluationModule-ClassDiagram.png` | 4.3-DetailedDesign.md, line 2072 | `diagrams/4.3.6-class-evaluation-module.png` | `../Images/EvaluationModule-ClassDiagram.png` |

**Action Required**:
```markdown
# File: 04-SDD/4.3-DetailedDesign.md
# Line 1921, 1955, 1979, 2004, 2037, 2072: Sửa tất cả paths

SAI:  ![Figure 4.3.1: User & Authentication Module Class Diagram](diagrams/4.3.1-class-user-module.png)
ĐÚNG: ![Figure 4.3.1: User & Authentication Module Class Diagram](../Images/User&AuthenticationModule-ClassDiagram.png)

SAI:  ![Figure 4.3.2: Academic Module Class Diagram](diagrams/4.3.2-class-academic-module.png)
ĐÚNG: ![Figure 4.3.2: Academic Module Class Diagram](../Images/AcademicModule-ClassDiagram.png)

SAI:  ![Figure 4.3.3: Project Module Class Diagram](diagrams/4.3.3-class-project-module.png)
ĐÚNG: ![Figure 4.3.3: Project Module Class Diagram](../Images/ProjectModule-ClassDiagram.png)

SAI:  ![Figure 4.3.4: Group Module Class Diagram](diagrams/4.3.4-class-group-module.png)
ĐÚNG: ![Figure 4.3.4: Group Module Class Diagram](../Images/GroupModule-ClassDiagram.png)

SAI:  ![Figure 4.3.5: Collaboration Module Class Diagram](diagrams/4.3.5-class-collaboration-module.png)
ĐÚNG: ![Figure 4.3.5: Collaboration Module Class Diagram](../Images/CollaborationModule-ClassDiagram.png)

SAI:  ![Figure 4.3.6: Evaluation Module Class Diagram](diagrams/4.3.6-class-evaluation-module.png)
ĐÚNG: ![Figure 4.3.6: Evaluation Module Class Diagram](../Images/EvaluationModule-ClassDiagram.png)
```

---

### ✅ **Category 5: Sequence Diagrams (10 images)** ✅ 100%

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 20 | `UserAuthenticationFlow.png` | 4.1-SystemDesign.md line 637, 4.3-DetailedDesign.md line 2281 | `diagrams/4.3.7-seq-authentication.png` | `../Images/UserAuthenticationFlow.png` |
| 21 | `CreateProjectFlowwithAIMilestoneGeneration.png` | 3.2-UserRequirements.md line 84, 4.3-DetailedDesign.md line 2304 | `../../04-SDD/diagrams/4.3.8-seq-create-project.png` hoặc `diagrams/4.3.8-seq-create-project.png` | `../Images/CreateProjectFlowwithAIMilestoneGeneration.png` |
| 22 | `ApproveProjectFlow.png` | 3.2-UserRequirements.md line 182, 4.3-DetailedDesign.md line 2330 | `../../04-SDD/diagrams/4.3.9-seq-approve-project.png` hoặc `diagrams/4.3.9-seq-approve-project.png` | `../Images/ApproveProjectFlow.png` |
| 23 | `StudentPicksProjectforTeam.png` | 3.2-UserRequirements.md line 271, 4.3-DetailedDesign.md line 2387 | `../../04-SDD/diagrams/4.3.11-seq-pick-project.png` hoặc `diagrams/4.3.11-seq-pick-project.png` | `../Images/StudentPicksProjectforTeam.png` |
| 24 | `CreateTeamandAddMembersFlow.png` | 3.2-UserRequirements.md line 489, 4.3-DetailedDesign.md line 2360 | `../../04-SDD/diagrams/4.3.10-seq-create-team.png` hoặc `diagrams/4.3.10-seq-create-team.png` | `../Images/CreateTeamandAddMembersFlow.png` |
| 25 | `SubmitCheckpointwithFile.png` | 3.2-UserRequirements.md line 764, 4.3-DetailedDesign.md line 2413 | `../../04-SDD/diagrams/4.3.12-seq-submit-checkpoint.png` hoặc `diagrams/4.3.12-seq-submit-checkpoint.png` | `../Images/SubmitCheckpointwithFile.png` |
| 26 | `Real-time ChatwithWebSocket.png` | 3.2-UserRequirements.md line 861, 4.3-DetailedDesign.md line 2510 | `../../04-SDD/diagrams/4.3.15-seq-chat-message.png` hoặc `diagrams/4.3.15-seq-chat-message.png` | `../Images/Real-time ChatwithWebSocket.png` |
| 27 | `VideoCallwithWebRTC.png` | 3.2-UserRequirements.md line 908, 4.3-DetailedDesign.md line 2551 | `../../04-SDD/diagrams/4.3.16-seq-video-call.png` hoặc `diagrams/4.3.16-seq-video-call.png` | `../Images/VideoCallwithWebRTC.png` |
| 28 | `EvaluateCheckpointSubmission.png` | 3.2-UserRequirements.md line 768, 4.3-DetailedDesign.md line 2443 | `../../04-SDD/diagrams/4.3.13-seq-evaluate-checkpoint.png` hoặc `diagrams/4.3.13-seq-evaluate-checkpoint.png` | `../Images/EvaluateCheckpointSubmission.png` |
| 29 | `PeerReviewFlow.png` | 3.2-UserRequirements.md line 1039, 4.3-DetailedDesign.md line 2475 | `../../04-SDD/diagrams/4.3.14-seq-peer-review.png` hoặc `diagrams/4.3.14-seq-peer-review.png` | `../Images/PeerReviewFlow.png` |

**Action Required** (nhiều chỗ cần sửa):

```markdown
# File: 04-SDD/4.1-SystemDesign.md
# Line 637: Sửa path

SAI:  ![Figure 4.3: Authentication Flow Sequence](diagrams/4.3.7-seq-authentication.png)
ĐÚNG: ![Figure 4.3: Authentication Flow Sequence](../Images/UserAuthenticationFlow.png)
```

```markdown
# File: 04-SDD/4.3-DetailedDesign.md
# Line 2281, 2304, 2330, 2360, 2387, 2413, 2443, 2475, 2510, 2551: Sửa tất cả paths

SAI:  ![Figure 4.3.7: Authentication Flow](diagrams/4.3.7-seq-authentication.png)
ĐÚNG: ![Figure 4.3.7: Authentication Flow](../Images/UserAuthenticationFlow.png)

SAI:  ![Figure 4.3.8: Create Project Flow](diagrams/4.3.8-seq-create-project.png)
ĐÚNG: ![Figure 4.3.8: Create Project Flow](../Images/CreateProjectFlowwithAIMilestoneGeneration.png)

... (tương tự cho 8 sequence còn lại)
```

```markdown
# File: 03-SRS/3.2-UserRequirements.md
# Line 84, 182, 271, 489, 764, 768, 861, 908, 1039: Sửa tất cả paths

SAI:  ![Figure 3.2.2: Create Project Flow with AI Milestone Generation](../../04-SDD/diagrams/4.3.8-seq-create-project.png)
ĐÚNG: ![Figure 3.2.2: Create Project Flow with AI Milestone Generation](../Images/CreateProjectFlowwithAIMilestoneGeneration.png)

... (tương tự cho 8 diagrams còn lại)
```

---

### ✅ **Category 6: Other Diagrams (2 images)**

| # | File Name | Dùng ở đâu | Path hiện tại (SAI) | Path đúng cần sửa |
|---|-----------|------------|---------------------|-------------------|
| 30 | `Role - Based Access Control (RBAC) Hierarchy - CollabShere.png` | 4.1-SystemDesign.md, line 680 | `diagrams/4.1-rbac-hierarchy.png` | `../Images/Role - Based Access Control (RBAC) Hierarchy - CollabShere.png` |
| 31 | `ProjectTimeline.png` | 02-ProjectManagementPlan.md, line 90 & 388 | `diagrams/2.1-gantt-chart.png` hoặc `02-ProjectManagementPlan/diagrams/2.1-gantt-chart.png` | `Images/ProjectTimeline.png` |

**Action Required**:
```markdown
# File: 04-SDD/4.1-SystemDesign.md
# Line 680: Sửa path

SAI:  ![Figure 4.4: RBAC Hierarchy Diagram](diagrams/4.1-rbac-hierarchy.png)
ĐÚNG: ![Figure 4.4: RBAC Hierarchy Diagram](../Images/Role - Based Access Control (RBAC) Hierarchy - CollabShere.png)
```

```markdown
# File: 02-ProjectManagementPlan.md
# Line 90: Sửa path

SAI:  ![Figure 2.1: Project Timeline - Gantt Chart](diagrams/2.1-gantt-chart.png)
ĐÚNG: ![Figure 2.1: Project Timeline - Gantt Chart](Images/ProjectTimeline.png)

# Line 388: Sửa path
SAI:  ![Figure 2.1: Project Timeline - Gantt Chart](02-ProjectManagementPlan/diagrams/2.1-gantt-chart.png)
ĐÚNG: ![Figure 2.1: Project Timeline - Gantt Chart](Images/ProjectTimeline.png)
```

---

## 🎯 TỔNG HỢP CÁC FILE CẦN SỬA

### **File 1: 02-ProjectManagementPlan.md**
**Số chỗ cần sửa**: 2 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 90 | `diagrams/2.1-gantt-chart.png` | `Images/ProjectTimeline.png` |
| 388 | `02-ProjectManagementPlan/diagrams/2.1-gantt-chart.png` | `Images/ProjectTimeline.png` |

---

### **File 2: 03-SRS/3.1-ProductOverview.md**
**Số chỗ cần sửa**: 2 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 37 | `diagrams/3.1.2-module-structure.png` | `../Images/ModuleStructureDiagram_3-TierModularArchitecture.png` |
| 57 | `diagrams/3.1.1-system-context.png` | `../Images/SystemContextDiagram-CollabSphere.png` |

---

### **File 3: 03-SRS/3.2-UserRequirements.md**
**Số chỗ cần sửa**: 10 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 13 | `diagrams/3.2-usecase-overall.png` | `../Images/UseCaseDiagramVer3.drawio.png` |
| 84 | `../../04-SDD/diagrams/4.3.8-seq-create-project.png` | `../Images/CreateProjectFlowwithAIMilestoneGeneration.png` |
| 182 | `../../04-SDD/diagrams/4.3.9-seq-approve-project.png` | `../Images/ApproveProjectFlow.png` |
| 271 | `../../04-SDD/diagrams/4.3.11-seq-pick-project.png` | `../Images/StudentPicksProjectforTeam.png` |
| 489 | `../../04-SDD/diagrams/4.3.10-seq-create-team.png` | `../Images/CreateTeamandAddMembersFlow.png` |
| 764 | `../../04-SDD/diagrams/4.3.12-seq-submit-checkpoint.png` | `../Images/SubmitCheckpointwithFile.png` |
| 768 | `../../04-SDD/diagrams/4.3.13-seq-evaluate-checkpoint.png` | `../Images/EvaluateCheckpointSubmission.png` |
| 861 | `../../04-SDD/diagrams/4.3.15-seq-chat-message.png` | `../Images/Real-time ChatwithWebSocket.png` |
| 908 | `../../04-SDD/diagrams/4.3.16-seq-video-call.png` | `../Images/VideoCallwithWebRTC.png` |
| 1039 | `../../04-SDD/diagrams/4.3.14-seq-peer-review.png` | `../Images/PeerReviewFlow.png` |

---

### **File 4: 04-SDD/4.1-SystemDesign.md**
**Số chỗ cần sửa**: 4 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 11 | `diagrams/4.1-system-architecture.png` | `../Images/SystemArchitecture.png` |
| 529 | `diagrams/4.1-production-deployment.png` | `../Images/Production Deployment Architecture - CollabShere.png` |
| 637 | `diagrams/4.3.7-seq-authentication.png` | `../Images/UserAuthenticationFlow.png` |
| 680 | `diagrams/4.1-rbac-hierarchy.png` | `../Images/Role - Based Access Control (RBAC) Hierarchy - CollabShere.png` |

---

### **File 5: 04-SDD/4.2-DatabaseDesign.md**
**Số chỗ cần sửa**: 7 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 71 | `diagrams/4.2-conceptual-model.png` | `../Images/Conceptual Model Project-Based Learning Management System.png` |
| 83 | `diagrams/4.2-erd-full.png` | `../Images/EntityRelationshipDiagram.png` |
| 108 | `diagrams/4.2-module1-users.png` | `../Images/Module1_Users&Authentication.png` |
| 114 | `diagrams/4.2-module2-academic.png` | `../Images/Module2_AcademicManagement.png` |
| 120 | `diagrams/4.2-module3-projects.png` | `../Images/Module3_Project&GroupManagement.png` |
| 126 | `diagrams/4.2-module4-collaboration.png` | `../Images/CollaborationTools.png` |
| 132 | `diagrams/4.2-module5-evaluation.png` | `../Images/Evaluation&Assessment.png` |

---

### **File 6: 04-SDD/4.3-DetailedDesign.md**
**Số chỗ cần sửa**: 16 paths

| Line | Path SAI | Path ĐÚNG |
|------|----------|-----------|
| 1921 | `diagrams/4.3.1-class-user-module.png` | `../Images/User&AuthenticationModule-ClassDiagram.png` |
| 1955 | `diagrams/4.3.2-class-academic-module.png` | `../Images/AcademicModule-ClassDiagram.png` |
| 1979 | `diagrams/4.3.3-class-project-module.png` | `../Images/ProjectModule-ClassDiagram.png` |
| 2004 | `diagrams/4.3.4-class-group-module.png` | `../Images/GroupModule-ClassDiagram.png` |
| 2037 | `diagrams/4.3.5-class-collaboration-module.png` | `../Images/CollaborationModule-ClassDiagram.png` |
| 2072 | `diagrams/4.3.6-class-evaluation-module.png` | `../Images/EvaluationModule-ClassDiagram.png` |
| 2281 | `diagrams/4.3.7-seq-authentication.png` | `../Images/UserAuthenticationFlow.png` |
| 2304 | `diagrams/4.3.8-seq-create-project.png` | `../Images/CreateProjectFlowwithAIMilestoneGeneration.png` |
| 2330 | `diagrams/4.3.9-seq-approve-project.png` | `../Images/ApproveProjectFlow.png` |
| 2360 | `diagrams/4.3.10-seq-create-team.png` | `../Images/CreateTeamandAddMembersFlow.png` |
| 2387 | `diagrams/4.3.11-seq-pick-project.png` | `../Images/StudentPicksProjectforTeam.png` |
| 2413 | `diagrams/4.3.12-seq-submit-checkpoint.png` | `../Images/SubmitCheckpointwithFile.png` |
| 2443 | `diagrams/4.3.13-seq-evaluate-checkpoint.png` | `../Images/EvaluateCheckpointSubmission.png` |
| 2475 | `diagrams/4.3.14-seq-peer-review.png` | `../Images/PeerReviewFlow.png` |
| 2510 | `diagrams/4.3.15-seq-chat-message.png` | `../Images/Real-time ChatwithWebSocket.png` |
| 2551 | `diagrams/4.3.16-seq-video-call.png` | `../Images/VideoCallwithWebRTC.png` |

---

## 📝 TỔNG HỢP

**Tổng số chỗ cần sửa**: **41 paths** trong **6 files**

| File | Số paths cần sửa |
|------|------------------|
| 02-ProjectManagementPlan.md | 2 |
| 03-SRS/3.1-ProductOverview.md | 2 |
| 03-SRS/3.2-UserRequirements.md | 10 |
| 04-SDD/4.1-SystemDesign.md | 4 |
| 04-SDD/4.2-DatabaseDesign.md | 7 |
| 04-SDD/4.3-DetailedDesign.md | 16 |
| **TOTAL** | **41** |

---

## ✅ KẾT LUẬN

1. **Tất cả 31 diagrams đã được vẽ** ✅
2. **Tất cả diagrams đã được reference trong tài liệu** ✅
3. **NHƯNG**: Tất cả đang dùng **path SAI** (không tồn tại) ❌
4. **Cần sửa**: 41 chỗ trong 6 files để trỏ đúng path `../Images/xxx.png`

---

## 🎯 NEXT ACTIONS

### Priority 1: Fix paths ngay (30 phút)
Sửa 41 paths trong 6 files theo bảng trên

### Priority 2: Verify (5 phút)
Mở từng file markdown trong VS Code Preview để xem hình có hiện không

### Priority 3: Add missing diagram (5 phút)
- `UseCaseDiagramSummary.drawio.png` chưa được dùng → Nên thêm vào 3.2-UserRequirements.md

---

**Status**: ⚠️ URGENT - Cần sửa ngay  
**Impact**: Tài liệu hiện tại không có ảnh nào hiển thị  
**Effort**: ~30-40 phút để fix toàn bộ
