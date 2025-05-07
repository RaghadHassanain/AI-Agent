import React from 'react';

const Message = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div
        className={`max-w-[70%] rounded-2xl p-4 ${
          isUser
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white dark:bg-dark-card text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
        <span 
          className={`text-xs mt-2 block ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};

export default Message; 