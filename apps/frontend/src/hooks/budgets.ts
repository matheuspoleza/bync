import { useQuery } from '@tanstack/react-query';
// import { useAtomValue } from 'jotai';
// import * as atoms from '../atoms';
import { getAllBudgetAccounts } from '../clients/api';

export const useBudgetAccounts = (options?: { enabled?: boolean }) => {
  // const isAuthorizing = useAtomValue(atoms.budgets.isAuthorizing);

  const query = useQuery({
    queryKey: ['budget-accounts'],
    queryFn: getAllBudgetAccounts,
    enabled: options?.enabled,
    throwOnError: false,
    retry: false,
  });

  return {
    accounts: query.data,
    isFetching: query.isLoading,
    fetchBudgetAccounts: query.refetch,
  };
};
