import { useQuery, DefinedInitialDataOptions } from "@tanstack/react-query";
import * as api from "../../api";
import { BankAccount } from "../../api/types";

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
    initialData: [] as BankAccount[],
    refetchOnMount: true,
    ...options,
  });

  return {
    accounts: query.data as BankAccount[],
    isFetching: query.isLoading,
    fetchBankAccounts: query.refetch,
  };
};
