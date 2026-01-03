# HƯỚNG DẪN VẼ: CLASS DIAGRAM - USER & AUTHENTICATION MODULE
**File xuất**: `4.3.1-class-user-auth.png`  
**Thời gian**: ~45 phút  
**Độ khó**: ⭐⭐ Dễ (ít classes)

---

## 🎯 MỤC TIÊU

Vẽ Class Diagram cho **User & Authentication Module** bao gồm:
- **User** class (main entity)
- **UserRole** enum
- Authentication-related methods
- Relationships

---

## 🛠️ CHUẨN BỊ

### Bước 1: Mở Draw.io
1. https://app.diagrams.net/
2. **Create New Diagram**
3. Tên: `Class-User-Module`
4. Template: **"UML" → "Class Diagram"** HOẶC **"Blank Diagram"**

### Bước 2: Thiết lập Canvas
1. **File** → **Page Setup**
2. **Paper Size**: A4 Portrait
3. **Background**: White
4. **Grid**: Enable, 10px
5. **Apply**

### Bước 3: Enable UML Shapes
1. Click **"More Shapes"** (bottom left)
2. Check: **"UML"** và **"Software"**
3. Shapes sẽ hiện trong palette

---

## 📐 UML CLASS DIAGRAM NOTATION (QUAN TRỌNG!)

### Cấu trúc của 1 class box:

```
┌─────────────────────────────┐
│      ClassName              │  ← Section 1: Class Name (Bold, Center)
├─────────────────────────────┤
│ - privateAttr: Type         │  ← Section 2: Attributes
│ + publicAttr: Type          │     - private, + public, # protected
│ # protectedAttr: Type       │
├─────────────────────────────┤
│ + publicMethod(): ReturnType│  ← Section 3: Methods
│ - privateMethod(): void     │
└─────────────────────────────┘
```

### Visibility symbols:

- **+ Public**: Accessible từ mọi nơi
- **- Private**: Chỉ trong class
- **# Protected**: Trong class và subclasses
- **~ Package**: Trong cùng package

### Relationship types:

1. **Inheritance (Kế thừa)**: ──────▷ (Solid line, open triangle)
2. **Composition (Hợp thành)**: ────♦ (Filled diamond, strong ownership)
3. **Aggregation (Tập hợp)**: ────◇ (Hollow diamond, weak ownership)
4. **Association (Liên kết)**: ────→ (Arrow)
5. **Dependency (Phụ thuộc)**: ----→ (Dashed arrow)

---

## 🎨 BƯỚC 1: VẼ USER CLASS (MAIN)

### Vị trí: Center, X: 400, Y: 100

### Cấu trúc:

```
┌─────────────────────────────────────────┐
│              <<Entity>>                 │
│                User                     │
├─────────────────────────────────────────┤
│ - id: int                               │
│ - username: string                      │
│ - email: string                         │
│ - hashed_password: string               │
│ - full_name: string                     │
│ - role: UserRole                        │
│ - avatar_url: string?                   │
│ - phone: string?                        │
│ - is_active: bool                       │
│ - last_login: datetime?                 │
│ - created_at: datetime                  │
│ - updated_at: datetime                  │
├─────────────────────────────────────────┤
│ + __init__(username, email, ...)        │
│ + verify_password(plain: string): bool  │
│ + set_password(plain: string): void     │
│ + is_admin(): bool                      │
│ + is_lecturer(): bool                   │
│ + is_student(): bool                    │
│ + can_approve_project(): bool           │
│ + to_dict(): dict                       │
└─────────────────────────────────────────┘
```

### Chi tiết vẽ:

1. **Kéo shape "Class"** từ UML palette
2. **Resize**: Width: 400px, Height: auto

3. **Section 1 (Stereotype + Name)**:
   - Line 1: `<<Entity>>` (italic, 9pt)
   - Line 2: `User` (bold, 16pt)
   - Center alignment

4. **Section 2 (Attributes)**:
   - Font: **Courier New, 10pt** (monospace)
   - Format: `visibility attribute_name: Type`
   - Ví dụ: `- id: int` (private)
   - Nullable: Thêm `?` sau type: `avatar_url: string?`
   - Mỗi attribute 1 dòng
   - Left-aligned

5. **Section 3 (Methods)**:
   - Font: **Courier New, 10pt**
   - Format: `visibility method_name(params): ReturnType`
   - Ví dụ: `+ verify_password(plain: string): bool`
   - Void methods: `set_password(plain: string): void`

6. **Colors**:
   - Header background: **Light Blue (#E3F2FD)**
   - Body: **White**
   - Border: **Dark Blue (#1976D2)**, 2px

---

## 🎨 BƯỚC 2: VẼ USERROLE ENUM

### Vị trí: Right side of User, X: 850, Y: 150

### Cấu trúc:

```
┌─────────────────────────┐
│      <<enumeration>>    │
│        UserRole         │
├─────────────────────────┤
│ ADMIN                   │
│ DEPARTMENT_HEAD         │
│ ACADEMIC_STAFF          │
│ LECTURER                │
│ STUDENT                 │
└─────────────────────────┘
```

### Chi tiết vẽ:

1. **Kéo shape "Class"** từ UML palette
2. **Resize**: Width: 250px, Height: auto

3. **Section 1**:
   - Line 1: `<<enumeration>>` (italic, 9pt)
   - Line 2: `UserRole` (bold, 14pt)

4. **Section 2** (NO Section 3 for enums):
   - Font: **Courier New, 10pt**
   - List các values (UPPERCASE)
   - NO visibility symbols
   - Each value on separate line

5. **Colors**:
   - Header: **Light Yellow (#FFF9C4)**
   - Border: **Orange (#FF9800)**, 2px

---

## 🔗 BƯỚC 3: VẼ RELATIONSHIP

### User ─────────→ UserRole (Association)

**Meaning**: User có 1 UserRole

**Cách vẽ**:

1. **Chọn Connector tool** (toolbar top)
2. **Click vào attribute `role: UserRole`** trong User class
3. **Kéo đến UserRole enum**
4. **Style arrow**:
   - Type: **Plain Arrow** (no triangle)
   - Width: 1.5px
   - Color: Black

5. **Thêm cardinality labels**:
   - Double-click vào line
   - Thêm label gần User: `1` (font 9pt)
   - Thêm label gần UserRole: `1` (font 9pt)

6. **Thêm role name**:
   - Label ở giữa line: `role` (italic, 10pt)

---

## 🎨 BƯỚC 4: THÊM CONSTRAINTS & NOTES

### Note 1: Unique Constraints

**Vị trí**: Above User class, X: 300, Y: 20

**Content**:
```
┌──────────────────────────┐
│    <<constraint>>        │
│  {unique: username}      │
│  {unique: email}         │
└──────────────────────────┘
```

**Cách vẽ**:
1. Kéo shape **"Note"** (looks like a folded paper corner)
2. Width: 220px
3. Background: **Light Yellow (#FFFDE7)**
4. Border: Dashed

**Attach to User**:
- Draw dashed line từ Note → User class
- Line style: Dashed, Gray

---

### Note 2: Indexes

**Vị trí**: Below User class, X: 300, Y: 700

**Content**:
```
┌──────────────────────────┐
│      <<index>>           │
│  Indexes:                │
│  - username (unique)     │
│  - email (unique)        │
│  - role                  │
└──────────────────────────┘
```

---

## 🎨 BƯỚC 5: THÊM AUTHENTICATION METHODS (DETAIL VIEW)

### Method Detail Box

**Vị trí**: Right side, X: 850, Y: 450

**Content**:
```
┌───────────────────────────────────────────┐
│     User.verify_password()                │
├───────────────────────────────────────────┤
│ Parameters:                               │
│   plain: string - Plain text password    │
│                                           │
│ Returns: bool                             │
│   True if password matches, else False    │
│                                           │
│ Algorithm:                                │
│   1. Get stored hashed_password           │
│   2. Use bcrypt to compare                │
│   3. Return comparison result             │
└───────────────────────────────────────────┘
```

**Cách vẽ**:
1. Draw rectangle (NOT class box)
2. Background: **Light Cyan (#E0F7FA)**
3. Border: Solid, 1px
4. Font: **Consolas, 9pt**

**Connect to User**:
- Dashed line từ `verify_password()` method → Detail box
- Add label: `<<details>>`

---

## 🎨 BƯỚC 6: STYLING & LAYOUT

### Colors scheme:

- **Entity classes**: Light Blue (#E3F2FD) header
- **Enums**: Light Yellow (#FFF9C4) header
- **Notes**: Light Yellow (#FFFDE7) background
- **Detail boxes**: Light Cyan (#E0F7FA) background

### Typography:

- **Class names**: Arial Bold, 16pt
- **Stereotypes**: Arial Italic, 9pt
- **Attributes/Methods**: Courier New, 10pt
- **Labels**: Arial, 9pt

### Spacing:

- Between classes: 50px minimum
- Line padding inside class: 5px
- Border width: 2px for classes, 1px for notes

---

## 🎨 BƯỚC 7: THÊM LEGEND (TÙY CHỌN)

**Vị trí**: Bottom right corner

**Content**:
```
┌─────────────────────────┐
│  Legend                 │
├─────────────────────────┤
│  + Public               │
│  - Private              │
│  # Protected            │
│  ~ Package              │
│                         │
│  ? = Nullable           │
└─────────────────────────┘
```

---

## 💾 EXPORT

1. **Select All** (Ctrl+A)
2. **Arrange** → **Align** → **Center Horizontally**
3. **View** → **Fit to Window**
4. **File** → **Export as** → **PNG**
5. Settings:
   - Zoom: **200%** (high resolution)
   - Border: 10px
   - Transparent background: ❌ No (Keep White)
6. Tên file: `4.3.1-class-user-auth.png`
7. Save to: `Documentation/04-SDD/diagrams/`

---

## ✅ CHECKLIST

- [ ] User class có đủ 12 attributes
- [ ] User class có đủ 7 methods
- [ ] UserRole enum có đủ 5 values
- [ ] Relationship User → UserRole rõ ràng
- [ ] Visibility symbols chính xác (+ - # ~)
- [ ] Data types đầy đủ
- [ ] Stereotypes (<<Entity>>, <<enumeration>>)
- [ ] Notes cho constraints và indexes
- [ ] Method detail box (optional)
- [ ] Legend (optional)
- [ ] Colors theo scheme
- [ ] Export PNG resolution cao

---

## 🐛 TROUBLESHOOTING

**Q: Không tìm thấy Class shape?**  
A: More Shapes → Check "UML" → OK

**Q: Làm sao thêm nhiều sections trong Class?**  
A: Double-click class → Add lines với `---------` để phân cách

**Q: Arrow không snap vào class?**  
A: Enable Snap to Grid, kéo arrow đến border của class

**Q: Text bị tràn ra ngoài?**  
A: Chọn class → Resize width, hoặc enable Word Wrap

---

**THỜI GIAN**: 45 phút

**TIP**: Copy User class làm template cho các module khác!
