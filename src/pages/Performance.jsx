import { useState } from "react";
import Layout from "../components/layout/Layout";
import LineChart from "../components/charts/LineChart";
import { monthlyPerformance, weeklyPerformance, subjectComparison } from "../data/mockData";
import { useProfile } from "../context/ProfileContext";

// Baseline score that the mock "you" series is built around
const BASELINE_MARK = 88;
const TOP_STUDENT_MARK = 95;

const diffColor = (you, ref) => {
  const d = you - ref;
  if (d > 0) return "text-green-600 dark:text-green-400";
  if (d < 0) return "text-red-500 dark:text-red-400";
  return "text-gray-400";
};

const diffLabel = (you, ref) => {
  const d = you - ref;
  if (d > 0) return `+${d}`;
  return `${d}`;
};

const Performance = () => {
  const { profile } = useProfile();
  const [period, setPeriod] = useState("monthly");

  const mark = profile.marks;
  const shift = mark - BASELINE_MARK;
  const latestAvg = period === "monthly"
    ? monthlyPerformance.average[monthlyPerformance.average.length - 1]
    : weeklyPerformance.average[weeklyPerformance.average.length - 1];
  const firstMark = period === "monthly"
    ? monthlyPerformance.you[0]
    : weeklyPerformance.you[0];

  // Override the last "you" data point with the user's actual mark
  const baseData = period === "monthly" ? monthlyPerformance : weeklyPerformance;
  const chartData = {
    ...baseData,
    you: baseData.you.map((v, i) =>
      i === baseData.you.length - 1 ? mark : v
    ),
  };

  // Shift subject "you" scores by the same delta as the overall mark change
  const adjustedSubjects = subjectComparison.map((row) => ({
    ...row,
    you: Math.min(100, Math.max(0, row.you + shift)),
  }));

  // Derived KPI values
  const aboveAvg = mark - latestAvg;
  const gapToTop = mark - TOP_STUDENT_MARK;
  const improvement = mark - firstMark;

  // Strongest & weakest subject
  const sorted = [...adjustedSubjects].sort((a, b) => b.you - a.you);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const kpis = [
    {
      label: "Your Latest Score",
      value: `${mark}%`,
      sub: "Most recent assessment",
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30",
      icon: (
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: aboveAvg >= 0 ? "Above Class Average" : "Below Class Average",
      value: `${aboveAvg >= 0 ? "+" : ""}${aboveAvg}%`,
      sub: `Class average at ${latestAvg}%`,
      color: aboveAvg >= 0 ? "text-green-500" : "text-red-500",
      bg: aboveAvg >= 0
        ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30"
        : "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30",
      icon: (
        <svg className={`w-5 h-5 ${aboveAvg >= 0 ? "text-green-500" : "text-red-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d={aboveAvg >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
        </svg>
      ),
    },
    {
      label: "Gap to Top Student",
      value: `${gapToTop > 0 ? "+" : ""}${gapToTop}%`,
      sub: `Top student at ${TOP_STUDENT_MARK}%`,
      color: gapToTop >= 0 ? "text-green-500" : "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-900/30",
      icon: (
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: `${period === "monthly" ? "6-mo" : "8-wk"} Improvement`,
      value: `${improvement >= 0 ? "+" : ""}${improvement}%`,
      sub: `From ${firstMark}% to ${mark}%`,
      color: improvement >= 0 ? "text-rose-500" : "text-gray-500",
      bg: "bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30",
      icon: (
        <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your progress over time and compare with peers.
          </p>
        </div>
        {/* Period toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
          {["weekly", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all capitalize ${
                period === p
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((k) => (
          <div key={k.label} className={`bg-white dark:bg-gray-900 rounded-2xl border ${k.bg} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{k.label}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${k.bg}`}>{k.icon}</div>
            </div>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Score Over Time</h3>
            <p className="text-xs text-gray-400 mt-0.5">You vs Top Student vs Class Average</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-amber-500 rounded inline-block" />
              <span className="text-gray-500 dark:text-gray-400">You</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-indigo-500 rounded inline-block border-dashed" style={{borderTop:"2px dashed #6366f1", background:"none"}} />
              <span className="text-gray-500 dark:text-gray-400">Top Student</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-emerald-500 rounded inline-block" />
              <span className="text-gray-500 dark:text-gray-400">Average</span>
            </span>
          </div>
        </div>
        <LineChart data={chartData} period={period} />
      </div>

      {/* Subject comparison table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 mb-8">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-5">Subject-wise Comparison</h3>
        <div className="space-y-5">
          {adjustedSubjects.map((row) => (
            <div key={row.subject}>
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{row.subject}</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">Avg <strong className="text-gray-600 dark:text-gray-300">{row.average}%</strong></span>
                  <span className={`font-semibold ${diffColor(row.you, row.average)}`}>
                    You: {row.you}% ({diffLabel(row.you, row.average)} vs avg)
                  </span>
                  <span className={`font-semibold ${diffColor(row.you, row.topStudent)}`}>
                    {diffLabel(row.you, row.topStudent)} vs top
                  </span>
                </div>
              </div>
              {/* 3-bar stacked comparison */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-16">You</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: `${row.you}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 w-8 text-right">{row.you}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-16">Top</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${row.topStudent}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 w-8 text-right">{row.topStudent}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-16">Avg</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${row.average}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 w-8 text-right">{row.average}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Strongest Subject",
            value: strongest.subject,
            detail: `${strongest.you}% — ${strongest.you - strongest.average > 0 ? "+" : ""}${strongest.you - strongest.average}pts vs average`,
            color: "from-amber-500 to-orange-500",
            icon: "🏆",
          },
          {
            title: "Most Improved",
            value: "Marks Trend",
            detail: `${improvement >= 0 ? "+" : ""}${improvement}% over ${period === "monthly" ? "6 months" : "8 weeks"}`,
            color: "from-green-500 to-emerald-500",
            icon: "📈",
          },
          {
            title: "Focus Area",
            value: weakest.subject,
            detail: `${weakest.you}% — ${weakest.topStudent - weakest.you}pts below top`,
            color: "from-indigo-500 to-purple-500",
            icon: "🎯",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white shadow-md`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <p className="text-xs font-medium opacity-80 mb-1">{card.title}</p>
            <p className="text-lg font-bold">{card.value}</p>
            <p className="text-xs opacity-70 mt-1">{card.detail}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Performance;
