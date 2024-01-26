import { TableCell as TableCellComponent } from './TableCell.component';
import { TableCellCount } from './TableCellCount';
import { TableCellEditable } from './TableCellEditable';
import { TableCellEmpty } from './TableCellEmpty';
import { TableCellFromNow } from './TableCellFromNow';
import { TableCellGroupEmpty } from './TableCellGroupEmpty';
import { TableCellGroupName } from './TableCellGroupName';
import { TableCellInput } from './TableCellInput';
import { TableCellLink } from './TableCellLink';
import { TableCellSelect } from './TableCellSelect';
import { TableCellText } from './TableCellText';

export const TableCell = Object.assign(TableCellComponent, {
  Link: TableCellLink,
  Text: TableCellText,
  Count: TableCellCount,
  Empty: TableCellEmpty,
  Select: TableCellSelect,
  FromNow: TableCellFromNow,
  Input: TableCellInput,
  Editable: TableCellEditable,
  GroupName: TableCellGroupName,
  GroupEmpty: TableCellGroupEmpty,
});
