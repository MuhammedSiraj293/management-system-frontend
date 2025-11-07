import { useState, useEffect, useCallback } from 'react';
import { leadApi } from '../api/leadApi.js';

/**
 * A custom hook to fetch and manage the state for a single lead's detail page.
 *
 * @param {string} leadId - The ID of the lead to fetch.
 * @returns {object} An object containing the lead's data, jobs, errors, and state.
 */
export const useLeadDetail = (leadId) => {
  const [lead, setLead] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the complete lead data from the API.
   * Wrapped in useCallback so it's not recreated on every render.
   */
  const fetchLeadData = useCallback(async () => {
    if (!leadId) {
      setError("No Lead ID provided.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await leadApi.getLeadById(leadId);
      const { lead, jobs, errors } = response.data.data;
      setLead(lead);
      setJobs(jobs);
      setErrors(errors);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to fetch lead details.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [leadId]); // Re-run this function *only* if the leadId changes

  // useEffect to trigger the fetch when the hook mounts
  // or when the leadId changes.
  useEffect(() => {
    fetchLeadData();
  }, [fetchLeadData]);

  // Return the state and a function to manually refetch
  return {
    lead,
    jobs,
    errors,
    isLoading,
    error,
    refresh: fetchLeadData,
  };
};