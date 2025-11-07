import axiosClient from './axiosClient';

/**
 * A collection of API functions related to leads.
 */
export const leadApi = {
  /**
   * Fetches a paginated list of leads.
   * @param {object} params - Query parameters (page, limit, status, etc.)
   * @returns {Promise<object>}
   */
  getLeads: (params) => {
    return axiosClient.get('/leads', { params });
  },

  /**
   * Fetches a single lead by its ID.
   * (This is the function our new detail page will use)
   * @param {string} leadId - The ID of the lead.
   * @returns {Promise<object>}
   */
  getLeadById: (leadId) => {
    return axiosClient.get(`/leads/${leadId}`);
  },

  /**
   * Manually retries all failed jobs for a lead.
   * @param {string} leadId - The ID of the lead.
   * @returns {Promise<object>}
   */
  retryFailedJob: (leadId) => {
    // Note: The backend controller (retryLeadJobs) doesn't use jobType
    // it just retries all failed jobs for the lead.
    return axiosClient.post(`/leads/${leadId}/retry`);
  },

  /**
   * Manually adds a new lead from the admin dashboard.
   * @param {object} leadData - The data for the new lead.
   * @returns {Promise<object>}
   */
  createLead: (leadData) => {
    return axiosClient.post('/leads', leadData);
  },
};