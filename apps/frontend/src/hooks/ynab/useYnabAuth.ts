import { useRef, useEffect } from 'react';
import * as api from '../../api';
import { YNAB_REDIRECT_URL } from './useYnabConnect';

const removeQueryParam = (paramToRemove: string) => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  url.searchParams.delete(paramToRemove);
  window.history.pushState({}, '', url);
};

export const useYNABAuth = () => {
  const hasRun = useRef(false);

  const getAccesstTokens = async (authCode: string) => {
    try {
      await api.ynab.authorize({ authCode, redirectURL: YNAB_REDIRECT_URL });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (hasRun.current) return;

    const queryParams = new URLSearchParams(window.location.search);
    const ynabAuthorizationCode = queryParams.get('code');

    hasRun.current = true;

    if (ynabAuthorizationCode) {
      setTimeout(() => getAccesstTokens(ynabAuthorizationCode), 500);
      removeQueryParam('code');
    }
  }, []);
};
