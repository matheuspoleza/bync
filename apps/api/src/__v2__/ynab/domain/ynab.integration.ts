import { YnabAccount } from './ynab-account';

export class IYnabIntegration {
  authorize: (
    customerID: string,
    authData: { redirectURL: string; authCode: string },
  ) => Promise<void>;

  getAllBudgetAccounts: (customerID: string) => YnabAccount;
}
