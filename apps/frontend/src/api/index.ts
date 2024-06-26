import { AuthApi } from './auth';
import { BankingApi } from './banking';
import { IdentityApi } from './identity';
import { SyncApi } from './sync';
import { YnabApi } from './ynab';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const auth = new AuthApi();
export const banking = new BankingApi();
export const ynab = new YnabApi();
export const identity = new IdentityApi();
export const sync = new SyncApi();
