import { z } from 'nestjs-zod/z';

export const PublishDto = z.object({
  sessionId: z.string(),
});

export type PublishDto = z.infer<typeof PublishDto>;
