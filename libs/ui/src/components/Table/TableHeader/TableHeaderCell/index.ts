import { TableHeaderCell as TableHeaderCellComponent } from './TableHeaderCell.component';
import { TableHeaderCellLabel } from './TableHeaderCellLabel';
import { TableHeaderCellSelect } from './TableHeaderCellSelect';

export const TableHeaderCell = Object.assign(TableHeaderCellComponent, {
  Label: TableHeaderCellLabel,
  Select: TableHeaderCellSelect,
});
