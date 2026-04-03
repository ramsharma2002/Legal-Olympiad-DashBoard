import { useState } from "react";
import Layout from "../components/layout/Layout";
import { internships } from "../data/mockData";
import Badge from "../components/ui/Badge";

const completedCount = internships.filter((i) => i.status === "Completed").length;
const ongoingCount = internships.filter((i) => i.status === "Ongoing").length;

const Internships = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = internships.filter((i) => {
    const matchSearch =
      i.company.toLowerCase().includes(search.toLowerCase()) ||
      i.role.toLowerCase().includes(search.toLowerCase()) ||
      i.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === "All" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Internships</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          A record of your legal internship experience and achievements.
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{internships.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Completed</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-blue-600">{ongoingCount}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ongoing</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by company, role, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Completed", "Ongoing"].map((s) => (
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
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-base font-semibold text-gray-700 dark:text-gray-300">No internships found</h4>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
          <button
            onClick={() => { setSearch(""); setFilterStatus("All"); }}
            className="mt-4 px-4 py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition"
          >Clear filters</button>
        </div>
      ) : (
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-gray-900 rounded-2xl border shadow-sm p-6 hover:shadow-md transition-shadow ${
              item.status === "Ongoing"
                ? "border-blue-200 dark:border-blue-900/50"
                : "border-gray-100 dark:border-gray-800"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{item.company}</h3>
                  <Badge text={item.status} />
                  {item.certificate && (
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Certificate
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.role}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.description}</p>
              </div>

              {/* Right */}
              <div className="md:text-right flex-shrink-0">
                <div className="flex md:flex-col gap-3 md:gap-1 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {item.skills.map((skill) => (
                <span key={skill} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      )}
    </Layout>
  );
};

export default Internships;