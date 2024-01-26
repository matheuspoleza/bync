import { createRef, useMemo } from 'react';

import { forwardRef, memo } from '@/hocs';
import { useVirtualItemResizeObserver } from '@/hooks/resize.hook';

import type { TableItem } from '../../Table.interface';
import { TableRow } from '../TableRow.component';
import type { ITableRow } from '../TableRow.interface';

export const TableDynamicRow = memo('TableDynamicRow')(
  forwardRef<HTMLDivElement>('TableDynamicRow')(
    <ColumnType extends string, Item extends TableItem, SortContext = unknown>(
      props: ITableRow<Item, ColumnType> & React.RefAttributes<HTMLDivElement>,
      ref: React.ForwardedRef<HTMLDivElement>
    ) => {
      const { onRef } = useVirtualItemResizeObserver(useMemo(() => ref ?? createRef<HTMLDivElement>(), [ref]));

      return <TableRow<ColumnType, Item, SortContext> ref={onRef} {...props} />;
    }
  )
);
