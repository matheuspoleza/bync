import { CableIcon } from "lucide-react";
import { modalsManager } from "../../components/Modal/modal";
import { YnabAccountSelect } from "../../components/YnabAccountSelect.component";
import { Button, Dialog } from "../../components/ui";
import { useBankAccounts, useYnabAccounts } from "../../hooks";
import { useState } from "react";
import * as api from "../../api";

export const ConnectionLinkModal = modalsManager.register(
  "ConnectionLink",
  () => {
    const { accounts } = useBankAccounts();
    const { accounts: ynabAccounts } = useYnabAccounts();
    const [connections, setConnections] = useState<
      Record<string, { ynabAccountId: string; bankAccountId: string }>
    >({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = (bankAccountId: string, ynabAccountId: string) => {
      setConnections((prev) => ({
        ...prev,
        [bankAccountId]: {
          bankAccountId,
          ynabAccountId,
        },
      }));
    };

    const handleSave = async () => {
      if (Object.keys(connections).length === 0) return;

      setIsLoading(true);
      try {
        await api.ynab.createManyLinks(Object.values(connections));
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog.Root open>
        <Dialog.Content className="sm:max-w-[625px]">
          <Dialog.Header>
            <Dialog.Title>Sincronizar contas</Dialog.Title>
            <Dialog.Description>
              Selecione qual conta do YNAB deve ser sincronizada com qual conta
              bancária.
            </Dialog.Description>
          </Dialog.Header>

          <div>
            {accounts.map((account) => (
              <div key={account.id} className="flex justify-between">
                <div>
                  <div>{account.name}</div>
                  <div>{account.balance}</div>
                </div>

                <div>
                  <CableIcon />
                </div>

                <div>
                  <YnabAccountSelect
                    accounts={ynabAccounts}
                    onChange={(value) => handleSelect(account.id, value)}
                    value={connections[account.id]?.ynabAccountId || ""}
                  />
                </div>
              </div>
            ))}
          </div>

          <Dialog.Footer>
            <Button type="submit" disabled={isLoading} onClick={handleSave}>
              Salvar
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  }
);
