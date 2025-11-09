import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLeadDetail } from "../hooks/useLeadDetail.js";
import Loader from "../components/Common/Loader.jsx";
import Alert from "../components/Common/Alert.jsx";
import { formatDate } from "../utils/formatDate.js";
import { leadApi } from "../api/leadApi.js";

// --- (Helper component DetailItem is unchanged) ---
const DetailItem = ({ label, value }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      {value || <span className="italic text-gray-400">N/A</span>}
    </dd>
  </div>
);
// utils/statusColors.js
export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'SUCCESS':
      return 'bg-green-100 text-green-800';
    case 'FAILED':
      return 'bg-red-100 text-red-800';
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800';
    case 'QUEUED':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// --- (Helper component JobHistory is unchanged) ---
const JobHistory = ({ jobs }) => (
  <ul className="divide-y divide-gray-200">
    {jobs.map((job) => (
      <li key={job._id} className="py-3">
        <p className="text-sm font-medium text-gray-900">{job.type}</p>
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span
            className={`font-medium ${
              job.status === "COMPLETED"
                ? "text-green-600"
                : job.status === "FAILED"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {job.status}
          </span>
        </p>
        <p className="text-sm text-gray-500">Attempts: {job.attempts}</p>
        <p className="text-sm text-gray-500">
          Last Run: {formatDate(job.runAt)}
        </p>
        {job.lastError && (
          <p className="mt-1 rounded bg-red-50 p-2 text-xs text-red-700">
            <strong>Error:</strong> {job.lastError}
          </p>
        )}
      </li>
    ))}
  </ul>
);


// --- (Helper component RawPayload is unchanged) ---
const RawPayload = ({ payload }) => (
  <pre className="mt-1 w-full overflow-auto rounded-md bg-gray-800 p-4 text-sm text-gray-200">
    {JSON.stringify(payload, null, 2)}
  </pre>
);

/**
 * The Lead Detail page.
 */
const LeadDetail = () => {
  const { leadId } = useParams();
  const { lead, jobs, errors, isLoading, error, refresh } =
    useLeadDetail(leadId);
  const [isRetrying, setIsRetrying] = useState(false);

  // --- (handleRetry function is unchanged) ---
  const handleRetry = async () => {
    if (
      !window.confirm(
        "Are you sure you want to retry all failed jobs for this lead?"
      )
    ) {
      return;
    }
    setIsRetrying(true);
    try {
      await leadApi.retryFailedJob(leadId);
      refresh(); // Refresh all the data on the page
    } catch (err) {
      alert("Failed to retry jobs: " + err.message);
    } finally {
      setIsRetrying(false);
    }
  };

  if (isLoading) {
    return <Loader text="Loading lead details..." />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (!lead) {
    return <Alert type="warning" message="Lead not found." />;
  }

  return (
    <div>
      {/* --- Header (Updated to show new leadId) --- */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            to="/leads"
            className="mb-2 text-sm text-blue-600 hover:underline"
          >
            &larr; Back to All Leads
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">
            {lead.name || "Lead"}
            {/* --- THIS IS THE UPDATE --- */}
            <span className="ml-3 text-2xl font-medium text-gray-500">
              (LEAD#{lead.leadId})
            </span>
            {/* --- END UPDATE --- */}
          </h1>
          <p className="text-gray-500">Internal ID: {lead._id}</p>
        </div>
        <button
          onClick={handleRetry}
          disabled={isRetrying || lead.status !== "failed"}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isRetrying ? "Retrying..." : "Retry Failed Jobs"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* --- Main Details (Left Column) --- */}
        <div className="rounded-lg bg-white shadow-md lg:col-span-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Lead Information
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="divide-y divide-gray-200">
              <DetailItem label="Name" value={lead.name} />
              <DetailItem label="Phone" value={lead.phone} />
              <DetailItem label="Email" value={lead.email} />
              <DetailItem
                label="Status"
                value={
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status?.toUpperCase()}
                  </span>
                }
              />

              {/* --- NEW FIELDS ADDED --- */}
              <DetailItem label="User Type" value={lead.userType} />
              <DetailItem label="Property Type" value={lead.propertyType} />
              <DetailItem label="Budget" value={lead.budget} />
              <DetailItem label="Bedrooms" value={lead.bedrooms} />
              {/* --- END NEW FIELDS --- */}

              <DetailItem label="Source" value={lead.sourceId?.name} />
              <DetailItem label="Platform" value={lead.source} />
              <DetailItem label="Form Name" value={lead.formName} />
              <DetailItem label="Campaign" value={lead.campaignName} />
              <DetailItem
                label="Received (UAE)"
                value={formatDate(lead.timestampUae)}
              />
            </dl>
          </div>
        </div>

        {/* --- Jobs & Payload (Right Column) --- */}
        <div className="space-y-6">
          <div className="rounded-lg bg-white shadow-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Job History
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              {jobs.length > 0 ? (
                <JobHistory jobs={jobs} />
              ) : (
                <p className="text-sm text-gray-500">No jobs found.</p>
              )}
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Raw Payload
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <RawPayload payload={lead.payload} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
