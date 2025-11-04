import { createBrowserRouter } from 'react-router-dom';
// --- FIX: Changed all paths to start with './' ---
import App from './App';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Sources from './pages/Sources';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Bitrix from './pages/Bitrix';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <App />, // The App component contains the layout
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'leads',
        element: <Leads />,
      },
      {
        path: 'sources',
        element: <Sources />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'bitrix',
        element: <Bitrix />,
      },
    ],
  },
]);

export default router;