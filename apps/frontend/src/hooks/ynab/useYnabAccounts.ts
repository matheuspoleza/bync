import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import * as api from "../../api";

export const useYnabAccounts = (
  options?: Partial<DefinedInitialDataOptions>
) => {
  const query = useQuery({
    queryKey: ["ynab-accounts"],
    queryFn: () => {
      return api.ynab.getAll();
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
    fetchYnabAccounts: query.refetch,
  };
};
