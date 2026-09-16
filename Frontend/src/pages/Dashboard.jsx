import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import JobTable from '../components/JobTable';
import { 
  Server, 
  Clock, 
  CheckCircle2, 
  Leaf, 
  PlusCircle, 
  ArrowUpRight, 
  Zap,
  TrendingDown
} from 'lucide-react';

export default function Dashboard({ jobs = [], carbonForecast = [] }) {
  const navigate = useNavigate();

  // Compute metrics
  const totalJobs = jobs.length;
  const scheduledOrPending = jobs.filter(j => j.status === 'Scheduled' || j.status === 'Pending' || j.status === 'Running').length;
  const completedJobs = jobs.filter(j => j.status === 'Completed').length;
  const totalCo2Saved = jobs
    .reduce((acc, j) => acc + (j.co2Saved || 0), 0)
    .toFixed(1);

  // Latest intensity for Mumbai at 14:00 (optimal window)
  const currentIntensity = 125; 

  return (
    <div className="page-container">
      {/* Project Banner */}
      <div className="dashboard-hero-banner">
        <div className="hero-content">
          <span className="hero-badge">
            <Leaf size={14} /> Sustainability Driven Cloud Computing
          </span>
          <h1 className="hero-title">
            Carbon-Aware Serverless Workload Scheduler
          </h1>
          <p className="hero-desc">
            Intelligently shifts cloud serverless jobs to low-carbon time slots and regions, 
            significantly reducing indirect greenhouse gas emissions ($CO_2$) without compromising deadlines.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/schedule')}
            >
              <PlusCircle size={18} />
              <span>Schedule New Workload</span>
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/carbon')}
            >
              <TrendingDown size={18} />
              <span>View Carbon Forecast</span>
            </button>
          </div>
        </div>

        <div className="hero-gauge-card">
          <div className="gauge-header">
            <Zap size={16} className="gauge-icon" />
            <span>Current Grid Status (ap-south-1)</span>
          </div>
          <div className="gauge-value">{currentIntensity} <small>gCO₂eq/kWh</small></div>
          <div className="gauge-badge status-low">
            <Leaf size={12} /> Low Carbon Window
          </div>
          <p className="gauge-footer font-mono">
            Best Slot Today: 14:00 - 15:00
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Jobs"
          value={totalJobs}
          icon={Server}
          subtext="Submitted workloads"
          color="blue"
        />
        <StatCard
          title="Pending / Scheduled"
          value={scheduledOrPending}
          icon={Clock}
          subtext="Waiting for optimal slot"
          color="amber"
        />
        <StatCard
          title="Completed Jobs"
          value={completedJobs}
          icon={CheckCircle2}
          subtext="Successfully executed"
          color="green"
        />
        <StatCard
          title="Estimated CO₂ Saved"
          value={`${totalCo2Saved} g`}
          icon={Leaf}
          subtext="Total emissions prevented"
          color="emerald"
        />
      </div>

      {/* Recent Jobs Section */}
      <div className="card dashboard-table-card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Recent Workloads</h2>
            <p className="card-subtitle">Latest submitted and scheduled serverless tasks</p>
          </div>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/jobs')}
          >
            <span>View All Jobs</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="card-body">
          <JobTable jobs={jobs} limit={5} showDetailsButton={true} />
        </div>
      </div>
    </div>
  );
}
