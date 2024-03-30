import { z } from 'nestjs-zod/z';
import { YnabAccountDto } from '../dto/ynab-account.dto';

export const GetYnabAccountsResponse = z.object({
  accounts: z.array(YnabAccountDto),
});

export type GetYnabAccountsResponse = z.infer<typeof GetYnabAccountsResponse>;
