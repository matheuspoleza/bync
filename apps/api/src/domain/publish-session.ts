import { Transaction as YNABImportTransaction } from 'src/infrastructure/ynab/types';

export class PublishAccountData {
  constructor(
    public customerID: string,
    public ynabAccountName: string,
    public ynabAccountID: string,
    // TODO: replace with correct transaction create type
    public ynabTransactions: YNABImportTransaction[],
  ) {}
}
