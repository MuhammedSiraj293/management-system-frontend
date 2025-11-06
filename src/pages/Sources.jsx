import React from "react";
import SourceList from "../components/Sources/SourceList.jsx";
import SourceForm from "../components/Sources/SourceForm.jsx";
import { useSources } from "../hooks/useSources.js";
import Loader from "../components/Common/Loader.jsx";
import Alert from "../components/Common/Alert.jsx";

/**
 * The "Sources" page.
 * This page now passes the 'updateSource' function
 * down to the SourceList component.
 */
const Sources = () => {
  // --- Get all functions from the hook ---
  const { sources, isLoading, error, addSource, updateSource, deleteSource } =
    useSources();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Lead Sources</h1>

      {error && !isLoading && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column for adding a new source */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Add New Source</h2>
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
              <SourceList
                sources={sources}
                onUpdate={updateSource} // --- THIS PROP IS ADDED ---
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
