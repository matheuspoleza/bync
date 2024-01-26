import { useVirtualizer } from '@tanstack/react-virtual';
import { clsx } from '@bync/style';
import React, { useMemo, useState } from 'react';

import { Link } from '@/components/Navigation';
import { VirtualizedContent } from '@/components/Utility';
import { useScrollContext } from '@/contexts';

import { contentStyle, footerStyle } from './CollapsibleList.css';
import type { ICollapsibleList } from './CollapsibleList.interface';

export const CollapsibleList = <Item,>({
  items,
  testID,
  overscan = 5,
  itemsLimit = 10,
  renderItem,
  getItemKey,
  stickyFooter,
  collapseLabel,
  footerClassName,
  estimatedItemSize,
}: ICollapsibleList<Item>): React.ReactElement => {
  const { scrollNode } = useScrollContext();
  const [collapsed, setCollapsed] = useState(true);

  const renderedItems = useMemo(() => {
    if (collapsed) return items.slice(0, itemsLimit);

    return items;
  }, [collapsed, items]);

  const virtualizer = useVirtualizer({
    count: renderedItems.length,
    overscan,
    getItemKey: (index) => getItemKey?.(items[index]) ?? index,
    estimateSize: () => estimatedItemSize,
    getScrollElement: () => scrollNode,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <>
      <VirtualizedContent
        start={virtualItems[0]?.start ?? 0}
        testID={`${testID}--list`}
        totalSize={virtualizer.getTotalSize()}
        className={contentStyle}
      >
        {virtualItems.map(
          (virtualItem) =>
            renderedItems[virtualItem.index] &&
            renderItem({ item: renderedItems[virtualItem.index], virtualItem, virtualizer })
        )}
      </VirtualizedContent>

      {items.length > itemsLimit && (
        <div className={clsx(footerStyle({ sticky: stickyFooter }), footerClassName)}>
          <Link
            label={collapsed ? `Show all ${collapseLabel} (${items.length})` : `Hide some ${collapseLabel}`}
            testID={`${testID}--button`}
            variant="secondary"
            onClick={() => setCollapsed((prev) => !prev)}
          />
        </div>
      )}
    </>
  );
};
