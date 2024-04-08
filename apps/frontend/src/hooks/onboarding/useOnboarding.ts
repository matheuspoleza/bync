import React, { useEffect } from 'react';
import * as api from '../../api';

type StepsCompleted = {
  bankAccounts: boolean;
  ynabAccounts: boolean;
  connection: boolean;
};

export const useOnboarding = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [stepsCompleted, setStepsCompleted] = React.useState<StepsCompleted>({
    bankAccounts: false,
    ynabAccounts: false,
    connection: false,
  });

  const calculateOnboarding = async () => {
    try {
      const bankAccounts = await api.banking.getAccounts();
      const ynabAccounts = await api.ynab.getAll();

      const stepsCompleteMapper = {
        bankAccounts: bankAccounts.length > 0,
        ynabAccounts: ynabAccounts.length > 0,
        connection: ynabAccounts.some((account) => account.linkedBankAccountId),
      };

      const isCompleted = Object.values(stepsCompleteMapper).every(
        (step) => step,
      );

      setStepsCompleted(stepsCompleteMapper);
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
    stepsCompleted,
    isLoading,
  };
};
