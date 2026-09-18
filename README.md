# 🌱 Carbon-Aware Workload Scheduler

A modern web application designed to optimize compute workloads based on grid carbon intensity. By intelligently scheduling tasks during low-carbon intensity windows across different cloud regions, the scheduler helps minimize the carbon footprint of data processing, AI training, and background computing jobs.

---

## ✨ Features

- 📊 **Interactive Dashboard**: Real-time overview of current grid carbon intensity, active scheduled workloads, and CO2 emissions saved.
- 📅 **Smart Workload Scheduling**: Schedule compute jobs with custom execution windows, duration, priority, and region preferences to run when clean energy availability is highest.
- 📈 **Carbon Intensity Forecast**: Visualize hourly carbon intensity trends and forecasts to pick optimal execution windows.
- 📋 **Job Management & History**: View detailed execution logs, status breakdown, and historic carbon savings per workload.
- ⚙️ **Settings & Customization**: Configure default cloud regions, carbon intensity thresholds, notification preferences, and API integrations.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- `npm` (comes bundled with Node.js) or `yarn` / `pnpm`

---

## 🚀 Run Guide (Getting Started)

Follow these steps to get the application up and running locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Carbon-Aware-Scheduler
cd Frontend
```

### 2. Install Dependencies
Install all required package dependencies:
```bash
npm install
```

### 3. Start Development Server
Launch the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
To build the application for production deployment:
```bash
npm run build
```
The optimized production files will be output to the `dist/` directory.

### 5. Preview Production Build
To preview the production build locally before deployment:
```bash
npm run preview
```

### 6. Code Linting
To check for code linting errors using Oxlint:
```bash
npm run lint
```
# Backend – Flask API

The backend is built using **Python and Flask**. It provides REST API endpoints for carbon data, workload management, and carbon-aware scheduling.

## Prerequisites

Make sure the following are installed:

* Python 3.10 or higher
* pip
* Git

Check the installation:

```bash
python --version
pip --version
```

---

## 1. Navigate to Backend

From the project root:

```bash
cd Backend
```

---

## 2. Create a Virtual Environment

Create a Python virtual environment:

```bash
python -m venv venv
```

### Windows – PowerShell

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks the activation, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

### Windows – Command Prompt

```cmd
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

After activation, the terminal should show:

```text
(venv)
```

---

## 3. Install Dependencies

Install all required Python packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

To verify installed packages:

```bash
pip list
```

---

## 4. Configure Environment Variables

If the project uses environment variables or API keys, create a `.env` file inside the `Backend` directory.

Example:

```env
CARBON_API_KEY=your_api_key_here
```

**Do not commit API keys, passwords, or other secrets to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## 5. Run the Flask Server

From the `Backend` directory:

```bash
python app.py
```

The backend should start on:

```text
http://127.0.0.1:5000
```

or:

```text
http://localhost:5000
```

Keep this terminal running while using the frontend.

---

## 6. Test the Backend

Open the backend URL in your browser:

```text
http://localhost:5000
```

You can also test the API endpoints using:

* Browser
* Postman
* Thunder Client
* cURL

Example:

```bash
curl http://localhost:5000
```

For endpoint-specific testing, refer to the route files:

```text
Backend/
└── routes/
    ├── carbon.py
    ├── jobs.py
    └── schedule_routes.py
```

---

## 7. Run Backend Tests

The scheduler test file is:

```text
Backend/test_scheduler.py
```

Run:

```bash
python -m pytest test_scheduler.py
```

If `pytest` is not installed:

```bash
pip install pytest
```

Then run:

```bash
python -m pytest test_scheduler.py
```

---

## 8. Backend Project Structure

```text
Backend/
│
├── app.py                    # Flask application entry point
├── config.py                 # Configuration
├── database.py               # Database connection/operations
├── job_service.py            # Job-related business logic
├── test_scheduler.py         # Scheduler tests
├── requirements.txt          # Python dependencies
│
├── routes/
│   ├── carbon.py             # Carbon API endpoints
│   ├── jobs.py               # Job management endpoints
│   └── schedule_routes.py   # Scheduling endpoints
│
└── services/
    ├── carbon_service.py     # Carbon data integration
    └── scheduler.py          # Carbon-aware scheduling logic
```

---

## 9. Backend Development Workflow

```text
User / React Frontend
        ↓
    Flask API
        ↓
   Route Layer
        ↓
 Service Layer
        ↓
 ┌──────┴─────────┐
 │                │
Carbon Service   Scheduler
 │                │
Carbon Data      Best Time Slot
 │                │
 └──────┬─────────┘
        ↓
    Database
```

---

## 10. Stop the Server

To stop the Flask server:

```text
Ctrl + C
```

To deactivate the virtual environment:

```bash
deactivate
```

---

## Quick Start

For Windows PowerShell:

```powershell
cd Backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Backend will then be available at:

```text
http://localhost:5000
```

## Notes

* Always activate the virtual environment before running the backend.
* Run `pip install -r requirements.txt` after cloning the repository or when dependencies change.
* Keep API keys and other secrets out of Git.
* The React frontend should be run separately from the `Frontend` directory.

---

## 📁 Project Structure

```
Carbon-Aware-Scheduer/
├── README.md
├── .gitignore
├── Backend/                            # Flask Python API Server
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── job_service.py
│   ├── test_scheduler.py
│   ├── requirements.txt
│   ├── routes/                         # API Endpoints
│   │   ├── carbon.py
│   │   ├── jobs.py
│   │   └── schedule_routes.py
│   └── services/                       # Business Logic & External Integrations
│       ├── carbon_service.py
│       └── scheduler.py
└── Frontend/                           # React + Vite Web Application
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── main.jsx
        ├── components/                 # Reusable UI Components
        │   ├── CarbonChart.jsx
        │   ├── Header.jsx
        │   ├── JobTable.jsx
        │   ├── Sidebar.jsx
        │   ├── StatCard.jsx
        │   └── StatusBadge.jsx
        └── pages/                      # Main Page Views
            ├── CarbonForecast.jsx
            ├── Dashboard.jsx
            ├── History.jsx
            ├── JobDetails.jsx
            ├── Jobs.jsx
            ├── ScheduleWorkload.jsx
            └── Settings.jsx

```

---

## 📄 License

This project is created for educational and research purposes as part of a Bachelor of Engineering (B.E.) Capstone Project.
