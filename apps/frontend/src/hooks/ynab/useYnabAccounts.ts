import { useQuery } from '@tanstack/react-query';
import * as api from '../../api';

export const useYnabAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['ynab-accounts'],
    queryFn: api.ynab.getAll,
    enabled: options?.enabled,
    throwOnError: false,
    retry: false,
  });

  return {
    accounts: query.data,
    isFetching: query.isLoading,
    fetchYnabAccounts: query.refetch,
  };
};
