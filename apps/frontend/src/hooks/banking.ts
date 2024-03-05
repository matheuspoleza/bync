import { useQuery } from '@tanstack/react-query';
import { getAllBankingAccounts } from '../clients/api';

export const useBankingAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: getAllBankingAccounts,
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
