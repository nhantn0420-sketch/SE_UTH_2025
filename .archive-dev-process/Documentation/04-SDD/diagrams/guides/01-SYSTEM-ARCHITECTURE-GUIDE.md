# HƯỚNG DẪN VẼ: SYSTEM ARCHITECTURE DIAGRAM
**File xuất**: `4.1-system-architecture.png`  
**Thời gian**: ~2 giờ  
**Độ khó**: ⭐⭐⭐ Trung bình

---

## 🎯 MỤC TIÊU

Vẽ diagram kiến trúc 3-tier của hệ thống CollabSphere gồm:
- **Client Layer** (React SPA)
- **Web Server** (Nginx)
- **Application Layer** (FastAPI)
- **Data Layer** (PostgreSQL)
- **External Services** (AWS Bedrock, Cloudinary, SMTP)

---

## 🛠️ CHUẨN BỊ

### Bước 1: Mở Draw.io
1. Truy cập: https://app.diagrams.net/
2. Chọn **"Create New Diagram"**
3. Tên file: `CollabSphere-Architecture`
4. Chọn **"Blank Diagram"** → Click **"Create"**

### Bước 2: Thiết lập Canvas
1. **File** → **Page Setup**
2. **Paper Size**: A4 Landscape (297mm × 210mm)
3. **Background**: White
4. **Grid**: Show Grid (10px)
5. Click **"Apply"**

---

## 📐 LAYOUT TỔNG QUAN

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Top)                      │
│     Browser │ React SPA │ Mobile App                        │
├─────────────────────────────────────────────────────────────┤
│                     WEB SERVER (Middle Top)                 │
│                    Nginx (Port 443)                         │
├─────────────────────────────────────────────────────────────┤
│                   APPLICATION LAYER (Middle)                │
│   FastAPI │ Socket.IO │ WebRTC │ Business Logic            │
├─────────────────────────────────────────────────────────────┤
│                     DATA LAYER (Bottom)                     │
│             PostgreSQL 15 (28 tables)                       │
├─────────────────────────────────────────────────────────────┤
│         EXTERNAL SERVICES (Right Side)                      │
│   AWS Bedrock │ Cloudinary │ SMTP                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 BƯỚC 1: VẼ CLIENT LAYER

### 1.1. Tạo Container cho Client Layer
1. Từ thanh công cụ bên trái, kéo shape **"Rectangle"**
2. Vẽ hình chữ nhật lớn ở phía **trên cùng**
3. Kích thước: **Width: 800px, Height: 120px**
4. Vị trí: **X: 100, Y: 50**

**Định dạng**:
- **Fill Color**: Light Blue (#E3F2FD)
- **Border**: Solid, 2px, Dark Blue (#1976D2)
- **Text**: "CLIENT LAYER"
  - Font: **Arial Bold, 14pt**
  - Align: **Center, Top**
  - Color: Dark Blue (#1976D2)

### 1.2. Thêm Browser Icon
1. Kéo shape **"Rectangle with Rounded Corners"**
2. Kích thước: **Width: 180px, Height: 60px**
3. Vị trí: Bên trong Client Layer, góc trái

**Định dạng**:
- Fill: White (#FFFFFF)
- Border: Solid, 1px, Gray (#BDBDBD)
- Text: "🌐 Web Browser\nChrome, Firefox, Edge"
  - Font: Arial, 11pt
  - Line 1: Bold
  - Line 2: Regular, smaller

### 1.3. Thêm React SPA
1. Duplicate (Ctrl+D) browser rectangle
2. Di chuyển sang phải (cách 20px)
3. Text: "⚛️ React SPA\nSingle Page Application"

### 1.4. Thêm Mobile App
1. Duplicate thêm 1 lần
2. Di chuyển sang phải nữa
3. Text: "📱 Mobile App\n(Future: React Native)"

---

## 🎨 BƯỚC 2: VẼ WEB SERVER LAYER

### 2.1. Tạo Container Nginx
1. Vẽ rectangle mới
2. Kích thước: **Width: 800px, Height: 100px**
3. Vị trí: **Dưới Client Layer, cách 30px**

**Định dạng**:
- Fill: Light Green (#E8F5E9)
- Border: Solid, 2px, Green (#4CAF50)
- Text: "WEB SERVER LAYER"
  - Font: Arial Bold, 14pt
  - Color: Green (#4CAF50)

### 2.2. Thêm Nginx Component
1. Vẽ rounded rectangle bên trong
2. Kích thước: **Width: 300px, Height: 50px**
3. Vị trí: Center horizontally

**Định dạng**:
- Fill: White
- Border: Green
- Text: "🔧 Nginx Web Server\nReverse Proxy & Load Balancer\nPort: 443 (HTTPS)"
  - Line 1: Bold
  - Line 2-3: Regular, smaller

### 2.3. Thêm SSL/TLS Badge
1. Vẽ small ellipse
2. Kích thước: **Width: 60px, Height: 30px**
3. Vị trí: Góc phải của Nginx box

**Định dạng**:
- Fill: Dark Green (#2E7D32)
- Text: "SSL/TLS"
  - Font: Arial Bold, 10pt, White

---

## 🎨 BƯỚC 3: VẼ APPLICATION LAYER

### 3.1. Tạo Container Application
1. Vẽ rectangle mới
2. Kích thước: **Width: 800px, Height: 180px**
3. Vị trí: Dưới Web Server, cách 30px

**Định dạng**:
- Fill: Light Orange (#FFF3E0)
- Border: Solid, 2px, Orange (#FF9800)
- Text: "APPLICATION LAYER"
  - Font: Arial Bold, 14pt
  - Color: Orange (#FF9800)

### 3.2. Thêm FastAPI Core
1. Vẽ rounded rectangle
2. Kích thước: **Width: 180px, Height: 120px**
3. Vị trí: Bên trái trong container

**Định dạng**:
- Fill: White
- Border: Orange
- Text: "⚡ FastAPI Core\n\n• REST API\n• JWT Auth\n• Business Logic\n• SQLModel ORM"
  - Line 1: Bold, 12pt
  - Bullets: Regular, 10pt

### 3.3. Thêm Socket.IO Server
1. Duplicate FastAPI box
2. Di chuyển sang phải (cách 20px)
3. Text: "💬 Socket.IO\n\n• Real-time Chat\n• Notifications\n• Presence\n• Group Rooms"

### 3.4. Thêm WebRTC Server
1. Duplicate thêm 1 lần
2. Di chuyển sang phải nữa
3. Text: "🎥 WebRTC\n\n• Video Calls\n• Screen Share\n• Audio Chat\n• Recording"

### 3.5. Thêm Background Tasks
1. Duplicate thêm 1 lần
2. Di chuyển sang phải nữa
3. Text: "⚙️ Background\n\n• Email Queue\n• File Processing\n• Scheduled Jobs\n• Logging"

---

## 🎨 BƯỚC 4: VẼ DATA LAYER

### 4.1. Tạo Container Database
1. Vẽ rectangle mới
2. Kích thước: **Width: 800px, Height: 140px**
3. Vị trí: Dưới Application Layer, cách 30px

**Định dạng**:
- Fill: Light Purple (#F3E5F5)
- Border: Solid, 2px, Purple (#9C27B0)
- Text: "DATA LAYER"
  - Font: Arial Bold, 14pt
  - Color: Purple (#9C27B0)

### 4.2. Thêm PostgreSQL Icon
1. Từ thanh shape, kéo **"Cylinder"** (Database icon)
2. Kích thước: **Width: 100px, Height: 80px**
3. Vị trí: Bên trái trong container

**Định dạng**:
- Fill: White
- Border: Purple
- Text: "PostgreSQL\n15"
  - Font: Arial Bold, 11pt

### 4.3. Thêm Database Info Box
1. Vẽ rectangle bên cạnh cylinder
2. Kích thước: **Width: 350px, Height: 80px**

**Định dạng**:
- Fill: White
- Border: Purple, dashed
- Text: "📊 Database: collabsphere_db\n\n• 28 Tables (6 modules)\n• 40+ Indexes\n• Foreign Keys & Constraints\n• Connection Pool (20 max)"
  - Left-aligned
  - Line 1: Bold

### 4.4. Thêm Redis Cache (Optional)
1. Vẽ small cylinder
2. Kích thước: **Width: 80px, Height: 60px**
3. Vị trí: Góc phải

**Định dạng**:
- Fill: Light Red (#FFEBEE)
- Border: Red (#F44336)
- Text: "Redis\nCache"
  - Font: Bold

---

## 🎨 BƯỚC 5: VẼ EXTERNAL SERVICES

### 5.1. Tạo Container External
1. Vẽ rectangle
2. Kích thước: **Width: 250px, Height: 500px**
3. Vị trí: **Bên phải tất cả các layers** (X: 950)

**Định dạng**:
- Fill: Light Gray (#FAFAFA)
- Border: Solid, 2px, Gray (#757575)
- Text: "EXTERNAL SERVICES"
  - Font: Arial Bold, 14pt
  - Rotate: -90° (vertical text)

### 5.2. Thêm AWS Bedrock
1. Vẽ rounded rectangle
2. Kích thước: **Width: 200px, Height: 80px**
3. Vị trí: Top của External container

**Định dạng**:
- Fill: Orange (#FF9800)
- Border: Dark Orange
- Text: "☁️ AWS Bedrock\n\n• AI Chat Assistant\n• Milestone Generation\n• Claude 3 Sonnet"
  - White text
  - Line 1: Bold

### 5.3. Thêm Cloudinary
1. Duplicate AWS box
2. Di chuyển xuống dưới (cách 20px)
3. Đổi fill: Blue (#2196F3)
4. Text: "☁️ Cloudinary CDN\n\n• File Storage\n• Image Upload\n• Video Hosting\n• 100GB Quota"

### 5.4. Thêm SMTP Server
1. Duplicate thêm 1 lần
2. Di chuyển xuống dưới nữa
3. Đổi fill: Green (#4CAF50)
4. Text: "📧 SMTP Server\n\n• Email Notifications\n• Password Reset\n• Weekly Reports\n• Gmail/SendGrid"

---

## 🔗 BƯỚC 6: VẼ CONNECTIONS (ARROWS)

### 6.1. Client → Nginx
1. Từ thanh công cụ, chọn **"Connector"** (arrow)
2. Click vào **center bottom** của Client Layer
3. Kéo đến **center top** của Nginx Layer

**Định dạng Arrow**:
- Line: Solid, 2px
- Color: Dark Blue (#1976D2)
- Arrow: Filled triangle
- Label: "HTTPS Request\n(Port 443)"
  - Font: Arial, 10pt, Italic
  - Background: White với border

### 6.2. Nginx → FastAPI
1. Vẽ arrow từ Nginx xuống FastAPI
2. Label: "Reverse Proxy\nHTTP/1.1"

### 6.3. FastAPI → PostgreSQL
1. Vẽ arrow từ FastAPI xuống Database
2. Label: "SQLModel ORM\nSQL Queries"
3. **Định dạng**: Bi-directional (2 arrows)

### 6.4. Socket.IO ↔ Client
1. Vẽ arrow từ Socket.IO lên Client (qua Nginx)
2. Label: "WebSocket\nReal-time"
3. Style: Dashed line (để phân biệt với HTTP)

### 6.5. Application → External Services

**FastAPI → AWS Bedrock**:
1. Vẽ arrow từ FastAPI sang AWS box
2. Label: "REST API\nAI Requests"
3. Color: Orange

**FastAPI → Cloudinary**:
1. Vẽ arrow từ FastAPI sang Cloudinary
2. Label: "File Upload\nCDN URLs"
3. Color: Blue

**Background Tasks → SMTP**:
1. Vẽ arrow từ Background Tasks sang SMTP
2. Label: "Send Emails\nAsync Queue"
3. Color: Green

---

## 📝 BƯỚC 7: THÊM CHI TIẾT & ANNOTATIONS

### 7.1. Thêm Technology Stack Box
1. Vẽ rectangle bên trái ngoài (X: 0, Y: 50)
2. Kích thước: **Width: 180px, Height: 300px**

**Nội dung**:
```
📚 TECH STACK

Frontend:
• React 18.2+
• Material-UI
• TailwindCSS
• Axios
• Socket.IO Client

Backend:
• Python 3.11+
• FastAPI 0.104+
• SQLModel
• Pydantic
• Alembic

Database:
• PostgreSQL 15
• pgAdmin

DevOps:
• Docker
• Nginx
• Git
```

### 7.2. Thêm Deployment Note
1. Vẽ text box ở góc dưới phải
2. Text: "🚀 Deployment: Docker Compose\n3 Containers: frontend, backend, database"
3. Font: Arial, 9pt, Italic
4. Background: Light Yellow (#FFFDE7)

### 7.3. Thêm Security Badge
1. Vẽ small rectangle ở góc trên phải
2. Text: "🔒 Security:\n• JWT Auth\n• HTTPS/SSL\n• RBAC (5 roles)\n• bcrypt hashing"
3. Fill: Light Green
4. Border: Dashed

---

## 🎨 BƯỚC 8: STYLING & FINAL TOUCHES

### 8.1. Color Consistency
Đảm bảo:
- **Client Layer**: Tất cả Blue theme (#E3F2FD, #1976D2)
- **Web Server**: Tất cả Green theme (#E8F5E9, #4CAF50)
- **Application**: Tất cả Orange theme (#FFF3E0, #FF9800)
- **Data Layer**: Tất cả Purple theme (#F3E5F5, #9C27B0)
- **External**: Gray + màu riêng cho từng service

### 8.2. Font Consistency
1. **Headings**: Arial Bold, 14pt
2. **Subheadings**: Arial Bold, 12pt
3. **Body text**: Arial Regular, 10pt
4. **Labels**: Arial Italic, 9pt

### 8.3. Spacing
- Khoảng cách giữa layers: **30px**
- Khoảng cách giữa components trong layer: **20px**
- Padding trong containers: **10px**

### 8.4. Alignment
1. Select tất cả components trong 1 layer
2. **Arrange** → **Align** → **Align Center Horizontally**
3. **Arrange** → **Distribute** → **Distribute Horizontally**

---

## 💾 BƯỚC 9: EXPORT

### 9.1. Chuẩn bị Export
1. **View** → **Zoom** → **Fit Page**
2. Check tất cả elements hiển thị đúng
3. **Edit** → **Select All** (Ctrl+A)
4. **Arrange** → **Group** (Ctrl+G) - nhóm tất cả lại

### 9.2. Export PNG
1. **File** → **Export as** → **PNG**
2. Settings:
   - **Zoom**: 200% (for high resolution)
   - **Border Width**: 10
   - **Transparent Background**: ❌ Unchecked (keep white)
   - **Include a copy of my diagram**: ✅ Checked (để edit sau)
3. Click **"Export"**
4. Đặt tên: `4.1-system-architecture.png`
5. Lưu vào: `C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\`

### 9.3. Export Source File (optional)
1. **File** → **Save as**
2. Format: **.drawio**
3. Tên: `4.1-system-architecture.drawio`
4. Lưu cùng thư mục với PNG

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Client Layer: 3 components (Browser, React, Mobile)
- [ ] Web Server Layer: Nginx với SSL badge
- [ ] Application Layer: 4 components (FastAPI, Socket.IO, WebRTC, Background)
- [ ] Data Layer: PostgreSQL cylinder + info box + Redis
- [ ] External Services: 3 boxes (AWS, Cloudinary, SMTP)
- [ ] Connections: 8 arrows với labels rõ ràng
- [ ] Tech Stack box (bên trái)
- [ ] Deployment note (góc dưới)
- [ ] Security badge (góc trên)
- [ ] Colors consistent theo từng layer
- [ ] Fonts consistent (Arial family)
- [ ] Alignment và spacing đẹp
- [ ] Export PNG 200% resolution
- [ ] Save .drawio source file

---

## 💡 TIPS & TRICKS

### Tip 1: Sử dụng Snap to Grid
- **View** → **Grid** → Enable "Snap to Grid"
- Giúp align chính xác

### Tip 2: Copy Style
1. Select element có style đẹp
2. **Edit** → **Copy Style** (Ctrl+Shift+C)
3. Select element khác
4. **Edit** → **Paste Style** (Ctrl+Shift+V)

### Tip 3: Undo/Redo
- **Undo**: Ctrl+Z
- **Redo**: Ctrl+Y
- Draw.io có unlimited undo!

### Tip 4: Layer Management
- Sử dụng **View** → **Layers** để tổ chức các phần
- Tạo layer riêng cho: Backgrounds, Components, Arrows, Labels

### Tip 5: Smart Arrows
- Double-click arrow để thêm waypoints (điểm uốn)
- Giúp arrow tránh các shapes khác

---

## 🆘 TROUBLESHOOTING

**Q: Text bị cắt?**  
A: Double-click shape → **Text** → **Word Wrap**: Enabled

**Q: Arrow không connect vào shape?**  
A: Kéo arrow endpoint vào các điểm màu xanh trên shape (connection points)

**Q: Không tìm thấy Cylinder shape?**  
A: **More Shapes** → **General** → Enable "Entity Relation"

**Q: Export bị mờ?**  
A: Tăng Zoom lên 300% khi export PNG

**Q: Màu sắc không giống hướng dẫn?**  
A: Copy hex code chính xác (ví dụ: #1976D2) vào Fill Color

---

## 📚 THAM KHẢO

- **Nội dung chi tiết**: `Documentation/04-SDD/4.1-SystemDesign.md`
- **Architecture guide**: `Documentation/diagrams/04-ARCHITECTURE-GUIDE.md`
- **Draw.io tutorial**: https://www.youtube.com/watch?v=Z0D96ZikMkc

---

**HOÀN THÀNH! 🎉**  
Diagram của bạn sẽ trông giống như architecture diagram chuẩn 3-tier với đầy đủ thông tin về CollabSphere system!

**Thời gian thực tế**: 1.5-2 giờ (lần đầu), 30-45 phút (nếu đã quen)
