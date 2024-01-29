import { Box, EmptyPage } from '@bync/ui';

export const SourcesPage = () => {
  return (
    <Box direction="column" align="center" justify="center" height="100%">
      <EmptyPage
        title="Nenhuma conta bancária conectada"
        description="Você ainda não conectou nenhuma conta bancária. Conecte suas contas para buscarmos informações e deixarmos seus budgets atualizados."
        illustration="NoData"
        button={{
          label: 'Conectar',
        }}
      />
    </Box>
  );
};
