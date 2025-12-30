import api from './api';
import config from '../config';

const authService = {
  // Login
  async login(username, password) {
    // Backend expects form-data with username and password
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const { access_token, refresh_token, user } = response.data;
    
    localStorage.setItem(config.ACCESS_TOKEN_KEY, access_token);
    localStorage.setItem(config.REFRESH_TOKEN_KEY, refresh_token);
    localStorage.setItem(config.USER_KEY, JSON.stringify(user));
    
    return response.data;
  },

  // Register
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(config.ACCESS_TOKEN_KEY);
      localStorage.removeItem(config.REFRESH_TOKEN_KEY);
      localStorage.removeItem(config.USER_KEY);
    }
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    const user = response.data;
    localStorage.setItem(config.USER_KEY, JSON.stringify(user));
    return user;
  },

  // Change password
  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem(config.ACCESS_TOKEN_KEY);
  },

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem(config.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get access token
  getAccessToken() {
    return localStorage.getItem(config.ACCESS_TOKEN_KEY);
  },
};

export default authService;
