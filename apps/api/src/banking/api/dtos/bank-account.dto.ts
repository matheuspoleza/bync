import { z } from 'nestjs-zod/z';

export const BankAccountDto = z.object({
  id: z.string(),
  name: z.string(),
  number: z.string(),
  type: z.string(),
  institution: z.string(),
  balance: z.number(),
});

export type BankAccountDto = z.infer<typeof BankAccountDto>;
