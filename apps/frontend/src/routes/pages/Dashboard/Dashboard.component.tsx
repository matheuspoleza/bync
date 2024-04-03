import { useBankAccounts } from '../../../hooks';
import { useCustomer } from '../../../hooks/auth/useCustomer';
import { columns } from './components/Columns.component';
import { DataTable } from './components/DataTable.component';
import { UserNav } from './components/UserNav.component';

export const DashboardPage = () => {
  const { customer } = useCustomer();
  const { accounts: bankAccounts } = useBankAccounts();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Bem vindo de volta, {customer?.fullName}!
          </h2>
          <p className="text-muted-foreground">
            Aqui estão todas suas contas bancárias conectas e os status da integração com suas contas do ynab para você
            acompanhar.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>

      <DataTable data={bankAccounts} columns={columns} />
    </div>
  );
};
