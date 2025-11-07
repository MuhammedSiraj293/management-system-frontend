import React from 'react';

/**
 * ⚙️ The dropdown menu for showing/hiding columns
 *
 * @param {object} props
 * @param {Array} props.allColumns - Array of column objects (e.g., [{ id: 'name', name: 'Name' }])
 * @param {object} props.visibleColumns - An object with column IDs as keys and booleans as values
 * @param {Function} props.toggleColumn - Function to call when a checkbox is clicked
 */
const ColumnSettings = ({ allColumns, visibleColumns, toggleColumn }) => {
  return (
    <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <p className="text-sm font-medium text-gray-900">Customize Columns</p>
        <div className="mt-3 space-y-2">
          {allColumns.map((col) => (
            <label
              key={col.id}
              className="flex items-center text-sm text-gray-700"
            >
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
};

export default ColumnSettings;