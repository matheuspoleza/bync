import { BankAccount } from './bank-account';

interface IYnabAccount {
  id?: string;
  ynabAccountID?: string;
  type: string;
  name: string;
  balance: number;
  connectedBankAccount?: BankAccount;
  lastSyncedAt?: Date;
}

export class YnabAccount implements IYnabAccount {
  id?: string;
  ynabAccountID?: string;
  name: string;
  type: string;
  balance: number;
  connectedBankAccount?: BankAccount;
  lastSyncedAt?: Date;

  constructor(account: IYnabAccount) {
    this.id = account.id;
    this.connectedBankAccount = account.connectedBankAccount;
    this.name = account.name;
    this.type = account.type;
    this.balance = account.balance;
    this.lastSyncedAt = account.lastSyncedAt;
    this.ynabAccountID = account.ynabAccountID;
  }

  createConnectionWith(bankAccount: BankAccount) {
    this.connectedBankAccount = bankAccount;
  }
}
