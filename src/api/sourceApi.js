import axiosClient from './axiosClient';

/**
 * A collection of API functions related to sources.
 */
export const sourceApi = {
  /**
   * Fetches all lead sources.
   * @returns {Promise<object>} - A promise that resolves to the list of sources.
   */
  getSources: () => {
    return axiosClient.get('/sources');
  },

  /**
   * Creates a new lead source (e.g., a new website).
   * @param {object} sourceData - The data for the new source.
   * @param {string} sourceData.name - The friendly name (e.g., "Website - Dubai Hills").
   * @param {string} sourceData.platform - 'elementor', 'meta', 'tiktok'.
   * @param {object} sourceData.config - { sheetId, sheetName, bitrixPipelineId }
   * @returns {Promise<object>} - A promise that resolves to the newly created source.
   */
  createSource: (sourceData) => {
    return axiosClient.post('/sources', sourceData);
  },

  /**
   * Updates an existing lead source.
   * @param {string} sourceId - The ID of the source to update.
   * @param {object} sourceData - The data to update.
   * @returns {Promise<object>} - A promise that resolves to the updated source.
   */
  updateSource: (sourceId, sourceData) => {
    return axiosClient.put(`/sources/${sourceId}`, sourceData);
  },

  /**
   * Deletes a lead source.
   * @param {string} sourceId - The ID of the source to delete.
   * @returns {Promise<object>} - A promise that resolves to a success message.
   */
  deleteSource: (sourceId) => {
    return axiosClient.delete(`/sources/${sourceId}`);
  },
};