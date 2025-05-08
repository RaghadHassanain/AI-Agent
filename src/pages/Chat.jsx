import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatInterface from '../components/chat/ChatInterface';

const Chat = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat; 