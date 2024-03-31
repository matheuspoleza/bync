import * as api from '../../api';
import { useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import { Session } from '@supabase/supabase-js';

const isFetchingAtom = atom(false);
const sessionAtom = atom<Session | null>(null);

export const useAuthSession = () => {
  const [isFetching, setIsFetching] = useAtom(isFetchingAtom);
  const [session, setSession] = useAtom(sessionAtom);

  const isLoggedIn = useMemo(() => {
    return session?.access_token?.length ? true : false;
  }, [session?.access_token]);

  useEffect(() => {
    api.auth
      .getSession()
      .then((response) => setSession(response.data.session))
      .finally(() => setIsFetching(false));

    const { data } = api.auth.listenToAuthChanges((event, session) => {
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
