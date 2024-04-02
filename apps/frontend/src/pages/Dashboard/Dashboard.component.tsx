import { UserNav } from './components/UserNav.component';

export const DashboardPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
    </div>
  );
};
