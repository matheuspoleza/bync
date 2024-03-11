export interface IBankAccountRepository {
  getByID(bankAccountID: string): Promise<BankAccount>;
}

export interface BankAccount {
  id: string;
}
