import { Table, TableConfig, Tooltip, Text, Tokens } from '@bync/ui';
import { withGroupsOrder } from '../../../../utils/table';
import { atom } from 'jotai';
import {
  BudgetAccount,
  BudgetAccountType,
} from '../../../../models/BudgetAccounts';

export const columnsOrderAtom = atom([
  { type: 'select', size: Table.Header.Cell.Select.CELL_WIDTH },
  { type: 'name' },
  { type: 'type' },
  { type: 'balance' },
  { type: 'uncleared_balance' },
  { type: 'date' },
]);

const ACCOUNT_TYPE_LABEL_MAPPER: { [keyof in BudgetAccountType]: string } = {
  checking: 'Conta corrente',
  autoLoan: 'Financiamento de carro',
  creditCard: 'Cartão de Crédito',
  mortgage: 'Financiamento de imóvel',
  otherAsset: 'Investimento',
  otherDebt: 'Empréstimo',
};

const formatBRL = (balance: number) => {
  const options = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  };
  const formatNumber = new Intl.NumberFormat('pt-BR', options);
  return formatNumber.format(balance / 1000);
};

export const BudgetsTableConfig: TableConfig<string, BudgetAccount> = {
  columns: {
    select: {
      type: 'select',

      name: 'select',

      cell: ({ item }) => (
        <Table.Cell.Select
          item={item}
          icon={({ error }) =>
            error && (
              <div style={{ color: Tokens.colors.alert.alert700 }}>
                <Table.Cell.Select.Icon name="Warning" />
              </div>
            )
          }
        />
      ),

      header: () => <Table.Header.Cell.Select />,
    },

    type: {
      type: 'type',

      name: 'Tipo',

      cell: ({ item }) => {
        const typeLabel = ACCOUNT_TYPE_LABEL_MAPPER[item.type] ?? 'Outro';
        return <Table.Cell.Text label={typeLabel} overflow></Table.Cell.Text>;
      },

      sorter: withGroupsOrder((left, right) =>
        right.type.localeCompare(left.type)
      ),
    },

    balance: {
      type: 'balance',

      name: 'Saldo',

      cell: ({ item }) => {
        return (
          <Table.Cell.Text
            label={formatBRL(item.balance)}
            overflow
          ></Table.Cell.Text>
        );
      },

      sorter: withGroupsOrder((left, right) =>
        right.type.localeCompare(left.type)
      ),
    },

    uncleared_balance: {
      type: 'uncleared_balance',

      name: 'Saldo liquido',

      cell: ({ item }) => {
        return (
          <Table.Cell.Text
            label={formatBRL(item.unclearedBalance)}
            overflow
          ></Table.Cell.Text>
        );
      },

      sorter: withGroupsOrder((left, right) =>
        right.type.localeCompare(left.type)
      ),
    },

    name: {
      type: 'name',

      name: 'Name',

      cell: ({ item, type }) => {
        return (
          <Table.Cell.GroupName
            type={type}
            item={item}
            label={({ name, id }) => (
              <Tooltip.Overflow
                referenceElement={({ ref, onOpen, onClose }) => (
                  <Table.Cell.Editable
                    id={id}
                    type={type}
                    label={name}
                    onRename={() => {}}
                  >
                    <Table.Cell.Text
                      label={name}
                      ref={ref}
                      overflow
                      onMouseEnter={onOpen}
                      onMouseLeave={onClose}
                    ></Table.Cell.Text>
                  </Table.Cell.Editable>
                )}
              >
                {() => (
                  <Text breakWord variant="caption">
                    {name}
                  </Text>
                )}
              </Tooltip.Overflow>
            )}
            count={({ count }) => <Table.Cell.Count count={count} />}
          />
        );
      },

      sorter: withGroupsOrder((left, right) =>
        right.name.localeCompare(left.name)
      ),
    },

    date: {
      type: 'date',

      name: 'Última reconciliação',

      cell: ({ item }) => (
        <Table.Cell.GroupEmpty
          item={item}
          label={(item) => (
            <Table.Cell.FromNow
              date={item.updatedAt}
              label={({ label }) => (
                <Tooltip.Overflow
                  referenceElement={({ ref, onOpen, onClose }) => (
                    <Table.Cell.Text
                      ref={ref}
                      label={label}
                      onMouseEnter={onOpen}
                      onMouseLeave={onClose}
                      overflow
                    />
                  )}
                >
                  {() => (
                    <Text variant="caption" breakWord>
                      {label}
                    </Text>
                  )}
                </Tooltip.Overflow>
              )}
            />
          )}
        />
      ),

      sorter: withGroupsOrder(
        (left, right) =>
          new Date(left.updatedAt).getTime() -
          new Date(right.updatedAt).getTime()
      ),
    },
  },
};
