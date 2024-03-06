import { useEffect } from 'react';
import * as atoms from '../atoms';
import * as api from '../clients/api';
import { useAtom } from 'jotai';

export const useLogin = () => {
  const handleLogin = async (email: string, password: string) => {
    await api.login({ email, password });
  };

  return {
    login: handleLogin,
  };
};

export const useAuth = () => {
  const [session, setSession] = useAtom(atoms.session.session);

  useEffect(() => {
    api.authClient.getSession().then((response) => {
      const session = response.data.session;
      setSession(session);
    });

    const { data } = api.authClient.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        setSession(session);
      } else if (event === 'SIGNED_IN') {
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (event === 'PASSWORD_RECOVERY') {
        setSession(null);
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(session);
      } else if (event === 'USER_UPDATED') {
        setSession(session);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return { isLoggedIn: !!session?.access_token };
};
