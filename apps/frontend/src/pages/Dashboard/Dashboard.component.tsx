import { useEffect, useMemo } from 'react';
import { useModal } from '../../context/modal';
import { Modals } from '../../modals';
import { useOnboarding } from '../../hooks/onboarding';
import { UserNav } from './components/UserNav.component';
import { DataTable } from './components/DataTable.component';
import { columns } from './components/Columns.component';
import { useBudgetAccounts } from '../../hooks/budgets';
import { BudgetAccount } from './data/schema';
import { useAtomValue } from 'jotai';
import * as atoms from '../../atoms';
import { useBankingAccounts } from '../../hooks/banking';

export const DashboardPage = () => {
  const { openModal } = useModal(Modals.Onboarding);
  const { step, isComplete, isLoading } = useOnboarding();
  const { accounts: budgetAccounts } = useBudgetAccounts();
  const connections = useAtomValue(atoms.connections.connections);
  const { accounts: bankAccounts } = useBankingAccounts();

  const budgetAccountsItems = useMemo(() => {
    return budgetAccounts.map<BudgetAccount>((account) => {
      const connectedBankAccountID = connections[account.id];
      const connectedBankAccount = bankAccounts.find(
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
    if (!isComplete && !isLoading) {
      openModal({ step });
    }
  }, [step, isComplete, isLoading]);

  if (isLoading) return <div>is loading</div>;

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
      <DataTable data={budgetAccountsItems} columns={columns} />
    </div>
  );
};
