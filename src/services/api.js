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

// Race Category services
export const raceCategoryService = {
  // Get all race categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/api/race-category/fetch-all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get race category by ID
  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(`/api/race-category/fetch-by-id/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new race category
  createCategory: async (categoryData) => {
    try {
      const formData = new FormData();
      // Add image if provided
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }
      // Add other category data
      formData.append('title', categoryData.title);
      formData.append('description', categoryData.description);
      formData.append('location', categoryData.location);

      const response = await apiClient.post('/api/race-category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update race category
  updateCategory: async (id, categoryData) => {
    try {
      const formData = new FormData();
      // Add image if provided
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }
      // Add other category data
      formData.append('title', categoryData.title);
      formData.append('description', categoryData.description);
      formData.append('location', categoryData.location);

      const response = await apiClient.put(`/api/race-category/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete race category
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(`/api/race-category/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Hero Image services
export const heroImageService = {
  // Get hero image
  getHeroImage: async () => {
    try {
      const response = await apiClient.get('/api/hero-image');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update hero image
  updateHeroImage: async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('image', imageData);
      const response = await apiClient.put('/api/hero-image/update-hero', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

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

// User services
export const userService = {
  // Fetch all users
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/api/register/fetch-all-user');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('User service unavailable');
    }
  },
  
  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const response = await apiClient.get(`/api/register/user-profile${userId ? `/${userId}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('User profile service unavailable');
    }
  },
  
  // Update user profile
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.put(`/api/register/user-profile/${userId}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Update profile service unavailable');
    }
  },
  
  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(`/api/register/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Delete user service unavailable');
    }
  },
};