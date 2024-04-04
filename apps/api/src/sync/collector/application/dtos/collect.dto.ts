import { z} from 'nestjs-zod/z';

export const CollectDto = z.object({
  from: z.date(),
  to: z.date(),
});

export type CollectDto = z.infer<typeof CollectDto>;
