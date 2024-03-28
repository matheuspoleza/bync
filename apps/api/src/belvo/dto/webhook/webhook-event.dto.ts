import { z } from 'zod';
import {
  webhookNewAccountsAvailableEventSchema,
  webhookAccountHistoricalUpdateEventSchema,
} from './webhook-event.schema';

export { WebhookType, WebhookCode } from './webhook-event.schema';

export const webhookAccountEventSchema = z.discriminatedUnion('webhook_code', [
  webhookAccountHistoricalUpdateEventSchema,
  webhookNewAccountsAvailableEventSchema,
]);

export type WebhookEventDto = z.infer<typeof webhookAccountEventSchema>;
