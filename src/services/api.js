import axios from 'axios';
import { setAuthToken, getAuthHeader } from './auth';

// Base URL for API calls - you'll need to set this in your environment variables or config
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://13.235.254.156:4000';

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

// User Profile services
export const userProfileService = {
  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await apiClient.get('/api/register/user-profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/register/update-profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Authentication services
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Try both endpoints
      let response;
      try {
        response = await apiClient.post('/api/login', credentials);
      } catch (firstError) {
        console.log('First endpoint failed, trying fallback endpoint...');
        response = await apiClient.post('/api/login', credentials);
      }
      
      // Debug log
      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      // Handle both possible response structures
      const responseData = response.data.data || response.data;
      
      // Debug logs
      console.log('Full response data:', response.data);
      console.log('Processed response data:', responseData);
      
      // Validate response structure
      if (!responseData.token) {
        throw new Error('No token in response');
      }

      // Store token
      setAuthToken(responseData.token);
      
      // Extract user data from the response
      let userData;
      
      if (responseData.user) {
        // If user data is directly in the response
        userData = responseData.user;
      } else if (responseData.userData) {
        // Alternative field name
        userData = responseData.userData;
      } else {
        // Try to decode the token
        try {
          const base64Url = responseData.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          userData = JSON.parse(window.atob(base64));
          console.log('Decoded token payload:', userData);
        } catch (error) {
          console.error('Token parsing error:', error);
        }
      }

      // If we still don't have user data, look for it in other possible response locations
      if (!userData) {
        userData = responseData.data || responseData;
      }

      console.log('Final user data:', userData);
      
      // Store the user data we found
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { ...responseData, user: userData };
    } catch (error) {
      console.error('Login service error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw error.response.data;
      }
      throw new Error(error.message || 'Login service unavailable');
    }
  },
  
  // Get user details by ID
  getUserDetails: async (userId) => {
    try {
      // Try to get specific user first
      try {
        const response = await apiClient.get(`/api/register/user/${userId}`);
        console.log('Single user response:', response.data);
        if (response.data && (response.data.user || response.data.data)) {
          const user = response.data.user || response.data.data;
          return { user };
        }
      } catch (e) {
        console.log('Single user fetch failed, trying all users');
      }

      // Fallback: get all users and find the specific one
      const response = await apiClient.get('/api/register/fetch-all-user');
      console.log('All users response:', response.data);
      
      // Find the specific user by ID
      const users = response.data.data || response.data;
      if (!Array.isArray(users)) {
        throw new Error('Invalid users data received');
      }

      const userDetails = users.find(user => user._id === userId);
      console.log('Found user details:', userDetails);
      
      if (!userDetails) {
        throw new Error('User not found');
      }

      if (!userDetails.role) {
        throw new Error('User role not found in user details');
      }

      return { user: userDetails };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error.response?.data || error;
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