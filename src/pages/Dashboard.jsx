import React from 'react';
import { useDashboard } from '../hooks/useDashboard.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';
import LeadChart from '../components/Dashboard/LeadChart.jsx'; // --- ADDED ---

/**
 * A reusable KPI card component.
 * (This component is unchanged)
 */
const KpiCard = ({ title, value, bgColor = 'bg-blue-100', textColor = 'text-blue-900' }) => (
  <div className={`rounded-lg p-5 shadow ${bgColor}`}>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className={`mt-1 text-4xl font-bold ${textColor}`}>{value}</p>
  </div>
);

/**
 * The main Dashboard page.
 * It now fetches and displays both KPIs and the new chart.
 */
const Dashboard = () => {
  // --- UPDATED: Get 'chartData' from the hook ---
  const { kpis, chartData, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader text="Loading dashboard data..." />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  // --- Render the data ---
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Dashboard</h1>
      
      {/* --- KPI Cards Grid (Unchanged) --- */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard 
          title="Leads (Today)" 
          value={kpis.leadsToday} 
          bgColor="bg-green-100"
          textColor="text-green-900"
        />
        <KpiCard 
          title="Leads (Last 24h)" 
          value={kpis.leadsLast24h} 
          bgColor="bg-blue-100"
          textColor="text-blue-900"
        />
        <KpiCard 
          title="Failed Jobs" 
          value={kpis.failedJobs} 
          bgColor="bg-red-100"
          textColor="text-red-900"
        />
      </div>

      {/* --- ADDED: Lead Chart --- */}
      <div className="mt-8">
        <LeadChart chartData={chartData} />
      </div>
      {/* --- END ADDED --- */}

      {/* --- Leads by Source Table (Unchanged) --- */}
      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Leads by Source</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Source Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Total Leads
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {kpis.leadsBySource.length > 0 ? (
                kpis.leadsBySource.map((source) => (
                  <tr key={source._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {source._id || 'Unknown Source'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{source.count}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                    No leads recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;