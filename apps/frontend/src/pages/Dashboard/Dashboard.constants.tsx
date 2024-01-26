import { BudgetsPage } from './pages/Budgets/Budgets.component';
import { ConnectionsPage } from './pages/Connections/Connections.component';
import { Homepage } from './pages/Home/Home.component';
import { SourcesPage } from './pages/Sources/Sources.component';
import { TransactionsPage } from './pages/Transactions/Transactions.component';

export enum DashboardTabs {
  TRANSACTIONS = 'transactions',
  SOURCES = 'sources',
  CONNECTIONS = 'connections',
  BUDGETS = 'budgets',
  HOME = 'home',
}

export const DashboardTabsMapper = {
  [DashboardTabs.HOME]: {
    label: 'transações',
    render: () => <Homepage />,
    header: false,
  },
  [DashboardTabs.TRANSACTIONS]: {
    label: 'transações',
    render: () => <TransactionsPage />,
    header: true,
  },
  [DashboardTabs.SOURCES]: {
    label: 'contas',
    render: () => <SourcesPage />,
    header: true,
  },
  [DashboardTabs.CONNECTIONS]: {
    label: 'conexões',
    render: () => <ConnectionsPage />,
    header: true,
  },
  [DashboardTabs.BUDGETS]: {
    label: 'budgets',
    render: () => <BudgetsPage />,
    header: true,
  },
};
