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
  linkedBankAccountID?: string;
  lastSyncedAt?: Date;
}

export class YnabAccount {
  linkedBankAccountID?: string;

  constructor(account: IYnabAccount) {
    this.linkedBankAccountID = account.linkedBankAccountID;
  }

  link(bankAccountID: string) {
    this.linkedBankAccountID = bankAccountID;
  }
}
