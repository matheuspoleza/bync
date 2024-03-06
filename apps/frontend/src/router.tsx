import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { useYNABAuth } from './hooks/ynab';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './context/modal';

const YnabConnectedRoute: React.FC = () => {
  useYNABAuth();
  return null;
};

export const unthenticatedRouter = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignupPage />,
  },
]);

export const authenticatedRouter = createBrowserRouter([
  {
    path: '/',
    // TODO: remove it from here and add a provider component
    element: (
      <ModalProvider>
        <DashboardPage />
      </ModalProvider>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ModalProvider>
        <DashboardPage />
      </ModalProvider>
    ),
  },
  {
    path: '/ynab/connected',
    element: <YnabConnectedRoute />,
  },
]);
