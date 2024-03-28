import { z } from 'zod';

export const UserRecord = z.object({
  id: z.string(),
  aud: z.string(),
  role: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  created_at: z.string(),
  deleted_at: z.string().nullable(),
  invited_at: z.string().nullable(),
  updated_at: z.string(),
  instance_id: z.string(),
  is_sso_user: z.boolean(),
  banned_until: z.string().nullable(),
  confirmed_at: z.string().nullable(),
  email_change: z.string(),
  phone_change: z.string(),
  is_super_admin: z.boolean().nullable(),
  recovery_token: z.string(),
  last_sign_in_at: z.string().nullable(),
  recovery_sent_at: z.string().nullable(),
  raw_app_meta_data: z.any(),
  confirmation_token: z.string(),
  email_confirmed_at: z.string().nullable(),
  encrypted_password: z.string(),
  phone_change_token: z.string(),
  phone_confirmed_at: z.string().nullable(),
  raw_user_meta_data: z.any(),
  confirmation_sent_at: z.string().nullable(),
  email_change_sent_at: z.string().nullable(),
  phone_change_sent_at: z.string().nullable(),
  email_change_token_new: z.string(),
  reauthentication_token: z.string(),
  reauthentication_sent_at: z.string().nullable(),
  email_change_token_current: z.string(),
  email_change_confirm_status: z.number(),
});

export const UserCreatedWebhookRequest = z.object({
  type: z.literal('INSERT'),
  table: z.literal('users'),
  record: UserRecord.required(),
  schema: z.string(),
  old_record: UserRecord.nullable(),
});

export type UserRecord = z.infer<typeof UserRecord>;

export type UserCreatedWebhookRequest = z.infer<
  typeof UserCreatedWebhookRequest
>;
