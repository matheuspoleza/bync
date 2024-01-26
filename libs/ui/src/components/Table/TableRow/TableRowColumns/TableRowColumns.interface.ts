import type { Atom } from 'jotai';

import type { TableItem } from '../../Table.interface';

export interface ITableRowColumns<Item extends TableItem, ColumnType extends string> {
  itemAtom: Atom<Item>;
  onCellDoubleClicked?: (props: { itemID: string; columnType: ColumnType }) => void;
}
