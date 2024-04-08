import {
  CheckCircledIcon,
  CircleIcon,
  Link1Icon,
  StitchesLogoIcon,
} from '@radix-ui/react-icons';
import { Button, Card, Typography } from '../../../components/ui';
import {
  useConnectionLink,
  useOnboarding,
  useYNABConnect,
} from '../../../hooks';
import { LoadingPage } from '../../../components/LoadingPage.component';
import { useModal } from '../../../components/Modal/modal';
import { Modals } from '../../modals';
import { useNavigate } from 'react-router-dom';
import { useCustomer } from '../../../hooks/auth/useCustomer';
import { FC } from 'react';

export const OnboardingPage: FC = () => {
  const { connectBanking, isCreatingConnection } = useConnectionLink();
  const { isCompleted, stepsCompleted, isLoading } = useOnboarding();
  const { connectBudgets } = useYNABConnect();
  const { openModal } = useModal(Modals.ConnectionLink);
  const navigate = useNavigate();
  const { customer } = useCustomer();

  const handleOnboardingCompleted = () => {
    navigate('/dashboard');
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-screen h-screen overflow-hidden">
      <header className="w-full flex justify-between p-4">
        <div className="flex items-center gap-2">
          <StitchesLogoIcon />
          <Typography.H2>Bync</Typography.H2>
        </div>
        <Button disabled={!isCompleted} onClick={handleOnboardingCompleted}>
          Completar onboarding
        </Button>
      </header>

      <div className="w-full h-full flex items-center justify-center">
        <div className="items-center max-w-96">
          <div className="flex flex-col justify-center items-center text-center">
            <Typography.H2>Bem-vindo, {customer?.fullName}</Typography.H2>
            <div className="flex justify-center text-center">
              Para conseguirmos sincronizar suas contas, precisamos que você
              complete os seguintes passos
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleted.bankAccounts ? (
                  <CheckCircledIcon />
                ) : (
                  <CircleIcon />
                )}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Contas bancárias
                  </p>
                  <p className="text-sm text-muted-foreground">
                    dasoundsaodasun
                  </p>
                </div>
              </div>
              <div>
                {!stepsCompleted.bankAccounts && (
                  <Button
                    disabled={isCreatingConnection}
                    onClick={connectBanking}
                  >
                    <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                  </Button>
                )}
              </div>
            </Card.Container>

            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleted.ynabAccounts ? (
                  <CheckCircledIcon />
                ) : (
                  <CircleIcon />
                )}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Contas do Ynab
                  </p>
                  <p className="text-sm text-muted-foreground">
                    dasoundsaodasun
                  </p>
                </div>
              </div>
              <div>
                {!stepsCompleted.ynabAccounts && (
                  <Button onClick={connectBudgets}>
                    <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                  </Button>
                )}
              </div>
            </Card.Container>

            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleted.connection ? (
                  <CheckCircledIcon />
                ) : (
                  <CircleIcon />
                )}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Sincronizar contas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    dasoundsaodasun
                  </p>
                </div>
              </div>
              <div>
                {!stepsCompleted.connection && (
                  <Button
                    onClick={openModal}
                    disabled={
                      !stepsCompleted.bankAccounts ||
                      !stepsCompleted.ynabAccounts
                    }
                  >
                    <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                  </Button>
                )}
              </div>
            </Card.Container>
          </div>
        </div>
      </div>
    </div>
  );
};
