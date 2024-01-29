import { Box, EmptyPage } from '@bync/ui';

export const ConnectionsPage = () => {
  return (
    <Box direction="column" align="center" justify="center" height="100%">
      <EmptyPage
        title="Sem conexões"
        description="Parece que você não tem nenhuma conta bancária conectada ainda. Você precisa conectar seus budgets no YNAB e suas contas primeiramente. Assim podemos fazer as conexões entre eles."
        illustration="NoData"
        button={{
          label: 'Conectar contas bancárias',
        }}
      />
    </Box>
  );
};
