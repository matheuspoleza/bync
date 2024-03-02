import { useAtom } from 'jotai';
import * as atoms from '../atoms';
import { useEffect } from 'react';
import { getAllBudgetAccounts } from '../clients/api';

export const useBudgetAccounts = () => {
  const [accounts, setAccounts] = useAtom(atoms.budgets.accounts);
  const [isFetching, setIsFetching] = useAtom(atoms.budgets.isFetchingAccounts);

  useEffect(() => {
    if (accounts.length) return;

    setIsFetching(true);

    getAllBudgetAccounts()
      .then((accounts) => setAccounts(accounts))
      .finally(() => setIsFetching(false));
  }, []);

  return {
    accounts,
    isFetching,
  };
};
