import React, { useEffect } from "react";
import * as api from "../../api";

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [stepsCompleteMapper, setStepsCompleteMapper] = React.useState({});
  const [isCompleted, setIsCompleted] = React.useState(false);

  const calculateOnboarding = async () => {
    try {
      const bankAccounts = await api.banking.getAccounts();
      const ynabAccounts = await api.ynab.getAll();

      const stepsCompleteMapper = {
        bankAccounts: !!bankAccounts?.length,
        ynabAccounts: !!ynabAccounts?.length,
        connection: !!ynabAccounts?.some(
          (account) => account.linkedBankAccountId
        ),
      };

      const isCompleted = Object.values(stepsCompleteMapper).every(
        (step) => step
      );

      setStepsCompleteMapper(stepsCompleteMapper);
      setIsCompleted(isCompleted);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateOnboarding();
  }, []);

  return {
    isCompleted,
    stepsCompleteMapper,
    isLoading,
  };
};
