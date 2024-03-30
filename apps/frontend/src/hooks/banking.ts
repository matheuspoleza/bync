import { useQuery } from '@tanstack/react-query';
import * as api from '../clients/api';

export const useBankingAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => (await api.banking.getAccounts()).data,
    enabled: options?.enabled ?? true,
    throwOnError: false,
    retry: false,
  });

  return {
    accounts: query.data ?? [],
    isFetching: query.isLoading,
    fetchBankAccounts: query.refetch,
  };
};
