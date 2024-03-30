import { useQuery } from '@tanstack/react-query';
import * as api from '../clients/api';

export const useBudgetAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['budget-accounts'],
    queryFn: async () => (await api.ynab.getAll()).data,
    enabled: options?.enabled,
    throwOnError: false,
    retry: false,
  });

  return {
    accounts: query.data ?? [],
    isFetching: query.isLoading,
    fetchBudgetAccounts: query.refetch,
  };
};
