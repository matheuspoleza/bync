import { z } from 'nestjs-zod/z';

export const SessionDto = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  customerIds: z.array(z.string()),
  bankAccountIds: z.array(z.string()),
  createdAt: z.date(),
  data: z.array(
    z.object({
      bankAccountId: z.string(),
      customerId: z.string(),
      transactions: z.array(z.any()),
    }),
  ),
});

export type SessionDto = z.infer<typeof SessionDto>;
