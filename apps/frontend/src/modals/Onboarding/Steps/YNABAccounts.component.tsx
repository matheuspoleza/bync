import { StepProgress } from '../components/StepProgress.component';
import { Dialog, Typography, Button } from '../../../components/ui';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { useYNABConnect } from '../../../hooks/ynab';

export const OnboardingYNABAccountsStep = () => {
  const { connectBudgets } = useYNABConnect();

  const handleYnabConnected = () => {
    connectBudgets();
  };

  return (
    <Dialog.Root open>
      <Dialog.Content className="sm:max-w-[425px]">
        <StepProgress percentage={70} />

        <Dialog.Header>
          <Dialog.Title className="flex">Contas YNAB</Dialog.Title>
          <Dialog.Description>
            Agora, vamos vincular suas contas do YNAB. Isso nos permite
            sincronizar seu orçamento e assegurar que suas transações estejam
            sempre alinhadas com seus objetivos financeiros.
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-start sm:space-x-2">
          <div>
            <Button type="submit" onClick={handleYnabConnected}>
              Conectar agora
            </Button>

            <div className="flex gap-x-1 mt-2">
              <LockClosedIcon opacity={0.3} />

              <Typography.Caption>
                A conexão é segura e criptografada
              </Typography.Caption>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
