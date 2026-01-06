# HƯỚNG DẪN RENDER ASCII DIAGRAMS THÀNH PNG

**Mục đích**: Convert 3 PlantUML diagrams thành PNG files chuyên nghiệp

---

## 📁 FILES CẦN RENDER

Đã tạo 3 PlantUML source files:

```
Documentation/diagrams/plantuml-sources/
├── 3.1.1-system-context.puml      (System Context Diagram)
├── 3.1.2-module-structure.puml    (Module Structure)
└── 2.1-gantt-chart.puml           (Project Timeline Gantt Chart)
```

---

## 🎨 PHƯƠNG PHÁP RENDER

### **Option 1: PlantUML Online Editor** ⭐ RECOMMENDED (Nhanh nhất)

**Bước 1**: Mở PlantUML Web Server
```
http://www.plantuml.com/plantuml/uml
```

**Bước 2**: Copy nội dung từng file .puml

```powershell
# Copy System Context Diagram
Get-Content "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources\3.1.1-system-context.puml" | Set-Clipboard

# Copy Module Structure
Get-Content "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources\3.1.2-module-structure.puml" | Set-Clipboard

# Copy Gantt Chart
Get-Content "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources\2.1-gantt-chart.puml" | Set-Clipboard
```

**Bước 3**: Paste vào PlantUML editor và render

**Bước 4**: Download PNG
- Click "PNG" button ở top right
- Save as:
  * `3.1.1-system-context.png` → Save to `Documentation/03-SRS/diagrams/`
  * `3.1.2-module-structure.png` → Save to `Documentation/03-SRS/diagrams/`
  * `2.1-gantt-chart.png` → Save to `Documentation/02-ProjectManagementPlan/diagrams/`

**Thời gian**: 5 phút/diagram = 15 phút total

---

### **Option 2: VS Code Extension** (Nếu có extension)

**Bước 1**: Install PlantUML extension (nếu chưa có)
```
Extension ID: jebbs.plantuml
```

**Bước 2**: Open từng .puml file trong VS Code

**Bước 3**: Press `Alt + D` để preview

**Bước 4**: Right-click → Export → PNG

**Bước 5**: Move files đến đúng thư mục:
```powershell
# Create directories
New-Item -Path "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams" -ItemType Directory -Force
New-Item -Path "C:\Users\LENOVO\Desktop\SE\Documentation\02-ProjectManagementPlan\diagrams" -ItemType Directory -Force

# Move files (sau khi export)
Move-Item "plantuml-sources\3.1.1-system-context.png" "03-SRS\diagrams\"
Move-Item "plantuml-sources\3.1.2-module-structure.png" "03-SRS\diagrams\"
Move-Item "plantuml-sources\2.1-gantt-chart.png" "02-ProjectManagementPlan\diagrams\"
```

---

### **Option 3: Command Line** (Advanced)

**Requirements**: Java 8+ và plantuml.jar

**Bước 1**: Download PlantUML JAR
```powershell
# Download từ https://plantuml.com/download
Invoke-WebRequest -Uri "https://github.com/plantuml/plantuml/releases/download/v1.2023.13/plantuml-1.2023.13.jar" -OutFile "plantuml.jar"
```

**Bước 2**: Render all diagrams
```powershell
cd "C:\Users\LENOVO\Desktop\SE\Documentation\diagrams\plantuml-sources"

# Render all .puml files
java -jar plantuml.jar *.puml

# Move to correct directories
Move-Item "3.1.1-system-context.png" "..\..\..\03-SRS\diagrams\"
Move-Item "3.1.2-module-structure.png" "..\..\..\03-SRS\diagrams\"
Move-Item "2.1-gantt-chart.png" "..\..\..\02-ProjectManagementPlan\diagrams\"
```

---

## 📝 SAU KHI RENDER - UPDATE MARKDOWN

Sau khi có 3 PNG files, markdown files sẽ tự động được update với references đúng.

### Verification Commands

```powershell
# Check if PNG files exist
Test-Path "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams\3.1.1-system-context.png"
Test-Path "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams\3.1.2-module-structure.png"
Test-Path "C:\Users\LENOVO\Desktop\SE\Documentation\02-ProjectManagementPlan\diagrams\2.1-gantt-chart.png"

# Check file sizes (should be 50-200 KB)
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\03-SRS\diagrams\*.png" | Select-Object Name, @{Name="Size (KB)"; Expression={[math]::Round($_.Length/1KB, 2)}}
Get-ChildItem "C:\Users\LENOVO\Desktop\SE\Documentation\02-ProjectManagementPlan\diagrams\*.png" | Select-Object Name, @{Name="Size (KB)"; Expression={[math]::Round($_.Length/1KB, 2)}}
```

---

## ✅ QUALITY CHECKLIST

Sau khi render, kiểm tra:

- [ ] **File exists**: PNG file tồn tại ở đúng thư mục
- [ ] **File size**: 50-200 KB (không quá lớn)
- [ ] **Resolution**: Ít nhất 1200x800px
- [ ] **Text readable**: Chữ rõ ràng ở 100% zoom
- [ ] **Colors correct**: Màu sắc hiển thị đúng
- [ ] **No artifacts**: Không có lỗi render
- [ ] **Markdown updated**: Markdown files đã reference đúng PNG

---

## 🎯 EXPECTED OUTPUT

### 1. System Context Diagram (3.1.1)
- **Size**: ~150 KB
- **Dimensions**: ~1400x1000px
- **Content**: 5 actors + CollabSphere system + 5 external systems
- **Colors**: Color-coded actors (5 colors) + green system box

### 2. Module Structure Diagram (3.1.2)
- **Size**: ~120 KB
- **Dimensions**: ~1200x1400px
- **Content**: 8 modules in 3 tiers (Core, Collaboration, Support)
- **Colors**: Blue (Core), Orange (Collaboration), Green (Support)

### 3. Gantt Chart (2.1)
- **Size**: ~100 KB
- **Dimensions**: ~1600x800px
- **Content**: 4 phases, 14 weeks timeline, milestones
- **Colors**: Blue (Planning), Green (Development), Yellow (Integration), Purple (Deployment)

---

## 📞 TROUBLESHOOTING

### Problem: PlantUML render fails

**Solution**:
- Check syntax errors in .puml files
- Try rendering online first
- Verify Java is installed: `java -version`

### Problem: PNG too large (>500 KB)

**Solution**:
```powershell
# Optimize PNG with online tool or use ImageMagick
# Resize to max 1600px width
```

### Problem: Text not readable

**Solution**:
- Edit .puml file and increase `defaultFontSize` to 14
- Re-render

---

## 📊 PROGRESS TRACKING

```
[ ] Render 3.1.1-system-context.png
[ ] Move to Documentation/03-SRS/diagrams/
[ ] Verify quality

[ ] Render 3.1.2-module-structure.png
[ ] Move to Documentation/03-SRS/diagrams/
[ ] Verify quality

[ ] Render 2.1-gantt-chart.png
[ ] Move to Documentation/02-ProjectManagementPlan/diagrams/
[ ] Verify quality

[ ] Run verification commands
[ ] Check markdown files updated
[ ] Commit to git
```

---

**Estimated Time**: 15-20 minutes total
**Difficulty**: Easy
**Tools**: PlantUML online editor (recommended)

**Next Steps**: After rendering, markdown files sẽ tự động hiển thị diagrams chuyên nghiệp thay vì ASCII art.
