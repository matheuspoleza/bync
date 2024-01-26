import { Table, TableConfig, Tooltip, Text, Tokens } from '@bync/ui';
import { useSetAtom } from 'jotai/react';
import type { TableGroupItemExample, TableItemExample } from './__fixtures__';
import { withGroupsOrder } from './Transactions.utils';
import { updateItemsAtom } from './Transactions.atoms';

export const TransactionsTableConfig: TableConfig<
  string,
  TableItemExample | TableGroupItemExample
> = {
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

    name: {
      type: 'name',

      name: 'Descrição',

      cell: ({ item, type }) => {
        const updateItem = useSetAtom(updateItemsAtom);

        const handleChange = (value: string) => {
          updateItem({ ...item, name: value });
        };

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
                    onRename={handleChange}
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

    link: {
      type: 'link',

      name: 'Link long name for wrapping',

      cell: ({ item }) => (
        <Table.Cell.GroupEmpty
          item={item}
          label={({ link }) => (
            <Tooltip.Overflow
              referenceElement={({ ref, onOpen, onClose }) => (
                <Table.Cell.Link
                  href={link}
                  label={link}
                  target="blank"
                  isSelectable={true}
                  overflow
                  ref={ref}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                />
              )}
            >
              {() => (
                <Text variant="caption" breakWord>
                  {link}
                </Text>
              )}
            </Tooltip.Overflow>
          )}
        />
      ),
    },

    text: {
      type: 'text',

      name: 'Text',

      cell: ({ item }) => (
        <Table.Cell.GroupEmpty
          item={item}
          label={(item) => (
            <Tooltip.Overflow
              referenceElement={({ ref, onOpen, onClose }) => (
                <Table.Cell.Text
                  label={item.lastEditor}
                  overflow
                  ref={ref}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                />
              )}
            >
              {() => (
                <Text variant="caption" breakWord>
                  {item.lastEditor}
                </Text>
              )}
            </Tooltip.Overflow>
          )}
        />
      ),
    },

    date: {
      type: 'date',

      name: 'Date',

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
