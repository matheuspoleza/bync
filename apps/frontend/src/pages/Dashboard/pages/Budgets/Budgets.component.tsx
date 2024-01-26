import { Box, EmptyPage } from '@bync/ui';

export const BudgetsPage = () => {
  return (
    <Box direction="column" align="center" justify="center" height="100%">
      <EmptyPage
        title="Nenhum budget conectado"
        description="Importe transações automaticamente e mantenha seus budgets atualizados com facilidade."
        illustration="NoData"
        button={{
          label: 'Conectar ao YNAB',
        }}
      />
    </Box>
  );
};
