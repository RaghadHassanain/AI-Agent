import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-20 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 flex flex-col items-center py-6 shadow-lg z-30">
      <div className="mb-8">
        <span className="inline-block w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent select-none">A</span>
        </span>
      </div>
      <nav className="flex flex-col gap-8 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-white/80 hover:text-white transition ${isActive ? 'text-white font-bold' : ''}`
          }
          title="Chat"
        >
          <FiMessageSquare className="w-6 h-6 mb-1" />
          <span className="text-xs">Chat</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center text-white/80 hover:text-white transition ${isActive ? 'text-white font-bold' : ''}`
          }
          title="Settings"
        >
          <FiSettings className="w-6 h-6 mb-1" />
          <span className="text-xs">Settings</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-white/80 hover:text-white transition ${isActive ? 'text-white font-bold' : ''}`
          }
          title="Profile"
        >
          <FiUser className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex flex-col items-center text-white/80 hover:text-red-300 transition focus:outline-none"
        title="Logout"
      >
        <FiLogOut className="w-6 h-6 mb-1" />
        <span className="text-xs">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar; 