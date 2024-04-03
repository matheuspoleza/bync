import {
  CheckCircledIcon,
  CircleIcon,
  Link1Icon,
  StitchesLogoIcon,
} from "@radix-ui/react-icons";
import { Button, Card, Typography } from "../../../components/ui";
import {
  useConnectionLink,
  useOnboarding,
  useYNABConnect,
} from "../../../hooks";

export const OnboardingPage: React.FC = () => {
  const { connect, isCreatingConnection } = useConnectionLink();
  const { isCompleted, stepsCompleteMapper } = useOnboarding();
  const { connectBudgets } = useYNABConnect();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <header className="w-full flex justify-between p-4">
        <div className="flex items-center gap-2">
          <StitchesLogoIcon />
          <Typography.H2>Bync</Typography.H2>
        </div>
        <Button disabled={!isCompleted}>Completar onboarding</Button>
      </header>

      <div className="w-full h-full flex items-center justify-center">
        <div className="items-center max-w-96">
          <div className="flex flex-col justify-center items-center text-center">
            <Typography.H2>Bem-vindo, Matheus</Typography.H2>
            <div className="flex justify-center text-center">
              Para conseguirmos sincronizar suas contas, precisamos que você
              complete os seguintes passos
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleteMapper.bankAccounts ? (
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
                {!stepsCompleteMapper.bankAccounts && (
                  <Button disabled={isCreatingConnection} onClick={connect}>
                    <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                  </Button>
                )}
              </div>
            </Card.Container>

            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleteMapper.ynabAccounts ? (
                  <CheckCircledIcon />
                ) : (
                  <CircleIcon />
                )}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Conta do Ynab
                  </p>
                  <p className="text-sm text-muted-foreground">
                    dasoundsaodasun
                  </p>
                </div>
              </div>
              <div>
                {!stepsCompleteMapper.ynabAccounts && (
                  <Button onClick={connectBudgets}>
                    <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                  </Button>
                )}
              </div>
            </Card.Container>

            <Card.Container className="flex justify-between p-4">
              <div className="flex">
                {stepsCompleteMapper.connection ? (
                  <CheckCircledIcon />
                ) : (
                  <CircleIcon />
                )}
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Criar conexões
                  </p>
                  <p className="text-sm text-muted-foreground">
                    dasoundsaodasun
                  </p>
                </div>
              </div>
              <div>
                <Button
                  disabled={
                    !stepsCompleteMapper.bankAccounts ||
                    !stepsCompleteMapper.ynabAccounts
                  }
                >
                  <Link1Icon className="mr-2 h-4 w-4" /> Conectar
                </Button>
              </div>
            </Card.Container>
          </div>
        </div>
      </div>
    </div>
  );
};
