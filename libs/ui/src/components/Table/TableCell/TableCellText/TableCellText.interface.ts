import type { IText } from '@/components/Text';

export interface ITableCellText extends IText {
  label: React.ReactNode;
  disabled?: boolean;
  overflow?: boolean;
}
