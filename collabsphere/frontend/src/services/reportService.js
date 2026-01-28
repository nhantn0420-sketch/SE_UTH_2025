import api from './api';

const reportService = {
  // Submit a report (any user)
  async createReport(reportData) {
    const response = await api.post('/reports', reportData);
    return response.data;
  },

  // Get my reports
  async getMyReports(params = {}) {
    const response = await api.get('/reports/my', { params });
    return response.data;
  },

  // Get all reports (Admin only)
  async getAllReports(params = {}) {
    const response = await api.get('/reports', { params });
    return response.data;
  },

  // Get report by ID
  async getReportById(reportId) {
    const response = await api.get(`/reports/${reportId}`);
    return response.data;
  },

  // Update report status (Admin only)
  async updateReport(reportId, updateData) {
    const response = await api.put(`/reports/${reportId}`, updateData);
    return response.data;
  },

  // Delete report (Admin only)
  async deleteReport(reportId) {
    const response = await api.delete(`/reports/${reportId}`);
    return response.data;
  },

  // Get statistics (Admin only)
  async getStatistics() {
    const response = await api.get('/reports/statistics/admin');
    return response.data;
  },

  // Alias for getAllReports (used by SystemReports component)
  async getSystemReports(params = {}) {
    return this.getAllReports(params);
  },
};

export default reportService;
