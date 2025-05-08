// src/components/shared/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon, Bars3Icon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { FiUser } from 'react-icons/fi';
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import Sidebar from '../Sidebar';

const Layout = () => {
  const { state, setTheme } = useApp();
  const { theme } = state;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { path: "/chat", label: "Chat" },
    { path: "/transcription", label: "Transcription" },
    { path: "/settings", label: "Settings" },
  ];

  // اسم المستخدم أو اسم ثابت
  const displayName = currentUser?.displayName || currentUser?.email || "Raghad Hasanein";

  return (
    <div className="h-screen bg-light text-black dark:bg-dark dark:text-white flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        {/* Left: Logo + App Name + Menu Icon */}
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 focus:outline-none hover:opacity-90"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar menu"
          >
            <Bars3Icon className="w-5 h-5 text-white" />
          </button>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight select-none">DigiFin</span>
        </div>
        {/* Right: Profile Icon + User Name + Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 hover:underline select-none"
            aria-label="Go to profile"
          >
            <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-extrabold text-base bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight">
              {displayName}
            </span>
          </button>
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
