// src/components/chat/ChatInterface.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import openAIService from '../../services/openai';
import Message from './Message';
import { FiSend, FiMic, FiStopCircle, FiSettings } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ChatInterface = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const systemPrompt = {
    role: 'system',
    content: "You are an expert assistant in financial technology (fintech) and digital transformation. Always provide practical, real-world answers and examples related to these fields."
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await openAIService.chat([
        systemPrompt,
        ...messages,
        userMessage
      ]);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Chat error:', error);
      if (error.message.includes('API key')) {
        toast.error('Please set your OpenAI API key in settings');
      } else {
        toast.error('Error sending message');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        try {
          setIsLoading(true);
          const transcription = await openAIService.transcribeAudio(audioFile);
          setInput(transcription);
        } catch (error) {
          console.error('Transcription error:', error);
          toast.error('Error transcribing audio');
        } finally {
          setIsLoading(false);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
      toast.error('Error starting recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const suggestedQuestions = [
    "What is open banking?",
    "How does blockchain impact fintech?",
    "What are the latest trends in digital transformation?",
    "How can AI improve financial services?",
    "What is RegTech and why is it important?",
    "How do digital wallets work?",
    "What are the benefits of cloud banking?",
    "How can fintech help with financial inclusion?",
    "How is cybersecurity evolving in the fintech industry?"
  ];

  return (
    <div className="flex flex-col h-[70vh] max-h-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">Chat</h2>
        <button
          onClick={() => window.location.href = '/settings'}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <FiSettings size={20} />
        </button>
      </div>

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 pt-6 pb-2 justify-center">
          {suggestedQuestions.map((q, i) => (
            <div key={i} className="relative group">
              <button
                onClick={() => setInput(q)}
                className="w-full h-16 flex items-center justify-center px-4 py-2 rounded-2xl bg-white text-fintech-primary dark:bg-fintech-dark dark:text-fintech-accent font-semibold shadow-md border border-fintech-primary dark:border-fintech-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fintech-accent focus:ring-offset-2 group-hover:scale-105 hover:scale-105 hover:bg-gradient-to-r hover:from-fintech-primary hover:to-fintech-accent hover:text-white active:bg-gradient-to-r active:from-fintech-primary active:to-fintech-accent active:text-white dark:hover:text-white"
                style={{ minWidth: 200, maxWidth: 320, minHeight: 64, maxHeight: 64, overflow: 'hidden' }}
              >
                <span className="truncate w-full text-center">{q}</span>
              </button>
              {/* Tooltip */}
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max max-w-xs px-3 py-2 rounded-lg bg-gray-900 text-white text-sm shadow-lg whitespace-pre-line">
                {q}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-center text-base">Start a new conversation with the AI assistant</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <Message key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 rounded-full border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400
              ${isRecording ? 'text-red-500 border-red-300 bg-red-50 dark:bg-red-900/20' : 'text-gray-500 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            disabled={isLoading}
            title={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? <FiStopCircle size={22} /> : <FiMic size={22} />}
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full resize-none p-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              rows={1}
              disabled={isLoading}
              style={{ minHeight: 44, maxHeight: 120 }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all disabled:opacity-50"
              title="Send"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
