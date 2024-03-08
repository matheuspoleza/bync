import { BankAccount } from './bank-account';

interface IYnabAccount {
  id?: string;
  connectedBankAccount?: BankAccount;
}

export class YnabAccount {
  public id?: string;
  public connectedBankAccount?: BankAccount;

  constructor(account: IYnabAccount) {
    this.id = account.id;
    this.connectedBankAccount = account.connectedBankAccount;
  }

  createConnectionWith(bankAccount: BankAccount) {
    this.connectedBankAccount = bankAccount;
  }
}
