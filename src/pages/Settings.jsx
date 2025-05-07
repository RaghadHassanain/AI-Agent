import React from 'react';
import { useNavigate } from 'react-router-dom';
import APIKeyManager from '../components/profile/APIKeyManager';

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:underline font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Chat
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">API Key</h3>
          <APIKeyManager />
        </div>
      </div>
    </div>
  );
};

export default Settings; 