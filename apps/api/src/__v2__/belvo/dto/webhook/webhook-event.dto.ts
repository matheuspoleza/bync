import { z } from 'zod';
import {
  webhookNewAccountsAvailableEventSchema,
  webhookAccountHistoricalUpdateEventSchema,
} from './webhook-event.schema';

export enum WebhookType {
  Accounts = 'ACCOUNTS',
}

export enum WebhookCode {
  HistoricalUpdate = 'historical_update',
  NewAccountsAvailable = 'new_accounts_available',
}

export const webhookAccountEventSchema = z.discriminatedUnion('webhook_code', [
  webhookAccountHistoricalUpdateEventSchema,
  webhookNewAccountsAvailableEventSchema,
]);

export type WebhookEventDto = z.infer<typeof webhookAccountEventSchema>;
