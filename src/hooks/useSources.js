import { useState, useEffect, useCallback } from 'react';
import { sourceApi } from '../api/sourceApi.js';

/**
 * A custom hook to fetch and manage the state for the lead sources.
 */
export const useSources = () => {
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all sources from the API.
   * Wrapped in useCallback to prevent re-renders.
   */
  const fetchSources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await sourceApi.getSources();
      setSources(response.data.data);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch sources.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // useEffect to trigger the fetch when the hook mounts
  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  /**
   * Adds a new source and then refreshes the list.
   */
  const addSource = async (sourceData) => {
    try {
      await sourceApi.createSource(sourceData);
      await fetchSources(); // Refresh the list after adding
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create source.';
      setError(message); // Set error for the component to display
      throw new Error(message); // Re-throw for the form component to catch
    }
  };

  /**
   * Updates an existing source and refreshes the list.
   */
  const updateSource = async (sourceId, sourceData) => {
    try {
      await sourceApi.updateSource(sourceId, sourceData);
      await fetchSources(); // Refresh the list
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update source.';
      setError(message);
      throw new Error(message);
    }
  };

  /**
   * Deletes a source and refreshes the list.
   */
  const deleteSource = async (sourceId) => {
    try {
      await sourceApi.deleteSource(sourceId);
      await fetchSources(); // Refresh the list
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete source.';
      setError(message);
      throw new Error(message);
    }
  };

  // Return the state and action handlers
  return {
    sources,
    isLoading,
    error,
    addSource,
    updateSource,
    deleteSource,
    refetch: fetchSources, // Expose a manual refresh function
  };
};