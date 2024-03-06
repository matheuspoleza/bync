import axios from 'axios';
import {
  BudgetAccount,
  BudgetAccountResponse,
  budgetAccountAdapter,
} from '../models/BudgetAccounts';
import { BankLink, BankLinkSession } from '../models/BankLink';
import { BankAccount } from '../models/BankAccount';
import { Session, createClient } from '@supabase/supabase-js';
import { STORAGE_KEYS } from '../atoms/utils';

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

export const api = axios.create({
  baseURL: `http://localhost:3000`,
});

const getAccessToken = () => {
  const cachedSession = localStorage.getItem(STORAGE_KEYS.SESSION);

  if (cachedSession) {
    const data = JSON.parse(cachedSession) as Session;
    return data.access_token;
  } else {
    throw new Error('Not authenticated');
  }
};

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
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
  await api.post(`/budgets/ynab/auth`, {
    authCode,
    clientID: YNAB_CLIENT_ID,
    redirectURL: redirectURL,
  });
};

export const getAllBudgetAccounts = async (): Promise<BudgetAccount[]> => {
  return api
    .get<BudgetAccountResponse[]>(`/budgets/ynab/accounts`)
    .then((response) =>
      response.data.map((data) => budgetAccountAdapter.fromResponse(data))
    );
};

export const getAllBankingAccounts = async (): Promise<BankAccount[]> => {
  return (await api.get<BankAccount[]>(`/banking/accounts`)).data;
};

export const createBankLinkSession = async () => {
  const session = await api.post<BankLinkSession>(`/banking/belvo/session`);
  return session.data;
};

export const createBankLink = async (bankLink: BankLink): Promise<void> => {
  await api.post(`/banking/link`, bankLink);
};

export const getAllBankAccounts = async (): Promise<BankAccount[]> => {
  return api
    .get<BankAccount[]>(`/banking/accounts`)
    .then((response) => response.data);
};
