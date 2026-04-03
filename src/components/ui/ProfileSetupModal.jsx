import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { DEFAULT_PROFILE } from "../../context/ProfileContext";

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
const PROGRAM_OPTIONS = ["B.A. LLB", "B.B.A. LLB", "B.Com. LLB", "LLB", "LLM", "Ph.D.", "Other"];

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition";

const errorInputCls =
  "w-full px-3 py-2 rounded-lg border border-red-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400 transition";

const Field = ({ label, hint, error, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
      {label}
      {hint && <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">{hint}</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const ProfileSetupModal = ({ open, onSave, onClose, initialData }) => {
  useTheme(); // ensure dark mode class is active
  const [form, setForm] = useState({ ...initialData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({ ...initialData });
      setErrors({});
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setNum = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value === "" ? "" : Number(e.target.value) }));

  const handleSave = () => {
    const errs = {};
    if (!form.name || !String(form.name).trim()) errs.name = "Name is required";
    if (!form.college || !String(form.college).trim()) errs.college = "College is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSave({
      ...form,
      name: String(form.name).trim(),
      college: String(form.college).trim(),
      marks: Math.min(100, Math.max(0, Number(form.marks) || 0)),
      studentRank: Math.max(1, Number(form.studentRank) || 1),
      totalStudents: Math.max(1, Number(form.totalStudents) || 1),
      collegeRank: Math.max(1, Number(form.collegeRank) || 1),
      totalColleges: Math.max(1, Number(form.totalColleges) || 1),
      competitionsWon: Math.max(0, Number(form.competitionsWon) || 0),
      webinarsAttended: Math.max(0, Number(form.webinarsAttended) || 0),
      points: Math.max(0, Number(form.points) || 0),
      internships: Math.max(0, Number(form.internships) || 0),
      courses: Math.max(0, Number(form.courses) || 0),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Profile</h2>
            <p className="text-xs text-gray-400 mt-0.5">Enter your details to personalise the dashboard</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-7">

          {/* Personal Info */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-1.5">
              <span>👤</span> Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name *" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Ram Sharma"
                  className={errors.name ? errorInputCls : inputCls}
                />
              </Field>
              <Field label="University / College *" error={errors.college}>
                <input
                  type="text"
                  value={form.college}
                  onChange={set("college")}
                  placeholder="e.g. NLSIU Bangalore"
                  className={errors.college ? errorInputCls : inputCls}
                />
              </Field>
              <Field label="Year of Study">
                <select value={form.year} onChange={set("year")} className={inputCls}>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </Field>
              <Field label="Program">
                <select value={form.program} onChange={set("program")} className={inputCls}>
                  {PROGRAM_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </Field>
              <Field label="Email" hint="(optional)">
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@college.ac.in"
                  className={inputCls}
                />
              </Field>
            </div>
          </section>

          {/* Academic Stats */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-1.5">
              <span>📊</span> Academic Stats
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Latest Score" hint="(%)">
                <input type="number" min={0} max={100} value={form.marks} onChange={setNum("marks")} className={inputCls} />
              </Field>
              <Field label="National Rank">
                <input type="number" min={1} value={form.studentRank} onChange={setNum("studentRank")} className={inputCls} />
              </Field>
              <Field label="Total Students" hint="in competition">
                <input type="number" min={1} value={form.totalStudents} onChange={setNum("totalStudents")} className={inputCls} />
              </Field>
              <Field label="College Rank">
                <input type="number" min={1} value={form.collegeRank} onChange={setNum("collegeRank")} className={inputCls} />
              </Field>
              <Field label="Total Colleges">
                <input type="number" min={1} value={form.totalColleges} onChange={setNum("totalColleges")} className={inputCls} />
              </Field>
              <Field label="Total Points">
                <input type="number" min={0} value={form.points} onChange={setNum("points")} className={inputCls} />
              </Field>
            </div>
          </section>

          {/* Activities */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3 flex items-center gap-1.5">
              <span>🏆</span> Activities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Internships Completed">
                <input type="number" min={0} value={form.internships} onChange={setNum("internships")} className={inputCls} />
              </Field>
              <Field label="Courses Enrolled">
                <input type="number" min={0} value={form.courses} onChange={setNum("courses")} className={inputCls} />
              </Field>
              <Field label="Competitions Won">
                <input type="number" min={0} value={form.competitionsWon} onChange={setNum("competitionsWon")} className={inputCls} />
              </Field>
              <Field label="Webinars Attended">
                <input type="number" min={0} value={form.webinarsAttended} onChange={setNum("webinarsAttended")} className={inputCls} />
              </Field>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={() => setForm({ ...DEFAULT_PROFILE })}
            className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
          >
            Reset to defaults
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition shadow-sm"
          >
            Save Profile
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
