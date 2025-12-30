import api from './api';

const resourceService = {
  // ===== Class Resources =====

  // Get class resources
  async getClassResources(classId, params = {}) {
    const response = await api.get(`/resources/class/${classId}`, { params });
    return response.data;
  },

  // Upload class resource (JSON body, not FormData)
  async uploadClassResource(classId, resourceData) {
    const response = await api.post(`/resources/class/${classId}`, resourceData);
    return response.data;
  },

  // ===== Group Resources =====

  // Get group resources
  async getGroupResources(groupId, params = {}) {
    const response = await api.get(`/resources/group/${groupId}`, { params });
    return response.data;
  },

  // Upload group resource (JSON body, not FormData)
  async uploadGroupResource(groupId, resourceData) {
    const response = await api.post(`/resources/group/${groupId}`, resourceData);
    return response.data;
  },

  // ===== Common =====

  // Get resource by ID
  async getResourceById(resourceId) {
    const response = await api.get(`/resources/${resourceId}`);
    return response.data;
  },

  // Delete resource
  async deleteResource(resourceId) {
    const response = await api.delete(`/resources/${resourceId}`);
    return response.data;
  },

  // Note: updateResource and downloadResource endpoints don't exist in backend
};

export default resourceService;
