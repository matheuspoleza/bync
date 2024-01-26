import type { Atom } from 'jotai';

import type { TableItem } from '../Table.interface';

export interface ITableRow<Item extends TableItem, ColumnType extends string> {
  id: string;
  ref?: React.Ref<HTMLDivElement>;
  index: number;
  onClick?: (id: string, event: React.MouseEvent<HTMLDivElement>) => void;
  itemAtom: Atom<Item>;
  rowContextMenu?: (props: { id: string; onClose: VoidFunction }) => React.ReactNode;
  onCellDoubleClicked?: (props: { itemID: string; columnType: ColumnType }) => void;
}
