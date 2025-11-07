import React from 'react';
import LeadTable from '../components/Leads/LeadTable.jsx';
import LeadFilterBar from '../components/Leads/LeadFilterBar.jsx';
import { useLeads } from '../hooks/useLeads.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';

/**
 * The main "Leads" page.
 */
const Leads = () => {
  const { leads, pagination, isLoading, error, filters, setFilters } = useLeads();

  // --- (Handlers are unchanged) ---
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
  const handleLimitChange = (newLimit) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      limit: newLimit,
      page: 1,
    }));
  };

  const renderContent = () => {
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
          <LeadTable
            leads={[]}
            pagination={pagination}
            filters={filters} // --- ADDED THIS PROP ---
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      );
    }

    // --- THIS IS THE FIX ---
    // We must pass the 'filters' object to the table.
    return (
      <LeadTable
        leads={leads}
        pagination={pagination}
        filters={filters} // --- ADDED THIS PROP ---
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">All Leads</h1>
      <LeadFilterBar onFilterChange={handleFilterChange} />
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Leads;