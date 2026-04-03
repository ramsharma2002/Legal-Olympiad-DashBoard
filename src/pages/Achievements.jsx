import Layout from "../components/layout/Layout";
import Badge from "../components/ui/Badge";
import { achievements, dashboardData, activityFeed } from "../data/mockData";

const iconMap = {
  trophy: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  star: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  medal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  mic: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
};

const iconBg = {
  Competition: "bg-amber-100 text-amber-600",
  Award: "bg-rose-100 text-rose-600",
  Academic: "bg-blue-100 text-blue-600",
  Publication: "bg-indigo-100 text-indigo-600",
  Community: "bg-green-100 text-green-600",
  Speaking: "bg-orange-100 text-orange-600",
};

const activityColors = {
  course: "bg-purple-100 text-purple-600",
  competition: "bg-amber-100 text-amber-600",
  webinar: "bg-blue-100 text-blue-600",
  internship: "bg-green-100 text-green-600",
  academic: "bg-rose-100 text-rose-600",
};

const Achievements = () => {
  const highlights = achievements.filter((a) => a.highlight);
  const others = achievements.filter((a) => !a.highlight);

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your milestones, awards, and contributions on the Legal Olympiad platform.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Competitions Entered", value: dashboardData.competitionsEntered, color: "text-amber-600" },
          { label: "Competitions Won", value: dashboardData.competitionsWon, color: "text-rose-600" },
          { label: "Webinars Attended", value: dashboardData.webinarsAttended, color: "text-blue-600" },
          { label: "Total Achievements", value: achievements.length, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Highlights</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {highlights.map((a) => (
            <div
              key={a.id}
              className="relative bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-gray-900 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full -mr-8 -mt-8 opacity-40" />
              <div className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg[a.type] ?? "bg-gray-100 text-gray-500"}` }>
                  {iconMap[a.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-gray-900 dark:text-white">{a.title}</h4>
                    <Badge text={a.type} />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a.description}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-2">{a.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other achievements as vertical timeline */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">All Achievements</h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-0">
            {others.map((a, idx) => (
              <div key={a.id} className="relative flex gap-5 group">
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-gray-100 dark:ring-gray-950 transition-transform group-hover:scale-110 ${iconBg[a.type] ?? "bg-gray-100 text-gray-500"}`}>
                    {iconMap[a.icon]}
                  </div>
                  {idx < others.length - 1 && (
                    <div className="w-px flex-1 bg-transparent mt-1" style={{ minHeight: "1.5rem" }} />
                  )}
                </div>
                {/* Content card */}
                <div className="flex-1 pb-8">
                  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{a.title}</h4>
                        <Badge text={a.type} />
                      </div>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-medium whitespace-nowrap">{a.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity feed */}
      <section>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Activity</h3>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm divide-y divide-gray-50 dark:divide-gray-800">
          {activityFeed.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {/* Timeline dot */}
              <div className="relative flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activityColors[item.type] ?? "bg-gray-100 text-gray-500"}`}>
                  {item.type[0].toUpperCase()}
                </div>
                {idx < activityFeed.length - 1 && (
                  <div className="w-px h-4 bg-gray-100 dark:bg-gray-800 absolute top-full mt-0.5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.action}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;
