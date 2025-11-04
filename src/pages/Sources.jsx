import React from 'react';
import SourceList from '../components/Sources/SourceList.jsx'; // We'll create this next
import SourceForm from '../components/Sources/SourceForm.jsx'; // And this one
import { useSources } from '../hooks/useSources.js';
import Loader from '../components/Common/Loader.jsx';
import Alert from '../components/Common/Alert.jsx';

/**
 * The "Sources" page.
 * This page now uses the useSources hook to manage state
 * and passes data/handlers to its child components.
 */
const Sources = () => {
  // --- Use the hook to get data and handlers ---
  const { sources, isLoading, error, addSource, updateSource, deleteSource } =
    useSources();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Lead Sources</h1>

      {/* Show a global error message for the page */}
      {error && !isLoading && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column for adding a new source */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Add New Source</h2>
            {/* We will create this form component next */}
            <SourceForm onSubmit={addSource} />
          </div>
        </div>

        {/* Column for listing existing sources */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Configured Sources</h2>
            {isLoading ? (
              <Loader text="Loading sources..." />
            ) : (
              /* We will create this list component next */
              <SourceList
                sources={sources}
                onUpdate={updateSource}
                onDelete={deleteSource}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sources;