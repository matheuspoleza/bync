import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/ui/lib/ThemeProvider.component';
import { router } from './router';
import { AuthProvider } from './context/auth';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
