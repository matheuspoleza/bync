import { z } from 'nestjs-zod/z';
import { SessionDto } from './session.dto';

export const CollectDto = z.object({
  bankAccountIds: z.array(z.string()),
  from: z.string(),
  to: z.string(),
});

export const CollectResponse = z.object({
  session: SessionDto,
});

export type CollectResponse = z.infer<typeof CollectResponse>;

export type CollectDto = z.infer<typeof CollectDto>;
