export class YnabAccountLinked {
  static EventName = 'ynab.account.linked';

  public ynabAccountId: string;
  public bankAccountID: string;

  constructor(ynabAccountId: string, bankAccountID: string) {
    this.ynabAccountId = ynabAccountId;
    this.bankAccountID = bankAccountID;
  }
}
