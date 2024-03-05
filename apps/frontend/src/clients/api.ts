import axios from 'axios';
import {
  BudgetAccount,
  BudgetAccountResponse,
  budgetAccountAdapter,
} from '../models/BudgetAccounts';
import { BankLink, BankLinkSession } from '../models/BankLink';
import { BankAccount } from '../models/BankAccount';
import { createClient } from '@supabase/supabase-js';

// TODO: move to env var
// remote
// const SUPABASE_URL = 'https://atbffzwecdubmzwfinqr.supabase.co';
// const SUPABASE_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0YmZmendlY2R1Ym16d2ZpbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwNDUyOTcsImV4cCI6MjAyMTYyMTI5N30.Q3VmXyW1JCyE-Ep78iSHwh0HfgB93v8oRD82jjttvRM';

// local
const SUPABASE_URL = 'http://127.0.0.1:54321';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// TODO: move to env var
export const YNAB_CLIENT_ID = 'WGEAcIpzW8Npx-kFtgYSA-JBDUPodjRKQVqoCD0cRZA';

const getCustomerID = async () => {
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    window.location.href = '/login';
    throw new Error('Session not found');
  }

  return session.data.session.user.id;
};

export const api = axios.create({
  baseURL: `http://localhost:3000`,
});

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const signup = async ({
  email,
  password,
  name,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const auth = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (!auth.data.session) return;

  await supabase.auth.setSession(auth.data.session);
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const authResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!authResponse.data.session) {
    throw new Error('could not login');
  }

  await supabase.auth.setSession(authResponse.data.session);
};

export const authClient = supabase.auth;

export const getSession = async () => {
  return supabase.auth.getSession();
};

export const authenticateBudget = async (
  authCode: string,
  redirectURL: string
) => {
  const customerID = await getCustomerID();

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
  const customerID = await getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  return api
    .get<BudgetAccountResponse[]>(`/budgets/ynab/${customerID}/accounts`)
    .then((response) =>
      response.data.map((data) => budgetAccountAdapter.fromResponse(data))
    );
};

export const getAllBankingAccounts = async (): Promise<BankAccount[]> => {
  const customerID = await getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  return (await api.get<BankAccount[]>(`/banking/${customerID}/accounts`)).data;
};

export const createBankLinkSession = async () => {
  const session = await api.post<BankLinkSession>(`/banking/belvo/session`);
  return session.data;
};

export const createBankLink = async (bankLink: BankLink): Promise<void> => {
  const customerID = await getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  await api.post(`/banking/${customerID}/link`, bankLink);
};

export const getAllBankAccounts = async (): Promise<BankAccount[]> => {
  const customerID = await getCustomerID();

  if (!customerID) {
    throw new Error('customer not found');
  }

  return api
    .get<BankAccount[]>(`/banking/${customerID}/accounts`)
    .then((response) => response.data);
};
