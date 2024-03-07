import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './context/modal';
import { useAuth } from './context/auth';
import { useEffect } from 'react';
import { LoadingPage } from './components/LoadingPage.component';

export const unAuthenticatedRoutes = ['login', 'sign-up'];

const RoutePage = () => {
  const { isLoggedIn, isFetching } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isFetching) return;
    if (location.pathname.includes('sign-up')) return;

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [isLoggedIn, isFetching]);

  if (isFetching) return <LoadingPage />;

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
