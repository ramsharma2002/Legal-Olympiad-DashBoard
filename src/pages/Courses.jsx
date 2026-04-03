import { useState } from "react";
import Layout from "../components/layout/Layout";
import { courses, subjectComparison, recommendedCourses } from "../data/mockData";
import ProgressBar from "../components/ui/ProgressBar";
import Badge from "../components/ui/Badge";

const categoryColors = {
  "Core Law": "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30",
  "Emerging Law": "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30",
  "Procedural Law": "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30",
  "Corporate Law": "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900/30",
  "International Law": "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30",
  "Specialized Law": "bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30",
  "Practical Skills": "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
};

const categoryColorKey = {
  "Core Law": "blue",
  "Emerging Law": "purple",
  "Corporate Law": "teal",
  "Procedural Law": "orange",
  "International Law": "rose",
  "Specialized Law": "green",
  "Practical Skills": "gray",
};

// Build smart recommendations: subjects scoring below 80, sorted lowest first
const WEAK_THRESHOLD = 80;
const allRecommendations = subjectComparison
  .filter((s) => s.you < WEAK_THRESHOLD)
  .sort((a, b) => a.you - b.you)
  .slice(0, 3)
  .map((s) => {
    const course = recommendedCourses.find((r) => r.forSubject === s.subject);
    return course ? { ...course, subjectScore: s.you, gap: s.topStudent - s.you } : null;
  })
  .filter(Boolean);

const Courses = () => {
  const [allCourses, setAllCourses] = useState(courses);
  const [enrolledRecIds, setEnrolledRecIds] = useState(() => new Set());
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const allCategories = ["All", ...Object.keys(categoryColors)];
  const allStatuses = ["All", "Completed", "In Progress", "Not Started"];

  const filtered = allCourses.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    const matchCat = filterCategory === "All" || c.category === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const completedCourses = allCourses.filter((c) => c.status === "Completed");
  const inProgressCourses = allCourses.filter((c) => c.status === "In Progress");
  const notStartedCourses = allCourses.filter((c) => c.status === "Not Started");
  const avgScore = Math.round(
    completedCourses.reduce((sum, c) => sum + (c.score ?? 0), 0) / (completedCourses.length || 1)
  );

  const filteredCompleted = filtered.filter((c) => c.status === "Completed");
  const filteredInProgress = filtered.filter((c) => c.status === "In Progress");
  const filteredNotStarted = filtered.filter((c) => c.status === "Not Started");
  const isFiltering = search || filterStatus !== "All" || filterCategory !== "All";

  const visibleRecs = allRecommendations.filter((r) => !enrolledRecIds.has(r.id));

  const handleEnroll = (rec) => {
    setEnrolledRecIds((prev) => new Set([...prev, rec.id]));
    setAllCourses((prev) => [
      ...prev,
      {
        id: rec.id,
        name: rec.name,
        category: rec.category,
        instructor: rec.instructor,
        progress: 0,
        duration: rec.duration,
        status: "Not Started",
        score: null,
        color: categoryColorKey[rec.category] ?? "blue",
      },
    ]);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your legal learning journey across all enrolled courses.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Enrolled", value: allCourses.length, color: "text-gray-900 dark:text-white" },
          { label: "Completed", value: completedCourses.length, color: "text-green-600" },
          { label: "In Progress", value: inProgressCourses.length, color: "text-amber-600" },
          { label: "Avg Score", value: `${avgScore}%`, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by course name or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                filterStatus === s
                  ? "bg-amber-500 text-white border-amber-500"
                  : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-amber-400"
              }`}
            >{s}</button>
          ))}
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
        >
          {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Smart Recommendations — hide when actively filtering */}
      {!isFiltering && visibleRecs.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Recommended for You</h3>
              <p className="text-xs text-gray-400">Based on your subject scores — boost your weakest areas</p>
            </div>
          </div>
          <div className={`grid gap-4 ${
            visibleRecs.length === 1 ? "md:grid-cols-1 max-w-sm" :
            visibleRecs.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
          }`}>
            {visibleRecs.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} onEnroll={handleEnroll} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {filteredCompleted.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Completed</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredCompleted.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* In Progress */}
      {filteredInProgress.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">In Progress</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredInProgress.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Not Started */}
      {filteredNotStarted.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Not Started</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {filteredNotStarted.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {isFiltering && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300">No courses found</h4>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          <button
            onClick={() => { setSearch(""); setFilterStatus("All"); setFilterCategory("All"); }}
            className="mt-4 px-4 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition"
          >Clear filters</button>
        </div>
      )}
    </Layout>
  );
};

const scoreColor = (score) => {
  if (score < 70) return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30";
  if (score < 80) return "text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/30";
  return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/30";
};

const RecommendationCard = ({ rec, onEnroll }) => (
  <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
    {/* Decorative glow */}
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200/30 dark:bg-amber-700/10 rounded-full blur-2xl pointer-events-none" />

    {/* Weak subject pill */}
    <div className="flex items-center gap-2 mb-3">
      <span className={`inline-flex items-center gap-1 text-xs font-medium border px-2.5 py-1 rounded-full ${scoreColor(rec.subjectScore)}`}>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
        {rec.forSubject} &bull; {rec.subjectScore}%
      </span>
    </div>

    {/* Arrow connector */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">Recommended Course</span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
    </div>

    {/* Course info */}
    <div className="mb-4">
      <div className="flex items-start gap-2 mb-1">
        <span className="mt-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-900/40 rounded px-1.5 py-0.5 whitespace-nowrap">{rec.level}</span>
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">{rec.name}</h4>
      </div>
      <p className="text-xs text-gray-400 mt-1">{rec.instructor} &bull; {rec.duration} &bull; {rec.category}</p>
    </div>

    {/* Gap callout */}
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
      You&rsquo;re <span className="font-semibold text-orange-500">{rec.gap} pts</span> behind the top performer in this subject.
    </p>

    {/* Enroll CTA */}
    <button
      type="button"
      onClick={() => onEnroll(rec)}
      className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 rounded-xl py-2.5 transition-colors shadow-sm"
    >
      Enroll Now
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
);

const CourseCard = ({ course }) => {
  const catStyle = categoryColors[course.category] ?? "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow ${
      course.status === "Completed" ? "border-green-100 dark:border-green-900/30" :
      course.status === "Not Started" ? "border-gray-100 dark:border-gray-800 opacity-70" : "border-gray-100 dark:border-gray-800"
    }`}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{course.name}</h4>
          <p className="text-xs text-gray-400 mt-0.5">{course.instructor}</p>
        </div>
        <Badge text={course.status} />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${catStyle}`}>
          {course.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {course.duration}
        </span>
        {course.score && (
          <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 px-2 py-0.5 rounded-full">
            Score: {course.score}%
          </span>
        )}
      </div>

      {/* Progress */}
      <ProgressBar value={course.progress} color={course.color} showPercent={true} />
    </div>
  );
};

export default Courses;