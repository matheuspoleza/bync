import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useYNABAuth } from './hooks/ynab';
import { useAuth } from './context/auth';

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [isLoggedIn]);

  return (
    <>
      <div id="belvo" />
      <YNABProvider />
      <Outlet />
    </>
  );
};
