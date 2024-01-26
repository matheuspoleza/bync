import { Table as TableComponent } from './Table.component';
import { useTable, useTableStateMolecule } from './Table.hook';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableNavigation } from './TableNavigation';
import { TableRow } from './TableRow';
import { TableStateProvider } from './TableStateProvider';
import * as Utils from './Table.utils';

export * from './Table.interface';

export const Table = Object.assign(TableComponent, {
  displayName: 'Table',

  Row: TableRow,
  Cell: TableCell,
  Header: TableHeader,
  Navigation: TableNavigation,
  StateProvider: TableStateProvider,
  Utils,

  useTable,
  useStateMolecule: useTableStateMolecule,
});
