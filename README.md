# ⚖️ Legal Olympiad — Student Dashboard

A full-featured student portal for the **Legal Olympiad** platform. Built with React + Vite + Tailwind CSS, it lets law students track their courses, internships, achievements, and performance analytics — all in one place.

---

## 📸 Pages

| Page | Description |
|---|---|
| **Dashboard** | Overview — stat cards, marks trend chart, overall progress doughnut, skill radar, leaderboard, activity feed, upcoming events |
| **Courses** | All enrolled courses with search, category filter, status filter, smart recommendations, and enroll flow |
| **Internships** | Internship history with search and status filter |
| **Achievements** | Highlight cards + vertical timeline of all achievements + recent activity feed |
| **Performance** | Weekly/monthly score line charts, KPI cards, subject-level comparison table |
| **404** | Custom not-found page with quick navigation links |

---

## ✨ Features

### Smart Course Recommendations
Reads the student's subject scores and automatically surfaces recommended advanced courses for any subject scoring below 80%. Clicking **Enroll Now** instantly adds the course to the Not Started list.

### Auto-Calculated Overall Progress
Overall progress is computed from a weighted formula — no manual input needed:
```
Overall Progress = (avg course completion × 40%) + (latest marks × 45%) + (activity score × 15%)
```

### Dynamic Leaderboard
Leaderboard re-sorts in real time when the student updates their profile points.

### Dark / Light Mode
Full dark mode support across every component, toggled via the navbar button.

### Persistent Profile
Student profile (name, college, marks, rank, etc.) is saved to `localStorage` and restored on every visit.

### Mobile Responsive
- Hamburger menu on mobile opens a slide-in sidebar with backdrop overlay
- Sidebar auto-closes on nav link click or backdrop click
- All layouts adapt from single-column mobile to multi-column desktop

### Search & Filter
- **Courses** — search by name/instructor, filter by status and category
- **Internships** — search by company, role, or skill; filter by status
- Both show an empty state with "Clear filters" when no results match

### Notification Panel
Live notification dropdown on the bell icon — mark individual or all notifications as read.

### Achievements Timeline
Visual vertical timeline with icon nodes, ring halos, and content cards for all achievements.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Chart.js 4](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Bar, Line, Doughnut, Radar charts |

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Routes + providers
├── main.jsx                 # Entry point
├── assets/                  # Static assets
├── components/
│   ├── charts/
│   │   ├── BarChart.jsx     # Monthly marks bar chart
│   │   ├── DoughnutChart.jsx # Overall progress ring
│   │   ├── LineChart.jsx    # Performance trend lines
│   │   └── RadarChart.jsx   # Skill profile radar
│   ├── layout/
│   │   ├── Layout.jsx       # Page shell (sidebar + navbar)
│   │   ├── Navbar.jsx       # Top bar with search, theme, notifications, avatar
│   │   └── Sidebar.jsx      # Navigation sidebar
│   └── ui/
│       ├── Badge.jsx        # Status/type pill badges
│       ├── Card.jsx         # Stat card with trend indicator
│       ├── ProfileSetupModal.jsx # Edit profile modal
│       └── ProgressBar.jsx  # Horizontal progress bar
├── context/
│   ├── ProfileContext.jsx   # Student profile state + localStorage persistence
│   └── ThemeContext.jsx     # Dark/light mode state
├── data/
│   └── mockData.js          # All static data (courses, internships, achievements, etc.)
└── pages/
    ├── Dashboard.jsx
    ├── Courses.jsx
    ├── Internships.jsx
    ├── Achievements.jsx
    ├── Performance.jsx
    └── NotFound.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/legal-dashboard.git
cd legal-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ⚙️ Customisation

All data lives in `src/data/mockData.js`. To customise:

- **Student profile defaults** → `src/context/ProfileContext.jsx` → `DEFAULT_PROFILE`
- **Courses** → `mockData.js` → `courses` array
- **Internships** → `mockData.js` → `internships` array
- **Achievements** → `mockData.js` → `achievements` array
- **Recommended courses** → `mockData.js` → `recommendedCourses` array
- **Recommendation threshold** → `src/pages/Courses.jsx` → `WEAK_THRESHOLD` (default: `80`)

When a real backend/API is ready, only the import sources in each page need to change — components are fully data-agnostic.

---

## 📄 License

MIT
