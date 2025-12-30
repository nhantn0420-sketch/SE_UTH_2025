import api from './api';

const projectService = {
  // Get all projects
  async getProjects(params = {}) {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get project by ID
  async getProjectById(projectId) {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  // Create project (Lecturer only)
  async createProject(projectData) {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project
  async updateProject(projectId, projectData) {
    const response = await api.patch(`/projects/${projectId}`, projectData);
    return response.data;
  },

  // Delete project
  async deleteProject(projectId) {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  // Submit project for approval
  async submitForApproval(projectId) {
    const response = await api.post(`/projects/${projectId}/submit`);
    return response.data;
  },

  // Approve project (Head only)
  async approveProject(projectId) {
    const response = await api.post(`/projects/${projectId}/approve`);
    return response.data;
  },

  // Reject project (Head only) - reason as query param
  async rejectProject(projectId, reason) {
    const response = await api.post(`/projects/${projectId}/reject?reason=${encodeURIComponent(reason)}`);
    return response.data;
  },

  // Assign project to class (class_id in path)
  async assignToClass(projectId, classId) {
    const response = await api.post(`/projects/${projectId}/assign-to-class/${classId}`);
    return response.data;
  },

  // Get pending projects (Head only)
  async getPendingProjects() {
    const response = await api.get('/projects/pending');
    return response.data;
  },

  // Get my projects (Lecturer)
  async getMyProjects() {
    const response = await api.get('/projects/my');
    return response.data;
  },

  // ===== Milestones =====

  // Get project milestones
  async getMilestones(projectId) {
    const response = await api.get(`/projects/${projectId}/milestones`);
    return response.data;
  },

  // Create milestone
  async createMilestone(projectId, milestoneData) {
    const response = await api.post(`/projects/${projectId}/milestones`, milestoneData);
    return response.data;
  },

  // Update milestone (path: /milestones/{milestoneId} without projectId)
  async updateMilestone(projectId, milestoneId, milestoneData) {
    const response = await api.patch(`/projects/milestones/${milestoneId}`, null, { params: milestoneData });
    return response.data;
  },

  // Delete milestone (path: /milestones/{milestoneId} without projectId)
  async deleteMilestone(projectId, milestoneId) {
    const response = await api.delete(`/projects/milestones/${milestoneId}`);
    return response.data;
  },

  // Generate milestones with AI
  async generateMilestones(projectId) {
    const response = await api.post(`/projects/${projectId}/milestones/generate`);
    return response.data;
  },

  // Get milestone questions
  async getMilestoneQuestions(projectId, milestoneId) {
    const response = await api.get(`/projects/${projectId}/milestones/${milestoneId}/questions`);
    return response.data;
  },

  // Create milestone question
  async createMilestoneQuestion(projectId, milestoneId, questionData) {
    const response = await api.post(`/projects/${projectId}/milestones/${milestoneId}/questions`, questionData);
    return response.data;
  },
};

export default projectService;
