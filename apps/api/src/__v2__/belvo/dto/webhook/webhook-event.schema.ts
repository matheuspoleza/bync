import { z } from 'zod';
import { WebhookType, WebhookCode } from './webhook-event.dto';

export const webhookAccountHistoricalUpdateEventSchema = z.object({
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

export const webhookNewAccountsAvailableEventSchema = z.object({
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
