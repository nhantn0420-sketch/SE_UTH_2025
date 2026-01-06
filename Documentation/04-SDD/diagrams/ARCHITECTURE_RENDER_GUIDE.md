# HƯỚNG DẪN RENDER ARCHITECTURE DIAGRAM

## ✅ ĐÃ TẠO FILE PLANTUML
File PlantUML đã được tạo tại:
```
C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources\4.1-system-architecture.puml
```

---

## 🚀 CÁCH 1: RENDER ONLINE (NHANH NHẤT - 2 PHÚT)

### Bước 1: Mở PlantUML Web Server
1. Truy cập: **https://www.plantuml.com/plantuml/uml/**

### Bước 2: Upload File
1. Click **"Upload"** ở góc trên bên phải
2. Chọn file: `4.1-system-architecture.puml`
3. Đợi 3-5 giây để render

### Bước 3: Download PNG
1. Nhấn chuột phải vào diagram đã render
2. Chọn **"Save image as..."**
3. Đặt tên: `4.1-system-architecture.png`
4. Lưu vào: `C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\`

**✅ XONG! Diagram đã sẵn sàng.**

---

## 🚀 CÁCH 2: RENDER LOCAL (PHỨC TẠP HƠN - 10 PHÚT)

### Bước 1: Cài đặt Java (nếu chưa có)
```powershell
# Kiểm tra Java
java -version

# Nếu chưa có, download tại: https://www.java.com/download/
```

### Bước 2: Download PlantUML JAR
1. Truy cập: https://plantuml.com/download
2. Download: **plantuml.jar** (latest version)
3. Lưu vào: `C:\Users\LENOVO\Downloads\`

### Bước 3: Render từ Command Line
```powershell
# Di chuyển đến thư mục chứa file .puml
cd "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources"

# Render diagram
java -jar "C:\Users\LENOVO\Downloads\plantuml.jar" 4.1-system-architecture.puml

# File PNG sẽ được tạo trong cùng thư mục
```

### Bước 4: Di chuyển PNG đến đúng thư mục
```powershell
Move-Item "4.1-system-architecture.png" "..\4.1-system-architecture.png"
```

---

## 📝 SAU KHI CÓ DIAGRAM PNG

### Bước tiếp theo: Chèn diagram vào markdown

Tôi sẽ tự động chèn diagram vào file `4.1-SystemDesign.md` với:
- Figure 4.1: System Architecture Diagram
- Caption đầy đủ mô tả 3-tier architecture
- Giải thích các layers và connections

**Bạn chỉ cần:**
1. Render diagram PNG (bằng Cách 1 hoặc Cách 2)
2. Đặt file PNG vào: `C:\Users\LENOVO\Desktop\SE\Documentation\04-SDD\diagrams\`
3. Báo cho tôi biết "diagram đã sẵn sàng"
4. Tôi sẽ chèn vào markdown ngay lập tức

---

## 🎨 NẾU BẠN MUỐN CHỈNH SỬA DIAGRAM

### PlantUML có thể điều chỉnh:
1. **Màu sắc**: Thay đổi hex codes trong phần `!define` (ví dụ: `#E3F2FD`)
2. **Text**: Sửa trực tiếp text trong file `.puml`
3. **Components**: Thêm/xóa components bằng cách thêm/xóa dòng `[Component Name]`
4. **Arrows**: Thêm connections bằng `Component1 --> Component2 : Label`

### Ví dụ chỉnh sửa:
```plantuml
' Thêm component mới
[New Service] as NewSvc #FFFFFF

' Thêm connection mới
FastAPI --> NewSvc : API Call
```

### Sau khi chỉnh sửa:
1. Lưu file `.puml`
2. Render lại (Cách 1 hoặc Cách 2)
3. File PNG mới sẽ được tạo

---

## 💡 TẠI SAO DÙNG PLANTUML THAY VÌ DRAW.IO?

### Ưu điểm PlantUML:
✅ **Nhanh**: Render trong 3-5 giây (vs 2 giờ vẽ tay)
✅ **Version Control**: File text thuần, dễ track changes trong Git
✅ **Nhất quán**: Style tự động, không bị lệch layout
✅ **Dễ chỉnh sửa**: Sửa text → render lại (vs vẽ lại từ đầu)
✅ **Automation**: Có thể integrate vào CI/CD

### Nhược điểm:
❌ Ít flexible hơn Draw.io về layout tùy chỉnh
❌ Phải học syntax PlantUML

**KẾT LUẬN**: PlantUML tốt hơn cho architecture diagrams đơn giản. Draw.io tốt hơn cho class diagrams phức tạp.

---

## 📊 THÔNG TIN DIAGRAM ĐÃ TẠO

### Nội dung:
- ✅ **Client Layer**: Browser, React SPA, Mobile App
- ✅ **Web Server Layer**: Nginx với SSL/TLS
- ✅ **Application Layer**: FastAPI, Socket.IO, WebRTC, Background Tasks
- ✅ **Data Layer**: PostgreSQL (37 tables), Redis Cache
- ✅ **External Services**: AWS Bedrock, Cloudinary, SMTP
- ✅ **Connections**: 15 arrows với labels
- ✅ **Notes**: Tech Stack, Deployment, Security
- ✅ **Legend**: Connection types explained

### Đặc điểm:
- 📐 Layout: Top-down 3-tier
- 🎨 Colors: Theo theme (Blue/Green/Orange/Purple)
- 📝 Text: Arial font, consistent sizing
- 🔗 Arrows: Solid (sync) vs Dashed (async)

---

## ❓ CÂU HỎI THƯỜNG GẶP

**Q: PlantUML có render đẹp như Draw.io không?**  
A: PlantUML tự động layout, đẹp và chuyên nghiệp nhưng ít customizable hơn Draw.io. Đủ tốt cho technical documentation.

**Q: Tôi có thể edit PlantUML diagram sau này không?**  
A: Có! Chỉ cần edit file `.puml` và render lại. Không cần vẽ lại từ đầu.

**Q: Diagram này có giống với hướng dẫn Draw.io không?**  
A: Có cùng nội dung (3 tier, components, connections) nhưng layout tự động của PlantUML sẽ khác một chút.

**Q: Tôi có thể dùng cả PlantUML và Draw.io không?**  
A: Có! Dùng PlantUML cho architecture diagrams (đơn giản), dùng Draw.io cho class diagrams (phức tạp).

**Q: File PNG có resolution cao không?**  
A: PlantUML mặc định render SVG vector (scale vô hạn). Export PNG ở resolution cao (300 DPI).

---

## 🎯 HÀNH ĐỘNG TIẾP THEO

### Option A: Render ngay (2 phút)
```
1. Mở https://www.plantuml.com/plantuml/uml/
2. Upload file 4.1-system-architecture.puml
3. Download PNG
4. Lưu vào thư mục diagrams/
5. Báo cho tôi "diagram sẵn sàng"
```

### Option B: Chỉnh sửa trước khi render (5-10 phút)
```
1. Mở file .puml bằng VS Code
2. Chỉnh sửa text/colors/components
3. Render (Cách 1 hoặc Cách 2)
4. Kiểm tra kết quả
5. Nếu OK, báo cho tôi "diagram sẵn sàng"
```

---

**✅ HÃY CHO TÔI BIẾT KHI BẠN ĐÃ RENDER XONG DIAGRAM!**

Tôi sẽ ngay lập tức:
1. Chèn diagram vào `4.1-SystemDesign.md`
2. Thêm caption chi tiết
3. Giải thích các layers và technologies
4. Update progress: 181 → 183 pages (66%)

Sau đó chúng ta sẽ chuyển sang vẽ 6 Class Diagrams tiếp theo!
