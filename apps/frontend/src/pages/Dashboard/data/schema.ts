import { z } from 'zod';

export const budgetAccountSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string(),
  balance: z.number(),
  connectedBankAccountID: z.string().optional(),
  connectedBankAccountName: z.string().optional(),
  connectionStatus: z.string().optional().nullable(),
});

export type BudgetAccount = z.infer<typeof budgetAccountSchema>;
