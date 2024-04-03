import * as api from "../../api";

import { YNAB_REDIRECT_URL } from "../../hooks/ynab";

export const ynabConnectedLoader = async ({ request }: any) => {
  const authCode = new URL(request.url).searchParams.get("code");

  if (authCode) {
    await api.ynab
      .authorize({
        authCode,
        redirectURL: YNAB_REDIRECT_URL,
      })
      .catch(() => null);

    await api.queryClient.refetchQueries({
      queryKey: ["ynab-accounts"],
      exact: true,
    });
  }

  return null;
};
