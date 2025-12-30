import api from './api';

const meetingService = {
  // Get group meetings
  async getGroupMeetings(groupId, status = null, upcomingOnly = false) {
    const params = {};
    if (status) params.status = status;
    if (upcomingOnly) params.upcoming_only = upcomingOnly;
    const response = await api.get(`/meetings/groups/${groupId}`, { params });
    return response.data;
  },

  // Get meeting by ID
  async getMeetingById(meetingId) {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data;
  },

  // Create/schedule meeting
  async createMeeting(groupId, title, description = null, scheduledAt = null) {
    const params = new URLSearchParams();
    params.append('title', title);
    if (description) params.append('description', description);
    if (scheduledAt) params.append('scheduled_at', scheduledAt);
    const response = await api.post(`/meetings/groups/${groupId}?${params.toString()}`);
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

export default meetingService;
