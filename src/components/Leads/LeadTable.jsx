import React from 'react';
import { formatDate } from '../../utils/formatDate.js'; // We'll create this next

/**
 * Renders a status badge based on the lead's status.
 */
const StatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-100 text-gray-800'; // Default for 'NEW' or 'PROCESSING'

  switch (status) {
    case 'queued':
      colorClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'success':
      colorClasses = 'bg-green-100 text-green-800';
      break;
    case 'failed':
      colorClasses = 'bg-red-100 text-red-800';
      break;
    case 'duplicate':
      colorClasses = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-800';
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
 * Displays the list of leads in a table.
 * @param {object} props
 * @param {Array} props.leads - The array of lead objects to display.
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Contact
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Source
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">
                  {/* We'll create formatDate soon */}
                  {formatDate(lead.createdAt)}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(lead.createdAt).toLocaleTimeString()}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {lead.name || 'N/A'}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">{lead.phone}</div>
                <div className="text-xs text-gray-500">
                  {lead.email || 'No Email'}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-900">
                  {lead.siteName || 'N/A'}
                </div>
                <div className="text-xs text-gray-500">
                  {lead.formName || lead.source}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                <button
                  onClick={() =>
                    alert(`Retry logic for ${lead._id} to be added.`)
                  }
                  disabled={lead.status !== 'failed'}
                  className="text-blue-600 hover:text-blue-900 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  Retry
                </button>
                {/* We can add a "View" link here later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;