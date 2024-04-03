import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import * as api from "../../api";
import { YnabAccount } from "../../api/types";

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
    initialData: [] as YnabAccount[],
    refetchOnMount: true,
    ...options,
  });

  return {
    accounts: query.data as YnabAccount[],
    isFetching: query.isLoading,
    fetchYnabAccounts: query.refetch,
  };
};
