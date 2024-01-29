import { Box, Table } from '@bync/ui';
import { useYNABConnect } from '../../../../hooks/ynab';
import { useBudgetAccounts } from '../../../../hooks/budgets';
import { LoadingPage } from './components/LoadingPage.component';
import { EmptyPage } from './components/EmptyPage.component';
import { BudgetsTableConfig, columnsOrderAtom } from './Budgets.constant';

export const BudgetsPage = () => {
  const { connectBudgets } = useYNABConnect();
  const { accounts, isFetching, accountAtoms } = useBudgetAccounts();

  if (isFetching) return <LoadingPage />;
  if (!accounts?.length) return <EmptyPage onConnect={connectBudgets} />;

  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      height="100%"
      width="100%"
      mt={32}
    >
      <Table.StateProvider value={{}}>
        <Table
          config={BudgetsTableConfig}
          itemsAtom={accountAtoms}
          onRowClick={() => null}
          onRowNavigate={() => null}
          columnsOrderAtom={columnsOrderAtom}
        />
      </Table.StateProvider>
    </Box>
  );
};
