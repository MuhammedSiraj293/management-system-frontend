import React, { useState } from 'react';
// import { LEAD_SOURCES } from '../../../backend/src/utils/constants.js'; // We can create a shared constant file later

// A simple frontend copy of the constants
const PLATFORMS = [
  { label: 'Elementor', value: 'elementor' },
  { label: 'Meta (Facebook)', value: 'meta' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Snapchat', value: 'snapchat' },
  { label: 'Manual', value: 'manual' },
];

/**
 * A form for adding or editing a lead source.
 * @param {object} props
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @param {object} [props.initialData] - Optional data for editing an existing source.
 */
const SourceForm = ({ onSubmit, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [platform, setPlatform] = useState(initialData?.platform || 'elementor');
  const [sheetId, setSheetId] = useState(initialData?.config?.sheetId || '');
  const [sheetName, setSheetName] = useState(initialData?.config?.sheetName || 'Leads');
  const [bitrixPipelineId, setBitrixPipelineId] = useState(initialData?.config?.bitrixPipelineId || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const sourceData = {
      name,
      platform,
      config: {
        sheetId,
        sheetName,
        bitrixPipelineId,
      },
    };

    try {
      await onSubmit(sourceData);
      setSuccess('Source saved successfully!');
      // Reset form if we're not editing
      if (!initialData) {
        setName('');
        setPlatform('elementor');
        setSheetId('');
        setSheetName('Leads');
        setBitrixPipelineId('');
      }
    } catch (err) {
      setError(err.message || 'Failed to save source.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div>
        <label htmlFor="sourceName" className="block text-sm font-medium text-gray-700">
          Source Name
        </label>
        <input
          type="text"
          id="sourceName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g., Website - Dubai Hills"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-md border border-gray-200 p-3">
        <h3 className="text-sm font-medium text-gray-600">Integration Config (Optional)</h3>
        <div className="mt-2 space-y-3">
          <div>
            <label htmlFor="sheetId" className="block text-xs font-medium text-gray-600">
              Google Sheet ID
            </label>
            <input
              type="text"
              id="sheetId"
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
              placeholder="The long ID from the Sheet URL"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="sheetName" className="block text-xs font-medium text-gray-600">
              Sheet Tab Name
            </label>
            <input
              type="text"
              id="sheetName"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder="e.g., Leads"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="bitrixPipelineId" className="block text-xs font-medium text-gray-600">
              Bitrix Pipeline ID
            </label>
            <input
              type="text"
              id="bitrixPipelineId"
              value={bitrixPipelineId}
              onChange={(e) => setBitrixPipelineId(e.target.value)}
              placeholder="e.g., 4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
      >
        {isLoading ? 'Saving...' : (initialData ? 'Update Source' : 'Add Source')}
      </button>
    </form>
  );
};

// We need to create this
const Alert = ({ type, message }) => {
  const colors = {
    error: 'bg-red-100 border-red-300 text-red-800',
    success: 'bg-green-100 border-green-300 text-green-800',
  };
  return (
    <div className={`w-full rounded border p-3 ${colors[type] || 'bg-gray-100'}`} role="alert">
      {message}
    </div>
  );
};

export default SourceForm;