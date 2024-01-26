import type { Meta, StoryObj } from '@storybook/react';
import { atom, useSetAtom } from 'jotai';
import { useMemo } from 'react';

import { MenuItem } from '@/components/Navigation';
import { Divider } from '@/components/Other/Divider';
import { Tokens } from '@/styles';

import { Text } from '../Text/Text.component';
import { Tooltip } from '../Utility/Tooltip';
import type { TableGroupItemExample, TableItemExample } from './__fixtures__';
import { makeData } from './__fixtures__';
import { Table } from './index';
import type { TableConfig, TableSorterOptions } from './Table.interface';
import { updateItemAtom } from './Table.utils';

const meta: Meta<typeof Table<string, TableItemExample | TableGroupItemExample>> = {
  title: 'Table/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const withGroupsOrder =
  (orderItems: (left: TableItemExample, right: TableItemExample) => number) =>
  (
    left: TableItemExample | TableGroupItemExample,
    right: TableItemExample | TableGroupItemExample,
    options: TableSorterOptions
  ) => {
    if (left.group && right.group) return right.name.localeCompare(left.name);
    if (left.group || right.group) return (left.group ? 1 : -1) * (options.descending ? 1 : -1);

    return orderItems(left, right);
  };

const itemsAtom = atom(makeData());
const updateItemsAtom = updateItemAtom(itemsAtom);

const CONFIG: TableConfig<string, TableItemExample | TableGroupItemExample> = {
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

      name: 'Name',

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
                  <Table.Cell.Editable id={id} type={type} label={name} onRename={handleChange}>
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

      sorter: withGroupsOrder((left, right) => right.name.localeCompare(left.name)),
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
                    <Table.Cell.Text ref={ref} label={label} onMouseEnter={onOpen} onMouseLeave={onClose} overflow />
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
        (left, right) => new Date(left.updatedAt).getTime() - new Date(right.updatedAt).getTime()
      ),
    },
  },
};

const columnsOrderAtom = atom([
  { type: 'select', size: Table.Header.Cell.Select.CELL_WIDTH },
  { type: 'name', size: '2fr' },
  { type: 'link', size: '3fr' },
  { type: 'text' },
  { type: 'date' },
]);

const TableContextMenu: React.FC<{ id: string; onClose: VoidFunction; onRename: VoidFunction }> = ({
  id,
  onClose,
  onRename,
}) => {
  return (
    <>
      <MenuItem
        key={id}
        prefixIconName="Edit"
        label="Rename"
        onClick={() => {
          onRename();
          onClose();
        }}
      />
      <MenuItem prefixIconName="Export" label="Export" onClick={onClose} />
      <MenuItem prefixIconName="MoveTo" label="Move to..." onClick={onClose} />
      <MenuItem prefixIconName="Link" label="Copy link" onClick={onClose} />
      <Divider />
      <MenuItem prefixIconName="Trash" label="Delete" onClick={onClose} />
    </>
  );
};

const Component = () => {
  const stateMolecule = Table.useStateMolecule();

  const setActiveID = useSetAtom(stateMolecule.activeID);
  const setEditMode = useSetAtom(stateMolecule.editMode);

  const onRowClick = (id: string) => {
    setActiveID((prevID) => (prevID === id ? null : id));
  };

  const onRename = (itemID: string) => setEditMode({ itemID, columnType: 'name' });

  return (
    <div style={{ display: 'flex', width: `calc(100% + 32px)`, height: window.innerHeight, margin: '-16px' }}>
      <Table
        config={CONFIG}
        itemsAtom={itemsAtom}
        onRowClick={onRowClick}
        onRowNavigate={setActiveID}
        onCellDoubleClicked={setEditMode}
        columnsOrderAtom={columnsOrderAtom}
        rowContextMenu={({ id, onClose }) => (
          <TableContextMenu id={id} onClose={onClose} onRename={() => onRename(id)} />
        )}
      />
    </div>
  );
};

export const Examples: Story = {
  render: () => {
    const value = useMemo(() => ({ orderBy: 'name' as string }), []);

    return (
      <Table.StateProvider value={value}>
        <Component />
      </Table.StateProvider>
    );
  },
};
