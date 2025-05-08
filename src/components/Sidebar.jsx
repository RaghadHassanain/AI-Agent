// Sidebar.jsx
// هذا الملف يمكن حذفه أو تركه فاضي إذا كان يُستورد في أماكن ثانية

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, MicrophoneIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const links = [
  { path: '/chat', label: 'Chat', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" /> },
  { path: '/transcription', label: 'Transcription', icon: <MicrophoneIcon className="w-5 h-5 mr-2" /> },
  { path: '/settings', label: 'Settings', icon: <Cog6ToothIcon className="w-5 h-5 mr-2" /> },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    if (onClose) onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />
      {/* Sidebar */}
      <aside className="relative w-64 bg-white dark:bg-gray-900 h-full shadow-lg flex flex-col justify-between">
        <nav className="flex flex-col gap-8 w-full items-center py-8">
          {links.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              onClick={onClose}
              className={`flex flex-col items-center group w-full py-2 px-0 transition-colors duration-150 ${
                location.pathname === path
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={label}
            >
              {icon}
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-semibold text-base border-t border-gray-100 dark:border-gray-800"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
