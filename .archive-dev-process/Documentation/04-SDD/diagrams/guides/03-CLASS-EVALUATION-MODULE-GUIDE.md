# HƯỚNG DẪN VẼ: CLASS DIAGRAM - EVALUATION MODULE
**File xuất**: `4.3.6-class-evaluation.png`  
**Thời gian**: ~1.5 giờ  
**Độ khó**: ⭐⭐⭐⭐ Khó (nhiều evaluation types)

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **Evaluation Module** - Peer review & assessment! Bao gồm:
- **PeerReview** (Đánh giá đồng nghiệp)
- **GroupEvaluation** (Đánh giá nhóm)
- **MemberEvaluation** (Đánh giá thành viên)
- **CheckpointEvaluation** (Đánh giá checkpoint)
- **MilestoneQuestion** (Câu hỏi milestone)
- **MilestoneAnswer** (Câu trả lời)

---

## 🛠️ CHUẨN BỊ

- Canvas: A4 Landscape (hoặc A3)
- Enable UML shapes
- Grid: 10px

---

## 📐 LAYOUT

```
PEER REVIEWS (Anonymous)
┌────────────┐    reviewer    ┌────────────┐
│    User    │ 1 ──────────N  │ PeerReview │
│ (Student)  │                └────────────┘
└────────────┘    reviewee           │ N
       │ 1 ──────────────────────────┘
       │
       │
GROUP & MEMBER EVALUATIONS (By Lecturer)
┌────────────┐ 1 ──────N ┌──────────────────┐
│   Group    │           │ GroupEvaluation  │
└────────────┘           └──────────────────┘

┌────────────┐ 1 ──────N ┌──────────────────┐
│GroupMember │           │ MemberEvaluation │
└────────────┘           └──────────────────┘

CHECKPOINT EVALUATIONS (By Lecturer)
┌────────────┐ 1 ──────N ┌───────────────────────┐
│ Checkpoint │           │ CheckpointEvaluation  │
└────────────┘           └───────────────────────┘

MILESTONE Q&A
┌───────────────────┐ 1 ──────N ┌──────────────────┐
│ GroupMilestone    │           │ MilestoneQuestion│
└───────────────────┘           └──────────────────┘
                                         │ 1
                                         │ N
                                ┌──────────────────┐
                                │ MilestoneAnswer  │
                                └──────────────────┘
```

---

## 🎨 BƯỚC 1: VẼ PEERREVIEW CLASS

**Vị trí**: Top left, X: 50, Y: 50

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│          PeerReview                      │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - reviewer_id: int                       │
│ - reviewee_id: int                       │
│ - group_id: int                          │
│ - period: ReviewPeriod                   │
│ - rating: int                            │
│ - technical_skill: int                   │
│ - communication: int                     │
│ - responsibility: int                    │
│ - teamwork: int                          │
│ - comments: string?                      │
│ - is_anonymous: bool                     │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(reviewer, reviewee, group_id) │
│ + validate_rating(): bool                │
│ + calculate_average(): float             │
│ + get_reviewer(): User                   │
│ + get_reviewee(): User                   │
│ + is_valid(): bool                       │
│ + to_dict(): dict                        │
│ + to_anonymous_dict(): dict              │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Pink (#FCE4EC)**
- Border: **Pink (#E91E63)**, 2px
- Width: 400px

**Icon**: 👥 (peer review)

**Note**: Highlight `is_anonymous` attribute với màu yellow

---

## 🎨 BƯỚC 2: VẼ REVIEWPERIOD ENUM

**Vị trí**: Right of PeerReview, X: 500, Y: 80

```
┌─────────────────────────┐
│    <<enumeration>>      │
│     ReviewPeriod        │
├─────────────────────────┤
│ MIDTERM                 │
│ FINAL                   │
│ MONTHLY                 │
└─────────────────────────┘
```

**Styling**:
- Header: **Light Yellow (#FFF9C4)**
- Border: **Orange (#FF9800)**, 2px

---

## 🎨 BƯỚC 3: VẼ GROUPEVALUATION CLASS

**Vị trí**: Below PeerReview, X: 50, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│        GroupEvaluation                   │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - evaluator_id: int                      │
│ - milestone_id: int?                     │
│ - score: float                           │
│ - technical_quality: int                 │
│ - documentation: int                     │
│ - presentation: int                      │
│ - teamwork: int                          │
│ - comments: string?                      │
│ - strengths: string?                     │
│ - weaknesses: string?                    │
│ - suggestions: string?                   │
│ - evaluated_at: datetime                 │
├──────────────────────────────────────────┤
│ + __init__(group_id, evaluator_id)       │
│ + validate_scores(): bool                │
│ + calculate_total(): float               │
│ + get_evaluator(): User                  │
│ + get_group(): Group                     │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px

**Icon**: 📊 (evaluation)

---

## 🎨 BƯỚC 4: VẼ MEMBEREVALUATION CLASS

**Vị trí**: Right of GroupEvaluation, X: 500, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│       MemberEvaluation                   │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - member_id: int                         │
│ - evaluator_id: int                      │
│ - milestone_id: int?                     │
│ - score: float                           │
│ - technical_skill: int                   │
│ - contribution: int                      │
│ - responsibility: int                    │
│ - communication: int                     │
│ - comments: string?                      │
│ - attendance_score: int                  │
│ - evaluated_at: datetime                 │
├──────────────────────────────────────────┤
│ + __init__(member_id, evaluator_id)      │
│ + validate_scores(): bool                │
│ + calculate_total(): float               │
│ + get_member(): GroupMember              │
│ + get_evaluator(): User                  │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px

**Icon**: 👤 (individual evaluation)

---

## 🎨 BƯỚC 5: VẼ CHECKPOINTEVALUATION CLASS

**Vị trí**: Below GroupEvaluation, X: 50, Y: 750

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│      CheckpointEvaluation                │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - checkpoint_id: int                     │
│ - evaluator_id: int                      │
│ - score: float                           │
│ - completeness: int                      │
│ - quality: int                           │
│ - on_time: bool                          │
│ - feedback: string                       │
│ - evaluated_at: datetime                 │
├──────────────────────────────────────────┤
│ + __init__(checkpoint_id, evaluator_id)  │
│ + validate_score(): bool                 │
│ + get_checkpoint(): Checkpoint           │
│ + get_evaluator(): User                  │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Cyan (#E0F7FA)**
- Border: **Cyan (#00BCD4)**, 2px

**Icon**: ✅ (checkpoint)

---

## 🎨 BƯỚC 6: VẼ MILESTONEQUESTION CLASS

**Vị trí**: Right side, X: 950, Y: 50

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│       MilestoneQuestion                  │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - milestone_id: int                      │
│ - question: string                       │
│ - question_type: QuestionType            │
│ - options: JSON?                         │
│ - order_index: int                       │
│ - is_required: bool                      │
│ - max_score: int?                        │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(milestone_id, question)       │
│ + get_milestone(): GroupMilestone        │
│ + get_answers(): List[MilestoneAnswer]   │
│ + is_multiple_choice(): bool             │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Orange (#FFF3E0)**
- Border: **Orange (#FF9800)**, 2px

**Icon**: ❓ (question)

---

## 🎨 BƯỚC 7: VẼ MILESTONEANSWER CLASS

**Vị trí**: Below MilestoneQuestion, X: 950, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│        MilestoneAnswer                   │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - question_id: int                       │
│ - group_id: int                          │
│ - answered_by: int                       │
│ - answer_text: string?                   │
│ - answer_option: string?                 │
│ - score: float?                          │
│ - answered_at: datetime                  │
├──────────────────────────────────────────┤
│ + __init__(question_id, group_id, ...)   │
│ + get_question(): MilestoneQuestion      │
│ + get_group(): Group                     │
│ + get_answerer(): User                   │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Amber (#FFF8E1)**
- Border: **Amber (#FFC107)**, 2px

**Icon**: ✍️ (answer)

---

## 🎨 BƯỚC 8: VẼ ENUMS

### QuestionType

**Vị trí**: X: 1350, Y: 80

```
┌─────────────────────────┐
│    <<enumeration>>      │
│     QuestionType        │
├─────────────────────────┤
│ TEXT                    │
│ MULTIPLE_CHOICE         │
│ RATING                  │
│ YES_NO                  │
└─────────────────────────┘
```

---

## 🔗 BƯỚC 9: VẼ RELATIONSHIPS

### R1: User ──────▷ PeerReview (1:N) - reviewer

- From: User (reviewer)
- To: PeerReview.reviewer_id
- Labels: `1` → `*`
- Role: `reviewer`

---

### R2: User ──────▷ PeerReview (1:N) - reviewee

- From: User (reviewee)
- To: PeerReview.reviewee_id
- Labels: `1` → `*`
- Role: `reviewee`
- **Different line style** để phân biệt với R1

---

### R3: Group ──────▷ PeerReview (1:N)

- From: Group
- To: PeerReview.group_id
- Labels: `1` → `*`

---

### R4: Group ──────▷ GroupEvaluation (1:N)

- From: Group
- To: GroupEvaluation
- Labels: `1` → `*`

---

### R5: User (Lecturer) ──────▷ GroupEvaluation (1:N)

- From: User (evaluator)
- To: GroupEvaluation.evaluator_id
- Labels: `1` → `*`
- Role: `evaluator`

---

### R6: GroupMember ──────▷ MemberEvaluation (1:N)

- From: GroupMember
- To: MemberEvaluation.member_id
- Labels: `1` → `*`

---

### R7: User (Lecturer) ──────▷ MemberEvaluation (1:N)

- From: User
- To: MemberEvaluation.evaluator_id
- Labels: `1` → `*`
- Role: `evaluator`

---

### R8: Checkpoint ──────▷ CheckpointEvaluation (1:N)

- From: Checkpoint (external)
- To: CheckpointEvaluation
- Labels: `1` → `*`

---

### R9: User (Lecturer) ──────▷ CheckpointEvaluation (1:N)

- From: User
- To: CheckpointEvaluation.evaluator_id
- Labels: `1` → `*`

---

### R10: GroupMilestone ──────▷ MilestoneQuestion (1:N)

- From: GroupMilestone (external)
- To: MilestoneQuestion
- Labels: `1` → `*`

---

### R11: MilestoneQuestion ──────▷ MilestoneAnswer (1:N)

- From: MilestoneQuestion
- To: MilestoneAnswer
- Labels: `1` → `*`

---

### R12: Group ──────▷ MilestoneAnswer (1:N)

- From: Group
- To: MilestoneAnswer.group_id
- Labels: `1` → `*`

---

### R13: User ──────▷ MilestoneAnswer (1:N)

- From: User
- To: MilestoneAnswer.answered_by
- Labels: `1` → `*`
- Role: `answerer`

---

## 🎨 BƯỚC 10: THÊM CONSTRAINTS

### Note 1: Business Rules

```
┌───────────────────────────────────────────┐
│         <<Business Rules>>                │
├───────────────────────────────────────────┤
│ PEER REVIEW:                              │
│ 1. Student cannot review themselves       │
│ 2. Rating range: 1-5                      │
│ 3. All sub-scores: 1-5                    │
│ 4. Anonymous to students, visible to staff│
│ 5. One review per period per pair         │
│                                           │
│ LECTURER EVALUATION:                      │
│ 6. Only LECTURER can evaluate             │
│ 7. GroupEvaluation score: 0-10            │
│ 8. MemberEvaluation score: 0-10           │
│ 9. CheckpointEvaluation score: 0-10       │
│                                           │
│ MILESTONE Q&A:                            │
│ 10. Required questions must be answered   │
│ 11. Answer cannot be edited after submit  │
└───────────────────────────────────────────┘
```

**Vị trí**: Bottom center

---

### Note 2: Anonymity Constraint

```
┌───────────────────────────────────────────┐
│      <<Critical Constraint>>              │
│         Peer Review Anonymity             │
├───────────────────────────────────────────┤
│ - Student CANNOT see reviewer identity    │
│ - Lecturer CAN see all reviews            │
│ - System must filter reviewer_id in API   │
│ - Database stores full data               │
└───────────────────────────────────────────┘
```

**Vị trí**: Near PeerReview class

**Connect**: Bold dashed line từ note → PeerReview

---

### Note 3: Score Calculation

```
┌───────────────────────────────────────────┐
│       <<Algorithm>>                       │
│     Final Member Score Formula            │
├───────────────────────────────────────────┤
│ Final Score = 0.3 × Peer Review           │
│             + 0.5 × Lecturer Evaluation   │
│             + 0.2 × Contribution Score    │
│                                           │
│ Where:                                    │
│ - Peer Review: Average from all peers     │
│ - Lecturer Eval: MemberEvaluation score   │
│ - Contribution: GroupMember.contribution  │
└───────────────────────────────────────────┘
```

**Vị trí**: Right side

---

### Note 4: Indexes

```
┌───────────────────────────────────────────┐
│            <<Indexes>>                    │
├───────────────────────────────────────────┤
│ PeerReview:                               │
│   - (reviewer_id, reviewee_id, period)    │
│     UNIQUE                                │
│   - group_id, period                      │
│                                           │
│ GroupEvaluation:                          │
│   - group_id, milestone_id                │
│                                           │
│ MemberEvaluation:                         │
│   - member_id, milestone_id               │
│                                           │
│ MilestoneAnswer:                          │
│   - (question_id, group_id) UNIQUE        │
└───────────────────────────────────────────┘
```

---

## 🎨 BƯỚC 11: STYLING FINAL

### Color scheme:

- **Peer Review**: Pink theme (#FCE4EC / #E91E63) - peer-to-peer
- **Group/Member Eval**: Purple theme (#F3E5F5 / #9C27B0) - lecturer assessment
- **Checkpoint Eval**: Cyan theme (#E0F7FA / #00BCD4) - submission grading
- **Questions**: Orange theme (#FFF3E0 / #FF9800) - inquiry
- **Answers**: Amber theme (#FFF8E1 / #FFC107) - response
- **Enums**: Yellow theme

### Typography:

- Class names: **Arial Bold, 14pt**
- Attributes: **Courier New, 9pt**
- Constraints: **Arial, 10pt**

### Special highlights:

- **Bold outline** cho PeerReview (most important)
- **Yellow background** cho `is_anonymous` attribute
- **Red border** cho Anonymity Constraint note

---

## 💾 EXPORT

1. **File** → **Export as** → **PNG**
2. Settings:
   - Zoom: **150%** (diagram lớn)
   - Border: 20px
   - Background: White
3. Filename: `4.3.6-class-evaluation.png`
4. Save also: `4.3.6-class-evaluation.drawio`

---

## ✅ CHECKLIST

- [ ] 6 entity classes
- [ ] 2 enums (ReviewPeriod, QuestionType)
- [ ] 13 relationships
- [ ] Anonymity constraint highlighted
- [ ] Score calculation formula
- [ ] Business rules (11 rules)
- [ ] Index note
- [ ] Icons for each evaluation type
- [ ] Colors distinguish evaluation types
- [ ] External references (User, Group, GroupMember, etc.)
- [ ] Export PNG + .drawio

---

## 🐛 TROUBLESHOOTING

**Q: User có nhiều roles (reviewer, reviewee, evaluator) - vẽ sao?**  
A: Option 1: Vẽ 1 User box, nhiều arrows với labels khác nhau  
Option 2: Vẽ nhiều User boxes với stereotypes <<Reviewer>>, <<Evaluator>>

**Q: Làm sao highlight is_anonymous attribute?**  
A: Select attribute text → Background color Yellow → Add lock icon 🔒

**Q: Score calculation note nên ở đâu?**  
A: Giữa MemberEvaluation và PeerReview, connect đến cả 2

---

**THỜI GIAN**: 1.5 giờ (module quan trọng!)

**TIP**: Anonymity là feature CRITICAL - phải highlight rõ ràng!
