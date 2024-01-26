import type { TableItem, TableNonGroupItem } from '../../Table.interface';

export interface ITableCellSelect<Item extends TableItem> {
  item: Item;
  icon?: (item: TableNonGroupItem<Item>) => React.ReactNode;
}
