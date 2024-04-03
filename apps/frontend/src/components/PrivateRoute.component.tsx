import { Navigate, useLocation } from 'react-router-dom';
import { useAuthSession, useOnboarding } from '../hooks';
import { LoadingPage } from './LoadingPage.component';

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isCompleted: onboardingCompleted } = useOnboarding();
  const { isLoggedIn, isLoading } = useAuthSession();
  const location = useLocation();

  if (isLoading) return <LoadingPage />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!onboardingCompleted && location.pathname.includes('onboarding'))
    return children;

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default PrivateRoute;
