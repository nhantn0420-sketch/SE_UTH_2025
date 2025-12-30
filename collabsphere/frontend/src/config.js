/**
 * Frontend Configuration
 * All environment and app configurations
 */

const config = {
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1',
  
  // WebSocket Configuration
  WS_URL: process.env.REACT_APP_WS_URL || 'http://localhost:8000',
  
  // Storage Keys
  ACCESS_TOKEN_KEY: 'collabsphere_access_token',
  REFRESH_TOKEN_KEY: 'collabsphere_refresh_token',
  USER_KEY: 'collabsphere_user',
  
  // App Settings
  APP_NAME: 'CollabSphere',
  APP_VERSION: '1.0.0',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // File Upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip',
  ],
  
  // Date Format
  DATE_FORMAT: 'dd/MM/yyyy',
  DATETIME_FORMAT: 'dd/MM/yyyy HH:mm',
  
  // Roles
  ROLES: {
    ADMIN: 'admin',
    STAFF: 'staff',
    HEAD: 'head',
    LECTURER: 'lecturer',
    STUDENT: 'student',
  },
  
  // Role Display Names
  ROLE_NAMES: {
    admin: 'Quản trị viên',
    staff: 'Nhân viên',
    head: 'Trưởng bộ môn',
    lecturer: 'Giảng viên',
    student: 'Sinh viên',
  },
  
  // Task Status
  TASK_STATUS: {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    REVIEW: 'review',
    COMPLETED: 'completed',
  },
  
  // Project Status
  PROJECT_STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    COMPLETED: 'completed',
  },
};

export default config;
