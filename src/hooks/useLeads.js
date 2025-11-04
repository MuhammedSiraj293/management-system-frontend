import { useState, useEffect, useCallback } from 'react';
import { leadApi } from '../api/leadApi.js';

/**
 * A custom hook to fetch and manage the state for the leads list.
 * This encapsulates all the logic for fetching, filtering,
 * pagination, loading, and error handling.
 *
 * @returns {object} An object containing leads data and handlers.
 */
export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalLeads: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 20,
  });
  
  // State to hold all query parameters
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    sort: 'createdAt',
    order: 'desc',
    // We can add more filters here, e.g.:
    // sourceId: null,
    // status: null,
  });

  /**
   * Fetches leads from the API.
   * Wrapped in useCallback so it's not recreated on every render.
   * It's triggered when the 'filters' state changes.
   */
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Pass the current filters to the API
      const response = await leadApi.getLeads(filters);
      const { data, pagination: newPagination } = response.data;
      
      setLeads(data);
      setPagination(newPagination);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch leads.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]); // Re-run this function *only* if filters change

  // useEffect to trigger the fetch when the hook mounts
  // or when the 'fetchLeads' function (i.e., its dependencies) changes.
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Return the state and a function to update filters
  return {
    leads,
    pagination,
    isLoading,
    error,
    filters,
    // This allows components to change the filters,
    // which will automatically trigger a re-fetch.
    setFilters, 
  };
};