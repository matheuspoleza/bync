export interface IYnabAccountRepository {}

interface IYnabAccount {
  id?: string;
  ynabAccountID?: string;
  type: string;
  name: string;
  balance: number;
  linkedBankAccountID?: string;
  lastSyncedAt?: Date;
}

export class YnabAccount {
  public id!: string;
  public ynabAccountID!: string;
  public type!: string;
  public name!: string;
  public balance!: number;
  public linkedBankAccountID?: string;
  public lastSyncedAt?: Date;

  constructor(account: IYnabAccount) {
    this.linkedBankAccountID = account.linkedBankAccountID;
    this.type = account.type;
    this.name = account.name;
    this.balance = account.balance;
    this.lastSyncedAt = account.lastSyncedAt;

    if (account.ynabAccountID) {
      this.ynabAccountID = account.ynabAccountID;
    }

    if (account.id) {
      this.id = account.id;
    }
  }

  link(bankAccountID: string) {
    this.linkedBankAccountID = bankAccountID;
  }
}
