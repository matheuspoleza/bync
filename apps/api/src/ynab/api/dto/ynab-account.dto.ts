import { z } from 'nestjs-zod/z';

export const YnabAccountDto = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  balance: z.number(),
  linkedBankAccountID: z.string().optional(),
  lastSyncedAt: z.date().optional(),
});

export type YnabAccountDto = z.infer<typeof YnabAccountDto>;
