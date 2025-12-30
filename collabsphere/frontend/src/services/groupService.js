import api from './api';

const groupService = {
  // Get all groups
  async getGroups(params = {}) {
    const response = await api.get('/groups', { params });
    return response.data;
  },

  // Get group by ID
  async getGroupById(groupId) {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  },

  // Create group
  async createGroup(groupData) {
    const response = await api.post('/groups', groupData);
    return response.data;
  },

  // Update group
  async updateGroup(groupId, groupData) {
    const response = await api.patch(`/groups/${groupId}`, groupData);
    return response.data;
  },

  // Delete group
  async deleteGroup(groupId) {
    const response = await api.delete(`/groups/${groupId}`);
    return response.data;
  },

  // Get my group
  async getMyGroup(classProjectId) {
    const response = await api.get('/groups/my', { params: { class_project_id: classProjectId } });
    return response.data;
  },

  // ===== Members =====

  // Get group members
  async getMembers(groupId) {
    const response = await api.get(`/groups/${groupId}/members`);
    return response.data;
  },

  // Add member (query params: user_id, role)
  async addMember(groupId, userId, role = 'member') {
    const response = await api.post(`/groups/${groupId}/members?user_id=${userId}&role=${role}`);
    return response.data;
  },

  // Update member role (path: /members/{userId}/role, role as query param)
  async updateMemberRole(groupId, userId, role) {
    const response = await api.patch(`/groups/${groupId}/members/${userId}/role?role=${role}`);
    return response.data;
  },

  // Remove member
  async removeMember(groupId, memberId) {
    const response = await api.delete(`/groups/${groupId}/members/${memberId}`);
    return response.data;
  },

  // ===== Milestones =====

  // Get group milestones
  async getMilestones(groupId) {
    const response = await api.get(`/groups/${groupId}/milestones`);
    return response.data;
  },

  // Update milestone progress (no dedicated endpoint - completeMilestone only)
  async updateMilestoneProgress(groupId, milestoneId, progressData) {
    // Note: Backend only supports marking as complete, not progress update
    return this.completeMilestone(groupId, milestoneId);
  },

  // Complete milestone
  async completeMilestone(groupId, milestoneId) {
    const response = await api.post(`/groups/${groupId}/milestones/${milestoneId}/complete`);
    return response.data;
  },

  // ===== Checkpoints =====

  // Get checkpoints
  async getCheckpoints(groupId) {
    const response = await api.get(`/groups/${groupId}/checkpoints`);
    return response.data;
  },

  // Create checkpoint
  async createCheckpoint(groupId, checkpointData) {
    const response = await api.post(`/groups/${groupId}/checkpoints`, checkpointData);
    return response.data;
  },

  // Submit checkpoint
  async submitCheckpoint(groupId, checkpointId, submissionData) {
    const response = await api.post(`/groups/${groupId}/checkpoints/${checkpointId}/submit`, submissionData);
    return response.data;
  },

  // Get checkpoint submissions
  async getCheckpointSubmissions(groupId, checkpointId) {
    const response = await api.get(`/groups/${groupId}/checkpoints/${checkpointId}/submissions`);
    return response.data;
  },

  // ===== Tasks =====

  // Get tasks
  async getTasks(groupId) {
    const response = await api.get(`/groups/${groupId}/tasks`);
    return response.data;
  },

  // Create task
  async createTask(groupId, taskData) {
    const response = await api.post(`/groups/${groupId}/tasks`, taskData);
    return response.data;
  },

  // Update task (PATCH method, query params for fields)
  async updateTask(groupId, taskId, taskData) {
    const response = await api.patch(`/groups/${groupId}/tasks/${taskId}`, null, { params: taskData });
    return response.data;
  },

  // Delete task
  async deleteTask(groupId, taskId) {
    const response = await api.delete(`/groups/${groupId}/tasks/${taskId}`);
    return response.data;
  },

  // Update task status (use updateTask with status param)
  async updateTaskStatus(groupId, taskId, status) {
    return this.updateTask(groupId, taskId, { status });
  },

  // ===== Progress =====

  // Get group progress
  async getProgress(groupId) {
    const response = await api.get(`/groups/${groupId}/progress`);
    return response.data;
  },

  // Analyze progress with AI
  async analyzeProgress(groupId) {
    const response = await api.post(`/groups/${groupId}/analyze`);
    return response.data;
  },

  // ===== Milestone Questions =====

  // Get milestone questions
  async getMilestoneQuestions(groupId, milestoneId) {
    const response = await api.get(`/groups/${groupId}/milestones/${milestoneId}/questions`);
    return response.data;
  },

  // Create milestone question
  async createMilestoneQuestion(groupId, milestoneId, data) {
    const response = await api.post(
      `/groups/${groupId}/milestones/${milestoneId}/questions`,
      null,
      { params: { question: data.question, description: data.description } }
    );
    return response.data;
  },

  // Update milestone question
  async updateMilestoneQuestion(groupId, milestoneId, questionId, data) {
    const response = await api.patch(
      `/groups/${groupId}/milestones/${milestoneId}/questions/${questionId}`,
      null,
      { params: data }
    );
    return response.data;
  },

  // Delete milestone question
  async deleteMilestoneQuestion(groupId, milestoneId, questionId) {
    const response = await api.delete(`/groups/${groupId}/milestones/${milestoneId}/questions/${questionId}`);
    return response.data;
  },

  // Submit answer to milestone question (uses evaluations endpoint)
  async submitQuestionAnswer(groupId, milestoneId, questionId, answerData) {
    const response = await api.post(`/evaluations/milestone-answers/${groupId}/${questionId}`, answerData);
    return response.data;
  },
};

export default groupService;
