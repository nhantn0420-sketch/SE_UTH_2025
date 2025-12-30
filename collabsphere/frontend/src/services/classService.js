import api from './api';

const classService = {
  // Get all classes
  async getClasses(params = {}) {
    const response = await api.get('/classes', { params });
    return response.data;
  },

  // Get class by ID
  async getClassById(classId) {
    const response = await api.get(`/classes/${classId}`);
    return response.data;
  },

  // Create class
  async createClass(classData) {
    const response = await api.post('/classes', classData);
    return response.data;
  },

  // Update class
  async updateClass(classId, classData) {
    const response = await api.patch(`/classes/${classId}`, classData);
    return response.data;
  },

  // Delete class
  async deleteClass(classId) {
    const response = await api.delete(`/classes/${classId}`);
    return response.data;
  },

  // Import classes from file
  async importClasses(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/classes/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get class members
  async getClassMembers(classId) {
    const response = await api.get(`/classes/${classId}/members`);
    return response.data;
  },

  // Add member to class (user_id as query param)
  async addMember(classId, userId) {
    const response = await api.post(`/classes/${classId}/members?user_id=${userId}`);
    return response.data;
  },

  // Remove member from class
  async removeMember(classId, userId) {
    const response = await api.delete(`/classes/${classId}/members/${userId}`);
    return response.data;
  },

  // Import members from file
  async importMembers(classId, file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/classes/${classId}/members/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Assign lecturer to class
  async assignLecturer(classId, lecturerId) {
    const response = await api.post(`/classes/${classId}/assign-lecturer?lecturer_id=${lecturerId}`);
    return response.data;
  },

  // Get class projects
  async getClassProjects(classId) {
    const response = await api.get(`/classes/${classId}/projects`);
    return response.data;
  },
};

export default classService;
