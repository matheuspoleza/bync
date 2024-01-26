import { TableCellInput } from '../TableCellInput';
import { useTableEditMode } from './TableCellEditable.hook';
import type { ITableCellEditable } from './TableCellEditable.interface';

export const TableCellEditable = <ColumnType extends string>({
  id,
  type,
  label,
  onRename,
  children,
  labelTransform,
}: ITableCellEditable<ColumnType>) => {
  const { isEditing, onFinishEditing } = useTableEditMode({
    id,
    type,
    onSave: onRename,
  });

  if (isEditing) {
    return <TableCellInput value={label} onSave={onFinishEditing} transform={labelTransform} />;
  }

  return <>{children}</>;
};
