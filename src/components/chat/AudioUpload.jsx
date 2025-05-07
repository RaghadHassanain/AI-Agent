import React, { useState } from 'react';
import openAIService from '../../services/openai';
import { toast } from 'react-hot-toast';

const AudioUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an audio file
    if (!file.type.startsWith('audio/')) {
      toast.error('Please select a valid audio file');
      return;
    }

    try {
      setIsUploading(true);
      const result = await openAIService.transcribeAudio(file);
      setTranscription(result);
      toast.success('Audio transcribed successfully');
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error(error?.message || 'Error transcribing audio');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="audio-upload"
          className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer
            ${isUploading 
              ? 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              MP3, WAV, M4A (Max 25MB)
            </p>
          </div>
          <input
            id="audio-upload"
            type="file"
            className="hidden"
            accept="audio/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {isUploading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}

      {transcription && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transcribed Text:</h4>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-900 dark:text-gray-100">{transcription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioUpload; 