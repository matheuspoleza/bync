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

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
    children: [
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
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignupPage />,
  },
]);

const App = () => {
  return (
    <>
      <div id="belvo" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
