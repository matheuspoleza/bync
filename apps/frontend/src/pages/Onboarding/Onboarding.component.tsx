import { useLoaderData } from 'react-router-dom';
import { Button, Typography } from '../../components/ui';
import { useYNABConnect } from '../../hooks';
import { BankAccount, YnabAccount } from '../../api/types';

export const OnboardingPage: React.FC = () => {
  const { step } = useLoaderData() as {
    step: string;
    bankAccounts: BankAccount[];
    ynabAccounts: YnabAccount[];
    isLinked: boolean;
  };
  const { connectBudgets } = useYNABConnect();

  const handleYnabAccountsConnect = () => connectBudgets();

  if (step === 'bank-accounts') {
    return (
      <div>
        <Typography.H1>Onboarding</Typography.H1>
        <Typography.H4>2. Conectar contas bancárias</Typography.H4>
        <Button>Conectar</Button>
      </div>
    );
  }

  if (step === 'link-accounts') {
    return (
      <div>
        <Typography.H1>Onboarding</Typography.H1>
        <Typography.H4>3. Selectionar contas</Typography.H4>
        <Button>Conectar</Button>
      </div>
    );
  }

  return (
    <div>
      <Typography.H1>Onboarding</Typography.H1>
      <Typography.H4>1. Conectar contas ynab</Typography.H4>
      <Button onClick={handleYnabAccountsConnect}>Conectar</Button>
    </div>
  );
};
