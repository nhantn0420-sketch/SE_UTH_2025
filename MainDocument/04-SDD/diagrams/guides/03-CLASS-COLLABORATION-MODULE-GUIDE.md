# HƯỚNG DẪN VẼ: CLASS DIAGRAM - COLLABORATION MODULE
**File xuất**: `4.3.5-class-collaboration.png`  
**Thời gian**: ~1 giờ  
**Độ khó**: ⭐⭐⭐ Trung bình

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **Collaboration Module** - Real-time features! Bao gồm:
- **ChatMessage** (Tin nhắn)
- **Meeting** (Cuộc họp)
- **MeetingParticipant** (Người tham gia)
- **Resource** (Tài liệu/File)
- **WhiteboardSession** (Bảng vẽ)
- **DocumentSession** (Soạn thảo đồng thời)

---

## 🛠️ CHUẨN BỊ

- Canvas: A4 Landscape
- Enable UML shapes
- Grid: 10px

---

## 📐 LAYOUT

```
┌────────────┐                  ┌────────────────┐
│   Group    │ 1 ────────────N  │  ChatMessage   │
│ (external) │                  └────────────────┘
└────────────┘                           │ N
      │ 1                                ▼ 1
      │                           ┌────────────┐
      │                           │    User    │
      │ N                         │  (sender)  │
┌────────────┐                    └────────────┘
│  Meeting   │
└────────────┘
      │ 1
      │
      │ N
┌──────────────────┐     N ───── 1  ┌────────────┐
│MeetingParticipant│ ────────────────│    User    │
└──────────────────┘                 └────────────┘

┌────────────┐         ┌──────────────────────┐
│  Resource  │         │ WhiteboardSession    │
└────────────┘         └──────────────────────┘

                       ┌──────────────────────┐
                       │  DocumentSession     │
                       └──────────────────────┘
```

---

## 🎨 BƯỚC 1: VẼ CHATMESSAGE CLASS

**Vị trí**: Top center, X: 400, Y: 50

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│          ChatMessage                     │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - sender_id: int                         │
│ - message: string                        │
│ - message_type: MessageType              │
│ - file_url: string?                      │
│ - is_read: bool                          │
│ - read_by: List[int]                     │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, sender_id, message) │
│ + mark_as_read(user_id: int): void       │
│ + is_file_message(): bool                │
│ + is_system_message(): bool              │
│ + get_sender(): User                     │
│ + to_dict(): dict                        │
│ + to_websocket_event(): dict             │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Indigo (#E8EAF6)**
- Border: **Indigo (#3F51B5)**, 2px
- Width: 400px

**Note**: Thêm icon 💬 cho real-time chat

---

## 🎨 BƯỚC 2: VẼ MESSAGETYPE ENUM

**Vị trí**: Right of ChatMessage, X: 850, Y: 80

```
┌─────────────────────────┐
│    <<enumeration>>      │
│     MessageType         │
├─────────────────────────┤
│ TEXT                    │
│ FILE                    │
│ IMAGE                   │
│ SYSTEM                  │
│ NOTIFICATION            │
└─────────────────────────┘
```

**Styling**:
- Header: **Light Yellow (#FFF9C4)**
- Border: **Orange (#FF9800)**, 2px

---

## 🎨 BƯỚC 3: VẼ MEETING CLASS

**Vị trí**: Below ChatMessage, X: 50, Y: 400

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│            Meeting                       │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - title: string                          │
│ - description: string?                   │
│ - group_id: int                          │
│ - created_by: int                        │
│ - scheduled_at: datetime                 │
│ - duration: int                          │
│ - meeting_url: string?                   │
│ - status: MeetingStatus                  │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(title, group_id, scheduled_at)│
│ + start(): void                          │
│ + end(): void                            │
│ + cancel(): void                         │
│ + add_participant(user_id: int): void    │
│ + get_participants(): List[MeetingParticipant]│
│ + is_ongoing(): bool                     │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Blue (#E3F2FD)**
- Border: **Blue (#2196F3)**, 2px

---

## 🎨 BƯỚC 4: VẼ MEETINGPARTICIPANT CLASS (JUNCTION)

**Vị trí**: Right of Meeting, X: 500, Y: 400

```
┌──────────────────────────────────────────┐
│      <<Entity>> <<Junction>>             │
│       MeetingParticipant                 │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - meeting_id: int                        │
│ - user_id: int                           │
│ - status: ParticipantStatus              │
│ - joined_at: datetime?                   │
│ - left_at: datetime?                     │
├──────────────────────────────────────────┤
│ + __init__(meeting_id, user_id)          │
│ + join(): void                           │
│ + leave(): void                          │
│ + get_meeting(): Meeting                 │
│ + get_user(): User                       │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Purple (#F3E5F5)**
- Border: **Purple (#9C27B0)**, 2px

---

## 🎨 BƯỚC 5: VẼ MEETINGSTATUS & PARTICIPANTSTATUS ENUMS

### MeetingStatus

**Vị trí**: X: 950, Y: 400

```
┌─────────────────────────┐
│    <<enumeration>>      │
│    MeetingStatus        │
├─────────────────────────┤
│ SCHEDULED               │
│ ONGOING                 │
│ COMPLETED               │
│ CANCELLED               │
└─────────────────────────┘
```

---

### ParticipantStatus

**Vị trí**: X: 950, Y: 550

```
┌─────────────────────────┐
│    <<enumeration>>      │
│  ParticipantStatus      │
├─────────────────────────┤
│ INVITED                 │
│ ACCEPTED                │
│ DECLINED                │
│ JOINED                  │
│ LEFT                    │
└─────────────────────────┘
```

---

## 🎨 BƯỚC 6: VẼ RESOURCE CLASS

**Vị trí**: Bottom left, X: 50, Y: 750

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│            Resource                      │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - title: string                          │
│ - description: string?                   │
│ - file_url: string                       │
│ - file_type: string                      │
│ - file_size: int                         │
│ - uploaded_by: int                       │
│ - group_id: int?                         │
│ - class_id: int?                         │
│ - created_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(title, file_url, uploaded_by) │
│ + get_uploader(): User                   │
│ + get_file_extension(): string           │
│ + format_file_size(): string             │
│ + is_image(): bool                       │
│ + is_document(): bool                    │
│ + to_dict(): dict                        │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Green (#E8F5E9)**
- Border: **Green (#4CAF50)**, 2px

**Note**: Resource có thể thuộc Group hoặc Class (hoặc cả hai nullable)

---

## 🎨 BƯỚC 7: VẼ WHITEBOARDSESSION CLASS

**Vị trí**: Center bottom, X: 500, Y: 750

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│       WhiteboardSession                  │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - session_name: string                   │
│ - session_data: JSON                     │
│ - created_by: int                        │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, session_name)       │
│ + update_canvas(data: JSON): void        │
│ + get_creator(): User                    │
│ + to_dict(): dict                        │
│ + broadcast_update(): void               │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Orange (#FFF3E0)**
- Border: **Orange (#FF9800)**, 2px

**Icon**: 🎨 (whiteboard/canvas)

---

## 🎨 BƯỚC 8: VẼ DOCUMENTSESSION CLASS

**Vị trí**: Right bottom, X: 950, Y: 750

```
┌──────────────────────────────────────────┐
│            <<Entity>>                    │
│       DocumentSession                    │
├──────────────────────────────────────────┤
│ - id: int                                │
│ - group_id: int                          │
│ - document_name: string                  │
│ - document_content: string               │
│ - version: int                           │
│ - created_by: int                        │
│ - created_at: datetime                   │
│ - updated_at: datetime                   │
├──────────────────────────────────────────┤
│ + __init__(group_id, document_name)      │
│ + update_content(content: string): void  │
│ + increment_version(): void              │
│ + get_creator(): User                    │
│ + to_dict(): dict                        │
│ + broadcast_update(): void               │
└──────────────────────────────────────────┘
```

**Styling**:
- Header: **Light Cyan (#E0F7FA)**
- Border: **Cyan (#00BCD4)**, 2px

**Icon**: 📝 (document)

---

## 🔗 BƯỚC 9: VẼ RELATIONSHIPS

### R1: Group ──────▷ ChatMessage (1:N)

- From: Group (external dashed box)
- To: ChatMessage
- Labels: `1` → `*`
- Role: `messages`

---

### R2: User ──────▷ ChatMessage (1:N)

- From: User.id
- To: ChatMessage.sender_id
- Labels: `1` → `*`
- Role: `sender`

---

### R3: Group ──────▷ Meeting (1:N)

- From: Group
- To: Meeting
- Labels: `1` → `*`
- Role: `meetings`

---

### R4: Meeting ──────▷ MeetingParticipant (1:N)

- From: Meeting
- To: MeetingParticipant
- Labels: `1` → `*`
- Role: `participants`

---

### R5: User ──────▷ MeetingParticipant (1:N)

- From: User
- To: MeetingParticipant
- Labels: `1` → `*`
- Property: `user_id`

---

### R6: User ──────▷ Meeting (1:N) - creator

- From: User
- To: Meeting.created_by
- Labels: `1` → `*`
- Role: `creator`
- Dashed line (separate from participants)

---

### R7: User ──────▷ Resource (1:N)

- From: User
- To: Resource.uploaded_by
- Labels: `1` → `*`
- Role: `uploader`

---

### R8: Group ──────▷ Resource (Optional 1:N)

- From: Group
- To: Resource.group_id
- Type: **Dashed arrow** (optional)
- Labels: `0..1` → `*`

---

### R9: Group ──────▷ WhiteboardSession (1:N)

- From: Group
- To: WhiteboardSession
- Labels: `1` → `*`

---

### R10: Group ──────▷ DocumentSession (1:N)

- From: Group
- To: DocumentSession
- Labels: `1` → `*`

---

## 🎨 BƯỚC 10: THÊM REAL-TIME NOTES

### Note: Real-time Features

**Vị trí**: Top right corner

```
┌────────────────────────────────────────┐
│    <<Real-time via WebSocket>>         │
├────────────────────────────────────────┤
│ 💬 ChatMessage                         │
│    - Socket event: "new_message"       │
│    - Room: group_<group_id>            │
│                                        │
│ 🎨 WhiteboardSession                   │
│    - Socket event: "canvas_update"     │
│    - Broadcast to all group members    │
│                                        │
│ 📝 DocumentSession                     │
│    - Socket event: "doc_update"        │
│    - Collaborative editing             │
│                                        │
│ 📹 Meeting                             │
│    - WebRTC for video/audio            │
│    - Socket for signaling              │
└────────────────────────────────────────┘
```

**Connect**: Dashed lines đến ChatMessage, WhiteboardSession, DocumentSession, Meeting

---

### Note: File Storage

```
┌────────────────────────────────────────┐
│       <<External Service>>             │
│         Cloudinary CDN                 │
├────────────────────────────────────────┤
│ Used by:                               │
│   - ChatMessage.file_url               │
│   - Resource.file_url                  │
│                                        │
│ Supported types:                       │
│   - Images: jpg, png, gif              │
│   - Documents: pdf, docx, xlsx         │
│   - Max size: 10MB                     │
└────────────────────────────────────────┘
```

---

## 🎨 BƯỚC 11: STYLING FINAL

### Color scheme by feature:

- **Chat**: Indigo theme (#E8EAF6 / #3F51B5)
- **Meeting**: Blue theme (#E3F2FD / #2196F3)
- **Junction**: Purple theme (#F3E5F5 / #9C27B0)
- **Files**: Green theme (#E8F5E9 / #4CAF50)
- **Whiteboard**: Orange theme (#FFF3E0 / #FF9800)
- **Document**: Cyan theme (#E0F7FA / #00BCD4)
- **Enums**: Yellow theme

### Icons to add:

- 💬 next to ChatMessage
- 📹 next to Meeting
- 📁 next to Resource
- 🎨 next to WhiteboardSession
- 📝 next to DocumentSession

---

## 💾 EXPORT

1. **File** → **Export as** → **PNG**
2. Settings:
   - Zoom: **200%**
   - Border: 15px
   - Background: White
3. Filename: `4.3.5-class-collaboration.png`
4. Save also: `4.3.5-class-collaboration.drawio`

---

## ✅ CHECKLIST

- [ ] 6 entity classes
- [ ] 3 enums
- [ ] 10 relationships
- [ ] Real-time features note
- [ ] External service note (Cloudinary)
- [ ] Icons for each feature type
- [ ] Colors distinguish features
- [ ] Junction table (MeetingParticipant)
- [ ] WebSocket/WebRTC annotations
- [ ] Export PNG + .drawio

---

## 🐛 TROUBLESHOOTING

**Q: Làm sao thêm icons vào class header?**  
A: Double-click class → Edit text → Copy-paste emoji: 💬 📹 📁 🎨 📝

**Q: JSON data type ký hiệu thế nào?**  
A: Dùng `JSON` hoặc `JSONB` (PostgreSQL-specific)

**Q: Real-time note connect đến nhiều classes?**  
A: Vẽ dashed lines từ note → mỗi related class

---

**THỜI GIAN**: 1 giờ

**TIP**: Highlight real-time features bằng icons và colors!
