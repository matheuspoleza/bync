import type { Atom, PrimitiveAtom } from 'jotai';

import type { ITableRow } from './TableRow/TableRow.interface';

export type TableNonGroupItem<Item extends TableItem> = Item extends { group: true } ? never : Item;

export type TableGroupOnlyItem<Item extends TableItem> = Item extends { group: true } ? Item : never;

export interface TableItem {
  id: string;

  /**
   * if true, the row select cell will be disabled as a folder icon
   */
  group?: boolean;
}

export interface TableCellOptions<Item extends TableItem, ColumnType extends string> {
  type: ColumnType;
  item: Item;
  index: number;
  isLast: boolean;
  isFirst: boolean;
}

export type TableSorterOptions<SortContext = unknown> = SortContext extends NonNullable<unknown>
  ? { descending: boolean; context: SortContext }
  : { descending: boolean; context?: SortContext };

export interface TableColumnConfig<ColumnType extends string, Item extends TableItem, SortContext = unknown> {
  /**
   * used to identify the column and sort by it
   */
  type: ColumnType;

  /**
   * by default used as a column header label
   */
  name: React.ReactNode;

  /**
   * sort function, if provided column's header will be clickable and wll have sort icon
   */
  sorter?: (left: Item, right: Item, options: TableSorterOptions<SortContext>) => number;

  /**
   * used to render the cell
   */
  cell: (options: TableCellOptions<Item, ColumnType>) => React.ReactNode;

  /**
   * used to add additional content to the header
   */
  header?: () => React.ReactNode;
}

export type TableColumnsConfig<ColumnType extends string, Item extends TableItem, SortContext = unknown> = {
  [key in ColumnType]: TableColumnConfig<key, Item, SortContext>;
};

export interface TableConfig<ColumnType extends string, Item extends TableItem, SortContext = unknown> {
  columns: TableColumnsConfig<ColumnType, Item, SortContext>;
}

export interface TableEditMode<ColumnType extends string> {
  itemID: string;
  columnType: ColumnType;
}

export interface TableState<ColumnType extends string, SortContext = unknown> {
  orderBy: PrimitiveAtom<ColumnType | null>;
  activeID: PrimitiveAtom<string | null>;
  hoveringID: PrimitiveAtom<string | null>;
  selectedIDs: PrimitiveAtom<Set<string>>;
  descending: PrimitiveAtom<boolean>;
  sortContext: Atom<SortContext | null>;
  editMode: PrimitiveAtom<TableEditMode<ColumnType> | null>;
}

export interface TableStateInitialValue<ColumnType extends string, SortContext = unknown> {
  orderBy?: ColumnType | null;
  activeID?: string | null;
  hoveringID?: string | null;
  descending?: boolean;
  selectedIDs?: Set<string>;
  sortContext?: Atom<SortContext | null>;
  editMode?: TableEditMode<ColumnType> | null;
}

export interface TableColumnOrder<ColumnType extends string> {
  type: ColumnType;

  /**
   * the size of the column in the grid
   * @default '1fr'
   * @link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
   */
  size?: string;
}

export interface ITable<ColumnType extends string, Item extends TableItem, SortContext = unknown> {
  Row?: React.FC<ITableRow<Item, ColumnType>>;
  /**
   * must be memoized
   */
  config: TableConfig<ColumnType, Item, SortContext>;
  itemsAtom: Atom<Atom<Item>[]>;
  paddingEnd?: number;
  onRowClick?: (id: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onRowNavigate?: (id: string, direction: 'up' | 'down') => void;
  rowContextMenu?: (props: { id: string; onClose: VoidFunction }) => React.ReactNode;
  estimateRowSize?: number | ((index: number) => number);
  columnsOrderAtom: Atom<TableColumnOrder<ColumnType>[]>;
  onCellDoubleClicked?: (props: { itemID: string; columnType: ColumnType }) => void;
}
