import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate.js";
import SourceEditModal from "./SourceEditModal.jsx";

/**
 * A component to display a single source item in the list.
 * It now manages the state for the edit modal and shows the full webhook URL.
 *
 * @param {object} props
 * @param {object} props.source - The source object.
 * @param {Function} props.onDelete - Function to call when deleting.
 * @param {Function} props.onUpdate - Function to call when updating.
 */
const SourceItem = ({ source, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // --- ADDED: Get the API URL from environment variables ---
  // VITE_API_BASE_URL is 'https://your-api.onrender.com/api'
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // --- UPDATED: Construct the full URL ---
  const fullWebhookUrl = `${API_BASE_URL}/webhooks/${source.platform}?token=${source.identifierToken}`;

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${source.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(source._id);
    } catch (error) {
      alert(`Error deleting source: ${error.message}`);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <SourceEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        source={source}
        onUpdate={onUpdate}
      />

      <li className="flex flex-col rounded-md border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-150 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                source.platform === "elementor"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {source.platform}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              {source.name}
            </h3>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <strong>Leads:</strong> {source.leadCount || 0}
            </p>
            <p>
              <strong>Sheet ID:</strong> {source.config?.sheetId || "Not Set"}
            </p>
            <p>
              <strong>Added:</strong> {formatDate(source.createdAt)}
            </p>
          </div>

          {/* --- THIS BLOCK IS UPDATED --- */}
          <div className="mt-3 rounded-md bg-gray-50 p-2">
            <label className="block text-xs font-medium text-gray-500 capitalize">
              {source.platform} Webhook URL
            </label>
            <input
              type="text"
              readOnly
              value={fullWebhookUrl} // Use the full URL
              className="mt-1 w-full rounded border-gray-300 bg-gray-100 p-1.5 text-xs text-gray-700 shadow-sm"
              onFocus={(e) => e.target.select()} // Select all on click
            />
          </div>
          {/* --- END UPDATE --- */}
        </div>

        <div className="mt-4 flex shrink-0 space-x-3 sm:mt-0 sm:ml-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </li>
    </>
  );
};

/**
 * Renders the list of configured lead sources.
 * (Passes 'onUpdate' down to each item)
 */
const SourceList = ({ sources, onUpdate, onDelete }) => {
  if (!sources || sources.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No sources configured yet. Add one using the form.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {sources.map((source) => (
        <SourceItem
          key={source._id}
          source={source}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default SourceList;
