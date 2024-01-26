import type { ITableCellText } from '../TableCellText.interface';

export interface ITableCellTextHighlighted extends ITableCellText {
  search: string;
}
