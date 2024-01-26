import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';
export const YNAB_REDIRECT_URL = 'http://localhost:5173';

export const useYNAB = (auth?: boolean) => {
  const location = useLocation();

  const connectBudgets = () => {
    window.location.href = `https://app.ynab.com/oauth/authorize?client_id=${YNAB_CLIENT_ID}&redirect_uri=${YNAB_REDIRECT_URL}&response_type=code`;
  };

  const getAccesstTokens = async (authCode: string) => {
    try {
      await window.fetch(
        `http://localhost:3000/213132/ynab/authorization/${authCode}`,
        {
          method: 'POST',
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!auth) return;

    const ynabAuthorizationCode = new URLSearchParams(location.search).get(
      'code'
    );

    if (ynabAuthorizationCode) {
      getAccesstTokens(ynabAuthorizationCode);
    }
  }, [location.search, auth]);

  return { connectBudgets };
};
