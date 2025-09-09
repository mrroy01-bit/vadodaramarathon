
// Set the auth token in localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('user_token', token);
  } else {
    localStorage.removeItem('user_token');
  }
};

// Get the auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('user_token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('user_token');
};

// Get auth header for API requests
export const getAuthHeader = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Parse JWT token to get user info (if needed)
export const getUserFromToken = () => {
  try {
    const token = getAuthToken();
    if (!token) return null;
    
    // Extract and parse the payload part of the JWT token
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    return payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};
