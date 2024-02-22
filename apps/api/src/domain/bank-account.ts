export interface IBankAccountRepository {
  getAll(): Promise<BankAccount[]>;
  getAllForCustomers(userIDs: string[]): Promise<BankAccount[]>;
  getAllByIDs(ids: string[]): Promise<BankAccount[]>;
}

export enum BankAccountType {
  CHECKING = 'checking',
  CREDIT_CARD = 'credit',
  SAVINGS = 'savings',
}

export class BankAccount {
  constructor(
    public id: string,
    public ynabName: string,
    public ynabAccountID: string,
    public mobilisName: string,
    public mobilisAccountID: number,
    public type: BankAccountType,
    public customerID: string,
  ) {}
}
