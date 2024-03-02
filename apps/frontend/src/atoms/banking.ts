import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { STORAGE_KEYS } from './utils';

export const accounts = atomWithStorage<any[]>(STORAGE_KEYS.BANK_ACCOUNTS, []);
export const isFetchingAccounts = atom(false);
