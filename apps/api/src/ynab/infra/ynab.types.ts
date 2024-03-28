import { CreateTransactionRequest } from 'ynab';

export type Transaction = CreateTransactionRequest['data']['transaction'];

export interface YNABCustomerAuthDTO {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  created_at: number;
}
