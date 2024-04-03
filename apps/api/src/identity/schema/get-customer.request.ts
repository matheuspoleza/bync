import { z } from 'nestjs-zod/z';

export const GetCustomerResponse = z.object({
  customerId: z.string(),
  fullName: z.string(),
});

export type GetCustomerResponse = z.infer<typeof GetCustomerResponse>;
