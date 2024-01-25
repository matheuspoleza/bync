import LoginPage from './pages/Login/Login.component';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignupPage from './pages/Signup/Signup.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignupPage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
