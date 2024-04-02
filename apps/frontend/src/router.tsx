import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './components/Modal/modal';
import { useEffect } from 'react';
import { LoadingPage } from './components/LoadingPage.component';
import { useAuthSession, useBankAccounts, useYnabAccounts } from './hooks';

export const unAuthenticatedRoutes = ['login', 'sign-up'];

const RoutePage = () => {
  const { isLoggedIn, isFetching } = useAuthSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchBankAccounts } = useBankAccounts({ enabled: false });
  const { fetchYnabAccounts } = useYnabAccounts({ enabled: false });

  useEffect(() => {
    if (isFetching) return;
    if (location.pathname.includes('sign-up')) return;

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // TODO: create onboarding hook to encapsulate this redirect logic
    Promise.all([fetchBankAccounts(), fetchYnabAccounts()]).then(
      ([bankAccounts, ynabAccounts]) => {
        if (bankAccounts.data?.length && ynabAccounts.data?.length) {
          navigate('/dashboard');
        } else {
          // TODO: Transform onboarding in a page instead of modal and redirect to onboarding here
          navigate('/dashboard?test=123');
        }
      }
    );
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
