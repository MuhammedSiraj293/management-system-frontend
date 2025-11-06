import React from 'react';
import LeadTable from '../components/Leads/LeadTable.jsx';
import LeadFilterBar from '../components/Leads/LeadFilterBar.jsx'; // --- ADDED ---
import Pagination from '../components/Common/Pagination.jsx'; // --- ADDED ---
import { useLeads } from '../hooks/useLeads.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';

/**
 * The main "Leads" page.
 * This component now includes the filter bar and pagination.
 */
const Leads = () => {
  // --- The 'useLeads' hook already gives us 'setFilters' ---
  const { leads, pagination, isLoading, error, setFilters } = useLeads();

  // --- This function will be passed to the filter bar ---
  const handleFilterChange = (newFilters) => {
    // We reset to page 1 every time the filter changes
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: 1, 
    }));
  };

  // --- This function will be passed to the pagination component ---
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // --- Render logic ---
  const renderContent = () => {
    if (isLoading && !leads.length) { // Show full loader only on initial load
      return <Loader text="Loading leads..." />;
    }

    if (error) {
      return <Alert type="error" message={error} />;
    }

    if (!isLoading && leads.length === 0) {
      return <Alert type="warning" message="No leads found for these filters." />;
    }

    return (
      <>
        {/* We add a small loader for when filters are changing */}
        {isLoading && <Loader text="Refreshing..." />}
        <LeadTable leads={leads} />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalLeads={pagination.totalLeads}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">All Leads</h1>

      {/* --- ADDED THE FILTER BAR --- */}
      <LeadFilterBar onFilterChange={handleFilterChange} />

      <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Leads;