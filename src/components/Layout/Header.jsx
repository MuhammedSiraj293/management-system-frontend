import React from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { useLocation } from 'react-router-dom';

/**
 * Gets a user-friendly title from the current URL pathname.
 * e.g., "/leads" -> "Leads", "/" -> "Dashboard"
 * @param {string} pathname
 * @returns {string}
 */
const getTitleFromPath = (pathname) => {
  if (pathname === '/') return 'Dashboard';
  // Capitalize the first letter and remove the slash
  return pathname.substring(1).charAt(0).toUpperCase() + pathname.substring(2);
};

/**
 * The top navigation bar/header component.
 * It now dynamically displays the page title and
 * handles user logout.
 */
const Header = () => {
  // --- ADDED: Get user and logout function ---
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Get the current page title
  const pageTitle = getTitleFromPath(location.pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white p-4 px-6 shadow-sm">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>

      {/* User Dropdown / Controls */}
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          {/* Show the user's name from the auth context */}
          Welcome, <strong>{user?.name || 'Admin'}</strong>
        </span>
        <button
          onClick={logout}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;