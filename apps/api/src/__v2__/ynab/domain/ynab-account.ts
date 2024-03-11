import { BankAccount } from './bank-account';

export interface IYnabAccountRepository {}

export class IYnabIntegration {
  authorize: (
    customerID: string,
    authData: { redirectURL: string; authCode: string },
  ) => Promise<void>;

  getAllForCustomer: (customerID: string) => Promise<YnabAccount[]>;
}

interface IYnabAccount {
  id?: string;
  ynabAccountID?: string;
  type: string;
  name: string;
  balance: number;
  connectedBankAccount?: BankAccount;
  lastSyncedAt?: Date;
}

export class YnabAccount {
  connectedBankAccount?: BankAccount;

  constructor(account: IYnabAccount) {
    this.connectedBankAccount = account.connectedBankAccount;
  }

  createConnectionWith(bankAccount: BankAccount) {
    this.connectedBankAccount = bankAccount;
  }
}
