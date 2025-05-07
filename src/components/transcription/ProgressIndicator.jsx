// src/components/transcription/ProgressIndicator.jsx
import React from "react";

const ProgressIndicator = ({ status }) => {
  if (!status) return null;

  const statusMap = {
    loading: "Processing...",
    success: "Transcription completed successfully!",
    error: "An error occurred during transcription.",
  };

  const colorMap = {
    loading: "text-yellow-500",
    success: "text-green-600",
    error: "text-red-600",
  };

  return (
    <div className={`text-center mt-4 text-sm font-medium ${colorMap[status]}`}>
      {statusMap[status] || "Unknown status"}
    </div>
  );
};

export default ProgressIndicator;
