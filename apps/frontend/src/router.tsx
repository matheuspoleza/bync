import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './context/modal';
import { useAuth } from './context/auth';
import { useEffect } from 'react';

export const unAuthenticatedRoutes = ['login', 'sign-up'];

const RoutePage = () => {
  const { isLoggedIn, isFetching } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;

    console.log({ isFetching, isLoggedIn });

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [isLoggedIn, isFetching]);

  if (isFetching) return <div>is loading</div>;

  return (
    <ModalProvider>
      <Outlet />
    </ModalProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RoutePage />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/sign-up',
        element: <SignupPage />,
      },
    ],
  },
]);
