import LoginPage from './pages/Login/Login.component';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/Signup/Signup.component';
import './assets/fonts.css';
import { DashboardPage } from './pages/Dashboard/Dashboard.component';

import '@bync/ui/theme.css';

const router = createBrowserRouter([
  {
    path: '/',
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
