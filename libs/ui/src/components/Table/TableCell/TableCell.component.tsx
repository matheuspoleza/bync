import { clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import { cellStyle } from './TableCell.css';
import type { ITableCell } from './TableCell.interface';

export const TableCell = forwardRef<HTMLDivElement, ITableCell>('TableCell')(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx(cellStyle, className)} {...props}>
      {children}
    </div>
  )
);
