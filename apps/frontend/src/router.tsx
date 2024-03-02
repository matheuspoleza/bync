import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
