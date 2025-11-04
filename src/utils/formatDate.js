/**
 * Formats an ISO date string into a readable format (e.g., "Oct 27, 2025").
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString) => {
  if (!dateString) {
    return 'N/A';
  }

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};