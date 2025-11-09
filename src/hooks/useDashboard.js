import { useState, useEffect, useCallback } from 'react';
import { reportApi } from '../api/reportApi.js';
// We don't need the logger here anymore
// import logger from '../config/logger.js'; 

/**
 * A custom hook to fetch and manage the state for the
 * main dashboard KPIs and charts.
 */
export const useDashboard = () => {
  const [kpis, setKpis] = useState({
    leadsToday: 0,
    leadsLast24h: 0,
    failedJobs: 0,
    leadsBySource: [],
  });
  // --- ADDED: State for chart data ---
  const [chartData, setChartData] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all dashboard data (KPIs and Chart) in parallel.
   */
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // --- UPDATED: Fetch both endpoints at the same time ---
      const [kpiResponse, chartResponse] = await Promise.all([
        reportApi.getDashboardKpis(),
        reportApi.getLeadsOverTime({ period: '28d' }) // Default to 28 days
      ]);

      setKpis(kpiResponse.data.data);
      setChartData(chartResponse.data.data);
      // --- END UPDATE ---

    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch dashboard data.';
      setError(message);
      console.error('Error fetching dashboard data:', message);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this runs once

  // useEffect to trigger the fetch when the hook mounts
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Return all state and a refresh function
  return {
    kpis,
    chartData, // --- ADDED ---
    isLoading,
    error,
    refresh: fetchDashboardData,
  };
};