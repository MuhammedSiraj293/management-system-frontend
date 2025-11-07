import React from 'react';
import LeadTable from '../components/Leads/LeadTable.jsx'; // Our new table
import LeadFilterBar from '../components/Leads/LeadFilterBar.jsx';
import { useLeads } from '../hooks/useLeads.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';
// We no longer need the old Pagination component, as LeadTable has it built-in.
// import Pagination from '../components/Common/Pagination.jsx';

/**
 * The main "Leads" page.
 * This component now passes all props to the new LeadTable.
 */
const Leads = () => {
  const { leads, pagination, isLoading, error, setFilters } = useLeads();

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // --- ADDED: Handler for Records per page ---
  const handleLimitChange = (newLimit) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: newLimit,
      page: 1, // Reset to page 1
    }));
  };

  // --- Render logic ---
  const renderContent = () => {
    if (isLoading && !leads.length) {
      return <Loader text="Loading leads..." />;
    }

    if (error) {
      return <Alert type="error" message={error} />;
    }

    if (!isLoading && leads.length === 0) {
      return <Alert type="warning" message="No leads found for these filters." />;
    }

    // --- THIS IS THE FIX ---
    // We must pass all the required props to LeadTable.
    return (
      <LeadTable
        leads={leads}
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    );
    // --- We no longer need the old <Pagination /> component here ---
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">All Leads</h1>

      <LeadFilterBar onFilterChange={handleFilterChange} />

      {/* The 'rounded-lg bg-white p-4 shadow-md' classes are now
        MOVED INSIDE the LeadTable component, so we remove them from here
        to prevent a "box-inside-a-box" look.
      */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Leads;