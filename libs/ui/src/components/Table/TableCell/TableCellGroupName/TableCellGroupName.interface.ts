import type { TableGroupOnlyItem, TableItem } from '../../Table.interface';

export interface ITableCellGroupName<Item extends TableItem, ColumnType extends string> {
  item: Item;
  type?: ColumnType;
  label: (item: Item) => React.ReactNode;
  count: (item: TableGroupOnlyItem<Item>) => React.ReactNode;
}
