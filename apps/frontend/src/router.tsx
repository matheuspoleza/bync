import {
  Outlet,
  createBrowserRouter,
  useLocation,
  useNavigate,
  redirect,
} from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';
import { LoginPage } from './pages/Login/Login.component';
import { SignupPage } from './pages/Signup';
import { ModalProvider } from './components/Modal/modal';
import { useEffect } from 'react';
import { LoadingPage } from './components/LoadingPage.component';
import {
  YNAB_REDIRECT_URL,
  useAuthSession,
  useBankAccounts,
  useYnabAccounts,
} from './hooks';
import { OnboardingPage } from './pages/Onboarding';
import * as api from './api';

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
          navigate('/onboarding');
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
        path: '/onboarding',
        element: <OnboardingPage />,
        loader: async () => {
          const bankAccounts = await api.banking.getAccounts();
          const ynabAccounts = await api.ynab.getAll();

          const isLinked = ynabAccounts.some(
            (ynabAccount) => ynabAccount.linkedBankAccountId
          );
          const data = { bankAccounts, ynabAccounts, isLinked };

          if (!ynabAccounts.length) {
            return { step: 'bank-accounts', ...data };
          }

          if (!bankAccounts.length) {
            return { step: 'ynab-accounts', ...data };
          }

          if (!isLinked) {
            return { step: 'link-accounts', ...data };
          }

          return redirect('/dashboard');
        },
      },
      {
        path: '/ynab-connected',
        loader: async ({ request }) => {
          const authCode = new URL(request.url).searchParams.get('code');

          if (!authCode) return redirect('/onboarding');

          await api.ynab.authorize({
            authCode,
            redirectURL: YNAB_REDIRECT_URL,
          });

          return redirect('/onboarding');
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
