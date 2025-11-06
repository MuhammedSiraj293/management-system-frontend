import React, { useState, useEffect } from 'react';
import SourceForm from './SourceForm.jsx'; // We'll re-use our existing form!

/**
 * A modal (pop-up) component for editing a source.
 * It re-uses the SourceForm component.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.onClose - Function to call when closing the modal.
 * @param {object} props.source - The source object to edit.
 * @param {Function} props.onUpdate - The function to call with the updated data.
 */
const SourceEditModal = ({ isOpen, onClose, source, onUpdate }) => {
  if (!isOpen || !source) {
    return null; // Don't render anything if the modal is closed
  }

  // Wrapper function to handle the update and close the modal
  const handleUpdate = async (sourceData) => {
    // onUpdate is the 'updateSource' function from our useSources hook
    // It expects (sourceId, sourceData)
    await onUpdate(source._id, sourceData);
    onClose(); // Close the modal on success
  };

  return (
    // --- Modal Overlay ---
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* --- Modal Content --- */}
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900" id="modal-title">
            Edit Source: {source.name}
          </h3>
          <button
            type="button"
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={onClose}
          >
            {/* Close Icon (X) */}
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body (re-using the form) */}
        <div className="mt-4">
          <SourceForm
            onSubmit={handleUpdate}
            initialData={source} // Pass the source's current data to the form
          />
        </div>
      </div>
    </div>
  );
};

export default SourceEditModal;