import React, { useState } from 'react';
import { formatDate } from '../../utils/formatDate.js';
import { Link } from 'react-router-dom'; // --- ADDED ---
import { leadApi } from '../../api/leadApi.js'; // --- ADDED ---

/**
 * Renders a status badge based on the lead's status.
 * (This component is unchanged)
 */
const StatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-100 text-gray-800';
  switch (status) {
    case 'queued': colorClasses = 'bg-blue-100 text-blue-800'; break;
    case 'success': colorClasses = 'bg-green-100 text-green-800'; break;
    case 'failed': colorClasses = 'bg-red-100 text-red-800'; break;
    case 'duplicate': colorClasses = 'bg-yellow-100 text-yellow-800'; break;
    default: colorClasses = 'bg-gray-100 text-gray-800';
  }
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize leading-5 ${colorClasses}`}
    >
      {status}
    </span>
  );
};

/**
 * A sub-component for a single row in the table.
 * We move the logic here to allow it to have its own state (for retrying).
 */
const LeadRow = ({ lead }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [localStatus, setLocalStatus] = useState(lead.status);

  const handleRetry = async () => {
    if (!window.confirm("Are you sure you want to retry all failed jobs for this lead?")) {
      return;
    }
    setIsRetrying(true);
    try {
      await leadApi.retryFailedJob(lead._id);
      // Optimistically update the UI. The hook will refresh the data,
      // but this makes the UI feel faster.
      setLocalStatus('queued');
    } catch (err) {
      alert("Failed to retry jobs: " + (err.response?.data?.message || err.message));
      setIsRetrying(false);
    }
    // We don't set isRetrying to false on success,
    // because the button will be disabled anyway.
  };

  return (
    <tr key={lead._id} className="hover:bg-gray-50">
      {/* --- Date --- */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">
          {formatDate(lead.createdAt)}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(lead.createdAt).toLocaleTimeString()}
        </div>
      </td>

      {/* --- Name (now a link) --- */}
      <td className="whitespace-nowrap px-6 py-4">
        {/* --- THIS IS THE UPDATE --- */}
        <Link
          to={`/leads/${lead._id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline"
        >
          {lead.name || 'N/A'}
        </Link>
        {/* --- END UPDATE --- */}
      </td>

      {/* --- Contact --- */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">{lead.phone}</div>
        <div className="text-xs text-gray-500">
          {lead.email || 'No Email'}
        </div>
      </td>

      {/* --- Source --- */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">
          {lead.siteName || 'N/A'}
        </div>
        <div className="text-xs text-gray-500">
          {lead.formName || lead.source}
        </div>
      </td>

      {/* --- Status --- */}
      <td className="whitespace-nowrap px-6 py-4">
        <StatusBadge status={localStatus} />
      </td>

      {/* --- Actions (Retry button is now functional) --- */}
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
        <button
          onClick={handleRetry}
          disabled={isRetrying || localStatus !== 'failed'}
          className="text-blue-600 hover:text-blue-900 disabled:cursor-not-allowed disabled:text-gray-400"
        >
          {isRetrying ? 'Retrying...' : 'Retry'}
        </button>
      </td>
    </tr>
  );
};

/**
 * Displays the list of leads in a table.
 * (This component is now just a wrapper for the table and rows)
 */
const LeadTable = ({ leads }) => {
  if (!leads || leads.length === 0) {
    return <p className="text-center text-gray-500">No leads to display.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Source
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {leads.map((lead) => (
            <LeadRow key={lead._id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;