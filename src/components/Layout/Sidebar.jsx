import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * An array of navigation links for the sidebar.
 * We can easily add/remove links here.
 */
const navLinks = [
  { name: 'Dashboard', path: '/' },
  { name: 'Leads', path: '/leads' },
  { name: 'Sources', path: '/sources' },
  { name: 'Bitrix Status', path: '/bitrix' },
  { name: 'Settings', path: '/settings' },
];

/**
 * A reusable component for each sidebar link.
 * Uses NavLink to automatically add an 'active' class.
 */
const SidebarLink = ({ name, path }) => {
  // The 'end' prop is important for the Dashboard link
  // so it doesn't stay active for /leads, /sources, etc.
  const isDashboard = path === '/';

  return (
    <NavLink
      to={path}
      end={isDashboard}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-150 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-200 hover:bg-gray-700 hover:text-white'
        }`
      }
    >
      {/* We can add icons here later */}
      <span>{name}</span>
    </NavLink>
  );
};

/**
 * The main sidebar navigation component.
 */
const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white">
      {/* Sidebar Header/Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-bold">Lead System</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => (
          <SidebarLink key={link.name} name={link.name} path={link.path} />
        ))}
      </nav>

      {/* Sidebar Footer (optional) */}
      <div className="p-4 border-t border-gray-700">
        <span className="text-xs text-gray-400">© 2025 Lead Manager</span>
      </div>
    </div>
  );
};

export default Sidebar;