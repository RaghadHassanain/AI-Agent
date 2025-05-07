import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/solid';
import { useChat } from '../context/ChatContext';
import Message from './Message';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const { messages, addMessage, isLoading } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const userMessage = {
        content: message,
        timestamp: new Date().toISOString(),
        isUser: true
      };
      addMessage(userMessage);
      setMessage('');
      // TODO: Implement AI response
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-card transition-colors duration-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isUser={msg.isUser} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg border-t border-gray-200 dark:border-dark-border transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 bg-white dark:bg-dark-card rounded-full shadow-sm border border-gray-200 dark:border-dark-border p-2 transition-colors duration-200">
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-2 rounded-full transition-all duration-200 ${
                isRecording 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-border'
              }`}
            >
              <MicrophoneIcon className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            
            <button
              type="submit"
              disabled={!message.trim()}
              className={`p-2 rounded-full transition-all duration-200 ${
                message.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600 scale-110'
                  : 'bg-gray-100 dark:bg-dark-bg text-gray-400 dark:text-gray-500'
              }`}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 