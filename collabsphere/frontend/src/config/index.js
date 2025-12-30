// API Configuration
const config = {
  // API Base URL
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  
  // Socket.IO URL
  SOCKET_URL: process.env.REACT_APP_SOCKET_URL || 'http://localhost:8000',
  
  // Token keys
  ACCESS_TOKEN_KEY: 'collabsphere_access_token',
  REFRESH_TOKEN_KEY: 'collabsphere_refresh_token',
  USER_KEY: 'collabsphere_user',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  
  // File upload limits (in MB)
  MAX_FILE_SIZE: 10,
  ALLOWED_FILE_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed',
  ],
  
  // Role display names
  ROLE_NAMES: {
    admin: 'Quản trị viên',
    staff: 'Nhân viên phòng đào tạo',
    head: 'Trưởng bộ môn',
    lecturer: 'Giảng viên',
    student: 'Sinh viên',
  },
  
  // Project status names
  PROJECT_STATUS: {
    draft: 'Bản nháp',
    pending: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    active: 'Đang hoạt động',
    completed: 'Hoàn thành',
  },
  
  // Group role names
  GROUP_ROLES: {
    leader: 'Nhóm trưởng',
    member: 'Thành viên',
  },
  
  // Notification types
  NOTIFICATION_TYPES: {
    project_approved: 'Dự án được duyệt',
    project_rejected: 'Dự án bị từ chối',
    group_created: 'Nhóm được tạo',
    member_joined: 'Thành viên tham gia',
    task_assigned: 'Được giao công việc',
    checkpoint_reminder: 'Nhắc nhở checkpoint',
    new_message: 'Tin nhắn mới',
    peer_review_request: 'Yêu cầu đánh giá',
    evaluation_completed: 'Đánh giá hoàn thành',
  },
};

export default config;
