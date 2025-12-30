import api from './api';

const chatService = {
  // Get group messages
  async getMessages(groupId, before = null, limit = 50) {
    const params = { limit };
    if (before) params.before = before;
    const response = await api.get(`/chat/groups/${groupId}/messages`, { params });
    return response.data;
  },

  // Send message to group
  async sendMessage(groupId, content, messageType = 'text', fileUrl = null) {
    const params = new URLSearchParams();
    params.append('content', content);
    params.append('message_type', messageType);
    if (fileUrl) params.append('file_url', fileUrl);
    const response = await api.post(`/chat/groups/${groupId}/messages?${params.toString()}`);
    return response.data;
  },

  // Delete message
  async deleteMessage(messageId) {
    const response = await api.delete(`/chat/messages/${messageId}`);
    return response.data;
  },
};

export default chatService;
