import { useEffect, useMemo } from 'react';
import { UserNav } from './components/UserNav.component';
import { DataTable } from './components/DataTable.component';
import { columns } from './components/Columns.component';
import { useBudgetAccounts } from '../../hooks/budgets';
import { BudgetAccount } from './data/schema';
import { useAtomValue } from 'jotai';
import * as atoms from '../../atoms';
import { useBankingAccounts } from '../../hooks/banking';
import { useModal } from '../../context/modal';
import { Modals } from '../../modals';
import { LoadingPage } from '../../components/LoadingPage.component';

export const DashboardPage = () => {
  const { accounts: budgetAccounts, isFetching: isBudgetAccountsLoading } =
    useBudgetAccounts();
  const connections = useAtomValue(atoms.connections.connections);
  const { accounts: bankAccounts, isFetching: isBankAccountsLoading } =
    useBankingAccounts();
  const isLoading = useMemo(
    () => isBankAccountsLoading || isBudgetAccountsLoading,
    [isBankAccountsLoading, isBudgetAccountsLoading]
  );
  const { openModal } = useModal(Modals.Onboarding);

  const budgetAccountsItems = useMemo(() => {
    return budgetAccounts?.map<BudgetAccount>((account) => {
      const connectedBankAccountID = connections[account.id];
      const connectedBankAccount = bankAccounts?.find(
        (bankAccount) => bankAccount.id === connectedBankAccountID
      );

      return {
        id: account.id,
        balance: account.balance,
        name: account.name,
        type: account.type,
        connectedBankAccountID: connectedBankAccountID,
        connectionStatus: connectedBankAccountID ? 'Conectado' : null,
        connectedBankAccountName: connectedBankAccount
          ? `${connectedBankAccount?.name} ${connectedBankAccount?.number}`
          : undefined,
      };
    });
  }, [budgetAccounts, bankAccounts, connections]);

  useEffect(() => {
    if (isLoading) return;

    if (!bankAccounts?.length) {
      openModal({ step: 'bank-accounts' });
      return;
    }

    if (!budgetAccounts?.length) {
      openModal({ step: 'budgets' });
      return;
    }

    if (!Object.keys(connections).length) {
      openModal({ step: 'connection' });
    }
  }, [bankAccounts, budgetAccounts, connections, isLoading]);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bem vindo de volta, Matheus!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão todos seus budgets e os status da integração para você
            acompanhar.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={budgetAccountsItems ?? []} columns={columns} />
    </div>
  );
};
