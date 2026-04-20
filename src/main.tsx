import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import NewBrew from './pages/NewBrew.tsx';
import Landing from './pages/Landing.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/dashboard',
    element: <App />,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'new',
        element: <NewBrew />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
