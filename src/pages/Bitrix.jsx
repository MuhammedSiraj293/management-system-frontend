import React from 'react';

/**
 * The "Bitrix" page.
 * This page will be used to:
 * 1. Show the status of the Bitrix integration (e.g., "Connected").
 * 2. Display any recent Bitrix-related errors from our ErrorLog.
 * 3. (Optional) Provide a "Test Connection" button.
 * 4. (Optional) Manually push a failed lead to Bitrix.
 */
const Bitrix = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Bitrix CRM Integration
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Integration Status</h2>

        <div className="flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            {/* We can make this dynamic later */}
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-lg font-medium text-gray-700">
            Connected
          </span>
        </div>

        <p className="text-gray-600 mt-4 mb-6">
          (This is a placeholder. We will add logic to show recent
          Bitrix errors or a button to test the connection.)
        </p>

        <button
          type="button"
          disabled
          className="px-4 py-2 font-medium text-white bg-blue-400 rounded-md cursor-not-allowed"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
};

export default Bitrix;