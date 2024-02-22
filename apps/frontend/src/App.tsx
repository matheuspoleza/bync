import LoginPage from './pages/Login/Login.component';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/Signup/Signup.component';
import './assets/fonts.css';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';

import '@bync/ui/theme.css';
import { BudgetsPage } from './pages/Dashboard/pages/Budgets/Budgets.component';
import { SourcesPage } from './pages/Dashboard/pages/Sources/Sources.component';
import { ConnectionsPage } from './pages/Dashboard/pages/Connections/Connections.component';
import { TransactionsPage } from './pages/Dashboard/pages/Transactions/Transactions.component';
import { useYNABAuth } from './hooks/ynab';
import { Homepage } from './pages/Dashboard/pages/Home/Home.component';
import { OnboardingPage } from './pages/Onboarding/Onboarding.component';

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardPage />,
    children: [
      {
        path: '',
        element: <Homepage />,
      },
      {
        path: 'budgets',
        element: <BudgetsPage />,
      },
      {
        path: 'sources',
        element: <SourcesPage />,
      },
      {
        path: 'connections',
        element: <ConnectionsPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
    ],
  },
  {
    path: '/onboarding/:step',
    element: <OnboardingPage />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignupPage />,
  },
]);

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

const App = () => {
  return (
    <>
      <div id="belvo" />
      <RouterProvider router={router} />
      <YNABProvider />
    </>
  );
};

export default App;
