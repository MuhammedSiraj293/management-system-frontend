import React from 'react';
import LeadTable from '../components/Leads/LeadTable.jsx'; // Our new, complex table
import LeadFilterBar from '../components/Leads/LeadFilterBar.jsx';
import { useLeads } from '../hooks/useLeads.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';

/**
 * The main "Leads" page.
 * This component now just fetches data and passes it
 * to the FilterBar and LeadTable components.
 */
const Leads = () => {
  const { leads, pagination, isLoading, error, setFilters } = useLeads();

  // --- Handler for the Filter Bar ---
  const handleFilterChange = (newFilters) => {
    // We reset to page 1 every time the filter changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: 1,
    }));
  };

  // --- Handler for Page Changes (from pagination) ---
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // --- Handler for Records per Page (from table footer) ---
  const handleLimitChange = (newLimit) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: newLimit,
      page: 1, // Reset to page 1
    }));
  };

  // --- Render logic ---
  const renderContent = () => {
    // Show full-page loader only on the first load
    if (isLoading && !leads.length) {
      return (
        <div className="flex h-64 items-center justify-center rounded-lg bg-white shadow-lg">
          <Loader text="Loading leads..." />
        </div>
      );
    }

    if (error) {
      return <Alert type="error" message={error} />;
    }

    if (!isLoading && leads.length === 0) {
      return (
        <>
          <Alert type="warning" message="No leads found for these filters." />
          {/* We still show the table shell so it doesn't look broken */}
          <LeadTable
            leads={[]}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      );
    }

    // --- This is the main success state ---
    // We pass all data and handlers to the table.
    return (
      <LeadTable
        leads={leads}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">All Leads</h1>

      {/* --- Filter Bar --- */}
      <LeadFilterBar onFilterChange={handleFilterChange} />

      {/* --- Main Content (Table, Loader, or Error) --- */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Leads;