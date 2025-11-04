import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header.jsx';
import Sidebar from './components/Layout/Sidebar.jsx';
import { useAuth } from './hooks/useAuth.js';
import Loader from './components/Common/Loader.jsx'; // We'll create this

/**
 * This is the main application layout component.
 * It renders the consistent Header and Sidebar,
 * and the <Outlet> component renders the active
 * child route (e.g., Dashboard, Leads, Settings).
 *
 * It also now handles auth protection.
 */
const App = () => {
  // --- Auth Logic ---
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Show a full-page loader while checking auth status
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader text="Authenticating..." />
      </div>
    );
  }

  if (!user) {
    // If auth check is complete and there is no user,
    // redirect them to the /login page.
    return <Navigate to="/login" replace />;
  }
  // --- End Auth Logic ---

  // If we are here, the user is authenticated.
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (fixed width) */}
      <Sidebar />

      {/* Main Content Area (scrollable) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {/* <Outlet> renders the matched child route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;