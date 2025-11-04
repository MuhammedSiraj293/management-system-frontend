import React from 'react';
import LeadTable from '../components/Leads/LeadTable.jsx'; // We'll create this next
// import LeadFilterBar from '../components/Leads/LeadFilterBar.jsx'; // We'll add this later
import { useLeads } from '../hooks/useLeads.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';
// We'll add pagination controls later
// import Pagination from '../components/Common/Pagination.jsx'; 

/**
 * The main "Leads" page.
 * This component now fetches real data using the useLeads hook.
 */
const Leads = () => {
  // --- Use the hook to get data and state ---
  const { leads, pagination, isLoading, error, setFilters } = useLeads();

  // --- Placeholder for pagination handler ---
  const handlePageChange = (newPage) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
  };

  // --- Render logic ---
  const renderContent = () => {
    if (isLoading) {
      return <Loader text="Loading leads..." />;
    }

    if (error) {
      return <Alert type="error" message={error} />;
    }

    if (leads.length === 0) {
      return <Alert type="warning" message="No leads found." />;
    }

    return (
      <>
        {/* We will create this table component next */}
        <LeadTable leads={leads} />
        {/* <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
        */}
      </>
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">All Leads</h1>

      {/* <LeadFilterBar onFilterChange={setFilters} />
      */}

      <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
        {/* The content (Loader, Error, or Table) will render here */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Leads;