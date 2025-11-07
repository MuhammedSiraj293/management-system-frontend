import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate.js';
import { leadApi } from '../../api/leadApi.js';

// --- Re-usable Internal Components ---

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
 * ⚙️ The dropdown menu for showing/hiding columns
 */
const ColumnSettings = ({ allColumns, visibleColumns, toggleColumn }) => (
  <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
    <div className="p-4">
      <p className="text-sm font-medium text-gray-900">Customize Columns</p>
      <div className="mt-3 space-y-2">
        {allColumns.map((col) => (
          <label key={col.id} className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={visibleColumns[col.id]}
              onChange={() => toggleColumn(col.id)}
            />
            <span className="ml-2">{col.name}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

/**
 * ↔️ The compact pagination component
 */
const CompactPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  // Logic to show 3 page numbers (e.g., 3, 4, 5)
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);
  if (currentPage === 1) endPage = Math.min(totalPages, 3);
  if (currentPage === totalPages) startPage = Math.max(1, totalPages - 2);

  const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex items-center justify-center space-x-1">
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50">First</button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50">Prev</button>
      {startPage > 1 && <span className="p-2 text-sm text-gray-500">...</span>}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded p-2 text-sm ${page === currentPage ? 'font-bold text-blue-600 bg-blue-100' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && <span className="p-2 text-sm text-gray-500">...</span>}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50">Next</button>
      <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className="rounded p-2 text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50">Last</button>
    </div>
  );
};

/**
 * 📋 The "Records per page" selector
 */
const RecordsSelector = ({ currentLimit, onLimitChange }) => (
  <div className="flex items-center space-x-2 text-sm">
    <label htmlFor="records" className="text-gray-500">Records:</label>
    <select
      id="records"
      value={currentLimit}
      onChange={e => onLimitChange(Number(e.target.value))}
      className="block w-full rounded-md border-gray-300 py-1.5 pl-2 pr-8 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
    >
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>
);

// --- Main Table Row Component ---

/**
 * ➡️ A single row in the table
 */
const LeadRow = ({ lead, isSelected, onSelect, visibleColumns }) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [localStatus, setLocalStatus] = useState(lead.status);

  const handleRetry = async () => {
    if (!window.confirm("Are you sure you want to retry all failed jobs for this lead?")) return;
    setIsRetrying(true);
    try {
      await leadApi.retryFailedJob(lead._id);
      setLocalStatus('queued');
    } catch (err) {
      alert("Failed to retry jobs: " + (err.response?.data?.message || err.message));
      setIsRetrying(false);
    }
  };

  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      {/* Checkbox */}
      <td className="w-4 px-6 py-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      
      {/* Dynamic Columns */}
      {visibleColumns.leadId && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          <Link to={`/leads/${lead._id}`} className="font-medium text-blue-600 hover:underline">
            LEAD#{lead.leadId}
          </Link>
        </td>
      )}
      {visibleColumns.name && (
        <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
          {lead.name || 'N/A'}
        </td>
      )}
      {visibleColumns.contact && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          <div>{lead.phone || 'No Phone'}</div>
          <div className="text-xs">{lead.email || 'No Email'}</div>
        </td>
      )}
      {visibleColumns.userType && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.userType}
        </td>
      )}
      {visibleColumns.propertyType && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.propertyType}
        </td>
      )}
      {visibleColumns.budget && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.budget}
        </td>
      )}
      {visibleColumns.bedrooms && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.bedrooms}
        </td>
      )}
      {visibleColumns.source && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.siteName || 'N/A'}
        </td>
      )}
      {visibleColumns.status && (
        <td className="whitespace-nowrap px-4 py-3">
          <StatusBadge status={localStatus} />
        </td>
      )}
      {visibleColumns.utmSource && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {lead.utm?.source}
        </td>
      )}
      {visibleColumns.date && (
        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
          {formatDate(lead.createdAt)}
        </td>
      )}
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

// --- Main LeadTable Component ---

// Define all possible columns
const ALL_COLUMNS = [
  { id: 'leadId', name: 'Lead ID' },
  { id: 'name', name: 'Name' },
  { id: 'contact', name: 'Contact' },
  { id: 'userType', name: 'User Type' },
  { id: 'propertyType', name: 'Property Type' },
  { id: 'budget', name: 'Budget' },
  { id: 'bedrooms', name: 'Bedrooms' },
  { id: 'source', name: 'Source' },
  { id: 'status', name: 'Status' },
  { id: 'utmSource', name: 'UTM Source' },
  { id: 'date', name: 'Date' },
  { id: 'actions', name: 'Actions' },
];

// Set default visible columns
const DEFAULT_VISIBLE = {
  leadId: true,
  name: true,
  contact: true,
  userType: false,
  propertyType: true,
  budget: false,
  bedrooms: true,
  source: true,
  status: true,
  utmSource: false,
  date: true,
  actions: true,
};

/**
 * 🏢 Main Data Grid Component for Leads
 */
const LeadTable = ({ leads, pagination, onPageChange, onLimitChange }) => {
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  // Reset selection when leads data changes
  useEffect(() => {
    setSelectedLeads(new Set());
  }, [leads]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(new Set(leads.map(lead => lead._id)));
    } else {
      setSelectedLeads(new Set());
    }
  };

  const handleSelectRow = (leadId) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const toggleColumn = (colId) => {
    setVisibleColumns(prev => ({ ...prev, [colId]: !prev[colId] }));
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isAllSelected = leads.length > 0 && selectedLeads.size === leads.length;

  return (
    <div className="rounded-lg bg-white shadow-lg overflow-hidden">
      {/* 1. Header (with Settings) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold">Leads</h2>
        </div>
        <div className="relative">
          <button onClick={() => setIsSettingsOpen(prev => !prev)} className="text-gray-400 hover:text-gray-600">
            <span role="img" aria-label="settings" className="text-xl">⚙️</span>
          </button>
          {isSettingsOpen && (
            <ColumnSettings
              allColumns={ALL_COLUMNS}
              visibleColumns={visibleColumns}
              toggleColumn={toggleColumn}
            />
          )}
        </div>
      </div>

      {/* 2. Table (with Horizontal Scroll) */}
      <div className="relative">
        {/* Left Scroll Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 text-gray-600 shadow-md hover:bg-white"
        >
          &lt;
        </button>
        
        {/* Scrollable Container */}
        <div ref={scrollContainerRef} className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                {ALL_COLUMNS.map(col =>
                  visibleColumns[col.id] && (
                    <th key={col.id} scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      {col.name}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {leads.map((lead) => (
                <LeadRow
                  key={lead._id}
                  lead={lead}
                  isSelected={selectedLeads.has(lead._id)}
                  onSelect={() => handleSelectRow(lead._id)}
                  visibleColumns={visibleColumns}
                />
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Right Scroll Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/70 text-gray-600 shadow-md hover:bg-white"
        >
          &gt;
        </button>
      </div>

      {/* 3. Footer (Pagination & Records) */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-200">
        <div className="mb-4 sm:mb-0">
          <CompactPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <div>
          <RecordsSelector
            currentLimit={pagination.limit}
            onLimitChange={onLimitChange}
          />
        </div>
      </div>
      
      {/* 4. Bottom Action Bar */}
      <div className="flex items-center space-x-4 p-4 border-t border-gray-200 bg-gray-50">
        <span className="text-sm font-medium text-gray-700">
          Selected: {selectedLeads.size} / {pagination.totalLeads}
        </span>
        <button disabled={selectedLeads.size === 0} className="rounded border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-100 disabled:opacity-50">Edit</button>
        <button disabled={selectedLeads.size === 0} className="rounded border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-100 disabled:opacity-50">Select Action</button>
      </div>
    </div>
  );
};

export default LeadTable;