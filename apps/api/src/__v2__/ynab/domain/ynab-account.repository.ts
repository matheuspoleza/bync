import { YnabAccount } from './ynab-account';

export interface IYnabAccountRepository {
  getByID: (id: string) => Promise<YnabAccount>;
  update: (ynabAccount: YnabAccount) => Promise<void>;
}
