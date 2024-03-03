import { atomWithStorage } from 'jotai/utils';

export const connections = atomWithStorage('bync-accounts-connection', []);
