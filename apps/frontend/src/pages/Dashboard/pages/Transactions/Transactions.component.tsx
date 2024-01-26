import { Table, Box } from '@bync/ui';
import { useSetAtom } from 'jotai/react';
import { useMemo } from 'react';
import { TransactionsTableConfig } from './Transactions.constants';
import { TransactionsTableContextMenu } from './components/TableContextMenu.component';
import { itemsAtom, columnsOrderAtom } from './Transactions.atoms';

export const TransactionsPage = () => {
  const stateMolecule = Table.useStateMolecule();

  const setActiveID = useSetAtom(stateMolecule.activeID);
  const setEditMode = useSetAtom(stateMolecule.editMode);

  const onRowClick = (id: string) => {
    setActiveID((prevID) => (prevID === id ? null : id));
  };

  const onRename = (itemID: string) =>
    setEditMode({ itemID, columnType: 'name' });
  const value = useMemo(() => ({ orderBy: 'name' as string }), []);

  return (
    <Table.StateProvider value={value}>
      <Box pt={32}>
        <Table
          config={TransactionsTableConfig}
          itemsAtom={itemsAtom}
          onRowClick={onRowClick}
          onRowNavigate={setActiveID}
          onCellDoubleClicked={setEditMode}
          columnsOrderAtom={columnsOrderAtom}
          rowContextMenu={({ id, onClose }) => (
            <TransactionsTableContextMenu
              id={id}
              onClose={onClose}
              onRename={() => onRename(id)}
            />
          )}
        />
      </Box>
    </Table.StateProvider>
  );
};
