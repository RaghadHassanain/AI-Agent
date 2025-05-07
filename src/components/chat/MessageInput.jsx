// src/components/chat/MessageInput.jsx
import React, { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
        title="Send"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
};

export default MessageInput;
