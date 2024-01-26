import { useAtomValue } from 'jotai';

import { useTableStateMolecule } from '../../Table.hook';

export const useIsEditMode = ({ id, type }: { id: string; type?: string }) => {
  const stateMolecule = useTableStateMolecule();
  const editMode = useAtomValue(stateMolecule.editMode);
  return type && editMode?.itemID === id && editMode.columnType === type;
};
