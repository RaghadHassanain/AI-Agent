// src/components/chat/MessageList.jsx
import React from "react";

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[70vh]">
      {messages.map((msg, index) => {
        const isUser = msg.sender === currentUser;
        return (
          <div
            key={index}
            className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md text-sm ${
              isUser
                ? "self-end bg-blue-600 text-white rounded-br-none"
                : "self-start bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
