import { Navigate } from 'react-router-dom';
import { useAuthSession } from '../hooks';
import { LoadingPage } from './LoadingPage.component';

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuthSession();

  if (isLoading) return <LoadingPage />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
