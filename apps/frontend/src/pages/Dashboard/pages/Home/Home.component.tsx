import { Box, Text, Surface, Tokens } from '@bync/ui';

export const Homepage = () => {
  return (
    <Box px={64} mt={-16} pb={120} direction="column" height="100%">
      <Text variant="h2">Dashboard</Text>

      <Box mt={32} direction="column" width="100%" gap={4}>
        <Text style={{ fontSize: '15px' }}>Essa semana</Text>
        <Box>
          <Surface width="100%" height="100px">
            <Box height="100%">
              <Box
                width="100%"
                height="100%"
                style={{
                  borderRight: `1px solid ${Tokens.colors.neutralLight.neutralsLight100}`,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 200 }}>
                  Transferido
                </Text>
              </Box>
              <Box
                width="100%"
                height="100%"
                style={{
                  borderRight: `1px solid ${Tokens.colors.neutralLight.neutralsLight100}`,
                }}
              >
                <Text>Pendente</Text>
              </Box>
              <Box width="100%" height="100%">
                <Text>Falhas</Text>
              </Box>
            </Box>
          </Surface>
        </Box>
      </Box>

      <Box mt={32} height="100%" gap={32}>
        <Box width="100%">
          <Surface width="100%" height="100%">
            <Text>Primeiros passos</Text>
          </Surface>
        </Box>

        <Box direction="column" width="100%" gap={32}>
          <Surface width="100%" height="100%">
            <Text>Contas</Text>
          </Surface>
          <Surface width="100%" height="100%">
            <Text>Transações</Text>
          </Surface>
        </Box>

        <Box direction="column" width="100%" gap={32}>
          <Surface width="100%" height="100%">
            <Text>Budgets</Text>
          </Surface>
          <Surface width="100%" height="100%">
            <Text>Importar manualmente (em breve)</Text>
          </Surface>
        </Box>
      </Box>
    </Box>
  );
};
