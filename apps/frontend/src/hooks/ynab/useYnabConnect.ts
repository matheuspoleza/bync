export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';
export const YNAB_REDIRECT_URL = 'http://localhost:5173';

export const useYNABConnect = () => {
  const connectBudgets = () => {
    window.location.href = `https://app.ynab.com/oauth/authorize?client_id=${YNAB_CLIENT_ID}&redirect_uri=${YNAB_REDIRECT_URL}&response_type=code`;
  };

  return { connectBudgets };
};
