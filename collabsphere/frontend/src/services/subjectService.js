import api from './api';

const subjectService = {
  // Get all subjects
  async getSubjects(params = {}) {
    const response = await api.get('/subjects', { params });
    return response.data;
  },

  // Get subject by ID
  async getSubjectById(subjectId) {
    const response = await api.get(`/subjects/${subjectId}`);
    return response.data;
  },

  // Create subject
  async createSubject(subjectData) {
    const response = await api.post('/subjects', subjectData);
    return response.data;
  },

  // Update subject
  async updateSubject(subjectId, subjectData) {
    const response = await api.patch(`/subjects/${subjectId}`, subjectData);
    return response.data;
  },

  // Delete subject
  async deleteSubject(subjectId) {
    const response = await api.delete(`/subjects/${subjectId}`);
    return response.data;
  },

  // Import subjects from file
  async importSubjects(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/subjects/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all curricula in the system
  async getAllCurricula(params = {}) {
    const response = await api.get('/subjects/curricula/all', { params });
    return response.data;
  },

  // Import curricula from file
  async importCurricula(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/subjects/curricula/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get curricula for a subject
  async getCurricula(subjectId, params = {}) {
    const response = await api.get(`/subjects/${subjectId}/curricula`, { params });
    return response.data;
  },

  // Get curriculum by ID
  async getCurriculumById(curriculumId) {
    const response = await api.get(`/subjects/curricula/${curriculumId}`);
    return response.data;
  },

  // Create curriculum (requires subject_id in data)
  async createCurriculum(subjectId, curriculumData) {
    const response = await api.post(`/subjects/${subjectId}/curricula`, curriculumData);
    return response.data;
  },

  // Update curriculum
  async updateCurriculum(curriculumId, curriculumData) {
    const response = await api.patch(`/subjects/curricula/${curriculumId}`, curriculumData);
    return response.data;
  },
};

export default subjectService;
