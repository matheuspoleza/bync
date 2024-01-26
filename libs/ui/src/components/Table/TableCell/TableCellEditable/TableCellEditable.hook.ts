import { useAtom } from 'jotai';

import { usePersistFunction } from '@/hooks';

import { useTableStateMolecule } from '../../Table.hook';

export const useTableEditMode = ({
  id,
  type,
  onSave,
}: {
  id: string;
  type: string;
  onSave: (value: string) => void;
}) => {
  const stateMolecule = useTableStateMolecule();

  const [editMode, setEditMode] = useAtom(stateMolecule.editMode);

  const isEditing = type && editMode?.itemID === id && editMode.columnType === type;

  const onFinishEditing = usePersistFunction((value: string) => {
    setEditMode(null);
    onSave(value);
  });

  return {
    isEditing,
    onFinishEditing,
  };
};
