import { useAtom, useStore } from 'jotai';

import { DeselectCheckboxControl } from '@/components/Form/DeselectCheckboxControl';
import { useTable, useTableStateMolecule } from '@/components/Table/Table.hook';
import { Box } from '@/components/Utility/Box';

export const TableHeaderCellSelect: React.FC = () => {
  const { orderedItems } = useTable();
  const store = useStore();

  const stateMolecule = useTableStateMolecule();

  const [selectedIDs, setSelectedIDs] = useAtom(stateMolecule.selectedIDs);

  const onToggle = () => {
    setSelectedIDs((prev) => {
      if (prev.size) {
        return new Set();
      }

      return new Set(orderedItems.map((atom) => store.get(atom).id));
    });
  };

  const isAllSelected = selectedIDs.size !== 0 && selectedIDs.size === orderedItems.length;

  return (
    <Box align="center" justify="center" width="16px" height="16px" mr={-4}>
      <DeselectCheckboxControl
        // eslint-disable-next-line no-nested-ternary
        value={isAllSelected ? 'checked' : selectedIDs.size ? 'deselect' : 'unchecked'}
        onValueChange={onToggle}
      />
    </Box>
  );
};
