import { StepProgress } from '../components/StepProgress.component';
import { Dialog, Button, Typography } from '../../ui';
import { BankAccountSelect } from '../components/BankAccountSelect.component';
import { useState } from 'react';
import { useYnabAccounts } from '../../../hooks';

interface OnboardingConnectionStepProps {
  onClose: VoidFunction;
}

export const OnboardingConnectionStep: React.FC<
  OnboardingConnectionStepProps
> = ({ onClose }) => {
  const { accounts: ynabAccounts } = useYnabAccounts();
  const [connections, setConnections] = useState<Record<string, any>>({});

  const handleBankAccountSelect = (
    ynabAccountId: string,
    accountId: string
  ) => {
    setConnections({ ...connections, [ynabAccountId]: accountId });
  };

  return (
    <Dialog.Root open>
      <Dialog.Content className="sm:max-w-[500px]">
        <StepProgress percentage={100} />

        <Dialog.Header>
          <Dialog.Title className="flex">Conexão</Dialog.Title>
          <Dialog.Description>
            Chegou o momento de alinhar suas contas bancárias aos budgets do
            YNAB. Selecione uma conta bancária para cada budget para manter seu
            acompanhamento financeiro preciso e facilitar a gestão do seu
            dinheiro.
          </Dialog.Description>
        </Dialog.Header>

        <div className="flex flex-col gap-3">
          {ynabAccounts?.map((ynabAccount) => (
            <div
              className="flex justify-between w-full"
              style={{ alignItems: 'center' }}
              key={ynabAccount.id}
            >
              <Typography.Small>{ynabAccount.name}</Typography.Small>
              <BankAccountSelect
                value={connections[ynabAccount.id]}
                onSelect={(accountId) =>
                  handleBankAccountSelect(ynabAccount.id, accountId)
                }
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button type="submit" onClick={onClose}>
            Salvar
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
