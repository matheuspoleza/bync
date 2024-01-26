import { Box } from '@/components/Utility/Box';

import type { TableGroupOnlyItem, TableItem } from '../../Table.interface';
import { groupNameStyle } from './TableCellGroupName.css';
import { useIsEditMode } from './TableCellGroupName.hook';
import type { ITableCellGroupName } from './TableCellGroupName.interface';

export const TableCellGroupName = <Item extends TableItem, ColumnType extends string>({
  item,
  label,
  count,
  type,
}: ITableCellGroupName<Item, ColumnType>): React.ReactElement => {
  const isEditing = useIsEditMode({ id: item.id, type });

  return item.group && !isEditing ? (
    <Box className={groupNameStyle} gap={3.5}>
      {label(item)} {count(item as TableGroupOnlyItem<Item>)}
    </Box>
  ) : (
    <>{label(item)}</>
  );
};
