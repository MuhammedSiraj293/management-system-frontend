import React from 'react';

/**
 * A reusable pagination component.
 *
 * @param {object} props
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.totalLeads - The total number of leads matching the filter.
 * @param {Function} props.onPageChange - Function to call with the new page number.
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalLeads,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate the range of items being shown
  const limit = Math.ceil(totalLeads / totalPages);
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalLeads);

  return (
    <nav
      className="flex flex-col items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:flex-row sm:px-6"
      aria-label="Pagination"
    >
      {/* --- Page Info (Left Side) --- */}
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalLeads}</span> results
        </p>
      </div>

      {/* --- Page Buttons (Right Side) --- */}
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;