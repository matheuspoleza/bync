import { useQuery } from '@tanstack/react-query';
import * as api from '../../api';

export const fetchBankAccountsQuery = () =>
  api.queryClient.fetchQuery({
    queryKey: ['bank-accounts'],
    queryFn: api.banking.getAccounts,
  });

export const useBankAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: api.banking.getAccounts,
    enabled: options?.enabled ?? true,
    throwOnError: false,
    retry: false,
  });

  return {
    accounts: query.data,
    isFetching: query.isLoading,
    fetchBankAccounts: query.refetch,
  };
};
