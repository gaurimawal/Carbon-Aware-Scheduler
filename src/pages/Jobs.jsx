import React, { useState } from 'react';
import JobTable from '../components/JobTable';
import { Search, Filter, ListTodo } from 'lucide-react';

export default function Jobs({ jobs = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statusOptions = ['All', 'Scheduled', 'Running', 'Completed', 'Pending', 'Failed'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      selectedStatus === 'All' || job.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="page-container">
      <div className="page-header-block">
        <h1 className="page-title">Submitted Workload Jobs</h1>
        <p className="page-description">
          Monitor and review all active, scheduled, completed, and pending serverless workloads.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card jobs-filter-card">
        <div className="jobs-filter-grid">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by Job ID, name, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="status-tabs">
            <Filter size={16} className="filter-label-icon" />
            {statusOptions.map((st) => (
              <button
                key={st}
                className={`tab-btn ${selectedStatus === st ? 'active' : ''}`}
                onClick={() => setSelectedStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jobs Table Container */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <ListTodo size={20} className="text-green-accent" />
            <h2 className="card-title">All Jobs ({filteredJobs.length})</h2>
          </div>
        </div>
        <div className="card-body">
          <JobTable jobs={filteredJobs} showDetailsButton={true} />
        </div>
      </div>
    </div>
  );
}
