import axios from "axios";
import { setAuthToken, getAuthHeader } from "./auth";

// Base URL for API calls - you'll need to set this in your environment variables or config
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://13.235.254.156:4000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Add request interceptor to attach auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const headers = getAuthHeader();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

// Race Category services
export const raceCategoryService = {
  // Get all race categories
  getAllCategories: async () => {
    try {
      const response = await apiClient.get("/api/race-category/fetch-all");
      return response.data;
    } catch (error) {
      console.error("API Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  // Get race category by ID
  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(
        `/api/race-category/fetch-by-id/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new race category
  createCategory: async (categoryData) => {
    try {
      let formData;

      if (categoryData instanceof FormData) {
        formData = categoryData;
      } else {
        formData = new FormData();
        if (categoryData.file || categoryData.image) {
          formData.append("image", categoryData.file || categoryData.image);
        }
        if (categoryData.category_name || categoryData.title) {
          formData.append(
            "category_name",
            categoryData.category_name || categoryData.title
          );
        }
        if (categoryData.description) {
          formData.append("description", categoryData.description);
        }
      }

      const response = await apiClient.post("/api/race-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      if (categoryData.file || categoryData.image) {
        formData.append("image", categoryData.file || categoryData.image);
      }
      if (categoryData.title) formData.append("title", categoryData.title);

      const response = await apiClient.put(
        `/api/race-category/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete race category
  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/race-category/delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

/**
 * Create a new sponsor.
 */
export const sponsorService = {
  createSponsor: async (sponsorData) => {
    try {
      const formData = new FormData();
      if (sponsorData.name) {
        formData.append("sponsor_name", sponsorData.name);
      }
      if (sponsorData.logo) {
        formData.append("sponsor_img_filename", sponsorData.logo);
      }
      if (sponsorData.website_url) {
        formData.append("sponsor_website_url", sponsorData.website_url);
      }

      const response = await apiClient.post("/api/sponsors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating sponsor:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Get all sponsors.
   */
  getAllSponsors: async () => {
    try {
      const response = await apiClient.get("/api/sponsors/fetch-all");
      return response.data;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  },

  /**
   * Get a single sponsor by their ID.
   */
  getSponsorById: async (id) => {
    try {
      const response = await apiClient.get(`/api/sponsors/fetch-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching sponsor with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Update an existing sponsor.
   */
  updateSponsor: async (id, sponsorData) => {
    try {
      const formData = new FormData();
      if (sponsorData.name) {
        formData.append("sponsor_name", sponsorData.name);
      }
      if (sponsorData.logo) {
        formData.append("sponsor_img_filename", sponsorData.logo);
      }
      if (sponsorData.website_url) {
        formData.append("sponsor_website_url", sponsorData.website_url);
      }

      const response = await apiClient.put(
        `/api/sponsors/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating sponsor with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  /**
   * Delete a sponsor by their ID.
   */
  deleteSponsor: async (id) => {
    try {
      const response = await apiClient.delete(`/api/sponsors/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting sponsor with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export const partnerService = {
  // Fetches all partners from the API.
  getAllPartners: async () => {
    try {
      const response = await apiClient.get("/api/partners/fetch-all");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching all partners:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Fetches a single partner by their unique ID.
  getPartnerById: async (id) => {
    try {
      const response = await apiClient.get(`/api/partners/fetch-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching partner with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Creates a new partner with a logo upload.
  createPartner: async (partnerData) => {
    try {
      const formData = new FormData();

      if (partnerData.name) {
        formData.append("partner_name", partnerData.name);
      }
      if (partnerData.logo) {
        formData.append("partner_img_filename", partnerData.logo);
      }
      if (partnerData.website_url) {
        formData.append("partner_website_url", partnerData.website_url);
      }

      const response = await apiClient.post("/api/partners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating partner:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Updates an existing partner.
  updatePartner: async (id, partnerData) => {
    try {
      const formData = new FormData();

      // NOTE: Adjust these field names if your backend expects different keys.
      if (partnerData.name) {
        formData.append("partner_name", partnerData.name);
      }
      if (partnerData.logo) {
        formData.append("partner_logo_filename", partnerData.logo);
      }
      if (partnerData.website_url) {
        formData.append("partner_website_url", partnerData.website_url);
      }

      const response = await apiClient.put(
        `/api/partners/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating partner with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Deletes a partner by their unique ID.
  deletePartner: async (id) => {
    try {
      const response = await apiClient.delete(`/api/partners/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting partner with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

/**
 * This service handles all API requests for associates.
 * It assumes a pre-configured apiClient is available.
 */
export const associateService = {
  getAllAssociates: async () => {
    try {
      const response = await apiClient.get("/api/associates/fetch-all");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching all associates:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getAssociateById: async (id) => {
    try {
      const response = await apiClient.get(`/api/associates/fetch-by-id/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching associate with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  createAssociate: async (associateData) => {
    try {
      const formData = new FormData();

      // FIX: Re-added associate_name as it's almost certainly a required field.
      if (associateData.name) {
        formData.append("associate_name", associateData.name);
      }
      if (associateData.logo) {
        formData.append("associate_img_filename", associateData.logo);
      }
      if (associateData.website_url) {
        formData.append("associate_website_url", associateData.website_url);
      }

      const response = await apiClient.post("/api/associates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating associate:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateAssociate: async (id, associateData) => {
    try {
      const formData = new FormData();

      // FIX: Re-added associate_name here as well for consistency.
      if (associateData.name) {
        formData.append("associate_name", associateData.name);
      }
      if (associateData.logo) {
        formData.append("associate_img_filename", associateData.logo);
      }
      if (associateData.website_url) {
        formData.append("associate_website_url", associateData.website_url);
      }

      const response = await apiClient.put(
        `/api/associates/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating associate with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteAssociate: async (id) => {
    try {
      const response = await apiClient.delete(`/api/associates/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting associate with ID ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

// Hero Image services
export const heroImageService = {
  // Upload new hero image
  uploadHeroImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("hero_img_filename", file);

      const response = await apiClient.post("/api/hero-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Upload hero image error:", error.response?.data || error);
      throw error;
    }
  },

  // Update hero image
  updateHeroImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("hero_img_filename", file);

      const response = await apiClient.put(
        "/api/hero-image/update-hero",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update hero image error:", error.response?.data || error);
      throw error;
    }
  },
};

// // User Profile services - merged into userService
// const userProfileService = {
//   // Get user profile
//   getUserProfile: async () => {
//     try {
//       // Get token from localStorage
//       const token = localStorage.getItem("user_token");
//       if (!token) {
//         throw new Error("No authentication token found");
//       }

//       const response = await apiClient.get("/api/register/user-profile");

//       // Debug log

//       if (!response.data) {
//         throw new Error("No profile data received");
//       }

//       let profileData = null;
//       const responseData = response.data;

//       // Try different response structures
//       if (responseData.user) {
//         profileData = responseData.user;
//       } else if (responseData.data?.user) {
//         profileData = responseData.data.user;
//       } else if (responseData.data) {
//         profileData = responseData.data;
//       } else {
//         profileData = responseData;
//       }

//       return {
//         data: profileData,
//         status: response.status,
//       };
//     } catch (error) {
//       console.error("Profile fetch error:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });

//       // Check if it's an auth error
//       if (error.response?.status === 401) {
//         setAuthToken(null); // Clear invalid token
//         throw new Error("Session expired. Please login again.");
//       }

//       throw new Error(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch user profile"
//       );
//     }
//   },

//   // Update user profile
//   updateUserProfile: async (profileData) => {
//     try {
//       const response = await apiClient.put(
//         "/api/register/update-profile",
//         profileData
//       );
//       return {
//         data: response.data.user || response.data.data || response.data,
//         status: response.status,
//       };
//     } catch (error) {
//       console.error("Profile update error:", error);
//       throw error.response?.data || error;
//     }
//   },
// };

// Authentication services
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required");
      }

      // Log the request payload (without sensitive data)

      // Make the login request
      const response = await apiClient.post("/api/login", {
        email: credentials.email,
        password: credentials.password,
      });

      // Debug log (without sensitive data)

      // Ensure we have the required data
      if (!response.data) {
        throw new Error("No data received from server");
      }

      const responseData = response.data;

      // Try to extract token from different possible locations
      const token = responseData.token || responseData.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      // Save token immediately
      setAuthToken(token);

      // Fetch user profile to get complete user data including role
      const profileResponse = await apiClient.get(
        "/api/register/user-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile Response:", profileResponse.data);

      // Extract user data from profile response
      let userData = null;
      if (profileResponse.data.user) {
        userData = profileResponse.data.user;
      } else if (profileResponse.data.data) {
        userData = profileResponse.data.data;
      } else {
        userData = profileResponse.data;
      }

      if (!userData) {
        throw new Error("Could not extract user data from response");
      }

      // Ensure we have role information
      if (!userData.role && !userData.ROLE) {
        throw new Error("No role information in user profile");
      }

      // Debug log
      console.log("Extracted user data:", {
        hasName: !!userData.name,
        hasEmail: !!userData.email,
        hasRole: !!userData.role,
      });

      // Save token and user data
      setAuthToken(token);
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        token,
        user: userData,
      };
    } catch (error) {
      console.error("Login service error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        throw error.response.data;
      }
      throw new Error(error.message || "Login service unavailable");
    }
  },

  // Get user details by ID
  getUserDetails: async (userId) => {
    try {
      // Try to get specific user first
      try {
        const response = await apiClient.get(`/api/register/user/${userId}`);
        console.log("Single user response:", response.data);
        if (response.data && (response.data.user || response.data.data)) {
          const user = response.data.user || response.data.data;
          return { user };
        }
      } catch (e) {
        console.log("Single user fetch failed, trying all users");
      }

      // Fallback: get all users and find the specific one
      const response = await apiClient.get("/api/register/fetch-all-users");
      console.log("All users response:", response.data);

      // Find the specific user by ID
      const users = response.data.data || response.data;
      if (!Array.isArray(users)) {
        throw new Error("Invalid users data received");
      }

      const userDetails = users.find((user) => user._id === userId);
      console.log("Found user details:", userDetails);

      if (!userDetails) {
        throw new Error("User not found");
      }

      if (!userDetails.role) {
        throw new Error("User role not found in user details");
      }

      return { user: userDetails };
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error.response?.data || error;
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await apiClient.post("/api/register", userData);
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("Registration service unavailable");
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
      // Get token from localStorage
      const token = localStorage.getItem("user_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Fetching all users...");
      const response = await apiClient.get("/api/register/fetch-all-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("All users response:", response.data);

      if (!response.data) {
        throw new Error("No data received from server");
      }

      // Handle different response structures
      let users = [];
      if (Array.isArray(response.data)) {
        users = response.data;
      } else if (response.data.users) {
        users = response.data.users;
      } else if (response.data.data) {
        users = response.data.data;
      }

      if (!Array.isArray(users)) {
        throw new Error("Invalid users data format");
      }

      // Map the user data to ensure consistent structure
      const mappedUsers = users.map((user) => ({
        id: user._id || user.id,
        name: user.name || `${user.fname || ""} ${user.lname || ""}`.trim(),
        email: user.email,
        role: user.role,
        createdAt: user.createdAt || user.created_at,
        ...user, // include other fields
      }));

      console.log("Processed users:", mappedUsers); // Debug log
      return { users: mappedUsers };
    } catch (error) {
      console.error("Get all users error:", error);
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch users"
      );
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const response = await apiClient.get(
        `/api/register/user-profile${userId ? `/${userId}` : ""}`
      );
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("User profile service unavailable");
    }
  },

  // Update user profile
  updateUserProfile: async (userId, profileData) => {
    try {
      const response = await apiClient.put(
        `/api/register/update-profile`,
        profileData
      );
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("Update profile service unavailable");
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await apiClient.delete(
        `/api/register/delete-user/${userId}`
      );
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("Delete user service unavailable");
    }
  },
};

export const pastEventService = {
  // Add a new past event
  add: async (eventData) => {
    try {
      // Send data as JSON instead of FormData
      const response = await apiClient.post("/api/past-events/add", eventData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.error("Error adding past event:", error.response?.data || error);
      throw error;
    }
  },

  // Get all past events
  getAll: async () => {
    try {
      const response = await apiClient.get("/api/past-events/all");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching all past events:",
        error.response?.data || error
      );
      throw error;
    }
  },

  // Get a single past event by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/past-events/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching past event ${id}:`,
        error.response?.data || error
      );
      throw error;
    }
  },

  // Update a past event by ID
  update: async (id, eventData) => {
    try {
      // Send data as JSON instead of FormData
      const response = await apiClient.put(
        `/api/past-events/update/${id}`,
        eventData,
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    } catch (error) {
      console.error(
        `Error updating past event ${id}:`,
        error.response?.data || error
      );
      throw error;
    }
  },

  // Delete a past event by ID
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/past-events/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting past event ${id}:`,
        error.response?.data || error
      );
      throw error;
    }
  },
};

export const faqService = {
  // Add new FAQ
  add: async (faqData) => {
    try {
      const response = await apiClient.post("/api/faq/add", faqData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding FAQ:", error.response?.data || error);
      throw error;
    }
  },

  // Get all FAQs
  getAll: async () => {
    try {
      const response = await apiClient.get("/api/faq/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error.response?.data || error);
      throw error;
    }
  },

  // Get FAQ by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/faq/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching FAQ ${id}:`, error.response?.data || error);
      throw error;
    }
  },

  // Update FAQ by ID
  update: async (id, faqData) => {
    try {
      const response = await apiClient.put(`/api/faq/update/${id}`, faqData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating FAQ ${id}:`, error.response?.data || error);
      throw error;
    }
  },

  // Delete FAQ by ID
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/api/faq/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting FAQ ${id}:`, error.response?.data || error);
      throw error;
    }
  },
};
