import { useEffect, useMemo, useState } from 'react';
import { useBankingAccounts } from './banking';
import { useBudgetAccounts } from './budgets';
import { useAtomValue } from 'jotai';
import * as atoms from '../atoms';

export const useOnboarding = () => {
  const budgetAccounts = useBudgetAccounts();
  const bankingAccounts = useBankingAccounts();
  const connections = useAtomValue(atoms.connections.connections);
  const isComplete = !!(
    bankingAccounts.accounts.length &&
    budgetAccounts.accounts.length &&
    Object.values(connections).length
  );
  const [isLoading, setIsLoading] = useState(true);

  const step = useMemo(() => {
    if (!bankingAccounts.accounts.length) return 'bank-accounts';
    if (!budgetAccounts.accounts.length) return 'budgets';
    return 'connection';
  }, [bankingAccounts.accounts, budgetAccounts.accounts.length]);

  useEffect(() => {
    budgetAccounts.fetchBudgetAccounts();
    bankingAccounts.fetchBankAccounts();
  }, []);

  useEffect(() => {
    if (!bankingAccounts.isFetching && !budgetAccounts.isFetching) {
      setIsLoading(false);
    }

    if (bankingAccounts.isFetching || budgetAccounts.isFetching) {
      setIsLoading(true);
    }
  }, [bankingAccounts.isFetching, budgetAccounts.isFetching]);

  return {
    step,
    isComplete,
    isLoading,
  };
};
