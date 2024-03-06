import { useEffect, useMemo, useState } from 'react';
import * as api from '../clients/api';
import { useLocalStorageState } from '../hooks/storage';
import { STORAGE_KEYS } from '../atoms/utils';

export const useLogin = () => {
  const handleLogin = async (email: string, password: string) => {
    await api.login({ email, password });
  };

  return {
    login: handleLogin,
  };
};

export const useAuth = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [session, setSession] = useLocalStorageState(
    STORAGE_KEYS.SESSION,
    null
  );

  const isLoggedIn = useMemo(() => {
    console.log({ accessToken: session });
    return session?.access_token?.length ? true : false;
  }, [session?.accessToken]);

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
        console.log({ event });
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
