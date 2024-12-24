// src/services/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle token refresh
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed:', err);
        // Redirect to login or handle accordingly
      }
    }
  }
  return Promise.reject(error);
});

export const authService = {
  login: (username: string, password: string) => 
    api.post('token/', { username, password }),
  refresh: (token: string) => 
    api.post('token/refresh/', { refresh: token }),
  register: (username: string, password: string, email: string) => 
    api.post('register/', { username, password, email }),
};

export default api;
