import { TableHeader as TableHeaderComponent } from './TableHeader.component';
import { TableHeaderCell } from './TableHeaderCell';

export const TableHeader = Object.assign(TableHeaderComponent, {
  Cell: TableHeaderCell,
});
