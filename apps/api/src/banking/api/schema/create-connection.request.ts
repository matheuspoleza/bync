import { z } from 'nestjs-zod/z';
import { ConnectionLinkDto } from '../dtos';

export const CreateConnectionRequest = z.object({
  linkId: z.string(),
  institution: z.string(),
});

export const CreateConnectionResponse = ConnectionLinkDto;

export type CreateConnectionResponse = z.infer<typeof CreateConnectionResponse>;
export type CreateConnectionRequest = z.infer<typeof CreateConnectionRequest>;
