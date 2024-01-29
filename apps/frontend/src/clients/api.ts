import axios from 'axios';
import {
  BudgetAccount,
  BudgetAccountResponse,
  budgetAccountAdapter,
} from '../models/BudgetAccounts';

// TODO: move to env var
export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const authenticateBudget = async (
  customerID: string,
  authCode: string,
  redirectURL: string
) => {
  await api.post(`/budgets/ynab/${customerID}/auth`, {
    authCode,
    clientID: YNAB_CLIENT_ID,
    redirectURL: redirectURL,
  });
};

export const getAllBudgetAccounts = async (
  customerID: string
): Promise<BudgetAccount[]> => {
  return api
    .get<BudgetAccountResponse[]>(`/budgets/ynab/${customerID}/accounts`)
    .then((response) =>
      response.data.map((data) => budgetAccountAdapter.fromResponse(data))
    );
};
