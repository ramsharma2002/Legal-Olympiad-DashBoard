import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import RadarChart from "../components/charts/RadarChart";
import Badge from "../components/ui/Badge";
import { skillBreakdown, activityFeed, leaderboard, upcomingEvents, radarSkills, courses } from "../data/mockData";
import { useProfile } from "../context/ProfileContext";

const eventColorMap = {
  amber: "#f59e0b",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  green: "#10b981",
};

const activityColors = {
  course: "bg-purple-100 text-purple-600",
  competition: "bg-amber-100 text-amber-600",
  webinar: "bg-blue-100 text-blue-600",
  internship: "bg-green-100 text-green-600",
  academic: "bg-rose-100 text-rose-600",
};

const Dashboard = () => {
  const { profile } = useProfile();

  // Build a live leaderboard — inject profile data into the user's own row,
  // then re-sort by points and re-assign ranks so position reflects real standing
  const dynamicLeaderboard = leaderboard
    .map((row) =>
      row.isSelf
        ? { ...row, name: profile.name, college: profile.college, points: profile.points }
        : row
    )
    .sort((a, b) => b.points - a.points)
    .map((row, i) => ({ ...row, rank: i + 1 }));

  const selfRow = dynamicLeaderboard.find((r) => r.isSelf);

  // Auto-calculate Overall Progress:
  //   40% course completion avg + 45% academic marks + 15% activity score
  const avgCourseProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );
  const activityScore = Math.min(
    100,
    profile.internships * 6 + profile.competitionsWon * 10 + profile.webinarsAttended * 2.5
  );
  const computedProgress = Math.round(
    avgCourseProgress * 0.40 + profile.marks * 0.45 + activityScore * 0.15
  );

  // Shift radar "you" scores proportionally to current profile marks
  // baseline latest mark is 88 (last entry in monthlyMarks)
  const radarShift = profile.marks - 88;
  const youRadarScores = radarSkills.you.map((v) => Math.min(100, Math.max(50, v + radarShift)));

  const statCards = [
    {
      title: "Internships",
      value: profile.internships,
      subtitle: "All certified",
      accent: "blue",
      trend: 2,
      trendLabel: "2 this year",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Courses",
      value: profile.courses,
      subtitle: "2 completed",
      accent: "purple",
      trend: 3,
      trendLabel: "3 enrolled",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Marks",
      value: `${profile.marks}%`,
      subtitle: "Last assessment",
      accent: "amber",
      trend: 5,
      trendLabel: "+5% from last month",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Student Rank",
      value: `#${profile.studentRank}`,
      subtitle: `of ${profile.totalStudents} students`,
      accent: "green",
      trend: 3,
      trendLabel: "Moved up 3 spots",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "College Rank",
      value: `#${profile.collegeRank}`,
      subtitle: `of ${profile.totalColleges} colleges`,
      accent: "rose",
      trend: 1,
      trendLabel: "Up 1 this week",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Total Points",
      value: profile.points.toLocaleString(),
      subtitle: "Across all activities",
      accent: "indigo",
      trend: 0,
      trendLabel: "Top 5% nationally",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      {/* Welcome banner */}
      <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-950 dark:to-gray-800 text-white rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-amber-400 text-sm font-medium mb-1">Welcome back,</p>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-300 text-sm mt-1">{profile.college} — {profile.year} {profile.program}</p>
        </div>
        <div className="hidden md:flex gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-amber-400">{profile.competitionsWon}</p>
            <p className="text-xs text-gray-300">Competitions Won</p>
          </div>
          <div className="w-px bg-gray-600" />
          <div>
            <p className="text-2xl font-bold text-amber-400">{profile.webinarsAttended}</p>
            <p className="text-xs text-gray-300">Webinars</p>
          </div>
          <div className="w-px bg-gray-600" />
          <div>
            <p className="text-2xl font-bold text-amber-400">{profile.points.toLocaleString()}</p>
            <p className="text-xs text-gray-300">Points</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((c) => (
          <Card key={c.title} {...c} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Marks Trend</h3>
              <p className="text-xs text-gray-400">Monthly assessment scores</p>
            </div>
            <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 px-2.5 py-1 rounded-full font-medium">
              Last 6 months
            </span>
          </div>
          <BarChart key={`bar-${profile.marks}`} latestMark={profile.marks} />
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Overall Progress</h3>
              <p className="text-xs text-gray-400">Across all platform activities</p>
            </div>
          </div>
          <DoughnutChart key={`doughnut-${computedProgress}`} progress={computedProgress} />
        </div>
      </div>

      {/* Skill Breakdown + Leaderboard */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Skill Radar */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Skill Profile</h3>
            <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-full">You vs Average</span>
          </div>
          <RadarChart
            key={`radar-${profile.marks}`}
            you={youRadarScores}
            average={radarSkills.average}
            labels={radarSkills.labels}
          />
        </div>

        {/* Leaderboard preview */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Leaderboard</h3>
            <span className="text-xs text-gray-400">National Rankings</span>
          </div>
          <div className="space-y-2">
            {dynamicLeaderboard.slice(0, 5).map((row) => (
              <div
                key={row.name}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl ${
                  row.isSelf
                    ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span className={`w-6 text-xs font-bold ${
                  row.rank <= 3 ? "text-amber-500" : "text-gray-400 dark:text-gray-500"
                }`}>
                  #{row.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${row.isSelf ? "text-amber-700 dark:text-amber-400" : "text-gray-800 dark:text-gray-200"}`}>
                    {row.name} {row.isSelf && <span className="text-xs">(You)</span>}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{row.college}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{row.points.toLocaleString()}</span>
              </div>
            ))}
            {/* Self row if not in top 5 */}
            {selfRow && selfRow.rank > 5 && (
              <>
                <div className="text-center text-gray-300 dark:text-gray-600 text-xs py-1">• • •</div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30">
                  <span className="w-6 text-xs font-bold text-amber-500">#{selfRow.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-amber-700 dark:text-amber-400">{selfRow.name} <span className="text-xs">(You)</span></p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{selfRow.college}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selfRow.points.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Events + Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Upcoming Events</h3>
            <span className="text-xs text-gray-400">{upcomingEvents.length} events</span>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: eventColorMap[ev.color] || ev.color }}>
                  <span className="text-xs font-bold leading-tight">{ev.day}</span>
                  <span className="text-[10px] uppercase leading-tight opacity-80">{ev.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{ev.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{ev.location}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 capitalize">
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${activityColors[item.type] ?? "bg-gray-100 text-gray-500"}`}>
                  {item.type[0].toUpperCase()}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.action}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;