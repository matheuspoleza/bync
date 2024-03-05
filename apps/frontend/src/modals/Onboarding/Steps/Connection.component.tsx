import { StepProgress } from '../components/StepProgress.component';
import { Dialog, Button, Typography } from '../../../components/ui';
import { BankAccountSelect } from '../components/BankAccountSelect.component';
import { useBudgetAccounts } from '../../../hooks/budgets';
import { useAtom } from 'jotai';
import * as atoms from '../../../atoms';

interface OnboardingConnectionStepProps {
  onClose: VoidFunction;
}

export const OnboardingConnectionStep: React.FC<
  OnboardingConnectionStepProps
> = ({ onClose }) => {
  const { accounts: budgetAccounts } = useBudgetAccounts();
  const [connections, setConnections] = useAtom(atoms.connections.connections);

  const handleBankAccountSelect = (
    budgetAccountID: string,
    accountID: string
  ) => {
    setConnections({ ...connections, [budgetAccountID]: accountID });
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
          {budgetAccounts?.map((budgetAccount) => (
            <div
              className="flex justify-between w-full"
              style={{ alignItems: 'center' }}
              key={budgetAccount.id}
            >
              <Typography.Small>{budgetAccount.name}</Typography.Small>
              <BankAccountSelect
                value={connections[budgetAccount.id]}
                onSelect={(accountID) =>
                  handleBankAccountSelect(budgetAccount.id, accountID)
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
