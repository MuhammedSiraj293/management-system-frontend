import React from 'react';
import CompactPagination from '../Common/CompactPagination.jsx';

/**
 * 📋 The "Records per page" selector component
 */
const RecordsSelector = ({ currentLimit, onLimitChange }) => (
  <div className="flex items-center space-x-2 text-sm">
    <label htmlFor="records" className="text-gray-500">
      Records:
    </label>
    <select
      id="records"
      value={currentLimit} // --- FIX: Use the prop for the value ---
      onChange={(e) => onLimitChange(Number(e.target.value))}
      className="block w-full rounded-md border-gray-300 py-1.5 pl-2 pr-8 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      <option value={10}>10</option>
      <option value={20}>20</option> {/* Added 20 as an option */}
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>
);

/**
 * 👣 The footer for the leads table.
 *
 * @param {object} props
 * @param {object} props.pagination - The pagination object from useLeads
 * @param {number} props.currentLimit - The current limit from the filters state
 * @param {Function} props.onPageChange - Handler for changing pages
 * @param {Function} props.onLimitChange - Handler for changing records per page
 */
const TableFooter = ({ pagination, currentLimit, onPageChange, onLimitChange }) => {
  return (
    <div className="flex flex-col items-center justify-between border-t border-gray-200 p-4 sm:flex-row">
      {/* --- Pagination (Center) --- */}
      <div className="mb-4 sm:mb-0">
        <CompactPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      </div>

      {/* --- Records Selector (Right) --- */}
      <div>
        <RecordsSelector
          currentLimit={currentLimit} // --- FIX: Pass prop down ---
          onLimitChange={onLimitChange}
        />
      </div>
    </div>
  );
};

export default TableFooter;