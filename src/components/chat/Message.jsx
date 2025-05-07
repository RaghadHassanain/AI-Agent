// src/components/chat/Message.jsx
import React from 'react';
import { FiUser, FiMessageSquare } from 'react-icons/fi';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`flex items-end max-w-[80%] gap-2 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-700'
            : 'bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-800'
        }`}>
          {isUser ? (
            <FiUser className="w-4 h-4 text-white" />
          ) : (
            <FiMessageSquare className="w-4 h-4 text-blue-700 dark:text-blue-200" />
          )}
        </div>
        <div
          className={`px-4 py-3 rounded-2xl shadow text-base whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-md'
              : 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 dark:from-blue-900 dark:to-blue-800 dark:text-blue-100 rounded-bl-md'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default Message;

