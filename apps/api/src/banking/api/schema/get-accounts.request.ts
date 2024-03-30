import { z } from 'nestjs-zod/z';
import { BankAccountDto } from '../dtos';

export const GetAccountsResponse = z.object({
  bankAccounts: z.array(BankAccountDto),
});

export type GetAccountsResponse = z.infer<typeof GetAccountsResponse>;
