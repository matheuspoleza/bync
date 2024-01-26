import { Text } from '@/components/Text';
import { forwardRef } from '@/hocs';

import { tableCellTextStyle } from '../TableCellText.css';
import type { ITableCellTextHighlighted } from './TableCellTestHighlighted.interface';

export const TableCellTextHighlighted = forwardRef<HTMLDivElement, ITableCellTextHighlighted>(
  'TableCellTextHighlighted'
)(({ label, search, disabled, overflow, ...props }, ref) => (
  <Text.Highlighted
    {...props}
    ref={ref}
    text={label}
    overflow={overflow}
    highlight={search}
    className={tableCellTextStyle({ disabled })}
  />
));
