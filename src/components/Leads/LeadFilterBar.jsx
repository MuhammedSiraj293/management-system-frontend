import React, { useState } from 'react';
import { useSources } from '../../hooks/useSources.js'; // We need this for the source dropdown

// --- Hardcoded options for our filters ---
const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'QUEUED', label: 'Queued' },
  { value: 'SUCCESS', label: 'Success' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'PROCESSING', label: 'Processing' },
];

const dateOptions = [
  { value: 'all', label: 'All Time' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '14d', label: 'Last 14 Days' },
  { value: '28d', label: 'Last 28 Days' },
  { value: 'custom', label: 'Custom Range' },
];

// --- Helper component for a single filter dropdown ---
const FilterSelect = ({ label, value, onChange, children }) => (
  <div className="flex-1 min-w-[150px]">
    <label
      htmlFor={label}
      className="block text-xs font-medium text-gray-500"
    >
      {label}
    </label>
    <select
      id={label}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      {children}
    </select>
  </div>
);

/**
 * The main filter bar component.
 * It holds its own local state and calls 'onFilterChange' when
 * the "Apply" button is clicked.
 */
const LeadFilterBar = ({ onFilterChange }) => {
  // 1. Fetch sources for the "Source Name" dropdown
  const { sources, isLoading: sourcesLoading } = useSources();

  // 2. Local state for all filter controls
  const [status, setStatus] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');

  // 3. Handler for the "Apply" button
  const handleApplyFilters = () => {
    onFilterChange({
      status: status || null,
      sourceId: sourceId || null,
      dateRange,
      dateFrom: dateRange === 'custom' ? customDateFrom : null,
      dateTo: dateRange === 'custom' ? customDateTo : null,
    });
  };

  // 4. Handler for the "Clear" button
  const handleClearFilters = () => {
    setStatus('');
    setSourceId('');
    setDateRange('all');
    setCustomDateFrom('');
    setCustomDateTo('');
    // Tell the parent page to reset
    onFilterChange({
      status: null,
      sourceId: null,
      dateRange: 'all',
      dateFrom: null,
      dateTo: null,
    });
  };

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        {/* --- Date Range Filter --- */}
        <FilterSelect
          label="Date Range"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          {dateOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FilterSelect>

        {/* --- Source Name Filter --- */}
        <FilterSelect
          label="Source Name"
          value={sourceId}
          onChange={(e) => setSourceId(e.target.value)}
        >
          <option value="">All Sources</option>
          {sourcesLoading ? (
            <option disabled>Loading...</option>
          ) : (
            sources.map((source) => (
              <option key={source._id} value={source._id}>
                {source.name}
              </option>
            ))
          )}
        </FilterSelect>

        {/* --- Status Filter --- */}
        <FilterSelect
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </FilterSelect>
      </div>

      {/* --- Custom Date Inputs (only show if 'custom' is selected) --- */}
      {dateRange === 'custom' && (
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="dateFrom"
              className="block text-xs font-medium text-gray-500"
            >
              From
            </label>
            <input
              type="date"
              id="dateFrom"
              value={customDateFrom}
              onChange={(e) => setCustomDateFrom(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label
              htmlFor="dateTo"
              className="block text-xs font-medium text-gray-500"
            >
              To
            </label>
            <input
              type="date"
              id="dateTo"
              value={customDateTo}
              onChange={(e) => setCustomDateTo(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* --- Action Buttons --- */}
      <div className="mt-4 flex gap-3 border-t border-gray-200 pt-4">
        <button
          onClick={handleApplyFilters}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClearFilters}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default LeadFilterBar;