import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatInterface from '../components/chat/ChatInterface';
import AudioUpload from '../components/chat/AudioUpload';

const Chat = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <ChatInterface />
          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Audio to Text</h3>
            <AudioUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 