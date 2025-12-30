import api from './api';

const notificationService = {
  // Get notifications
  async getNotifications(params = {}) {
    const response = await api.get('/notifications', { params });
    return response.data;
  },

  // Get unread count
  async getUnreadCount() {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },

  // Mark as read
  async markAsRead(notificationId) {
    const response = await api.post(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all as read
  async markAllAsRead() {
    const response = await api.post('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  async deleteNotification(notificationId) {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
  },

  // Note: deleteReadNotifications doesn't exist in backend - use clearAll instead
  async clearAllNotifications() {
    const response = await api.delete('/notifications/clear');
    return response.data;
  },
};

export default notificationService;
