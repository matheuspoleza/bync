import { useBankingAccounts } from './banking';
import { useBudgetAccounts } from './budgets';

export const useOnboarding = () => {
  const budgetAccounts = useBudgetAccounts();
  const bankingAccounts = useBankingAccounts();
  const isComplete =
    bankingAccounts.accounts.length && budgetAccounts.accounts.length;
  return { isComplete };
};
