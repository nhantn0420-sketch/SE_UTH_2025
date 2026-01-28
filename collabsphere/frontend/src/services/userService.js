import api from './api';

const userService = {
  // Get all users (Admin only)
  async getUsers(params = {}) {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Get user by ID
  async getUserById(userId) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Create user (Staff only)
  async createUser(userData) {
    const response = await api.post('/users/create', userData);
    return response.data;
  },

  // Update user
  async updateUser(userId, userData) {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },

  // Deactivate user (Admin only)
  async deactivateUser(userId) {
    const response = await api.patch(`/users/${userId}/deactivate`);
    return response.data;
  },

  // Activate user (Admin only)
  async activateUser(userId) {
    const response = await api.patch(`/users/${userId}/activate`);
    return response.data;
  },

  // Get user statistics (Admin only)
  async getStatistics() {
    const response = await api.get('/users/statistics');
    return response.data;
  },

  // Import users from file (Staff only)
  async importUsers(file, role) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('role', role);
    
    const response = await api.post('/users/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get lecturers
  async getLecturers(params = {}) {
    const response = await api.get('/users/lecturers', { params });
    return response.data;
  },

  // Get students
  async getStudents(params = {}) {
    const response = await api.get('/users/students', { params });
    return response.data;
  },

  // Get user statistics (Admin only)
  async getStatistics() {
    const response = await api.get('/users/stats');
    return response.data;
  },
};

export default userService;
