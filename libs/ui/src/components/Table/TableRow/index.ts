import { TableDynamicRow } from './TableDynamicRow/TableDynamicRow.component';
import { TableRow as TableRowComponent } from './TableRow.component';
import { TableRowColumns } from './TableRowColumns/TableRowColumns.component';

export const TableRow = Object.assign(TableRowComponent, {
  Dynamic: TableDynamicRow,
  Columns: TableRowColumns,
});
