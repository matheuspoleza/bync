import { z } from 'nestjs-zod/z';

export const LinkYnabAccount = z.object({
  bankAccountID: z.string(),
});

export type LinkYnabAccount = z.infer<typeof LinkYnabAccount>;
