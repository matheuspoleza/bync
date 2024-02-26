import LoginPage from './pages/Login/Login.component';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/Signup/Signup.component';
import './assets/fonts.css';
import { useYNABAuth } from './hooks/ynab';
import { OnboardingPage } from './pages/Onboarding/Onboarding.component';

const router = createBrowserRouter([
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
