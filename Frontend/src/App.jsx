import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import ScheduleWorkload from './pages/ScheduleWorkload';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import CarbonForecast from './pages/CarbonForecast';
import History from './pages/History';
import Settings from './pages/Settings';

import {
  getJobs,
  getCarbonForecast,
  getCurrentIntensity,
} from './utils/api';

export default function App() {

  const [jobs, setJobs] = useState([]);
  const [carbonForecast, setCarbonForecast] = useState([]);
  const [currentIntensity, setCurrentIntensity] = useState(125);

  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    preferredRegion: "Mumbai (ap-south-1)",
    carbonAware: true,
    allowRegionChange: true,
  });


  // ==========================================
  // LOAD DATA FROM FLASK BACKEND
  // ==========================================

  useEffect(() => {

    async function loadData() {

      try {

        const [jobsData, forecastData, intensityData] =
          await Promise.all([
            getJobs(),
            getCarbonForecast(),
            getCurrentIntensity("Mumbai"),
          ]);

        setJobs(jobsData);
        setCarbonForecast(forecastData);
        setCurrentIntensity(
          intensityData?.carbonIntensity ?? 125
        );

      } catch (error) {

        console.error("Backend connection error:", error);

      } finally {

        setLoading(false);

      }
    }

    loadData();

  }, []);


  // ==========================================
  // ADD NEW JOB
  // ==========================================

  const handleAddJob = (newJob) => {

    setJobs((prevJobs) => [
      newJob,
      ...prevJobs
    ]);

  };


  // ==========================================
  // UPDATE SETTINGS
  // ==========================================

  const handleUpdateSettings = (newSettings) => {

    setSettings((prev) => ({
      ...prev,
      ...newSettings
    }));

  };


  if (loading) {

    return (
      <div className="app-loading">
        <h2>Loading Carbon-Aware Scheduler...</h2>
        <p>Connecting to backend...</p>
      </div>
    );

  }


  return (

    <Router>

      <div className="app-container">

        <Sidebar />

        <div className="main-wrapper">

          <Header
            currentIntensity={currentIntensity}
          />

          <main className="main-content">

            <Routes>

              <Route
                path="/"
                element={
                  <Dashboard
                    jobs={jobs}
                    carbonForecast={carbonForecast}
                  />
                }
              />

              <Route
                path="/schedule"
                element={
                  <ScheduleWorkload
                    onAddJob={handleAddJob}
                    carbonForecast={carbonForecast}
                  />
                }
              />

              <Route
                path="/jobs"
                element={
                  <Jobs jobs={jobs} />
                }
              />

              <Route
                path="/jobs/:id"
                element={
                  <JobDetails jobs={jobs} />
                }
              />

              <Route
                path="/carbon"
                element={
                  <CarbonForecast
                    carbonForecast={carbonForecast}
                  />
                }
              />

              <Route
                path="/history"
                element={
                  <History jobs={jobs} />
                }
              />

              <Route
                path="/settings"
                element={
                  <Settings
                    settings={settings}
                    onUpdateSettings={handleUpdateSettings}
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