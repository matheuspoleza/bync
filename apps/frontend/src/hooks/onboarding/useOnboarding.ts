import React from "react";
import { useBankAccounts, useYnabAccounts } from "..";

export const useOnboarding = () => {
  const { accounts: bankAccounts } = useBankAccounts();
  const { accounts: ynabAccounts } = useYnabAccounts();

  console.log({ bankAccounts });

  const stepsCompleteMapper = React.useMemo(() => {
    return {
      bankAccounts: !!bankAccounts?.length,
      ynabAccounts: !!ynabAccounts?.length,
      connection: !!ynabAccounts?.some(
        (account) => account.linkedBankAccountId
      ),
    };
  }, [bankAccounts, ynabAccounts]);

  const isCompleted = React.useMemo(
    () => Object.values(stepsCompleteMapper).every((step) => step),
    [stepsCompleteMapper]
  );

  return { isCompleted, stepsCompleteMapper };
};
