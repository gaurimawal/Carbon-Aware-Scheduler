import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { 
  ArrowLeft, 
  Clock, 
  Globe, 
  Leaf, 
  Zap, 
  Calendar, 
  CheckCircle2,
  FileText,
  AlertTriangle,
  Cpu
} from 'lucide-react';

export default function JobDetails({ jobs = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="page-container">
        <div className="card text-center padding-xl">
          <AlertTriangle size={48} className="text-amber margin-auto" />
          <h2>Job Not Found</h2>
          <p>No workload job matches ID <strong>{id}</strong>.</p>
          <button className="btn btn-primary margin-top-md" onClick={() => navigate('/jobs')}>
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Define steps for execution timeline
  const timelineSteps = [
    { key: 'submitted', title: 'Submitted', desc: `Job registered at ${job.createdAt}` },
    { key: 'analysis', title: 'Carbon Analysis', desc: 'Evaluated grid intensity forecast across slots & regions' },
    { key: 'selected', title: 'Best Slot Selected', desc: `Slot ${job.selectedTime} (${job.carbonIntensity} gCO₂eq/kWh)` },
    { key: 'waiting', title: 'Waiting', desc: 'Queued for optimal low-carbon execution window' },
    { key: 'executed', title: 'Workload Executed', desc: 'Serverless invocation on cloud provider' },
    { key: 'completed', title: 'Completed', desc: job.completedAt ? `Finished at ${job.completedAt}` : 'Awaiting completion' }
  ];

  // Helper to calculate active step index based on status
  const getActiveStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Scheduled': return 3;
      case 'Running': return 4;
      case 'Completed': return 6;
      case 'Failed': return 2;
      default: return 2;
    }
  };

  const activeStepIdx = getActiveStepIndex(job.status);

  return (
    <div className="page-container">
      {/* Navigation Top */}
      <div className="details-nav-header">
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/jobs')}>
          <ArrowLeft size={16} />
          <span>Back to Jobs</span>
        </button>
        <div className="details-header-status">
          <span className="details-job-id font-mono">{job.id}</span>
          <StatusBadge status={job.status} />
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="job-details-grid">
        {/* Left Column: Properties */}
        <div className="card job-info-card">
          <div className="card-header">
            <div>
              <span className="job-type-badge">{job.type}</span>
              <h1 className="job-title-main">{job.name}</h1>
            </div>
          </div>

          <div className="card-body">
            <div className="details-props-grid">
              <div className="prop-item">
                <span className="prop-label"><Clock size={16} /> Estimated Runtime</span>
                <span className="prop-value">{job.estimatedRuntime} minutes</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Clock size={16} /> Actual Runtime</span>
                <span className="prop-value">
                  {job.actualRuntime ? `${job.actualRuntime} minutes` : 'N/A (Pending)'}
                </span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Calendar size={16} /> Deadline</span>
                <span className="prop-value">{job.deadline}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Clock size={16} /> Scheduled Time</span>
                <span className="prop-value text-green-accent font-medium">{job.selectedTime}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Globe size={16} /> AWS Region</span>
                <span className="prop-value">{job.region}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Leaf size={16} /> Carbon Intensity</span>
                <span className="prop-value">{job.carbonIntensity} gCO₂eq/kWh</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Zap size={16} /> Estimated Energy</span>
                <span className="prop-value">{job.estimatedEnergy || 0.75} kWh</span>
              </div>

              <div className="prop-item">
                <span className="prop-label"><Leaf size={16} /> Estimated CO₂</span>
                <span className="prop-value text-green-accent font-medium">
                  {job.estimatedCO2 || 95.0} gCO₂
                </span>
              </div>

              <div className="prop-item">
                <span className="prop-label">Priority Level</span>
                <span className="prop-value">{job.priority || 'Normal'}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label">Created At</span>
                <span className="prop-value">{job.createdAt}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label">Completed At</span>
                <span className="prop-value">{job.completedAt || 'In progress / Pending'}</span>
              </div>

              <div className="prop-item">
                <span className="prop-label">CO₂ Saved</span>
                <span className="prop-value text-green-accent font-bold">
                  {job.co2Saved ? `${job.co2Saved} gCO₂` : '0 gCO₂'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Timeline */}
        <div className="card timeline-card">
          <div className="card-header">
            <h2 className="card-title">Execution Lifecycle Timeline</h2>
          </div>
          <div className="card-body">
            <div className="timeline-container">
              {timelineSteps.map((step, idx) => {
                const isStepCompleted = idx < activeStepIdx;
                const isStepCurrent = idx + 1 === activeStepIdx;

                return (
                  <div key={step.key} className={`timeline-step ${isStepCompleted ? 'step-completed' : ''} ${isStepCurrent ? 'step-current' : ''}`}>
                    <div className="timeline-icon-box">
                      {isStepCompleted ? (
                        <CheckCircle2 size={18} className="step-icon-done" />
                      ) : (
                        <span className="step-number">{idx + 1}</span>
                      )}
                    </div>
                    <div className="timeline-content">
                      <h4 className="step-title">{step.title}</h4>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                    {idx < timelineSteps.length - 1 && <div className="timeline-connector" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
