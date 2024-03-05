import { atomWithStorage } from 'jotai/utils';

export const connections = atomWithStorage<Record<string, string>>(
  'bync-accounts-connection',
  {}
);
