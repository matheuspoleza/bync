import type { TableItem, TableNonGroupItem } from '../../Table.interface';

export interface ITableCellGroupEmpty<Item extends TableItem> {
  item: Item;
  label: (item: TableNonGroupItem<Item>) => React.ReactNode;
}
