import {
  BankingControllerGetBankAccounts200Response,
  YnabControllerGetAll200Response,
} from './__generated__';

export type BankAccount = BankingControllerGetBankAccounts200Response['bankAccounts'][0];
export type YnabAccount = YnabControllerGetAll200Response['accounts'][0];
