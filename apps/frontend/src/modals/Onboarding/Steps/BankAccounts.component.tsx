import { useState } from 'react';
import { useBelvo } from '../../../hooks/belvo';
import { StepProgress } from '../components/StepProgress.component';
import { Dialog, Typography, Button, toast } from '../../../components/ui';
import { LockClosedIcon } from '@radix-ui/react-icons';
import * as api from '../../../clients/api';

export const OnboardingBankAccountsStep: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectingBankAccounts, setIsConnectingBankAccounts] =
    useState(false);

  const { createWidget } = useBelvo({
    onSuccess: async ({ link, institution }) => {
      setIsLoading(true);

      try {
        await api.banking.createConnection({ linkId: link, institution });
      } finally {
        setIsLoading(false);
      }
    },
    onExit: () => setIsConnectingBankAccounts(false),
    onPageLoad: () => {
      setIsConnectingBankAccounts(true);
      setIsLoading(false);
    },
  });

  const handleConnectBankAccounts = async () => {
    setIsLoading(true);

    try {
      await createWidget();
    } catch (e) {
      console.log('error', e);
      toast({
        variant: 'destructive',
        title: 'Não foi possível conectar ao provedor',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={!isConnectingBankAccounts}>
      <Dialog.Content className="sm:max-w-[425px]">
        <StepProgress percentage={30} />

        <Dialog.Header>
          <Dialog.Title className="flex">Contas bancárias</Dialog.Title>
          <Dialog.Description>
            Para iniciar a sincronização automática de transações e manter seu
            orçamento sempre atualizado, conecte-se às suas contas bancárias.
          </Dialog.Description>
        </Dialog.Header>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-start sm:space-x-2">
          <div>
            <Button
              type="submit"
              onClick={handleConnectBankAccounts}
              disabled={isLoading}
            >
              Conectar agora
            </Button>

            <div className="flex gap-x-1 mt-2">
              <LockClosedIcon opacity={0.3} />

              <Typography.Caption>
                Dados protegidos pela{' '}
                <a
                  href="https://belvo.com/privacy-policy-clients/"
                  target="open"
                  className="underline hover:underline"
                >
                  Belvo
                </a>
                .
              </Typography.Caption>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
