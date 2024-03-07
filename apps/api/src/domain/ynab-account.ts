export interface IYNABAccountRepository {}

export class YNABAccount {
  constructor(
    public name: string,
    public balance: number,
    public budgetID: string,
    public ynabAccountID: string,
    public id?: string,
  ) {}
}
