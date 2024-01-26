import type { TableItem, TableNonGroupItem } from '../../Table.interface';
import { TableCellEmpty } from '../TableCellEmpty';
import type { ITableCellGroupEmpty } from './TableCellGroupEmpty.interface';

export const TableCellGroupEmpty = <Item extends TableItem>({
  item,
  label,
}: ITableCellGroupEmpty<Item>): React.ReactElement =>
  item.group ? <TableCellEmpty /> : <>{label(item as TableNonGroupItem<Item>)}</>;
