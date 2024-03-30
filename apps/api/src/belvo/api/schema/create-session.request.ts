import { z } from 'nestjs-zod/z';

export const CreateSessionResponse = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type CreateSessionResponse = z.infer<typeof CreateSessionResponse>;
