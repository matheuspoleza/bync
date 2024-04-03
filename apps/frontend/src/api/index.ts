import { AuthApi } from './auth';
import { BankingApi } from './banking';
import { BelvoApi } from './belvo';
import { IdentityApi } from './identity';
import { YnabApi } from './ynab';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const auth = new AuthApi();
export const banking = new BankingApi();
export const belvo = new BelvoApi();
export const ynab = new YnabApi();
export const identity = new IdentityApi();
