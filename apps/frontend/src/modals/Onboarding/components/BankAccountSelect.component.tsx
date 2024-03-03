'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '../../../components/ui/lib/utils';
import { Command, Popover, Button } from '../../../components/ui';
import { useBankingAccounts } from '../../../hooks/banking';

interface BankAccountSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

export const BankAccountSelect: React.FC<BankAccountSelectProps> = ({
  value,
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const { accounts: bankAccounts } = useBankingAccounts();

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '220px',
              opacity: value ? 1 : 0.5,
            }}
          >
            {value
              ? bankAccounts.find((account) => account.id === value)?.name
              : 'Selecione uma conta...'}
          </span>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px] p-0">
        <Command.Command>
          <Command.Input placeholder="Procurar conta..." className="h-9" />
          <Command.Empty>Nenhuma conta encontrada.</Command.Empty>
          <Command.Group>
            {bankAccounts.map((account) => (
              <Command.Item
                key={account.id}
                value={account.id}
                onSelect={(currentValue) => {
                  onSelect(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                {account.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === account.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </Command.Item>
            ))}
          </Command.Group>
        </Command.Command>
      </Popover.Content>
    </Popover.Root>
  );
};
