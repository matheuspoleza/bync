import { BankAccount } from './bank-account';

export interface IBankAccountRepository {
  getByID(bankAccountID: string): Promise<BankAccount>;
}
