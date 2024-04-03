import * as api from '../../api';
import { useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { useLocation } from 'react-router-dom';

export const useAuthSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const isLoggedIn = useMemo(() => {
    return !!session?.access_token;
  }, [session?.access_token]);

  const userEmail = useMemo(() => {
    return session?.user.email;
  }, [session?.user]);

  useEffect(() => {
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

  useEffect(() => {
    if (!session) {
      setIsLoading(true);

      api.auth
        .getSession()
        .then((response) => setSession(response.data.session))
        .finally(() => setIsLoading(false));
    }
  }, [location]);

  return { isLoading, isLoggedIn, userEmail };
};
