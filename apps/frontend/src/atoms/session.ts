import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEYS } from './utils';

export const session = atomWithStorage<Session | null>(
  STORAGE_KEYS.SESSION,
  null
);

export const customerID = atom((get) => get(session)?.user.id);

export const userEmail = atom((get) => get(session)?.user.email);
