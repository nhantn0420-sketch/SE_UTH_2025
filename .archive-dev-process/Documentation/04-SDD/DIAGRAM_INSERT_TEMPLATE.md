# TEMPLATE: Chèn Diagrams vào Markdown

**Sử dụng file này để copy/paste khi chèn diagrams**

---

## 📌 TEMPLATE CHO FILE 4.1-SystemDesign.md

### Vị trí: Sau section 4.1.1 (dòng ~80)

```markdown
### System Architecture Diagram

![System Architecture](diagrams/4.1-system-architecture.png)

**Figure 4.1**: CollabSphere 3-Tier System Architecture  
*The diagram shows the complete system architecture including Client Layer (React SPA), Web Server (Nginx), Application Layer (FastAPI), Data Layer (PostgreSQL 15), and external integrations (AWS Bedrock, Cloudinary, SMTP).*

**Key Components**:
- **Presentation Layer**: React 18.2+ with Material-UI
- **Application Layer**: FastAPI 0.104+ with SQLModel ORM
- **Data Layer**: PostgreSQL 15 with 28 tables
- **Communication**: REST API (HTTPS), WebSocket (Socket.IO), WebRTC (Video)
```

---

## 📌 TEMPLATE CHO FILE 4.2-DatabaseDesign.md

### Vị trí: Sau section 4.2.3 (dòng ~150)

```markdown
### Complete Entity Relationship Diagram

![Database ERD](diagrams/4.2-erd-full.png)

**Figure 4.2**: Complete Entity Relationship Diagram (28 Tables)  
*This ERD illustrates all database tables grouped into 6 logical modules: Users & Academic (5 tables), Projects & Groups (8 tables), Collaboration (6 tables), Evaluation (6 tables), Notifications (1 table), and Additional (2 tables).*

**ERD Legend**:
- 🟨 **Yellow boxes**: Primary Keys (PK)
- 🟦 **Blue text**: Foreign Keys (FK)
- **Crow's foot**: One-to-Many relationships (1:N)
- **Double lines**: Many-to-Many via junction tables (M:N)

**Table Groups**:
1. **Users & Academic**: users, subjects, curricula, classes, class_members
2. **Projects & Groups**: projects, project_milestones, class_projects, groups, group_members, group_milestones, checkpoints, tasks
3. **Collaboration**: meetings, meeting_participants, chat_messages, resources, whiteboard_sessions, document_sessions
4. **Evaluation**: peer_reviews, group_evaluations, member_evaluations, checkpoint_evaluations, milestone_questions, milestone_answers
5. **Notifications**: notifications
6. **Additional**: project_tags, activity_logs
```

---

## 📌 TEMPLATE CHO FILE 4.3-DetailedDesign.md

### Vị trí 1: Sau section 4.3.5 (dòng ~1950) - Class Diagrams

```markdown
### Class Diagrams

The following class diagrams illustrate the object-oriented design of CollabSphere backend using SQLModel ORM.

#### 1. User and Authentication Module

![User Classes](diagrams/4.3-class-user.png)

**Figure 4.3.1**: User and Authentication Classes  
*Core user management with 5 roles (Admin, Staff, Head, Lecturer, Student). Includes password hashing with bcrypt and JWT token generation.*

**Key Classes**:
- `User`: Main user entity with authentication fields
- `UserRole`: Enum for 5 roles with RBAC hierarchy

---

#### 2. Academic Management Module

![Academic Classes](diagrams/4.3-class-academic.png)

**Figure 4.3.2**: Academic Management Classes  
*Subject, curriculum, and class management for academic structure.*

**Key Classes**:
- `Subject`: Course definition with credit hours
- `Curriculum`: Weekly learning content
- `Class`: Teaching session with lecturer and students
- `ClassMember`: Many-to-many relationship

---

#### 3. Project Management Module

![Project Classes](diagrams/4.3-class-project.png)

**Figure 4.3.3**: Project Management Classes  
*Project lifecycle with approval workflow (Pending → Submitted → Approved/Rejected).*

**Key Classes**:
- `Project`: Project definition with approval status
- `ProjectMilestone`: Template milestones
- `ClassProject`: Assignment to classes

---

#### 4. Group and Workspace Module

![Group Classes](diagrams/4.3-class-group.png)

**Figure 4.3.4**: Group and Workspace Classes  
*Student group collaboration with tasks, milestones, and checkpoints.*

**Key Classes**:
- `Group`: Team with leader and members (3-5 students)
- `GroupMember`: Membership with contribution score
- `GroupMilestone`: Milestone tracking
- `Checkpoint`: Deliverable submissions
- `Task`: Kanban board items

---

#### 5. Communication Module

![Communication Classes](diagrams/4.3-class-communication.png)

**Figure 4.3.5**: Communication and Collaboration Classes  
*Real-time chat, video meetings, file sharing, and collaborative editing.*

**Key Classes**:
- `ChatMessage`: Real-time group chat
- `Meeting`: Video conference scheduling
- `Resource`: File uploads (max 100MB)
- `WhiteboardSession`: Collaborative whiteboard
- `DocumentSession`: Real-time document editing

---

#### 6. Evaluation Module

![Evaluation Classes](diagrams/4.3-class-evaluation.png)

**Figure 4.3.6**: Evaluation and Assessment Classes  
*Multi-level evaluation system: group, individual, peer reviews, and checkpoints.*

**Key Classes**:
- `PeerReview`: Anonymous peer assessments
- `GroupEvaluation`: Lecturer evaluates group progress
- `MemberEvaluation`: Individual student assessment
- `CheckpointEvaluation`: Milestone deliverable grading
```

---

### Vị trí 2: Sau section 4.3.6 (dòng ~2050) - Sequence Diagrams

```markdown
### Sequence Diagrams

The following sequence diagrams illustrate key interaction flows in CollabSphere.

#### 1. User Authentication Flow

![Authentication Sequence](diagrams/4.3-seq-authentication.png)

**Figure 4.3.7**: User Authentication Sequence Diagram  
*Complete login flow from credential submission to JWT token generation and storage.*

**Flow Steps**:
1. Student enters username/email and password
2. Frontend sends POST /api/v1/auth/login
3. Backend queries database for user
4. Verify password with bcrypt (12 rounds)
5. Generate JWT access token (24h expiry) and refresh token (7d expiry)
6. Return tokens to frontend
7. Frontend stores tokens in localStorage
8. Redirect to dashboard

---

#### 2. User Registration Flow

![Registration Sequence](diagrams/4.3-seq-registration.png)

**Figure 4.3.8**: User Registration Sequence Diagram  
*New student account creation with email/username uniqueness validation.*

**Flow Steps**:
1. User fills registration form (Student role only)
2. Frontend validates input (password strength, email format)
3. Backend checks email/username uniqueness
4. Hash password with bcrypt
5. Create user record in database
6. Auto-generate JWT tokens
7. Return tokens + user profile
8. Redirect to onboarding

---

#### 3. Project Approval Workflow

![Project Approval](diagrams/4.3-seq-project-approval.png)

**Figure 4.3.9**: Project Approval Workflow Sequence  
*Multi-stage project approval: Create → Submit → Review → Approve/Reject.*

**Flow Steps**:
1. **Creation**: Lecturer creates project (status: PENDING)
2. **Submission**: Lecturer submits for approval (status: SUBMITTED)
3. **Notification**: System notifies Head via email + in-app
4. **Review**: Head reviews project details
5. **Decision**:
   - **If Approved**: Status = APPROVED, available for class assignment
   - **If Rejected**: Status = REJECTED, rejection_reason required
6. **Feedback**: Lecturer receives notification with decision

---

#### 4. Group Formation Flow

![Group Creation](diagrams/4.3-seq-group-creation.png)

**Figure 4.3.10**: Group Formation Sequence  
*Lecturer creates groups and assigns students with leader designation.*

**Business Rules**:
- 3-5 members per group (BR-33)
- Exactly 1 leader per group (BR-34)
- Student can join only 1 group per class (BR-35)

---

#### 5. Milestone Tracking Flow

![Milestone Tracking](diagrams/4.3-seq-milestone-tracking.png)

**Figure 4.3.11**: Group Milestone Tracking Sequence  
*Milestone lifecycle: Assignment → Work → Submission → Evaluation.*

**Flow Steps**:
1. Lecturer assigns milestone to group with deadline
2. Team leader creates tasks and assigns members
3. Members update task status (TODO → IN_PROGRESS → DONE)
4. Team leader marks milestone complete
5. Lecturer evaluates submission
6. System calculates group score

---

#### 6. Peer Review Process

![Peer Review](diagrams/4.3-seq-peer-review.png)

**Figure 4.3.12**: Anonymous Peer Review Sequence  
*Students review teammates anonymously; Lecturer sees full details.*

**Flow Steps**:
1. Lecturer opens peer review period (MIDTERM or FINAL)
2. Students submit reviews for all teammates
3. System enforces: Can't review self, one review per teammate
4. Reviews stored as anonymous (is_anonymous = TRUE)
5. After deadline, aggregate ratings calculated
6. Students see: Average rating + anonymous comments
7. Lecturer sees: Full details with reviewer names

---

#### 7. Real-time Chat Flow

![Chat Realtime](diagrams/4.3-seq-chat-realtime.png)

**Figure 4.3.13**: Real-time Chat with WebSocket Sequence  
*Bi-directional communication using Socket.IO for instant messaging.*

**Flow Steps**:
1. User opens chat window
2. Frontend connects to Socket.IO server with JWT auth
3. Join group room: `socket.join('group_501')`
4. Load recent messages via REST API
5. User types and sends message
6. POST /api/v1/chat/groups/501/messages
7. Backend saves to database
8. Emit WebSocket event to all room members
9. Other users receive message in real-time
10. Display in chat UI + notification sound

---

#### 8. File Upload Flow

![File Upload](diagrams/4.3-seq-file-upload.png)

**Figure 4.3.14**: Resource File Upload Sequence  
*Upload files to Cloudinary CDN with metadata stored in database.*

**Flow Steps**:
1. User selects file (max 100MB)
2. Frontend validates file type and size
3. POST /api/v1/resources (multipart/form-data)
4. Backend uploads to Cloudinary
5. Cloudinary returns secure URL
6. Save resource metadata to database
7. Broadcast availability to group members

---

#### 9. AI Milestone Generation Flow

![AI Generation](diagrams/4.3-seq-ai-generation.png)

**Figure 4.3.15**: AI-Powered Milestone Generation Sequence  
*Lecturer uses AWS Bedrock Claude to auto-generate project milestones.*

**Flow Steps**:
1. Lecturer requests AI milestone generation
2. Frontend sends project description + duration
3. Backend prepares prompt for Claude
4. Call AWS Bedrock API (streaming response)
5. Real-time stream milestones to frontend (SSE)
6. Lecturer previews generated milestones
7. Can edit or regenerate
8. On approval, batch insert to database
9. Milestones available for group assignment

**Business Rules**:
- AI requests limited to 50/day/user (BR-52)
- Generated content must be reviewed (BR-51)

---

#### 10. Notification Delivery Flow

![Notification](diagrams/4.3-seq-notification.png)

**Figure 4.3.16**: Multi-channel Notification Sequence  
*System notifications via in-app + email + WebSocket push.*

**Trigger Events**:
- Project approved/rejected
- New chat message
- Milestone deadline approaching
- Evaluation published
- Meeting scheduled

**Flow Steps**:
1. Event occurs in system
2. Notification service creates notification record
3. Send in-app notification (database insert)
4. Send email via SMTP (async)
5. Push via WebSocket to online users
6. User sees red badge counter
7. Click to mark as read
8. Auto-delete after 30 days (BR-30)
```

---

### Vị trí 3: Tạo section mới 4.3.13 (cuối file) - GUI Design

```markdown
## 4.3.13. GUI DESIGN

CollabSphere provides role-specific user interfaces optimized for each user type: Admin, Staff, Head, Lecturer, and Student. The following screenshots illustrate the complete user experience across all major features.

### Design Principles

- **Material Design 3**: Modern UI components from MUI library
- **Responsive Layout**: Mobile-first design (breakpoints: xs, sm, md, lg, xl)
- **Accessibility**: WCAG 2.1 Level AA compliance
- **Dark Mode**: Toggle between light/dark themes
- **Color Palette**:
  - Primary: #1976D2 (Blue)
  - Secondary: #FF9800 (Orange)
  - Success: #4CAF50 (Green)
  - Error: #F44336 (Red)

---

### 1. Authentication Screens

#### Login Screen

![Login Screen](diagrams/gui/4.3-gui-01-login.png)

**Figure 4.3.20**: Login Screen  
*Clean login interface with username/email input, password field, "Remember me" checkbox, and "Forgot password" link. Supports OAuth2 password flow.*

**Features**:
- Input validation (email format, required fields)
- Password visibility toggle
- "Remember me" localStorage
- Responsive design (mobile-friendly)

---

#### Registration Screen

![Registration Screen](diagrams/gui/4.3-gui-02-register.png)

**Figure 4.3.21**: Student Registration Screen  
*Self-service registration for students only. Requires FPT email domain validation.*

**Fields**:
- Username (3-50 chars, alphanumeric + underscore/dash)
- Email (must be @student.fpt.edu.vn)
- Password (min 6 chars, 8+ recommended)
- Full Name
- Phone (optional)

**Validation**:
- Real-time password strength indicator
- Email uniqueness check
- Username availability check

---

### 2. Admin Dashboard

#### Admin Home

![Admin Dashboard](diagrams/gui/4.3-gui-04-admin-dashboard.png)

**Figure 4.3.22**: Admin Dashboard Overview  
*Statistics widgets showing total users, active classes, projects, and system health.*

**Widgets**:
- User count by role (pie chart)
- Active classes per semester (bar chart)
- Project approval rate (line chart)
- Recent activity log (table)

---

#### User Management

![User Management](diagrams/gui/4.3-gui-05-admin-users.png)

**Figure 4.3.23**: User Management Interface  
*DataGrid with search, filter, sort, and bulk actions.*

**Features**:
- Search by username, email, full name
- Filter by role, status (active/inactive)
- Inline edit user profile
- Bulk activate/deactivate
- Create new user (any role)
- Export to CSV

---

### 3. Lecturer Dashboard

#### Create Project Form

![Create Project](diagrams/gui/4.3-gui-13-lecturer-create-project.png)

**Figure 4.3.24**: Project Creation Form  
*Multi-step wizard for project definition.*

**Steps**:
1. **Basic Info**: Title, description, objectives
2. **Scope**: Define features and limitations
3. **Milestones**: Add milestones (or use AI generation)
4. **Review**: Preview before submission

**AI Integration**:
- Button: "Generate Milestones with AI"
- Input: Project duration (weeks)
- Output: 5-7 milestones with descriptions

---

### 4. Student Dashboard

#### Group Workspace (Main View)

![Group Workspace](diagrams/gui/4.3-gui-19-student-group-workspace.png)

**Figure 4.3.25**: Group Workspace Overview  
*Tabbed interface with 5 main sections: Tasks, Chat, Resources, Meetings, Whiteboard.*

**Header**:
- Group name + project title
- Member avatars (online status indicators)
- Milestone progress bar
- Quick actions: Schedule meeting, Upload file, AI chat

---

#### Kanban Board

![Kanban Board](diagrams/gui/4.3-gui-20-student-kanban.png)

**Figure 4.3.26**: Task Management Kanban Board  
*Drag-and-drop task board with 3 columns: TODO, IN PROGRESS, DONE.*

**Features**:
- Create task with title, description, assignee, due date, priority
- Drag tasks between columns (status update)
- Filter by assignee, priority, milestone
- Sort by due date, priority
- Task details modal with subtasks and comments
- Color coding: High priority = Red, Medium = Yellow, Low = Green

---

#### Group Chat

![Group Chat](diagrams/gui/4.3-gui-22-student-chat.png)

**Figure 4.3.27**: Real-time Group Chat  
*WebSocket-powered instant messaging with file attachments.*

**Features**:
- Real-time message delivery (Socket.IO)
- Online status indicators
- Typing indicators ("John is typing...")
- File attachments (drag-and-drop)
- Emoji picker
- Message search
- Infinite scroll (load older messages)
- Unread message count

---

#### Video Conference

![Video Call](diagrams/gui/4.3-gui-23-student-video-call.png)

**Figure 4.3.28**: WebRTC Video Conference  
*Built-in video conferencing with screen sharing.*

**Features**:
- Grid view (up to 9 participants)
- Speaker view (highlight active speaker)
- Screen sharing
- Audio/video mute toggles
- Chat sidebar
- Recording (with consent)
- Virtual background (blur)
- Hand raise signal

---

#### Collaborative Whiteboard

![Whiteboard](diagrams/gui/4.3-gui-24-student-whiteboard.png)

**Figure 4.3.29**: Collaborative Whiteboard  
*Real-time drawing canvas for brainstorming sessions.*

**Tools**:
- Pen (with color picker and thickness)
- Eraser
- Shapes (rectangle, circle, arrow)
- Text tool
- Sticky notes
- Image upload
- Undo/Redo
- Clear canvas
- Export as PNG

**Real-time Sync**:
- Multi-user cursors (show names)
- Instant stroke synchronization
- Conflict resolution

---

#### Peer Review Form

![Peer Review](diagrams/gui/4.3-gui-27-student-peer-review.png)

**Figure 4.3.30**: Anonymous Peer Review Form  
*Rate teammates on 4 criteria: Communication, Technical Skills, Teamwork, Time Management.*

**Criteria** (1-5 stars):
- Communication: Clarity and frequency
- Technical Skills: Code quality and problem-solving
- Teamwork: Collaboration and support
- Time Management: Meeting deadlines

**Comments**: Optional text feedback (anonymous)

**Reminder**: "Your review is anonymous to teammates but visible to lecturer."

---

### 5. Responsive Design

All screens are fully responsive with breakpoints:

| Breakpoint | Width | Layout |
|------------|-------|--------|
| **xs** | <600px | Mobile (single column) |
| **sm** | 600-960px | Tablet portrait |
| **md** | 960-1280px | Tablet landscape |
| **lg** | 1280-1920px | Desktop |
| **xl** | >1920px | Large desktop |

**Mobile Optimizations**:
- Hamburger menu for navigation
- Bottom tab bar for quick actions
- Swipe gestures (chat, tasks)
- Touch-friendly button sizes (min 48x48px)

---

### 6. Accessibility Features

- **Keyboard Navigation**: All actions accessible via keyboard
- **Screen Reader**: ARIA labels and roles
- **High Contrast**: Support for high contrast themes
- **Focus Indicators**: Visible focus states
- **Font Scaling**: Respects browser font size settings

---

### 7. Design System Reference

- **Component Library**: Material-UI (MUI) v5
- **Icons**: Material Icons + Font Awesome
- **Typography**: Roboto font family
- **Spacing**: 8px base unit (4, 8, 16, 24, 32, 40px)
- **Border Radius**: 8px standard, 4px small, 16px large
- **Shadows**: Elevation system (0-24)

---

**[End of Section 4.3]**
```

---

## 💡 TIPS CHÈN DIAGRAMS

### 1. Image Paths

**Sử dụng relative paths** (không absolute):
```markdown
✅ ĐÚNG: ![ERD](diagrams/4.2-erd-full.png)
❌ SAI:  ![ERD](C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\4.2-erd-full.png)
```

### 2. Alt Text

**Luôn có alt text** (cho accessibility):
```markdown
✅ ĐÚNG: ![System Architecture Diagram](diagrams/4.1-system-architecture.png)
❌ SAI:  ![](diagrams/4.1-system-architecture.png)
```

### 3. Captions

**Thêm caption có định dạng** (Figure X.X):
```markdown
![System Architecture](diagrams/4.1-system-architecture.png)
**Figure 4.1**: CollabSphere 3-Tier System Architecture
```

### 4. Descriptions

**Thêm mô tả ngắn gọn** (italic):
```markdown
![System Architecture](diagrams/4.1-system-architecture.png)
**Figure 4.1**: CollabSphere 3-Tier System Architecture  
*The diagram shows complete system architecture with 3 layers...*
```

### 5. Image Size

**Không cần specify size** (let Markdown/viewer handle):
```markdown
✅ ĐÚNG: ![ERD](diagrams/4.2-erd-full.png)
⚠️ OK:   ![ERD](diagrams/4.2-erd-full.png){width=800px}
```

---

## 📋 CHECKLIST SAU KHI CHÈN

- [ ] Tất cả image paths đúng (relative paths)
- [ ] Tất cả images có alt text
- [ ] Tất cả figures có captions (Figure X.X)
- [ ] Figure numbers tuần tự (4.1, 4.2, 4.3, ...)
- [ ] Mỗi figure có mô tả ngắn (italic)
- [ ] Preview Markdown để check images load
- [ ] Export PDF để check layout

---

**SAU KHI CHÈN XONG → Section IV 100% complete! 🎉**
