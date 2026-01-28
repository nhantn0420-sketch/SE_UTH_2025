import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translation dictionaries
const translations = {
  vi: {
    // Common
    'save': 'Lưu thay đổi',
    'cancel': 'Hủy',
    'delete': 'Xóa',
    'edit': 'Chỉnh sửa',
    'add': 'Thêm',
    'search': 'Tìm kiếm',
    'filter': 'Lọc',
    'loading': 'Đang tải...',
    'error': 'Lỗi',
    'success': 'Thành công',
    
    // Settings Page
    'settings': 'Cài đặt',
    'settings.subtitle': 'Quản lý thông tin cá nhân và tùy chỉnh hệ thống',
    'settings.profile': 'Thông tin cá nhân',
    'settings.password': 'Mật khẩu',
    'settings.notifications': 'Thông báo',
    'settings.interface': 'Giao diện',
    
    // Profile Tab
    'profile.fullname': 'Họ và tên',
    'profile.email': 'Email',
    'profile.email.help': 'Email không thể thay đổi',
    'profile.phone': 'Số điện thoại',
    'profile.phone.current': 'Số điện thoại hiện tại',
    'profile.phone.empty': 'Chưa có số điện thoại',
    'profile.role': 'Vai trò',
    'profile.avatar.change': 'Thay đổi ảnh',
    'profile.update.success': 'Cập nhật thông tin thành công!',
    'profile.update.error': 'Lỗi khi cập nhật thông tin!',
    
    // Password Tab
    'password.title': 'Đổi mật khẩu',
    'password.subtitle': 'Mật khẩu mới phải có ít nhất 6 ký tự',
    'password.current': 'Mật khẩu hiện tại',
    'password.new': 'Mật khẩu mới',
    'password.confirm': 'Xác nhận mật khẩu mới',
    'password.change': 'Đổi mật khẩu',
    'password.success': 'Đổi mật khẩu thành công!',
    'password.error': 'Lỗi khi đổi mật khẩu!',
    'password.mismatch': 'Mật khẩu xác nhận không khớp!',
    'password.short': 'Mật khẩu mới phải có ít nhất 6 ký tự!',
    
    // Notifications Tab
    'notifications.title': 'Cài đặt thông báo',
    'notifications.subtitle': 'Chọn các loại thông báo bạn muốn nhận',
    'notifications.email': 'Thông báo qua Email',
    'notifications.push': 'Thông báo đẩy trên trình duyệt',
    'notifications.projects': 'Cập nhật dự án',
    'notifications.messages': 'Tin nhắn nhóm',
    'notifications.deadlines': 'Nhắc nhở deadline',
    'notifications.save': 'Lưu cài đặt',
    'notifications.success': 'Cập nhật cài đặt thông báo thành công!',
    'notifications.error': 'Lỗi khi cập nhật cài đặt!',
    
    // Interface Tab
    'interface.title': 'Cài đặt giao diện',
    'interface.subtitle': 'Tùy chỉnh giao diện và ngôn ngữ ứng dụng',
    'interface.theme': 'Giao diện',
    'interface.theme.light': 'Sáng',
    'interface.theme.dark': 'Tối',
    'interface.theme.auto': 'Tự động',
    'interface.theme.current': 'Đang sử dụng',
    'interface.language': 'Ngôn ngữ',
    'interface.language.vi': 'Tiếng Việt',
    'interface.language.en': 'English',
    'interface.language.current': 'Đang sử dụng',
    'interface.timezone': 'Múi giờ',
    'interface.timezone.current': 'Đang sử dụng',
    'interface.save': 'Lưu cài đặt',
    'interface.success': 'Cập nhật cài đặt ứng dụng thành công!',
    'interface.error': 'Lỗi khi cập nhật cài đặt!',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Duyệt đề tài',
    'nav.contribute': 'Phân công đề tài',
    'nav.classes': 'Danh sách lớp học',
    'nav.topics': 'Danh sách đề tài',
  },
  
  en: {
    // Common
    'save': 'Save changes',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'add': 'Add',
    'search': 'Search',
    'filter': 'Filter',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // Settings Page
    'settings': 'Settings',
    'settings.subtitle': 'Manage personal information and system preferences',
    'settings.profile': 'Profile',
    'settings.password': 'Password',
    'settings.notifications': 'Notifications',
    'settings.interface': 'Interface',
    
    // Profile Tab
    'profile.fullname': 'Full name',
    'profile.email': 'Email',
    'profile.email.help': 'Email cannot be changed',
    'profile.phone': 'Phone number',
    'profile.phone.current': 'Current phone number',
    'profile.phone.empty': 'No phone number',
    'profile.role': 'Role',
    'profile.avatar.change': 'Change photo',
    'profile.update.success': 'Profile updated successfully!',
    'profile.update.error': 'Error updating profile!',
    
    // Password Tab
    'password.title': 'Change Password',
    'password.subtitle': 'New password must be at least 6 characters',
    'password.current': 'Current password',
    'password.new': 'New password',
    'password.confirm': 'Confirm new password',
    'password.change': 'Change password',
    'password.success': 'Password changed successfully!',
    'password.error': 'Error changing password!',
    'password.mismatch': 'Passwords do not match!',
    'password.short': 'New password must be at least 6 characters!',
    
    // Notifications Tab
    'notifications.title': 'Notification Settings',
    'notifications.subtitle': 'Choose which notifications you want to receive',
    'notifications.email': 'Email notifications',
    'notifications.push': 'Browser push notifications',
    'notifications.projects': 'Project updates',
    'notifications.messages': 'Group messages',
    'notifications.deadlines': 'Deadline reminders',
    'notifications.save': 'Save settings',
    'notifications.success': 'Notification settings updated successfully!',
    'notifications.error': 'Error updating settings!',
    
    // Interface Tab
    'interface.title': 'Interface Settings',
    'interface.subtitle': 'Customize interface and application language',
    'interface.theme': 'Theme',
    'interface.theme.light': 'Light',
    'interface.theme.dark': 'Dark',
    'interface.theme.auto': 'Auto',
    'interface.theme.current': 'Currently using',
    'interface.language': 'Language',
    'interface.language.vi': 'Vietnamese',
    'interface.language.en': 'English',
    'interface.language.current': 'Currently using',
    'interface.timezone': 'Timezone',
    'interface.timezone.current': 'Currently using',
    'interface.save': 'Save settings',
    'interface.success': 'App settings updated successfully!',
    'interface.error': 'Error updating settings!',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Browse Projects',
    'nav.contribute': 'Project Assignment',
    'nav.classes': 'Classes',
    'nav.topics': 'Topics',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage or default to 'vi'
    return localStorage.getItem('app_language') || 'vi';
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem('app_language', language);
    console.log('Language changed to:', language);
  }, [language]);

  const t = (key) => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
    } else {
      console.error(`Language ${newLang} not supported`);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
