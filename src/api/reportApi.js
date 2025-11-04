import axiosClient from './axiosClient';

/**
 * A collection of API functions related to reports and analytics.
 */
export const reportApi = {
  /**
   * Fetches summary dashboard KPIs (Key Performance Indicators).
   * @returns {Promise<object>} - A promise that resolves to an object like:
   * { totalLeads, leadsToday, failedJobs, leadsBySource }
   */
  getDashboardKpis: () => {
    return axiosClient.get('/reports/kpis');
  },

  /**
   * Fetches data for leads over time, for charts.
   * @param {object} params - Query parameters.
   * @param {string} params.period - '24h', '7d', '30d'.
   * @param {string} params.groupBy - 'hour' or 'day'.
   * @returns {Promise<object>} - A promise that resolves to chart data.
   */
  getLeadsOverTime: (params) => {
    return axiosClient.get('/reports/leads-over-time', { params });
  },
};