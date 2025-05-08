// src/components/transcription/AudioUpload.jsx
import React, { useState, useRef } from 'react';
import { MicrophoneIcon, StopIcon, ArrowUpTrayIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { transcribeAudio } from '../../services/aiService';

const AudioUpload = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await handleTranscription(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      await handleTranscription(file);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      await handleTranscription(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleTranscription = async (audioFile) => {
    setIsProcessing(true);
    setTranscription('');
    try {
      const text = await transcribeAudio(audioFile);
      setTranscription(text);
    } catch (error) {
      setTranscription('Error transcribing audio.');
      console.error('Transcription error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Audio Transcription
      </h2>
      <div className="space-y-4">
        {/* Drag & Drop / Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 ${
            dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
          }`}
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <ArrowUpTrayIcon className="w-8 h-8 mb-2 text-blue-500" />
          <p className="text-gray-700 dark:text-gray-200 mb-1">Drag & drop an audio file here, or click to upload</p>
          <input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {isProcessing && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Processing audio...
          </div>
        )}
        {transcription && (
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {transcription}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {copied ? <CheckCircleIcon className="w-5 h-5 text-green-300" /> : null}
              {copied ? 'Copied!' : 'Copy Transcription'}
            </button>
            {copied && (
              <div className="text-green-600 dark:text-green-400 text-sm flex items-center justify-center gap-1 mt-1">
                <CheckCircleIcon className="w-4 h-4" /> Copied to clipboard
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
