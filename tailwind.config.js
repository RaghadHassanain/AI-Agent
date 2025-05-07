/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          fintech: {
            primary: '#2563eb', // blue-600 (lighter than before)
            accent: '#38bdf8',  // sky-400
            secondary: '#fbbf24', // gold-400
            background: '#f3f4f6', // gray-100
            dark: '#0f172a', // slate-900
            light: '#ffffff',
            suggestion: '#e3f1f2', // custom light blue for suggested buttons
          },
        }
      },
    },
    plugins: [],
  };
  