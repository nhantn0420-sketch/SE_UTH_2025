# HƯỚNG DẪN SẮP XẾP LẠI CẤU TRÚC FOLDER VÀ DIAGRAM

**Ngày tạo:** 9/1/2026  
**Mục đích:** Tổ chức lại cấu trúc folder diagrams để dễ dàng quản lý và điền hình ảnh vào đúng vị trí

---

## 📁 CẤU TRÚC HIỆN TẠI

```
SE/
├── Images/                               # 🔴 CẦN DI CHUYỂN
│   ├── UseCaseDiagramSummary.drawio.png
│   ├── User&AuthenticationModule-ClassDiagram.png
│   └── UserAuthenticationFlow.png
│
├── Documentation/
│   ├── 00-FrontMatter.md
│   ├── 01-ProjectIntroduction.md
│   ├── 02-ProjectManagementPlan.md
│   │   └── diagrams/                    # ✅ CORRECT
│   │       └── 2.1-gantt-chart.png
│   │
│   ├── 03-SRS/
│   │   ├── 3.1-ProductOverview.md
│   │   ├── 3.2-UserRequirements.md
│   │   ├── 3.3-FunctionalRequirements.md
│   │   ├── 3.4-NonFunctionalRequirements.md
│   │   ├── 3.5-RequirementAppendix.md
│   │   └── diagrams/                    # 🟡 CÓ FILE ĐÚNG + FILE SAI
│   │       ├── 3.1.1-system-context.png           # ✅ Correct
│   │       ├── 3.1.2-module-structure.png         # ✅ Correct
│   │       ├── 3.2.1-usecase-overview.png         # ✅ Correct
│   │       ├── AcademicModule-ClassDiagram.png    # ❌ Misplaced (should be in SDD)
│   │       ├── CollaborationModule-ClassDiagram.png # ❌ Misplaced
│   │       ├── EvaluationModule-ClassDiagram.png  # ❌ Misplaced
│   │       ├── GroupModule-ClassDiagram.png       # ❌ Misplaced
│   │       ├── ProjectModule-ClassDiagram.png     # ❌ Misplaced
│   │       ├── User&AuthenticationModule-ClassDiagram.png # ❌ Misplaced
│   │       ├── UseCaseDiagramSummary.drawio.png   # ❌ Duplicate
│   │       └── UserAuthenticationFlow.png         # ❌ Duplicate
│   │
│   └── 04-SDD/
│       ├── 4.1-SystemDesign.md
│       ├── 4.2-DatabaseDesign.md
│       ├── 4.3-DetailedDesign.md
│       └── diagrams/                    # 🟡 CÓ FILE ĐÚNG + FILE DUPLICATE
│           ├── 4.1-system-architecture.png        # ✅ Correct
│           ├── 4.2-erd-full.png                   # ✅ Correct
│           ├── 4.3.1-class-user-auth.png          # ✅ Correct
│           ├── 4.3.2-class-academic.png           # ✅ Correct
│           ├── 4.3.3-class-project.png            # ✅ Correct
│           ├── 4.3.4-class-group.png              # ✅ Correct
│           ├── 4.3.5-class-collaboration.png      # ✅ Correct
│           ├── 4.3.6-class-evaluation.png         # ✅ Correct
│           ├── 4.3.7-seq-auth-login.png           # ✅ Correct
│           ├── 4.3.8-seq-create-project.png       # ✅ Correct
│           ├── 4.3.9-seq-approve-project.png      # ✅ Correct
│           ├── 4.3.10-seq-create-team.png         # ✅ Correct
│           ├── 4.3.11-seq-pick-project.png        # ✅ Correct
│           ├── 4.3.12-seq-submit-checkpoint.png   # ✅ Correct
│           ├── 4.3.13-seq-evaluate-checkpoint.png # ✅ Correct
│           ├── 4.3.14-seq-peer-review.png         # ✅ Correct
│           ├── 4.3.15-seq-chat-message.png        # ✅ Correct
│           ├── 4.3.16-seq-video-call.png          # ✅ Correct
│           ├── AcademicModule-ClassDiagram.png    # ❌ Duplicate (old name)
│           ├── ApproveProjectFlow.png             # ❌ Duplicate
│           ├── CollaborationModule-ClassDiagram.png # ❌ Duplicate
│           ├── CreateProjectFlowwithAIMilestoneGeneration.png # ❌ Duplicate
│           ├── CreateTeamandAddMembers.png        # ❌ Duplicate
│           ├── ERDfull.png                        # ❌ Duplicate
│           ├── EvaluateCheckpointSubmission.png   # ❌ Duplicate
│           ├── EvaluationModule-ClassDiagram.png  # ❌ Duplicate
│           ├── GroupModule-ClassDiagram.png       # ❌ Duplicate
│           ├── PeerReviewProcess.png              # ❌ Duplicate
│           ├── ProjectModule-ClassDiagram.png     # ❌ Duplicate
│           ├── RealTimeChatWebSocket.png          # ❌ Duplicate
│           ├── StudentPicksProjectforTeam.png     # ❌ Duplicate
│           ├── SubmitCheckpointWork.png           # ❌ Duplicate
│           ├── SystemArchitecture.png             # ❌ Duplicate
│           ├── User&AuthenticationModule-ClassDiagram.png # ❌ Duplicate
│           ├── UserAuthenticationFlow.png         # ❌ Duplicate
│           ├── VideoCallWebRTC.png                # ❌ Duplicate
│           └── temp-erd-backup.png                # ❌ Temp file
```

---

## ✅ CẤU TRÚC ĐỀ XUẤT (SAU KHI SẮP XẾP)

```
SE/
├── Images-Archive-Original/          # 📦 ARCHIVE backup files
│   ├── UseCaseDiagramSummary.drawio.png
│   ├── User&AuthenticationModule-ClassDiagram.png
│   └── UserAuthenticationFlow.png
│
└── Documentation/
    ├── 02-ProjectManagementPlan/
    │   └── diagrams/
    │       └── 2.1-gantt-chart.png                    (1 file)
    │
    ├── 03-SRS/
    │   └── diagrams/
    │       ├── 3.1.1-system-context.png               (3 files ONLY)
    │       ├── 3.1.2-module-structure.png
    │       └── 3.2.1-usecase-overview.png
    │
    └── 04-SDD/
        └── diagrams/
            ├── 4.1-system-architecture.png            (18 files ONLY)
            ├── 4.2-erd-full.png
            ├── 4.3.1-class-user-auth.png              (6 class diagrams)
            ├── 4.3.2-class-academic.png
            ├── 4.3.3-class-project.png
            ├── 4.3.4-class-group.png
            ├── 4.3.5-class-collaboration.png
            ├── 4.3.6-class-evaluation.png
            ├── 4.3.7-seq-auth-login.png               (10 sequence diagrams)
            ├── 4.3.8-seq-create-project.png
            ├── 4.3.9-seq-approve-project.png
            ├── 4.3.10-seq-create-team.png
            ├── 4.3.11-seq-pick-project.png
            ├── 4.3.12-seq-submit-checkpoint.png
            ├── 4.3.13-seq-evaluate-checkpoint.png
            ├── 4.3.14-seq-peer-review.png
            ├── 4.3.15-seq-chat-message.png
            └── 4.3.16-seq-video-call.png
```

**Tổng kết:**
- ✅ **22 files hợp lệ** (1 + 3 + 18)
- ❌ **48 files cần xóa** (20 duplicates + 8 misplaced + 3 backup + 17 old names)
- **Giảm từ 70 files → 22 files** (68% reduction)

---

## 🔧 COMMANDS ĐỂ SẮP XẾP

### BƯỚC 1: TẠO FOLDER ARCHIVE

```powershell
# Tạo folder archive cho backup
New-Item -ItemType Directory -Path "C:\Users\LENOVO\Desktop\SE\Images-Archive-Original" -Force
```

### BƯỚC 2: ARCHIVE CÁC FILE BACKUP

```powershell
# Di chuyển 3 files từ Images/ sang Archive
Move-Item "C:\Users\LENOVO\Desktop\SE\Images\*.png" -Destination "C:\Users\LENOVO\Desktop\SE\Images-Archive-Original\" -Force

# Xóa folder Images/ trống
Remove-Item "C:\Users\LENOVO\Desktop\SE\Images" -Force
```

### BƯỚC 3: XÓA CÁC FILE MISPLACED TRONG 03-SRS/diagrams/

```powershell
# Xóa 8 class diagrams sai vị trí (should be in SDD)
$misplacedFiles = @(
    "AcademicModule-ClassDiagram.png",
    "CollaborationModule-ClassDiagram.png",
    "EvaluationModule-ClassDiagram.png",
    "GroupModule-ClassDiagram.png",
    "ProjectModule-ClassDiagram.png",
    "User&AuthenticationModule-ClassDiagram.png",
    "UseCaseDiagramSummary.drawio.png",  # Duplicate
    "UserAuthenticationFlow.png"          # Duplicate
)

foreach ($file in $misplacedFiles) {
    $path = "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams\$file"
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "✅ Deleted: $file" -ForegroundColor Green
    }
}
```

### BƯỚC 4: XÓA CÁC FILE DUPLICATE TRONG 04-SDD/diagrams/

```powershell
# Xóa 20 duplicate files (old names)
$duplicateFiles = @(
    "AcademicModule-ClassDiagram.png",
    "ApproveProjectFlow.png",
    "CollaborationModule-ClassDiagram.png",
    "CreateProjectFlowwithAIMilestoneGeneration.png",
    "CreateTeamandAddMembers.png",
    "ERDfull.png",
    "EvaluateCheckpointSubmission.png",
    "EvaluationModule-ClassDiagram.png",
    "GroupModule-ClassDiagram.png",
    "PeerReviewProcess.png",
    "ProjectModule-ClassDiagram.png",
    "RealTimeChatWebSocket.png",
    "StudentPicksProjectforTeam.png",
    "SubmitCheckpointWork.png",
    "SystemArchitecture.png",
    "User&AuthenticationModule-ClassDiagram.png",
    "UserAuthenticationFlow.png",
    "VideoCallWebRTC.png",
    "temp-erd-backup.png"
)

foreach ($file in $duplicateFiles) {
    $path = "C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\$file"
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "✅ Deleted: $file" -ForegroundColor Green
    }
}
```

### BƯỚC 5: VERIFY KẾT QUẢ

```powershell
# Kiểm tra số lượng files sau khi cleanup
Write-Host "`n📊 VERIFICATION RESULTS:" -ForegroundColor Cyan
Write-Host "02-ProjectManagementPlan/diagrams: " -NoNewline
(Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\02-ProjectManagementPlan\diagrams" -File).Count

Write-Host "03-SRS/diagrams: " -NoNewline
(Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams" -File).Count

Write-Host "04-SDD/diagrams: " -NoNewline
(Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams" -File).Count

Write-Host "`nExpected: 1, 3, 18" -ForegroundColor Yellow
```

---

## 📝 MAPPING DIAGRAM VÀ TÀI LIỆU

### 📄 02-ProjectManagementPlan.md

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 2.1** | Section 2.6 (Line ~380) | `02-ProjectManagementPlan/diagrams/2.1-gantt-chart.png` | Project Timeline Gantt Chart (9 weeks) |

**Markdown để điền:**
```markdown
![Figure 2.1: Project Timeline Gantt Chart (9 weeks)](02-ProjectManagementPlan/diagrams/2.1-gantt-chart.png)
```

---

### 📄 03-SRS/3.1-ProductOverview.md

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 3.1.1** | Section 3.1.4 (Line ~37) | `diagrams/3.1.1-system-context.png` | System Context Diagram |
| **Figure 3.1.2** | Section 3.1.5 (Line ~57) | `diagrams/3.1.2-module-structure.png` | Module Structure Diagram |

**Markdown đã điền:**
```markdown
![Figure 3.1.1: System Context](diagrams/3.1.1-system-context.png)
![Figure 3.1.2: Module Structure](diagrams/3.1.2-module-structure.png)
```

---

### 📄 03-SRS/3.2-UserRequirements.md

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 3.2.1** | Line 13 | `diagrams/3.2.1-usecase-overview.png` | Overall Use Case Diagram |
| **Figure 3.2.2** | After UC002 (~Line 84) | `../../04-SDD/diagrams/4.3.8-seq-create-project.png` | Create Project Flow |
| **Figure 3.2.3** | After UC004 (~Line 182) | `../../04-SDD/diagrams/4.3.9-seq-approve-project.png` | Project Approval Workflow |
| **Figure 3.2.4** | After UC006 (~Line 271) | `../../04-SDD/diagrams/4.3.11-seq-pick-project.png` | Pick Project for Team |
| **Figure 3.2.5** | After UC011 (~Line 489) | `../../04-SDD/diagrams/4.3.10-seq-create-team.png` | Create Team and Add Members |
| **Figure 3.2.6** | After UC018 (~Line 764) | `../../04-SDD/diagrams/4.3.12-seq-submit-checkpoint.png` | Submit Checkpoint |
| **Figure 3.2.7** | After UC018 (~Line 768) | `../../04-SDD/diagrams/4.3.13-seq-evaluate-checkpoint.png` | Evaluate Checkpoint |
| **Figure 3.2.8** | After UC020 (~Line 861) | `../../04-SDD/diagrams/4.3.15-seq-chat-message.png` | Real-time Chat WebSocket |
| **Figure 3.2.9** | After UC021 (~Line 908) | `../../04-SDD/diagrams/4.3.16-seq-video-call.png` | Video Call WebRTC |
| **Figure 3.2.10** | After UC024 (~Line 1039) | `../../04-SDD/diagrams/4.3.14-seq-peer-review.png` | Peer Review Process |

**Markdown đã điền (9 figures added):**
```markdown
![Figure 3.2.2: UC002 - Create Project Flow](../../04-SDD/diagrams/4.3.8-seq-create-project.png)
![Figure 3.2.3: UC004 - Project Approval Workflow](../../04-SDD/diagrams/4.3.9-seq-approve-project.png)
![Figure 3.2.4: UC006 - Pick Project for Team](../../04-SDD/diagrams/4.3.11-seq-pick-project.png)
![Figure 3.2.5: UC011 - Create Team](../../04-SDD/diagrams/4.3.10-seq-create-team.png)
![Figure 3.2.6: UC018 - Submit Checkpoint](../../04-SDD/diagrams/4.3.12-seq-submit-checkpoint.png)
![Figure 3.2.7: UC018 - Evaluate Checkpoint](../../04-SDD/diagrams/4.3.13-seq-evaluate-checkpoint.png)
![Figure 3.2.8: UC020 - Real-time Chat](../../04-SDD/diagrams/4.3.15-seq-chat-message.png)
![Figure 3.2.9: UC021 - Video Call](../../04-SDD/diagrams/4.3.16-seq-video-call.png)
![Figure 3.2.10: UC024 - Peer Review](../../04-SDD/diagrams/4.3.14-seq-peer-review.png)
```

---

### 📄 04-SDD/4.1-SystemDesign.md

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 4.1** | Section 4.1.1 (Line ~11) | `diagrams/4.1-system-architecture.png` | System Architecture (Frontend → Backend → Database → AI) |

**Markdown đã điền:**
```markdown
![Figure 4.1: System Architecture](diagrams/4.1-system-architecture.png)
```

---

### 📄 04-SDD/4.2-DatabaseDesign.md

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 4.2** | Section 4.2.1 (Line ~124) | `diagrams/4.2-erd-full.png` | Entity Relationship Diagram (37 tables, 6 zones) |

**Markdown đã điền:**
```markdown
![Figure 4.2: Entity Relationship Diagram](diagrams/4.2-erd-full.png)
```

---

### 📄 04-SDD/4.3-DetailedDesign.md

#### **Section 4.3.5: Class Diagrams (6 figures)**

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 4.3.1** | Line ~1952 | `diagrams/4.3.1-class-user-auth.png` | User & Authentication Module |
| **Figure 4.3.2** | Line ~1974 | `diagrams/4.3.2-class-academic.png` | Academic Module |
| **Figure 4.3.3** | Line ~1987 | `diagrams/4.3.3-class-project.png` | Project Module |
| **Figure 4.3.4** | Line ~2010 | `diagrams/4.3.4-class-group.png` | Group Module |
| **Figure 4.3.5** | Line ~2033 | `diagrams/4.3.5-class-collaboration.png` | Collaboration Module |
| **Figure 4.3.6** | Line ~2056 | `diagrams/4.3.6-class-evaluation.png` | Evaluation Module |

**Markdown đã điền:**
```markdown
![Figure 4.3.1: User & Authentication Module Class Diagram](diagrams/4.3.1-class-user-auth.png)
![Figure 4.3.2: Academic Module Class Diagram](diagrams/4.3.2-class-academic.png)
![Figure 4.3.3: Project Module Class Diagram](diagrams/4.3.3-class-project.png)
![Figure 4.3.4: Group Module Class Diagram](diagrams/4.3.4-class-group.png)
![Figure 4.3.5: Collaboration Module Class Diagram](diagrams/4.3.5-class-collaboration.png)
![Figure 4.3.6: Evaluation Module Class Diagram](diagrams/4.3.6-class-evaluation.png)
```

#### **Section 4.3.6: Sequence Diagrams (10 figures)**

| Figure | Location | Path | Purpose |
|--------|----------|------|---------|
| **Figure 4.3.7** | Line ~2312 | `diagrams/4.3.7-seq-auth-login.png` | User Authentication Flow |
| **Figure 4.3.8** | Line ~2352 | `diagrams/4.3.8-seq-create-project.png` | Create Project with AI Milestone Generation |
| **Figure 4.3.9** | Line ~2382 | `diagrams/4.3.9-seq-approve-project.png` | Approve Project Flow |
| **Figure 4.3.10** | Line ~2402 | `diagrams/4.3.10-seq-create-team.png` | Create Team and Add Members |
| **Figure 4.3.11** | Line ~2422 | `diagrams/4.3.11-seq-pick-project.png` | Student Picks Project for Team |
| **Figure 4.3.12** | Line ~2442 | `diagrams/4.3.12-seq-submit-checkpoint.png` | Submit Checkpoint Work |
| **Figure 4.3.13** | Line ~2462 | `diagrams/4.3.13-seq-evaluate-checkpoint.png` | Evaluate Checkpoint Submission |
| **Figure 4.3.14** | Line ~2482 | `diagrams/4.3.14-seq-peer-review.png` | Peer Review Process |
| **Figure 4.3.15** | Line ~2502 | `diagrams/4.3.15-seq-chat-message.png` | Real-time Chat WebSocket |
| **Figure 4.3.16** | Line ~2522 | `diagrams/4.3.16-seq-video-call.png` | Video Call WebRTC |

**Markdown đã điền:**
```markdown
![Figure 4.3.7: Authentication Flow](diagrams/4.3.7-seq-auth-login.png)
![Figure 4.3.8: Create Project Flow](diagrams/4.3.8-seq-create-project.png)
![Figure 4.3.9: Approve Project Flow](diagrams/4.3.9-seq-approve-project.png)
![Figure 4.3.10: Create Team Flow](diagrams/4.3.10-seq-create-team.png)
![Figure 4.3.11: Pick Project Flow](diagrams/4.3.11-seq-pick-project.png)
![Figure 4.3.12: Submit Checkpoint](diagrams/4.3.12-seq-submit-checkpoint.png)
![Figure 4.3.13: Evaluate Checkpoint](diagrams/4.3.13-seq-evaluate-checkpoint.png)
![Figure 4.3.14: Peer Review Flow](diagrams/4.3.14-seq-peer-review.png)
![Figure 4.3.15: Chat Message Flow](diagrams/4.3.15-seq-chat-message.png)
![Figure 4.3.16: Video Call Flow](diagrams/4.3.16-seq-video-call.png)
```

---

## 📊 TỔNG KẾT

### THỐNG KÊ DIAGRAM THEO LOẠI

| Loại Diagram | Số lượng | Location |
|--------------|----------|----------|
| **Timeline/Gantt** | 1 | 02-ProjectManagementPlan/diagrams/ |
| **System Context** | 2 | 03-SRS/diagrams/ (3.1.1, 3.1.2) |
| **Use Case** | 1 | 03-SRS/diagrams/ (3.2.1) |
| **System Architecture** | 1 | 04-SDD/diagrams/ (4.1) |
| **ERD** | 1 | 04-SDD/diagrams/ (4.2) |
| **Class Diagrams** | 6 | 04-SDD/diagrams/ (4.3.1-4.3.6) |
| **Sequence Diagrams** | 10 | 04-SDD/diagrams/ (4.3.7-4.3.16) |
| **TOTAL** | **22** | 3 folders |

### TRẠNG THÁI DIAGRAM TRONG TÀI LIỆU

| Document | Diagrams | Status |
|----------|----------|--------|
| **01-ProjectIntroduction.md** | 0 | ✅ Text-only (không cần diagram) |
| **02-ProjectManagementPlan.md** | 1 | ✅ Complete (Gantt chart added) |
| **03-SRS/3.1-ProductOverview.md** | 2 | ✅ Complete (System Context + Module) |
| **03-SRS/3.2-UserRequirements.md** | 10 | ✅ Complete (1 existing + 9 added) |
| **03-SRS/3.3-FunctionalRequirements.md** | 0 | ✅ Text-only (feature list) |
| **03-SRS/3.4-NonFunctionalRequirements.md** | 0 | ✅ Text-only (NFR metrics) |
| **03-SRS/3.5-RequirementAppendix.md** | 0 | ✅ Text-only (glossary) |
| **04-SDD/4.1-SystemDesign.md** | 1 | ✅ Complete (Architecture) |
| **04-SDD/4.2-DatabaseDesign.md** | 1 | ✅ Complete (ERD) |
| **04-SDD/4.3-DetailedDesign.md** | 16 | ✅ Complete (6 class + 10 sequence) |
| **TOTAL** | **31** | ✅ 100% Complete |

---

## ✅ CHECKLIST THỰC HIỆN

- [ ] **Bước 1:** Tạo folder `Images-Archive-Original/`
- [ ] **Bước 2:** Archive 3 files từ `Images/` sang Archive
- [ ] **Bước 3:** Xóa 8 misplaced files trong `03-SRS/diagrams/`
- [ ] **Bước 4:** Xóa 20 duplicate files trong `04-SDD/diagrams/`
- [ ] **Bước 5:** Verify kết quả (Expected: 1, 3, 18)
- [ ] **Bước 6:** Test các links trong markdown files
- [ ] **Bước 7:** Commit changes to Git

---

## 🎯 LỢI ÍCH SAU KHI SẮP XẾP

✅ **Giảm file redundant:** 70 → 22 files (68% reduction)  
✅ **Cấu trúc rõ ràng:** 1 folder = 1 section  
✅ **Dễ maintain:** Naming convention nhất quán (4.3.X-type-name.png)  
✅ **Tránh confusion:** Không còn duplicate names  
✅ **Documentation complete:** 31 diagrams được reference đúng vị trí  

---

**Tạo bởi:** GitHub Copilot  
**Cập nhật lần cuối:** 9/1/2026
