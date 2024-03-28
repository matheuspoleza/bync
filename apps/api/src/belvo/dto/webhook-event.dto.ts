import { z } from 'zod';

export enum WebhookType {
  Accounts = 'ACCOUNTS',
}

export enum WebhookCode {
  HistoricalUpdate = 'historical_update',
  NewAccountsAvailable = 'new_accounts_available',
}

const webhookAccountHistoricalUpdateEventSchema = z.object({
  webhook_id: z.string(),
  webhook_type: z.nativeEnum(WebhookType),
  webhook_code: z.literal(WebhookCode.HistoricalUpdate),
  link_id: z.string(),
  request_id: z.string(),
  external_id: z.string(),
  data: z.object({
    total_accounts: z.number(),
  }),
});

const webhookNewAccountsAvailableEventSchema = z.object({
  webhook_id: z.string(),
  webhook_type: z.nativeEnum(WebhookType),
  webhook_code: z.literal(WebhookCode.NewAccountsAvailable),
  link_id: z.string(),
  request_id: z.string(),
  external_id: z.string(),
  data: z.object({
    new_accounts: z.number(),
  }),
});

export const webhookAccountEventSchema = z.discriminatedUnion('webhook_code', [
  webhookAccountHistoricalUpdateEventSchema,
  webhookNewAccountsAvailableEventSchema,
]);

export type WebhookEventDto = z.infer<typeof webhookAccountEventSchema>;
