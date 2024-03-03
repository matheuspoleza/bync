import { useEffect, useRef } from 'react';
import { authenticateBudget } from '../clients/api';
import { useSetAtom } from 'jotai';
import * as atoms from '../atoms';

export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';
export const YNAB_REDIRECT_URL = 'http://localhost:5173/ynab/connected';

const removeQueryParam = (paramToRemove: string) => {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  url.searchParams.delete(paramToRemove);
  window.history.pushState({}, '', url);
};

export const useYNABConnect = () => {
  const connectBudgets = () => {
    window.location.href = `https://app.ynab.com/oauth/authorize?client_id=${YNAB_CLIENT_ID}&redirect_uri=${YNAB_REDIRECT_URL}&response_type=code`;
  };

  return { connectBudgets };
};

export const useYNABAuth = () => {
  const hasRun = useRef(false);
  const setIsAuthorizing = useSetAtom(atoms.budgets.isAuthorizing);

  const getAccesstTokens = async (authCode: string) => {
    try {
      await authenticateBudget(authCode, YNAB_REDIRECT_URL);
    } catch (e) {
      console.log(e);
    } finally {
      setIsAuthorizing(false);
    }
  };

  useEffect(() => {
    if (hasRun.current) return;

    const queryParams = new URLSearchParams(window.location.search);
    const ynabAuthorizationCode = queryParams.get('code');

    hasRun.current = true;

    if (ynabAuthorizationCode) {
      setIsAuthorizing(true);
      setTimeout(() => getAccesstTokens(ynabAuthorizationCode), 500);
      removeQueryParam('code');
    }
  }, []);
};
