import { z } from 'zod';

export const LinkYnabAccount = z.object({
  bankAccountID: z.string(),
});

export type LinkYnabAccount = z.infer<typeof LinkYnabAccount>;
