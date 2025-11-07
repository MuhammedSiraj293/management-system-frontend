import React, { useState, useRef, useEffect } from 'react';
import ColumnSettings from './ColumnSettings.jsx';
import TableFooter from './TableFooter.jsx';
import LeadRow from './LeadRow.jsx';

// --- Define all possible columns ---
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

// --- Set default visible columns ---
// (You can change these defaults)
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
 * This component now assembles all the smaller pieces.
 *
 * @param {object} props
 * @param {Array} props.leads - The array of leads.
 * @param {object} props.pagination - The pagination object from useLeads.
 * @param {Function} props.onPageChange - Handler for changing pages.
 * @param {Function} props.onLimitChange - Handler for changing records per page.
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
      setSelectedLeads(new Set(leads.map((lead) => lead._id)));
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
    setVisibleColumns((prev) => ({ ...prev, [colId]: !prev[colId] }));
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
      {/* 1. Header (with Settings ⚙️) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold">Leads</h2>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Customize Columns"
          >
            <span role="img" aria-label="settings" className="text-xl">
              ⚙️
            </span>
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

      {/* 2. Table (with Horizontal Scroll < >) */}
      <div className="relative">
        {/* Left Scroll Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-600 shadow-md hover:bg-white"
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
                {ALL_COLUMNS.map(
                  (col) =>
                    visibleColumns[col.id] && (
                      <th
                        key={col.id}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
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
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-gray-600 shadow-md hover:bg-white"
        >
          &gt;
        </button>
      </div>

      {/* 3. Footer (Pagination & Records) */}
      <TableFooter
        pagination={pagination}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />

      {/* 4. Bottom Action Bar */}
      <div className="flex items-center space-x-4 p-4 border-t border-gray-200 bg-gray-50">
        <span className="text-sm font-medium text-gray-700">
          Selected: {selectedLeads.size} / {pagination.totalLeads}
        </span>
        <button
          disabled={selectedLeads.size === 0}
          className="rounded border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-100 disabled:opacity-50"
        >
          Edit
        </button>
        <button
          disabled={selectedLeads.size === 0}
          className="rounded border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-100 disabled:opacity-50"
        >
          Select Action
        </button>
      </div>
    </div>
  );
};

export default LeadTable;