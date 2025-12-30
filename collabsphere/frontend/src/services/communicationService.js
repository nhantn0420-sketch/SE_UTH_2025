import api from './api';

const chatService = {
  // Get messages
  async getMessages(groupId, params = {}) {
    const response = await api.get(`/chat/groups/${groupId}/messages`, { params });
    return response.data;
  },

  // Send message (backend expects query params)
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

  // Get online members
  async getOnlineMembers(groupId) {
    const response = await api.get(`/chat/groups/${groupId}/online`);
    return response.data;
  },
};

const meetingService = {
  // Get meetings
  async getMeetings(groupId, params = {}) {
    const response = await api.get(`/meetings/groups/${groupId}`, { params });
    return response.data;
  },

  // Create meeting
  async createMeeting(groupId, meetingData) {
    const response = await api.post(`/meetings/groups/${groupId}`, meetingData);
    return response.data;
  },

  // Get meeting by ID
  async getMeetingById(meetingId) {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data;
  },

  // Update meeting
  async updateMeeting(meetingId, meetingData) {
    const response = await api.put(`/meetings/${meetingId}`, meetingData);
    return response.data;
  },

  // Cancel meeting
  async cancelMeeting(meetingId) {
    const response = await api.delete(`/meetings/${meetingId}`);
    return response.data;
  },

  // Join meeting
  async joinMeeting(meetingId) {
    const response = await api.post(`/meetings/${meetingId}/join`);
    return response.data;
  },

  // Leave meeting
  async leaveMeeting(meetingId) {
    const response = await api.post(`/meetings/${meetingId}/leave`);
    return response.data;
  },

  // End meeting
  async endMeeting(meetingId) {
    const response = await api.post(`/meetings/${meetingId}/end`);
    return response.data;
  },
};

const whiteboardService = {
  // Get whiteboard session
  async getSession(groupId) {
    const response = await api.get(`/whiteboard/groups/${groupId}`);
    return response.data;
  },

  // Save whiteboard data
  async saveSession(groupId, data) {
    const response = await api.put(`/whiteboard/groups/${groupId}`, { data });
    return response.data;
  },

  // Clear whiteboard
  async clearSession(groupId) {
    const response = await api.delete(`/whiteboard/groups/${groupId}`);
    return response.data;
  },
};

export { chatService, meetingService, whiteboardService };
