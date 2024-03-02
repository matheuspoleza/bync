import { useEffect, useMemo, useState } from 'react';
import { BankAccount } from '../../models/BankAccount';
import { BudgetAccount } from '../../models/BudgetAccounts';

export const useConnectionsForm = ({
  bankAccounts,
  budgetAccounts,
}: {
  bankAccounts: BankAccount[];
  budgetAccounts: BudgetAccount[];
}) => {
  const [connections, setConnections] = useState<
    Record<string, { bankAccountID: string; budgetAccountID: string }>
  >({});
  const [connectedBankAccountIDs, setConnectedBankAccountIDs] = useState<
    string[]
  >([]);
  const [connectedBudgetAccountIDs, setConnectedBudgetAccountIds] = useState<
    string[]
  >([]);

  const onBudgetAccountSelect = (
    connectionID: string,
    budgetAccountID: string
  ) => {
    setConnections({
      ...connections,
      [connectionID]: { ...connections[connectionID], budgetAccountID },
    });

    setConnectedBudgetAccountIds([
      ...connectedBudgetAccountIDs,
      budgetAccountID,
    ]);
  };

  const onBankAccountSelect = (connectionID: string, bankAccountID: string) => {
    setConnections({
      ...connections,
      [connectionID]: { ...connections[connectionID], bankAccountID },
    });

    setConnectedBankAccountIDs([...connectedBankAccountIDs, bankAccountID]);
  };

  const bankAccountsMap = useMemo(() => {
    return bankAccounts.reduce<Record<string, BankAccount>>(
      (acc, account) => ({
        ...acc,
        [account.id]: account,
      }),
      {}
    );
  }, [bankAccounts]);

  const budgetAccountsMap = useMemo(() => {
    return budgetAccounts.reduce<Record<string, BudgetAccount>>(
      (acc, account) => ({
        ...acc,
        [account.id]: account,
      }),
      {}
    );
  }, [budgetAccounts]);

  useEffect(() => {
    setConnections(
      bankAccounts.reduce(
        (acc) => ({
          ...acc,
          [crypto.randomUUID()]: {
            bankAccountID: '',
            ynabAccountID: '',
          },
        }),
        {}
      )
    );
  }, [bankAccounts]);

  return {
    connections,
    connectedBankAccountIDs,
    connectedBudgetAccountIDs,
    bankAccountsMap,
    budgetAccountsMap,
    onBankAccountSelect,
    onBudgetAccountSelect,
  };
};
