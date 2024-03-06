import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/lib/ThemeProvider.component';
import { router } from './router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './clients/queryClient';
import { Toaster } from './components/ui';
import { useYNABAuth } from './hooks/ynab';

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div id="belvo" />
        <YNABProvider />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
