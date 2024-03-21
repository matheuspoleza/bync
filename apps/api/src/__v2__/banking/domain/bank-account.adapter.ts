export interface IBankAccountProviderAdapter {
  getAccounts: () => BankAccount[];
}
