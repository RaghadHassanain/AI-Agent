// src/components/transcription/TranscriptionViewer.jsx
import React from "react";

const TranscriptionViewer = ({ transcription, onCopy }) => {
  if (!transcription) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border dark:border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Transcription
        </h3>
        <button
          onClick={() => onCopy(transcription)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Copy
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
        {transcription}
      </p>
    </div>
  );
};

export default TranscriptionViewer;
