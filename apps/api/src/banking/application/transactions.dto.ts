import { z } from 'nestjs-zod/z';

export const TransactionsDto = z.array(
  z.object({
    bankAccountId: z.string(),
    linkId: z.string(),
    customerId: z.string(),
    transactions: z.array(z.unknown()),
  }),
);

export type TransactionsDto = z.infer<typeof TransactionsDto>;
