import axiosClient from './axiosClient';

/**
 * A collection of API functions related to leads.
 */
export const leadApi = {
  /**
   * Fetches a paginated list of leads from the backend.
   * @param {object} params - Query parameters.
   * @param {number} params.page - The page number to fetch.
   * @param {number} params.limit - The number of leads per page.
   * @param {string} params.sort - The field to sort by (e.g., 'createdAt').
   * @param {string} params.order - 'asc' or 'desc'.
   * @param {string} params.source - Filter by source ID.
   * @returns {Promise<object>} - A promise that resolves to the API response (e.g., { data: leads, total: 100 }).
   */
  getLeads: (params) => {
    return axiosClient.get('/leads', { params });
  },

  /**
   * Fetches a single lead by its ID.
   * @param {string} leadId - The ID of the lead.
   * @returns {Promise<object>} - A promise that resolves to the lead data.
   */
  getLeadById: (leadId) => {
    return axiosClient.get(`/leads/${leadId}`);
  },

  /**
   * Manually retries a failed job (e.g., a failed Sheets or Bitrix push).
   * @param {string} leadId - The ID of the lead associated with the failed job.
   * @param {string} jobType - 'append_to_sheets' or 'push_to_bitrix'.
   * @returns {Promise<object>} - A promise that resolves to the API response.
   */
  retryFailedJob: (leadId, jobType) => {
    return axiosClient.post(`/leads/${leadId}/retry`, { jobType });
  },

  /**
   * Manually adds a new lead from the admin dashboard.
   * @param {object} leadData - The data for the new lead.
   * @param {string} leadData.name
   * @param {string} leadData.phone
   * @param {string} leadData.email
   * @param {string} leadData.sourceId - The source to associate with.
   * @returns {Promise<object>} - A promise that resolves to the new lead data.
   */
  createLead: (leadData) => {
    return axiosClient.post('/leads', leadData);
  },
};