import { ScopeProvider } from 'jotai-molecules';

import { TableStateScope } from '../Table.atom';
import type { ITableStateProvider } from './TableStateProvider.interface';

export const TableStateProvider = <ColumnType extends string, SortContext = unknown>({
  value,
  children,
}: ITableStateProvider<ColumnType, SortContext>) => (
  <ScopeProvider scope={TableStateScope} value={value}>
    {children}
  </ScopeProvider>
);
