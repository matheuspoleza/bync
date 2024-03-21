import { IBankAccountProviderAdapter } from '../domain/bank-account.adapter';

export class BankingBelvoAdapter implements IBankAccountProviderAdapter {
  constructor(private readonly belvoBankingAccounts) {}

  getAccounts() {}

  getTransactions() {}
}
