import { Grid, Typography, Box, Button, Select, MenuItem } from '@mui/material';
import { ByncLogo } from '../Dashboard/components/ByncLogo.component';
import { useState } from 'react';
import { useBelvo } from '../../hooks/belvo';
import { useYNABConnect } from '../../hooks/ynab';
import { useParams } from 'react-router-dom';
import { useBudgetAccounts } from '../../hooks/budgets';
import PendingIcon from '@mui/icons-material/PendingOutlined';
import * as api from '../../clients/api';

export const OnboardingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { step } = useParams();

  const [activeStep, setActiveStep] = useState<string>(step ?? 'banking');

  const { createWidget } = useBelvo({
    onSuccess: async ({ link, institution }) => {
      await api.createBankLink({ linkID: link, institution });
      setActiveStep('ynab');
      setIsLoading(false);
    },
  });

  const { connectBudgets } = useYNABConnect();
  const budgetAccounts = useBudgetAccounts();

  const handleAccountsConnect = async () => {
    setIsLoading(true);
    createWidget();
  };

  const handleYnabConnected = () => {
    connectBudgets();
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {activeStep === 'banking' && (
        <Grid item>
          <Box>
            <ByncLogo fill="black" />
          </Box>
          <Typography>Step 1/3</Typography>
          <Typography variant="h5">Conectar contas bancárias</Typography>
          <Button
            variant="contained"
            style={{ borderRadius: '16px' }}
            fullWidth
            onClick={handleAccountsConnect}
            disabled={isLoading}
          >
            Conectar
          </Button>
        </Grid>
      )}

      {activeStep === 'ynab' && (
        <Grid item>
          <Box>
            <ByncLogo fill="black" />
          </Box>
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
      )}

      {activeStep === 'connection' && (
        <Grid item>
          <Box>
            <ByncLogo fill="black" />
          </Box>
          <Typography>Step 3/3</Typography>

          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              minWidth="500px"
              width="100%"
            >
              <Box minWidth="150px">
                <Select fullWidth />
              </Box>

              <Box>
                <PendingIcon />
              </Box>

              <Box minWidth="150px">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value=""
                  label="Conta do YNAB"
                  onChange={() => null}
                  fullWidth
                >
                  {budgetAccounts.accounts.map((budgetAccount) => (
                    <MenuItem key={budgetAccount.id} value={budgetAccount.id}>
                      {budgetAccount.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            <Box>
              <Button>+</Button>
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
