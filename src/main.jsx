import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import './styles/global.css';

// --- ADDED ---
import { AuthProvider } from './context/AuthContext.jsx';
// We can add ThemeProvider later
// import { ThemeProvider } from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- WRAPPED APP --- */}
    <AuthProvider>
      {/*
      <ThemeProvider>
    */}
      <RouterProvider router={router} />
      {/*
      </ThemeProvider>
    */}
    </AuthProvider>
    {/* --- END WRAPPER --- */}
  </React.StrictMode>
);