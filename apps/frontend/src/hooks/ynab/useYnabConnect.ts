import { useEffect, useRef } from 'react';
import * as api from '../clients/api';
import { useSetAtom } from 'jotai';
import * as atoms from '../atoms';

export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';
export const YNAB_REDIRECT_URL = 'http://localhost:5173';

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
