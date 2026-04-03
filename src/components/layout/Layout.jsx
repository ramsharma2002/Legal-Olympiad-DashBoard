import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* ── DESKTOP sidebar — always in the flex flow, never moves ── */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar onClose={() => {}} />
      </div>

      {/* ── MOBILE sidebar — fixed overlay, slides in/out ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed inset-y-0 left-0 z-30 transition-transform duration-300 md:hidden ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 transition-colors duration-200 min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;