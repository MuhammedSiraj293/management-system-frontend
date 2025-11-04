import React from 'react';

// We will create this component later
// import IntegrationSettings from '../components/Settings/IntegrationForm.jsx';

/**
 * The "Settings" page.
 * This page will be for global application settings,
 * such as:
 * 1. Changing the admin password.
 * 2. Setting up global integration credentials (like a
 * default Bitrix webhook URL or Google Sheet).
 * 3. Toggling application-wide features.
 */
const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
        
        <p className="text-gray-600 mb-6">
          (This is a placeholder. A form for changing passwords or
          setting global API keys will go here.)
        </p>

        {/* <IntegrationSettings /> */}

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Change Password</h3>
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled
              className="px-4 py-2 font-medium text-white bg-blue-400 rounded-md cursor-not-allowed"
            >
              Save Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;