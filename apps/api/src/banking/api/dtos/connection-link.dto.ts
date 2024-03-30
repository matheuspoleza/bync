import { z } from 'nestjs-zod/z';
import { ConnectionLinkStatus } from 'src/banking/domain/connection-link';

export const ConnectionLinkDto = z.object({
  id: z.string(),
  linkId: z.string(),
  institution: z.string(),
  status: z.nativeEnum(ConnectionLinkStatus),
});

export type ConnectionLinkDto = z.infer<typeof ConnectionLinkDto>;
