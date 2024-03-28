import { z } from 'zod';

export const AuthorizeBudgetAccessRequest = z.object({
  authCode: z.string(),
  redirectURL: z.string(),
});

export type AuthorizeBudgetAccessRequest = z.infer<
  typeof AuthorizeBudgetAccessRequest
>;
