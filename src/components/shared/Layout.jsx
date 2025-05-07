// src/components/shared/Layout.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useApp } from "../../context/AppContext";

const Layout = () => {
  const { state, setTheme } = useApp();
  const { theme } = state;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = [
    { path: "/chat", label: "Chat" },
    { path: "/transcription", label: "Transcription" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex h-screen transition-colors bg-light text-black dark:bg-dark dark:text-white">
      {/* Sidebar */}
      <aside
        className={`flex flex-col justify-between bg-gray-100 dark:bg-gray-900 p-4 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <nav className="space-y-4">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`block px-2 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 ${
                location.pathname === path ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
            >
              {collapsed ? label.charAt(0) : label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-between items-center">
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setCollapsed(!collapsed)} className="text-xs">
            {collapsed ? ">>" : "<<"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
