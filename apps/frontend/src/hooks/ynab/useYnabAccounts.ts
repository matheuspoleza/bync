import { useQuery } from "@tanstack/react-query";
import * as api from "../../api";

export const useYnabAccounts = (options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ["ynab-accounts"],
    queryFn: () => {
      return api.ynab.getAll();
    },
    enabled: options?.enabled ?? true,
    throwOnError: false,
    retry: false,
    initialData: [],
    refetchOnMount: true,
  });

  return {
    accounts: query.data,
    isFetching: query.isLoading,
    fetchYnabAccounts: query.refetch,
  };
};
