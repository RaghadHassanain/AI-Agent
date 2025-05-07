// src/components/profile/APIKeyManager.jsx
import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { getAPIKey, setAPIKey, removeAPIKey } from '../../utils/apiKey';
import openAIService from '../../services/openai';

const APIKeyManager = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const savedApiKey = getAPIKey();
    if (savedApiKey) {
      setApiKeyState(savedApiKey);
    }
  }, []);

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');
      if (!apiKey) {
        setError('API key is required');
        return;
      }
      setAPIKey(apiKey);
      await openAIService.chat([{ role: 'user', content: 'Hello' }]);
      setSuccess('API key saved successfully!');
      setIsEditing(false);
    } catch (error) {
      setError('Invalid API key. Please check and try again.');
      removeAPIKey(); // Reset invalid key
    }
  };

  const handleDelete = () => {
    removeAPIKey();
    setApiKeyState('');
    setSuccess('API key removed successfully!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        OpenAI API Key
      </h2>
      
      {error && (
        <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <input
            type={isEditing ? (showKey ? 'text' : 'password') : 'password'}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            disabled={!isEditing}
            className={`w-full p-3 rounded-lg border ${
              isValid 
                ? 'border-gray-300 dark:border-dark-border' 
                : 'border-red-500'
            } bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100`}
          />
          {isEditing && (
            <button
              type="button"
              onClick={() => setShowKey((prev) => !prev)}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              tabIndex={-1}
            >
              {showKey ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          )}
          {!isEditing && apiKey && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              Edit
            </button>
          )}
        </div>

        {!isValid && (
          <p className="text-sm text-red-500">
            Please enter a valid OpenAI API key (should start with 'sk-')
          </p>
        )}

        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setApiKeyState(getAPIKey() || '');
                }}
                className="flex-1 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {!apiKey && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add API Key
                </button>
              )}
              {apiKey && (
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              )}
            </>
          )}
          <button
            onClick={handleCopy}
            className="flex-1 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
          >
            Copy Key
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Your API key is stored locally and never sent to our servers.
      </p>
    </div>
  );
};

export default APIKeyManager;
