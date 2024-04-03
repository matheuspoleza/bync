import { useQuery, DefinedInitialDataOptions } from "@tanstack/react-query";
import * as api from "../../api";

export const useBankAccounts = (
  options?: Partial<DefinedInitialDataOptions>
) => {
  const query = useQuery({
    queryKey: ["bank-accounts"],
    queryFn: () => {
      return api.banking.getAccounts();
    },
    enabled: true,
    throwOnError: false,
    retry: false,
    initialData: [],
    refetchOnMount: true,
    ...options,
  });

  return {
    accounts: query.data,
    isFetching: query.isLoading,
    fetchBankAccounts: query.refetch,
  };
};
