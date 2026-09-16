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
