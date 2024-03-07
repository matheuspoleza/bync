import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';

export const session = atom<Session | null>(null);

export const isFetching = atom(false);

export const customerID = atom((get) => get(session)?.user.id);

export const userEmail = atom((get) => get(session)?.user.email);
