import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useYNABAuth } from './hooks/ynab';
import { OnboardingPage } from './pages/Onboarding/Onboarding.component';
import { ConnectionsPage } from './pages/Connections/Connections.component';
import { ThemeProvider } from './components/lib/ThemeProvider.component';
import { LoginPage } from './pages/Login';

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
    path: '/connections',
    element: <ConnectionsPage />,
  },
  {
    path: '/',
    element: <LoginPage />,
  },
]);

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

// const AppContent = () => {
//   const { isComplete } = useOnboarding();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isComplete) {
//       navigate('/connections');
//     } else {
//       navigate('/onboarding');
//     }
//   }, [isComplete]);

//   return (
//     <>
//       <div id="belvo" />
//       <YNABProvider />
//     </>
//   );
// };

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
      <RouterProvider router={router} />
      <div id="belvo" />
      <YNABProvider />
    </ThemeProvider>
  );
};

export default App;
