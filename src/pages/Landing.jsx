import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiTrendingUp } from 'react-icons/fi';

const Landing = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleStart = () => {
    if (currentUser) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fintech-background dark:bg-fintech-dark px-4">
      <div className="bg-white dark:bg-fintech-dark rounded-3xl shadow-xl p-10 flex flex-col items-center max-w-md w-full">
        <div className="mb-6 flex flex-col items-center">
          <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fintech-primary to-fintech-accent shadow-lg mb-4">
            <FiTrendingUp className="w-12 h-12 text-white" />
          </span>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-fintech-primary to-fintech-accent bg-clip-text text-transparent tracking-tight mb-2 select-none">
            DigiFin
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200 text-center font-medium">
            Your gateway to everything fintech and digital transformation.
          </p>
        </div>
        <button
          onClick={handleStart}
          className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-fintech-primary to-fintech-accent text-white font-bold text-lg shadow hover:from-fintech-accent hover:to-fintech-primary transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing; 