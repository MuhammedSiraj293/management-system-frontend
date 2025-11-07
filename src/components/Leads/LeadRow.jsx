import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate.js';
import { leadApi } from '../../api/leadApi.js';

/**
 * 🎨 Renders a colored status badge
 */
const StatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-100 text-gray-800';
  switch (status) {
    case 'queued': colorClasses = 'bg-blue-100 text-blue-800'; break;
    case 'success': colorClasses = 'bg-green-100 text-green-800'; break;
    case 'failed': colorClasses = 'bg-red-100 text-red-800'; break;
    case 'processing': colorClasses = 'bg-yellow-100 text-yellow-800'; break;
    case 'duplicate': colorClasses = 'bg-purple-100 text-purple-800'; break;
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
 * ➡️ A single row in the leads table.
 *
 * @param {object} props
 * @param {object} props.lead - The lead data for this row.
 * @param {boolean} props.isSelected - Whether this row is selected.
 * @param {Function} props.onSelect - Function to call when the checkbox is clicked.
 * @param {object} props.visibleColumns - Object showing which columns are visible.
 */
const LeadRow = ({ lead, isSelected, onSelect, visibleColumns }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [localStatus, setLocalStatus] = useState(lead.status);

  const handleRetry = async () => {
    if (!window.confirm("Are you sure you want to retry all failed jobs for this lead?")) return;
    setIsRetrying(true);
    try {
      await leadApi.retryFailedJob(lead._id);
      setLocalStatus('queued'); // Optimistically update UI
    } catch (err) {
      alert("Failed to retry jobs: " + (err.response?.data?.message || err.message));
      setIsRetrying(false);
    }
  };

  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      {/* --- Checkbox --- */}
      <td className="w-4 px-6 py-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      
      {/* --- Lead ID (New) --- */}
      {visibleColumns.leadId && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          <Link to={`/leads/${lead._id}`} className="font-medium text-blue-600 hover:underline">
            LEAD#{lead.leadId}
          </Link>
        </td>
      )}

     {/* --- Date --- */}
      {visibleColumns.date && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {formatDate(lead.createdAt)}
        </td>
      )}
      
      {/* --- Name (Now a link) --- */}
      {visibleColumns.name && (
        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
          <Link to={`/leads/${lead._id}`} className="hover:underline">
            {lead.name || 'N/A'}
          </Link>
        </td>
      )}
      
      {/* --- Contact --- */}
      {visibleColumns.contact && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          <div>{lead.phone || 'No Phone'}</div>
          <div className="text-xs">{lead.email || 'No Email'}</div>
        </td>
      )}
      
      {/* --- User Type (New) --- */}
      {visibleColumns.userType && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.userType}
        </td>
      )}
      
      {/* --- Property Type (New) --- */}
      {visibleColumns.propertyType && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.propertyType}
        </td>
      )}
      
      {/* --- Budget (New) --- */}
      {visibleColumns.budget && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.budget}
        </td>
      )}
      
      {/* --- Bedrooms (New) --- */}
      {visibleColumns.bedrooms && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.bedrooms}
        </td>
      )}
      
      {/* --- Source --- */}
      {visibleColumns.source && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.siteName || 'N/A'}
        </td>
      )}
      
      {/* --- Status --- */}
      {visibleColumns.status && (
        <td className="whitespace-nowrap px-4 py-3">
          <StatusBadge status={localStatus} />
        </td>
      )}
      
      {/* --- UTM Source --- */}
      {visibleColumns.utmSource && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.utm?.source}
        </td>
      )}
      
      
      {/* --- Actions --- */}
      {visibleColumns.actions && (
        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">
          <button
            onClick={handleRetry}
            disabled={isRetrying || localStatus !== 'failed'}
            className="text-blue-600 hover:text-blue-900 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {isRetrying ? 'Retrying...' : 'Retry'}
          </button>
        </td>
      )}
    </tr>
  );
};

export default LeadRow;