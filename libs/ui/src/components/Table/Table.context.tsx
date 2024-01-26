import { type Atom, atom } from 'jotai';
import { createContext, useMemo } from 'react';

import type { TableColumnOrder, TableConfig, TableItem } from './Table.interface';

export interface ITableContext<ColumnType extends string, Item extends TableItem, SortContext = unknown> {
  config: TableConfig<ColumnType, Item, SortContext>;
  orderedItems: Atom<Item>[];
  columnsOrderAtom: Atom<TableColumnOrder<ColumnType>[]>;
  gridTemplateColumns: string;
}

export const TableContext = createContext<ITableContext<any, any>>({
  config: { columns: {} },
  orderedItems: [],
  columnsOrderAtom: atom<TableColumnOrder<string>[]>([]),
  gridTemplateColumns: '',
});

interface ITableProvider extends ITableContext<any, any, any>, React.PropsWithChildren {}

export const TableProvider = ({
  config,
  children,
  orderedItems,
  columnsOrderAtom,
  gridTemplateColumns,
}: ITableProvider): React.ReactElement => {
  const value = useMemo(
    () => ({ config, orderedItems, columnsOrderAtom, gridTemplateColumns }),
    [config, orderedItems, columnsOrderAtom, gridTemplateColumns]
  );

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};
