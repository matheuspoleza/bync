import { AuthApi } from './auth';
import { BankingApi } from './banking';
import { BelvoApi } from './belvo';
import { YnabApi } from './ynab';

export const auth = new AuthApi();
export const banking = new BankingApi();
export const belvo = new BelvoApi();
export const ynab = new YnabApi();
