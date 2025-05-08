import React from 'react';
import AudioUpload from '../components/transcription/AudioUpload';

const Transcription = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent tracking-tight select-none mb-6">
        Transcription
      </h2>
      <AudioUpload />
    </div>
  );
};

export default Transcription; 