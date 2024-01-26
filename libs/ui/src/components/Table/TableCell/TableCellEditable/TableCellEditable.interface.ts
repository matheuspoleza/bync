import type { ITableCellText } from '../TableCellText/TableCellText.interface';

export interface ITableCellEditable<ColumnType extends string> extends ITableCellText {
  id: string;
  type: ColumnType;
  label: string;
  onRename: (newValue: string) => void;
  labelTransform?: (value: string) => string;
}
