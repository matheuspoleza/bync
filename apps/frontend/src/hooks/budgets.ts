import { useAtom, useAtomValue } from 'jotai';
import * as atoms from '../atoms';
import { getAllBudgetAccounts } from '../clients/api';
import { useEffect } from 'react';

export const useBudgetAccounts = () => {
  const [accounts, setAccounts] = useAtom(atoms.budgets.accounts);
  const [isFetching, setIsFetching] = useAtom(atoms.budgets.isFetchingAccounts);
  const isAuthorizing = useAtomValue(atoms.budgets.isAuthorizing);

  const fetchBudgetAccounts = () => {
    setIsFetching(true);

    if (isAuthorizing) return;

    getAllBudgetAccounts()
      .then((accounts) => setAccounts(accounts))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    if (isFetching && !isAuthorizing) {
      getAllBudgetAccounts()
        .then((accounts) => setAccounts(accounts))
        .finally(() => setIsFetching(false));
    }
  }, [isAuthorizing]);

  return {
    accounts,
    fetchBudgetAccounts,
    isFetching,
  };
};
