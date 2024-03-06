import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/lib/ThemeProvider.component';
import { authenticatedRouter, unthenticatedRouter } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './clients/queryClient';
import { Toaster } from './components/ui';
import { useYNABAuth } from './hooks/ynab';
import { useAuth } from './context/auth';

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

const App = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // add only providers needed for login page
    return (
      <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
        <Toaster />
        <RouterProvider router={unthenticatedRouter} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div id="belvo" />
        <YNABProvider />
        <RouterProvider router={authenticatedRouter} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
