import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import ScheduleWorkload from './pages/ScheduleWorkload';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import CarbonForecast from './pages/CarbonForecast';
import History from './pages/History';
import Settings from './pages/Settings';

// Mock Data
import { 
  INITIAL_JOBS, 
  INITIAL_CARBON_FORECAST, 
  INITIAL_SETTINGS 
} from './data/mockData';

export default function App() {
  // Global State for Workload Jobs, Forecast, and Preferences
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [carbonForecast, setCarbonForecast] = useState(INITIAL_CARBON_FORECAST);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  // Add a newly scheduled job to state
  const handleAddJob = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  // Update application settings
  const handleUpdateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Reset state to initial mock data
  const handleResetData = () => {
    setJobs(INITIAL_JOBS);
    setCarbonForecast(INITIAL_CARBON_FORECAST);
    setSettings(INITIAL_SETTINGS);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Fixed Sidebar Navigation */}
        <Sidebar />

        {/* Main Wrapper (Header + Content) */}
        <div className="main-wrapper">
          <Header currentIntensity={125} />

          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard jobs={jobs} carbonForecast={carbonForecast} />} 
              />
              <Route 
                path="/schedule" 
                element={<ScheduleWorkload onAddJob={handleAddJob} carbonForecast={carbonForecast} />} 
              />
              <Route 
                path="/jobs" 
                element={<Jobs jobs={jobs} />} 
              />
              <Route 
                path="/jobs/:id" 
                element={<JobDetails jobs={jobs} />} 
              />
              <Route 
                path="/carbon" 
                element={<CarbonForecast carbonForecast={carbonForecast} />} 
              />
              <Route 
                path="/history" 
                element={<History jobs={jobs} />} 
              />
              <Route 
                path="/settings" 
                element={
                  <Settings 
                    settings={settings} 
                    onUpdateSettings={handleUpdateSettings} 
                    onResetData={handleResetData} 
                  />
                } 
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
