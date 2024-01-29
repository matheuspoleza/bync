import { Box, EmptyPage as EmptyPageUI } from '@bync/ui';

interface EmptyPageProps {
  onConnect: () => void;
}

export const EmptyPage: React.FC<EmptyPageProps> = ({ onConnect }) => {
  return (
    <Box direction="column" align="center" justify="center" height="100%">
      <EmptyPageUI
        title="Nenhum budget conectado"
        description="Importe transações automaticamente e mantenha seus budgets atualizados com facilidade."
        illustration="NoData"
        button={{
          label: 'Conectar ao YNAB',
          onClick: onConnect,
        }}
      />
    </Box>
  );
};
