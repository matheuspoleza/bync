import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './components/Modal/modal';
import { useEffect } from 'react';
import { LoadingPage } from './components/LoadingPage.component';
import { useAuthSession } from './hooks';
import * as api from './api';

export const unAuthenticatedRoutes = ['login', 'sign-up'];

const RoutePage = () => {
  const { isLoggedIn, isFetching } = useAuthSession();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFetching) return;
    if (location.pathname.includes('sign-up')) return;

    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [isLoggedIn, isFetching]);

  if (isFetching || navigation.state === 'loading') return <LoadingPage />;

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
        loader: async () => {
          const bankAccounts = await api.banking.getAccounts();
          const ynabAccounts = await api.ynab.getAll();

          console.log({ bankAccounts, ynabAccounts });

          return { bankAccounts, ynabAccounts };
        },
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
