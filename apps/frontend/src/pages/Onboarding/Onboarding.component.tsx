import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { OnboardingBankAccountsStep } from './Steps/BankAccounts.component';
import { OnboardingYNABAccountsStep } from './Steps/YNABAccounts.component';

export const OnboardingPage = () => {
  const { step: activeStep } = useParams();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      {activeStep === 'banking' && <OnboardingBankAccountsStep />}
      {activeStep === 'ynab' && <OnboardingYNABAccountsStep />}
    </Grid>
  );
};
