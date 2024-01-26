import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';

import { tableCellTextStyle } from './TableCellText.css';
import type { ITableCellText } from './TableCellText.interface';

export const TableCellText = forwardRef<HTMLParagraphElement, ITableCellText>('TableCellText')(
  ({ label, disabled, ...props }, ref) => (
    <Text {...props} ref={ref} className={tableCellTextStyle({ disabled })}>
      {label}
    </Text>
  )
);
