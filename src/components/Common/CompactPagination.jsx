import React from 'react';

/**
 * A reusable, compact pagination component.
 *
 * @param {object} props
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onPageChange - Function to call with the new page number.
 */
const CompactPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Logic to show 3 page numbers (e.g., 3, 4, 5)
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);
  if (currentPage === 1) endPage = Math.min(totalPages, 3);
  if (currentPage === totalPages) startPage = Math.max(1, totalPages - 2);

  const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center space-x-1">
      {/* --- First Button --- */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        First
      </button>

      {/* --- Previous Button --- */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        Prev
      </button>

      {/* --- Ellipsis (...) --- */}
      {startPage > 1 && <span className="p-2 text-sm text-gray-500">...</span>}

      {/* --- Page Numbers --- */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded p-2 text-sm ${
            page === currentPage
              ? 'font-bold text-blue-600 bg-blue-100'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* --- Ellipsis (...) --- */}
      {endPage < totalPages && <span className="p-2 text-sm text-gray-500">...</span>}
      
      {/* --- Next Button --- */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>

      {/* --- Last Button --- */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};

export default CompactPagination;