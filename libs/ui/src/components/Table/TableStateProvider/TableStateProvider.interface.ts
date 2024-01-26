import type { TableStateInitialValue } from '../Table.interface';

export interface ITableStateProvider<ColumnType extends string, SortContext = unknown> extends React.PropsWithChildren {
  value: TableStateInitialValue<ColumnType, SortContext>;
}
