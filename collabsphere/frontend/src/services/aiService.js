import api from './api';

const aiService = {
  // Generate milestones for project (matches backend: POST /ai/projects/{project_id}/generate-milestones)
  async generateMilestones(projectId) {
    const response = await api.post(`/ai/projects/${projectId}/generate-milestones`);
    return response.data;
  },

  // Chat with AI assistant (matches backend: POST /ai/chat with query params)
  async chat(message, context = null) {
    const params = new URLSearchParams();
    params.append('message', message);
    if (context) params.append('context', context);
    const response = await api.post(`/ai/chat?${params.toString()}`);
    return response.data;
  },

  // Analyze group progress (matches backend: POST /ai/groups/{group_id}/analyze-progress)
  async analyzeProgress(groupId) {
    const response = await api.post(`/ai/groups/${groupId}/analyze-progress`);
    return response.data;
  },

  // Analyze member contribution (matches backend: POST /ai/groups/{group_id}/analyze-contributions)
  async analyzeContribution(groupId) {
    const response = await api.post(`/ai/groups/${groupId}/analyze-contributions`);
    return response.data;
  },
};

export default aiService;
