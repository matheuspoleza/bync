import { useVirtualizer } from '@tanstack/react-virtual';
import { useAtomValue, useStore } from 'jotai';
import { useMemo, useRef } from 'react';

import { memo } from '@/hocs';

import { VirtualizedContent } from '../Utility';
import { MIN_ROW_HEIGHT } from './Table.constant';
import { TableProvider } from './Table.context';
import { tableScrollStyles, tableStyles } from './Table.css';
import { useTableHotkeys, useTableOrderedItems } from './Table.hook';
import type { ITable, TableItem } from './Table.interface';
import { TableScrollToActiveItem } from './TableAutoscrollToActiveItem/TableScrollToActiveItem.component';
import { TableHeader } from './TableHeader/TableHeader.component';
import { TableRow } from './TableRow/TableRow.component';

export const Table = memo(
  'Table',
  (prev: ITable<string, any>, next: ITable<string, any>) =>
    // add any props that should trigger a re-render here
    prev.Row === next.Row &&
    prev.config === next.config &&
    prev.itemsAtom === next.itemsAtom &&
    prev.estimateRowSize === next.estimateRowSize &&
    prev.columnsOrderAtom === next.columnsOrderAtom
)(
  <ColumnType extends string, Item extends TableItem, SortContext = unknown>({
    Row = TableRow,
    config,
    itemsAtom,
    onRowClick,
    paddingEnd = 64,
    onRowNavigate,
    rowContextMenu,
    estimateRowSize = MIN_ROW_HEIGHT,
    columnsOrderAtom,
    onCellDoubleClicked,
  }: ITable<ColumnType, Item, SortContext>) => {
    const store = useStore();
    const scrollRef = useRef<HTMLDivElement>(null);
    const orderedItems = useTableOrderedItems({ config, itemsAtom });

    const columnsOrder = useAtomValue(columnsOrderAtom);

    const virtualizer = useVirtualizer({
      count: orderedItems.length,
      overscan: 5,
      paddingEnd,
      getItemKey: (index) => store.get(orderedItems[index])?.id ?? '',
      estimateSize: typeof estimateRowSize === 'function' ? estimateRowSize : () => estimateRowSize,
      getScrollElement: () => scrollRef.current,
    });

    const gridTemplateColumns = useMemo(() => columnsOrder.map(({ size }) => size ?? '1fr').join(' '), [columnsOrder]);

    const virtualizedItems = virtualizer.getVirtualItems();

    useTableHotkeys({
      items: orderedItems,
      onNavigate: onRowNavigate,
    });

    return (
      <TableProvider
        config={config}
        orderedItems={orderedItems}
        columnsOrderAtom={columnsOrderAtom}
        gridTemplateColumns={gridTemplateColumns}
      >
        <div className={tableStyles}>
          <TableHeader />

          <TableScrollToActiveItem items={orderedItems} virtualizer={virtualizer} />

          <div ref={scrollRef} className={tableScrollStyles}>
            <VirtualizedContent start={virtualizedItems[0]?.start ?? 0} totalSize={virtualizer.getTotalSize()}>
              {virtualizedItems.map(
                (virtualItem) =>
                  orderedItems[virtualItem.index] && (
                    <Row
                      id={String(virtualItem.key)}
                      ref={virtualizer.measureElement}
                      key={virtualItem.key}
                      index={virtualItem.index}
                      onClick={onRowClick}
                      itemAtom={orderedItems[virtualItem.index]}
                      rowContextMenu={rowContextMenu}
                      onCellDoubleClicked={onCellDoubleClicked}
                    />
                  )
              )}
            </VirtualizedContent>
          </div>
        </div>
      </TableProvider>
    );
  }
);
