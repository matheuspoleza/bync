import { z } from 'nestjs-zod/z';

export enum WebhookType {
  Accounts = 'ACCOUNTS',
}

export enum WebhookCode {
  HistoricalUpdate = 'historical_update',
  NewAccountsAvailable = 'new_accounts_available',
}

export const webhookEventSchema = z.object({
  webhook_id: z.string(),
  // TODO: add all webhook types
  webhook_type: z.string(),
  // TODO: add all webhook codes
  webhook_code: z.string(),
  link_id: z.string(),
  request_id: z.string(),
  external_id: z.string(),
  data: z.any(),
});

export type WebhookEventDto = z.infer<typeof webhookEventSchema>;
