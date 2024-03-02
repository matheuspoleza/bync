import { Grid, Box, Typography, Button } from '@mui/material';
import { useYNABConnect } from '../../../hooks/ynab';

export const OnboardingYNABAccountsStep = () => {
  const { connectBudgets } = useYNABConnect();

  const handleYnabConnected = () => {
    connectBudgets();
  };

  return (
    <Grid item>
      <Box>{/* // add logo here */}</Box>
      <Typography>Step 2/3</Typography>
      <Typography variant="h5">Conectar budgets ynab</Typography>
      <Button
        variant="contained"
        style={{ borderRadius: '16px' }}
        fullWidth
        onClick={handleYnabConnected}
      >
        Conectar
      </Button>
    </Grid>
  );
};
