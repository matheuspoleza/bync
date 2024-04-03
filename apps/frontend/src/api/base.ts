import { Session, SupabaseClient, createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { AuthApi, BankingApi, BelvoApi, IdentityApi, YnabApi } from './__generated__';
import { SUPABASE_KEY, SUPABASE_URL } from './config';

export const api = axios.create({
  baseURL: `http://localhost:3000`,
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const getAccessToken = async () => {
  const response = await supabase.auth.getSession();
  const session = response.data.session;

  if (session) {
    return session.access_token;
  } else {
    throw new Error('Not authenticated');
  }
};

api.interceptors.request.use(async (config) => {
  if (config.url?.includes('signup')) return config;

  const accessToken = await getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        return Promise.reject(error);
      }

      error.config.headers.Authorization = `Baerer ${data.session?.access_token}`;

      return error.config;
    }
  }

  return Promise.reject(error);
});

export class BaseApi {
  protected auth!: AuthApi;
  protected banking!: BankingApi;
  protected ynab!: YnabApi;
  protected belvo!: BelvoApi;
  protected identity!: IdentityApi;
  protected supabase!: SupabaseClient;

  constructor() {
    this.supabase = supabase;
    this.setupApis();
  }

  private async setupApis() {
    this.auth = new AuthApi(undefined, undefined, api);
    this.banking = new BankingApi(undefined, undefined, api);
    this.ynab = new YnabApi(undefined, undefined, api);
    this.belvo = new BelvoApi(undefined, undefined, api);
    this.identity = new IdentityApi(undefined, undefined, api);
  }
}
