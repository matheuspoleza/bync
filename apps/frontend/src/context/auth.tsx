import { useEffect, useMemo } from 'react';
import * as api from '../clients/api';
import { useAtom } from 'jotai';
import * as atoms from '../atoms';

export const useLogin = () => {
  const handleLogin = async (email: string, password: string) => {
    await api.login({ email, password });
  };

  return {
    login: handleLogin,
  };
};

export const useAuth = () => {
  const [isFetching, setIsFetching] = useAtom(atoms.session.isFetching);
  const [session, setSession] = useAtom(atoms.session.session);

  const isLoggedIn = useMemo(() => {
    return session?.access_token?.length ? true : false;
  }, [session?.access_token]);

  useEffect(() => {
    api.authClient
      .getSession()
      .then((response) => setSession(response.data.session))
      .finally(() => setIsFetching(false));

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

  return { isLoggedIn, isFetching };
};
