export interface IBankAccountRepository {
  getAll(): Promise<BankAccount[]>;
  getAllForCustomers(userIDs: string[]): Promise<BankAccount[]>;
  getAllByIDs(ids: string[]): Promise<BankAccount[]>;
  createMany(bankAccounts: BankAccount[]): Promise<void>;
}

export class BankAccount {
  constructor(
    public customerID: string,
    public linkID: string,
    public type: string,
    public name: string,
    public number: string,
    public institution: string,
    public balance: number,
    public id?: string,
  ) {}
}
