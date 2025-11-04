import axiosClient from './axiosClient';

/**
 * A collection of API functions related to Bitrix integration.
 */
export const bitrixApi = {
  /**
   * Gets the current status of the Bitrix integration.
   * (This would check if the webhook URL is set on the backend).
   * @returns {Promise<object>} - A promise that resolves to status info.
   */
  getStatus: () => {
    return axiosClient.get('/bitrix/status');
  },

  /**
   * Triggers a test connection to the Bitrix webhook.
   * @returns {Promise<object>} - A promise that resolves to the test result.
   */
  testConnection: () => {
    return axiosClient.post('/bitrix/test');
  },

  /**
   * Fetches recent Bitrix-related errors from the ErrorLog.
   * @returns {Promise<object>} - A promise that resolves to a list of errors.
   */
  getErrors: () => {
    return axiosClient.get('/bitrix/errors');
  },
};