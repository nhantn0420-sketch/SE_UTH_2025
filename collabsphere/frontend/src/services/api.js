import axios from 'axios';
import config from '../config';

// Create axios instance
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem(config.ACCESS_TOKEN_KEY);
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(config.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const response = await axios.post(`${config.API_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: newRefreshToken } = response.data;
          
          localStorage.setItem(config.ACCESS_TOKEN_KEY, access_token);
          if (newRefreshToken) {
            localStorage.setItem(config.REFRESH_TOKEN_KEY, newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem(config.ACCESS_TOKEN_KEY);
        localStorage.removeItem(config.REFRESH_TOKEN_KEY);
        localStorage.removeItem(config.USER_KEY);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
