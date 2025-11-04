import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient.js';
// --- ADDED ---
import { authApi } from '../api/authApi.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Effect to run on app load.
   */
  useEffect(() => {
    const checkUser = async () => {
      if (token) {
        // Add token to axios headers for this request
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
          // --- UPDATED: Use real API call ---
          const response = await authApi.getMe();
          setUser(response.data.data);
          // --- END UPDATE ---
          
        } catch (err) {
          // Token is invalid or expired
          setToken(null);
          setUser(null);
          localStorage.removeItem('authToken');
          axiosClient.defaults.headers.common['Authorization'] = null;
        }
      }
      setIsLoading(false);
    };

    checkUser();
  }, [token]);

  /**
   * Login function
   */
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      // --- UPDATED: Use real API call ---
      const response = await authApi.login({ email, password });
      // --- END UPDATE ---

      const { token, user } = response.data;

      // 1. Update state
      setUser(user);
      setToken(token);

      // 2. Persist token
      localStorage.setItem('authToken', token);

      // 3. Set default axios header
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message); // Re-throw for the component
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    axiosClient.defaults.headers.common['Authorization'] = null;
    // Redirect will be handled by the component
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};