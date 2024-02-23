import axios from 'axios';
import {
  BudgetAccount,
  BudgetAccountResponse,
  budgetAccountAdapter,
} from '../models/BudgetAccounts';
import { BankLink, BankLinkSession } from '../models/BankLink';
import * as atoms from '../atoms';
import { BankAccount } from '../models/BankAccount';

// TODO: move to env var
export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';

const getCustomerID = () =>
  localStorage.getItem(atoms.utils.STORAGE_KEYS.CUSTOMER_ID);

export const api = axios.create({
  baseURL: `http://localhost:3000`,
});

export const authenticateBudget = async (
  authCode: string,
  redirectURL: string
) => {
  const customerID = getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  await api.post(
    `/budgets/ynab/${customerID}/auth`,
    {
      authCode,
      clientID: YNAB_CLIENT_ID,
      redirectURL: redirectURL,
    },
    {
      headers: {
        customerID,
      },
    }
  );
};

export const getAllBudgetAccounts = async (): Promise<BudgetAccount[]> => {
  const customerID = getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  return api
    .get<BudgetAccountResponse[]>(`/budgets/ynab/${customerID}/accounts`)
    .then((response) =>
      response.data.map((data) => budgetAccountAdapter.fromResponse(data))
    );
};

export const createBankLinkSession = async () => {
  const session = await api.post<BankLinkSession>(`/banking/belvo/session`);
  return session.data;
};

export const createBankLink = async (bankLink: BankLink): Promise<void> => {
  const customerID = getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  await api.post(`/banking/${customerID}/link`, bankLink);
};

export const getAllBankAccounts = async (): Promise<BankAccount[]> => {
  const customerID = getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  return api
    .get<BankAccount[]>(`/banking/${customerID}/accounts`)
    .then((response) => response.data);
};
