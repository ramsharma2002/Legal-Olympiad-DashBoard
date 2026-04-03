import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useProfile, getInitials } from "../../context/ProfileContext";
import { notifications as notifData } from "../../data/mockData";

const breadcrumbs = {
  "/": "Dashboard",
  "/internships": "Internships",
  "/courses": "Courses",
  "/achievements": "Achievements",
  "/performance": "Performance Analytics",
};

const typeIcon = {
  info: "🔔",
  success: "✅",
  warning: "⚠️",
  reminder: "📅",
};

const typeBg = {
  info: "bg-blue-50 dark:bg-blue-900/20",
  success: "bg-green-50 dark:bg-green-900/20",
  warning: "bg-amber-50 dark:bg-amber-900/20",
  reminder: "bg-purple-50 dark:bg-purple-900/20",
};

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();
  const page = breadcrumbs[location.pathname] || "Dashboard";
  const { isDark, toggle } = useTheme();
  const { profile, setModalOpen } = useProfile();
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState(new Set(notifData.filter((n) => n.read).map((n) => n.id)));
  const panelRef = useRef(null);
  const unreadCount = notifData.filter((n) => !readIds.has(n.id)).length;

  // Close on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const markAllRead = () => setReadIds(new Set(notifData.map((n) => n.id)));

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 transition-colors duration-200">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="hidden sm:inline">Legal Olympiad</span>
        <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 dark:text-white font-semibold">{page}</span>
      </div>

      {/* Right: actions + avatar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 rounded-lg border border-transparent focus:outline-none focus:border-amber-400 focus:bg-white dark:focus:bg-gray-700 transition w-48"
          />
          <svg className="w-4 h-4 absolute left-2.5 top-2 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notification bell */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold leading-none">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown panel */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
                {notifData.map((n) => {
                  const isUnread = !readIds.has(n.id);
                  return (
                    <div
                      key={n.id}
                      onClick={() => setReadIds((s) => new Set([...s, n.id]))}
                      className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        isUnread ? "bg-amber-50/50 dark:bg-amber-900/10" : ""
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${typeBg[n.type]}`}>
                        {typeIcon[n.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${isUnread ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                          {n.title}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{n.message}</p>
                        <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5">{n.time}</p>
                      </div>
                      {isUnread && <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />}
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-800 text-center">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {unreadCount === 0 ? "All caught up! 🎉" : `${unreadCount} unread notifications`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => setModalOpen(true)}
          title="Edit Profile"
          className="flex items-center gap-2 hover:opacity-80 transition rounded-lg px-1 py-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-gray-900 font-bold text-xs">
            {getInitials(profile.name)}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">{profile.name}</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;