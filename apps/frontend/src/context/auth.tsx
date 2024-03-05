import { useEffect } from 'react';
import * as atoms from '../atoms';
import * as api from '../clients/api';
import { useAtomValue, useSetAtom } from 'jotai';

export const useAuth = () => {
  const session = useAtomValue(atoms.session.session);

  const handleLogin = async (email: string, password: string) => {
    await api.login({ email, password });
  };

  return {
    isLoggedIn: !!session?.access_token,
    login: handleLogin,
  };
};

export const useAuthSubscription = () => {
  const setSession = useSetAtom(atoms.session.session);

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
};
