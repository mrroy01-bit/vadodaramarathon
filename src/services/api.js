import axios from 'axios';
import { setAuthToken, getAuthHeader } from './auth';

// Base URL for API calls - you'll need to set this in your environment variables or config
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token to requests
apiClient.interceptors.request.use(
  config => {
    const headers = getAuthHeader();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      setAuthToken(null);
      // Redirect can be handled here or in the component
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/api/login', credentials);
      
      // Store token in localStorage if login is successful
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login service unavailable');
    }
  },
  
  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/api/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Registration service unavailable');
    }
  },
  
  // Logout user
  logout: () => {
    setAuthToken(null);
  },
};

export default apiClient;
