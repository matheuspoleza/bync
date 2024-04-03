"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button, Command, Popover } from "./ui";
import { cn } from "./ui/lib/utils";
import { YnabAccount } from "../api/types";

interface YnabAccountSelectProps {
  accounts: YnabAccount[];
  value: string;
  onChange: (value: string) => void;
}

export const YnabAccountSelect: React.FC<YnabAccountSelectProps> = ({
  accounts,
  value,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? accounts.find((account) => account.id === value)?.name
            : "Seleciona uma conta ynab"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] p-0">
        <Command.Command>
          <Command.Input placeholder="Buscar conta ynab..." />
          <Command.Empty>Nenhuma conta ynab encontrada.</Command.Empty>
          <Command.Group>
            {accounts.map((account) => (
              <Command.Item
                key={account.id}
                value={account.id}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === account.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {account.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.Command>
      </Popover.Content>
    </Popover.Root>
  );
};
