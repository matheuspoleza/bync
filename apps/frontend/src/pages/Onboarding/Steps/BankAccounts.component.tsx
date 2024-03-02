import { useState } from 'react';
import { useBelvo } from '../../../hooks/belvo';
import { api } from '../../../clients';
import { Grid, Box, Typography, Button } from '@mui/material';

export const OnboardingBankAccountsStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const { createWidget } = useBelvo({
    onSuccess: async ({ link, institution }) => {
      if (isCreatingLink) return;
      setIsCreatingLink(true);

      try {
        await api.createBankLink({ linkID: link, institution });
      } catch (e) {
        console.log('Error creating link', e);
      } finally {
        setIsLoading(false);
        setIsCreatingLink(false);
      }
    },
  });

  const handleAccountsConnect = async () => {
    setIsLoading(true);
    createWidget();
  };

  return (
    <Grid item>
      <Box>{/* // add logo here */}</Box>
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
  );
};
