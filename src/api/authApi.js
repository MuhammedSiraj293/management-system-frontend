import axiosClient from './axiosClient';

/**
 * A collection of API functions related to authentication.
 */
export const authApi = {
  /**
   * Logs in a user.
   * @param {object} credentials - The user's email and password.
   * @param {string} credentials.email
   * @param {string} credentials.password
   * @returns {Promise<object>} - A promise that resolves to { token, user }.
   */
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },

  /**
   * Fetches the currently authenticated user's data.
   * (Relies on the token being set in the axiosClient interceptor).
   * @returns {Promise<object>} - A promise that resolves to the user data.
   */
  getMe: () => {
    return axiosClient.get('/auth/me');
  },
};