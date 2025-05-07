// src/components/transcription/AudioUpload.jsx
import React, { useState, useRef } from 'react';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';
import { transcribeAudio } from '../../services/aiService';

const AudioUpload = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
        setIsProcessing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setTranscription(text);
        } catch (error) {
          console.error('Transcription error:', error);
        } finally {
          setIsProcessing(false);
        }
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
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Audio Transcription
      </h2>

      <div className="space-y-4">
        <div className="flex justify-center">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-4 rounded-full transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isRecording ? (
              <StopIcon className="h-8 w-8" />
            ) : (
              <MicrophoneIcon className="h-8 w-8" />
            )}
          </button>
        </div>

        {isProcessing && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Processing audio...
          </div>
        )}

        {transcription && (
          <div className="space-y-2">
            <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {transcription}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="w-full bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
            >
              Copy Transcription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
