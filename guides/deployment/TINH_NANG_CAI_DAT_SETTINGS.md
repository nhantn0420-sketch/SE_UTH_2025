# Tính năng Cài đặt (Settings Feature)

## Tổng quan

Tính năng Cài đặt đã được triển khai đầy đủ, cho phép người dùng:
- Cập nhật thông tin cá nhân
- Thay đổi mật khẩu
- Cấu hình thông báo
- Tùy chỉnh giao diện ứng dụng

## Cách sử dụng

### Truy cập trang Cài đặt

1. Đăng nhập vào hệ thống
2. Click vào **avatar/tên người dùng** ở góc trên bên phải
3. Chọn **"Cài đặt"** từ menu dropdown
4. Hoặc truy cập trực tiếp: `http://localhost/settings`

### Các tab cài đặt

#### 1. Thông tin cá nhân
- **Thay đổi ảnh đại diện**: Click "Thay đổi ảnh" để upload ảnh mới
- **Họ và tên**: Cập nhật tên hiển thị
- **Email**: Không thể thay đổi (hiển thị readonly)
- **Số điện thoại**: Cập nhật số điện thoại liên hệ
- **Vai trò**: Hiển thị vai trò hiện tại (không thể thay đổi)
- Click **"Lưu thay đổi"** để cập nhật

#### 2. Mật khẩu
- **Mật khẩu hiện tại**: Nhập mật khẩu hiện tại để xác thực
- **Mật khẩu mới**: Nhập mật khẩu mới (tối thiểu 6 ký tự)
- **Xác nhận mật khẩu**: Nhập lại mật khẩu mới
- Click **"Đổi mật khẩu"** để cập nhật

**Lưu ý**: 
- Mật khẩu mới phải có ít nhất 6 ký tự
- Mật khẩu xác nhận phải khớp với mật khẩu mới

#### 3. Thông báo
Bật/tắt các loại thông báo:
- ✓ **Thông báo qua Email**: Nhận thông báo qua email
- ✓ **Thông báo đẩy**: Nhận thông báo trên trình duyệt
- ✓ **Cập nhật dự án**: Thông báo khi có cập nhật trong dự án
- ✓ **Tin nhắn nhóm**: Thông báo tin nhắn nhóm mới
- ✓ **Nhắc nhở deadline**: Nhận nhắc nhở về deadline sắp tới

Click **"Lưu cài đặt"** để áp dụng.

#### 4. Giao diện
- **Giao diện**: Chọn chế độ sáng/tối/tự động
  - Sáng: Giao diện sáng
  - Tối: Giao diện tối
  - Tự động: Theo cài đặt hệ thống
- **Ngôn ngữ**: Chọn ngôn ngữ hiển thị
  - Tiếng Việt
  - English
- **Múi giờ**: Chọn múi giờ
  - Việt Nam (GMT+7)
  - Bangkok (GMT+7)
  - Singapore (GMT+8)

Click **"Lưu cài đặt"** để áp dụng.

## Technical Implementation

### Frontend

#### Trang Settings
- **File**: `frontend/src/pages/Settings/Settings.js`
- **Route**: `/settings`
- **Component**: Material-UI Tabs với 4 tab panels
- **Features**:
  - Form validation
  - Avatar upload
  - Password strength check
  - Real-time notification toggles
  - Success/error alerts

#### Navigation
- **File**: `frontend/src/components/Layout/Header.js`
- **Handler**: `handleSettings()` navigates to `/settings`
- **Menu**: SettingsIcon + "Cài đặt" text

#### Routing
- **File**: `frontend/src/App.js`
- **Route**: `<Route path="/settings" element={<Settings />} />`
- **Protection**: Requires authentication (inside ProtectedRoute)

### Backend API

#### Endpoints

**1. Get User Profile**
```
GET /api/v1/users/me
```
Response: UserResponse với thông tin người dùng hiện tại

**2. Update Profile**
```
PUT /api/v1/users/me
Content-Type: application/json

{
  "full_name": "Nguyễn Văn A",
  "phone": "0123456789"
}
```

**3. Change Password**
```
POST /api/v1/users/change-password
Content-Type: application/json

{
  "current_password": "oldpass123",
  "new_password": "newpass123"
}
```

**4. Get Settings**
```
GET /api/v1/users/settings
```
Response:
```json
{
  "notifications": {
    "email_notifications": true,
    "push_notifications": true,
    "project_updates": true,
    "group_messages": true,
    "deadline_reminders": true
  },
  "preferences": {
    "theme": "light",
    "language": "vi",
    "timezone": "Asia/Ho_Chi_Minh"
  }
}
```

**5. Update Notifications**
```
PUT /api/v1/users/settings/notifications
Content-Type: application/json

{
  "email_notifications": false,
  "push_notifications": true,
  ...
}
```

**6. Update Preferences**
```
PUT /api/v1/users/settings/preferences
Content-Type: application/json

{
  "theme": "dark",
  "language": "en",
  "timezone": "Asia/Singapore"
}
```

### Database

Settings được lưu trong bảng `users`:
- Thông tin cơ bản: `full_name`, `phone`, `email`
- Mật khẩu: `hashed_password` (mã hóa bcrypt)
- Metadata: `metadata` JSON column (chứa notifications và preferences)

**Lưu ý**: Nếu column `metadata` chưa tồn tại trong database, API sẽ vẫn hoạt động nhưng settings không được lưu persistent. Để thêm column:

```sql
ALTER TABLE users ADD COLUMN metadata JSONB;
```

## Testing

### Frontend Testing

1. **Truy cập trang Settings**:
   ```
   http://localhost/settings
   ```

2. **Test từng tab**:
   - Thông tin cá nhân: Thay đổi tên, số điện thoại → Lưu → Kiểm tra header (tên hiển thị)
   - Mật khẩu: Đổi mật khẩu → Logout → Login với mật khẩu mới
   - Thông báo: Toggle switches → Lưu → Reload trang → Kiểm tra state
   - Giao diện: Thay đổi theme/language → Lưu (hiện tại chưa áp dụng realtime)

### Backend API Testing

1. **Login để lấy token**:
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "student", "password": "student123"}'
   ```

2. **Get Profile**:
   ```bash
   curl -X GET http://localhost:8000/api/v1/users/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **Update Profile**:
   ```bash
   curl -X PUT http://localhost:8000/api/v1/users/me \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"full_name": "Test User", "phone": "0123456789"}'
   ```

4. **Change Password**:
   ```bash
   curl -X POST http://localhost:8000/api/v1/users/change-password \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"current_password": "student123", "new_password": "newpass123"}'
   ```

5. **Test Settings**:
   ```bash
   # Get settings
   curl -X GET http://localhost:8000/api/v1/users/settings \
     -H "Authorization: Bearer YOUR_TOKEN"
   
   # Update notifications
   curl -X PUT http://localhost:8000/api/v1/users/settings/notifications \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"email_notifications": false}'
   ```

## Known Issues & Future Improvements

### Current Limitations

1. **Theme không áp dụng realtime**: Cần implement ThemeProvider context
2. **Language chưa có i18n**: Cần thêm react-i18next
3. **Avatar upload**: Backend chưa xử lý file upload
4. **Metadata column**: Có thể chưa tồn tại trong database

### Future Enhancements

1. **Theme System**:
   - Implement MUI ThemeProvider
   - Dark mode với color palette
   - Persist theme preference

2. **Internationalization**:
   - Add react-i18next
   - Translation files (vi.json, en.json)
   - Language switcher

3. **Avatar Upload**:
   - Add file upload endpoint
   - Store in cloud storage (S3/CloudFront)
   - Image cropping & resizing

4. **Advanced Settings**:
   - Email digest frequency
   - Privacy settings
   - Account security (2FA)
   - Connected devices

5. **Notifications**:
   - Real-time notification preferences
   - Email template customization
   - Do Not Disturb schedule

## Troubleshooting

### Lỗi "Settings menu không hoạt động"
**Giải pháp**: Đã được fix. Menu đã có handler `handleSettings()` navigate đến `/settings`.

### Lỗi "401 Unauthorized" khi call API
**Nguyên nhân**: Token expired hoặc không có token
**Giải pháp**: 
1. Kiểm tra localStorage có token không
2. Logout và login lại
3. Kiểm tra AuthContext

### Settings không lưu sau khi reload
**Nguyên nhân**: Metadata column chưa có trong database
**Giải pháp**:
```bash
# Chạy migration hoặc thêm column manually
docker exec -it collabsphere-db psql -U postgres -d collabsphere -c "ALTER TABLE users ADD COLUMN IF NOT EXISTS metadata JSONB;"
```

### Theme không thay đổi sau khi lưu
**Nguyên nhân**: Chức năng theme chưa được implement đầy đủ
**Giải pháp**: Đang trong roadmap, sẽ update sau.

## Changelog

### Version 1.0 (2026-01-13)
- ✅ Tạo trang Settings với 4 tabs
- ✅ Implement profile update
- ✅ Implement password change
- ✅ Implement notification settings
- ✅ Implement app preferences
- ✅ Add backend API endpoints
- ✅ Fix navigation từ Header menu
- ✅ Add routing trong App.js

---

**Tác giả**: GitHub Copilot  
**Ngày tạo**: 13/01/2026  
**Cập nhật cuối**: 13/01/2026
