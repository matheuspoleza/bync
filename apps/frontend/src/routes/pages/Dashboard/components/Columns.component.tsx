import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './DataTableColumnHeader.component';
import { BankAccount } from '../../../../api/types';
import Formatter from '../../../../components/Formatter';
import { useYnabAccounts } from '../../../../hooks';

export const columns: ColumnDef<BankAccount>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      // const accountType = row.getValue('type');
      // const accountTypeData = accountTypes.find(
      //   (type) => type.value === accountType
      // );
      // const label = accountTypeData?.label;

      return (
        <div className="flex items-center gap-x-2">
          {row.getValue('type')}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Formatter.Money value={row.getValue('balance')} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Conta ynab" />
    ),
    cell: ({ row }) => {
      const { accounts } = useYnabAccounts();
      const connectedAccount = accounts.find(account => account.linkedBankAccountId && account.linkedBankAccountId === row.getValue('id'));

      return (
        <div className="flex items-center">
          {connectedAccount?.name ?? '-'}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
