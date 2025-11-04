import { useState, useEffect } from 'react';
import { reportApi } from '../api/reportApi.js';
// import logger from '../config/logger.js';

/**
 * A custom hook to fetch and manage the state for the
 * main dashboard KPIs.
 */
export const useDashboard = () => {
  const [kpis, setKpis] = useState({
    leadsToday: 0,
    leadsLast24h: 0,
    failedJobs: 0,
    leadsBySource: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the dashboard KPI data from the API.
   */
  const fetchKpis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await reportApi.getDashboardKpis();
      setKpis(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch dashboard data.';
      setError(message);
      logger.error('Error fetching dashboard KPIs:', message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to trigger the fetch when the hook mounts
  useEffect(() => {
    fetchKpis();
  }, []); // Empty dependency array means this runs once on mount

  // Return the state and a function to manually refresh
  return {
    kpis,
    isLoading,
    error,
    refresh: fetchKpis, // Allow components to trigger a refresh
  };
};