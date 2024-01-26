import { clsx } from '@bync/style';

import { Icon } from '@/components/Media';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility';
import { forwardRef } from '@/hocs';

import { containerStyle, iconStyle, labelStyle } from './TableHeaderCellLabel.css';
import type { ITableHeaderCellLabel } from './TableHeaderCellLabel.interface';

export const TableHeaderCellLabel = forwardRef<HTMLDivElement, ITableHeaderCellLabel>('TableHeaderCellLabel')(
  ({ active, sortable, descending, children, className, onIconClick, ...props }, ref) => (
    <Box {...props} ref={ref} align="center" className={clsx(containerStyle({ active, sortable }), className)}>
      <Text variant="tableHeader" className={labelStyle}>
        {children}
      </Text>

      {sortable && (
        <Icon
          name={descending ? 'ArrowDownS' : 'ArrowUpS'}
          width={24}
          height={24}
          onClick={onIconClick}
          className={iconStyle}
        />
      )}
    </Box>
  )
);
