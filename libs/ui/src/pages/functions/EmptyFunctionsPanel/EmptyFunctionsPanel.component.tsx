import { Box, Button, EmptyPage } from '@/components';

export const EmptyFunctionsPanel = () => {
  return (
    <Box justify="center" align="center" pt={36} direction="column">
      <EmptyPage
        title="No functions exist"
        illustration="Functions"
        description="Functions can be used to create reusable code, make API calls, and transforming data. "
        learnMoreLink="www.voiceflow.com"
      />
      <Box width="280px" px={24} py={16}>
        <Button label="Create function" fullWidth={true} />
      </Box>
    </Box>
  );
};
