import { ColumnDef } from '@tanstack/react-table';

import { accountTypes } from '../data/data';
import { BudgetAccount } from '../data/schema';
import { DataTableColumnHeader } from './DataTableColumnHeader.component';
import { currency } from '../../../utils';

export const columns: ColumnDef<BudgetAccount>[] = [
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
      const accountType = row.getValue('type');
      const accountTypeData = accountTypes.find(
        (type) => type.value === accountType
      );
      const label = accountTypeData?.label;
      // const AccountTypeIcon = accountTypeData?.icon;

      return (
        <div className="flex items-center gap-x-2">
          {/* {AccountTypeIcon && <AccountTypeIcon style={{ color: 'grey' }} />} */}
          {label}
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
          {currency.format(Number(row.getValue('balance')))}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'connectedBankAccountName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Conta bancária conectada" />
    ),
    cell: ({ row }) => {
      const connectedBankAccountName = row.getValue<string>(
        'connectedBankAccountName'
      );

      return (
        <div className="flex items-center">
          {connectedBankAccountName ?? '-'}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'connectionStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status da conexão" />
    ),
    cell: ({ row }) => {
      const connectionStatus = row.getValue<string>('connectionStatus');

      return <div className="flex items-center">{connectionStatus ?? '-'}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
