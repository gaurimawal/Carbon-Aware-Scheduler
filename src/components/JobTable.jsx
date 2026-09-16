import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { Eye, Clock, Leaf } from 'lucide-react';

export default function JobTable({
  jobs = [],
  limit = null,
  showDetailsButton = true
}) {
  const navigate = useNavigate();

  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;

  if (!displayedJobs || displayedJobs.length === 0) {
    return (
      <div className="empty-table-state">
        <Clock size={32} className="empty-icon" />
        <p>No jobs submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="custom-table">

        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Name</th>
            <th>Type</th>
            <th>Runtime</th>
            <th>Deadline</th>
            <th>Selected Time</th>
            <th>Region</th>
            <th>Carbon Intensity</th>
            <th>Status</th>

            {showDetailsButton && (
              <th className="text-right">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>

          {displayedJobs.map((job) => {

            // Backend uses job_id
            const jobId = job.job_id || job.id;

            return (
              <tr
                key={jobId}
                onClick={() => navigate(`/jobs/${jobId}`)}
                className="table-row-clickable"
              >

                {/* Job ID */}
                <td className="font-mono text-bold">
                  {jobId}
                </td>

                {/* Job Name */}
                <td className="font-medium text-main">
                  {job.name}
                </td>

                {/* Type */}
                <td>
                  <span className="job-type-pill">
                    {job.type}
                  </span>
                </td>

                {/* Runtime */}
                <td>
                  {job.estimated_runtime} min
                </td>

                {/* Deadline */}
                <td>
                  {job.deadline}
                </td>

                {/* Selected Time */}
                <td className="font-medium text-green-accent">
                  {job.selected_time || 'Pending'}
                </td>

                {/* Region */}
                <td className="text-muted">
                  {job.region}
                </td>

                {/* Carbon Intensity */}
                <td>
                  <div className="carbon-intensity-cell">

                    <Leaf
                      size={14}
                      className="leaf-icon"
                    />

                    <span>
                      {job.carbon_intensity}
                      <small> gCO₂/kWh</small>
                    </span>

                  </div>
                </td>

                {/* Status */}
                <td>
                  <StatusBadge status={job.status} />
                </td>

                {/* Actions */}
                {showDetailsButton && (
                  <td
                    className="text-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn btn-ghost btn-sm"
                      title="View Job Details"
                      onClick={() =>
                        navigate(`/jobs/${jobId}`)
                      }
                    >
                      <Eye size={16} />
                      <span>Details</span>
                    </button>
                  </td>
                )}

              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
}