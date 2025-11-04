import axios from 'axios';

// Get the backend API URL from the environment variables
// VITE_API_BASE_URL=http://localhost:5001/api (in .env)
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * --- Request Interceptor ---
 * This function will run before every single request is sent.
 * Its job is to get the auth token from localStorage (or context)
 * and add it to the 'Authorization' header.
 */
axiosClient.interceptors.request.use(
  (config) => {
    // We will store the token in localStorage after login
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * --- Response Interceptor ---
 * This function runs after every response is received.
 * It's a central place to handle errors, especially
 * 401 (Unauthorized) errors, which means the user's
 * token is invalid or expired.
 */
axiosClient.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response && error.response.status === 401) {
      // 1. Clear the bad token
      localStorage.removeItem('authToken');
      // 2. Redirect to the login page
      // (We can't use a React hook here, so we do a hard redirect)
      window.location.href = '/login';
    }

    // Return the error so the calling code (e.g., useLeads hook)
    // can still catch it and set an error message.
    return Promise.reject(error);
  }
);

export default axiosClient;