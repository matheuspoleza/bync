import { z } from 'nestjs-zod/z';

export const SignupRequest = z.object({
  email: z.string(),
  password: z.string(),
  fullName: z.string(),
});

export const SignupResponse = z.object({
  customerId: z.string(),
  userId: z.string(),
});

export type SignupRequest = z.infer<typeof SignupRequest>;

export type SignupResponse = z.infer<typeof SignupResponse>;
