import { createBrowserRouter, useNavigate } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { Layout } from './Layout';
import { useEffect } from 'react';
import { useYNABAuth } from './hooks/ynab';
import { SignupPage } from './pages/Signup';

const YnabConnectedRoute: React.FC = () => {
  // const navigate = useNavigate();
  useYNABAuth();

  useEffect(() => {
    // navigate('/');
    // navigate('?modal=OnboardingModal&step=connection');
  }, []);

  return null;
};

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
  {
    path: '/sign-up',
    element: <SignupPage />,
  },
  {
    path: '/ynab/connected',
    element: <YnabConnectedRoute />,
  },
]);
