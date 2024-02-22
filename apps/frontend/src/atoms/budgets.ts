import { atom } from 'jotai';
import { atomWithStorage, splitAtom } from 'jotai/utils';
import { STORAGE_KEYS } from './utils';

export const accounts = atomWithStorage<any[]>(
  STORAGE_KEYS.BUDGET_ACCOUNTS,
  []
);
export const accountsCount = atom((get) => get(accounts).length);
export const isFetchingAccounts = atom(false);
export const accountsAtoms = splitAtom(accounts);

export const accountsTableData = atom((get) => {
  const data = get(accountsAtoms);
  return data.map((account) => atom((get) => get(account)));
});
