export interface IYnabAccountRepository {}

interface IYnabAccount {
  id?: string;
  customerId: string;
  budgetId: string;
  type: string;
  name: string;
  balance: number;
  ynabAccountId?: string;
  linkedBankAccountId?: string;
  lastSyncedAt?: Date;
}

export class YnabAccount {
  public id!: string;
  public budgetId: string;
  public ynabAccountId!: string;
  public type!: string;
  public name!: string;
  public balance!: number;
  public linkedBankAccountId?: string;
  public lastSyncedAt?: Date;
  public customerId: string;

  constructor(account: IYnabAccount) {
    this.linkedBankAccountId = account.linkedBankAccountId;
    this.type = account.type;
    this.name = account.name;
    this.balance = account.balance;
    this.lastSyncedAt = account.lastSyncedAt;
    this.customerId = account.customerId;
    this.budgetId = account.budgetId;

    if (account.ynabAccountId) {
      this.ynabAccountId = account.ynabAccountId;
    }

    if (account.id) {
      this.id = account.id;
    }
  }

  link(bankAccountID: string) {
    this.linkedBankAccountId = bankAccountID;
  }
}
