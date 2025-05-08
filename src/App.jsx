import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ChatInterface from './components/ChatInterface';
import APIKeyManager from './components/profile/APIKeyManager';
import AudioUpload from './components/transcription/AudioUpload';
import ThemeToggle from './components/ThemeToggle';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Landing from './pages/Landing';
import Sidebar from './components/Sidebar';
import Transcription from './pages/Transcription';
import Layout from './components/shared/Layout';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-white/90 dark:bg-gradient-to-r dark:from-blue-950 dark:to-gray-900 shadow-md border-b border-blue-100 dark:border-blue-900 backdrop-blur-md">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mr-2"></span>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight select-none">
            DigiFin
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {currentUser && (
            <>
              <a
                href="/profile"
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition"
                title="Profile"
              >
                <FiUser className="w-5 h-5" />
                <span className="hidden sm:inline">{currentUser.displayName || currentUser.email}</span>
              </a>
              <a
                href="/settings"
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition"
                title="Settings"
              >
                <FiSettings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition"
                title="Logout"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <ChatProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-blue-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-200 pt-20">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/transcription" element={<Transcription />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Routes>
              <Toaster position="top-center" />
            </div>
          </ChatProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
