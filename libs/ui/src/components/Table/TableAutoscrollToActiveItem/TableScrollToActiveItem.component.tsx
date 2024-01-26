import { useAtomValue, useStore } from 'jotai';
import { useEffect } from 'react';

import { useTableStateMolecule } from '../Table.hook';
import type { ITableScrollToActiveItem } from './TableScrollToActiveItem.interface';

export const TableScrollToActiveItem: React.FC<ITableScrollToActiveItem> = ({ items, virtualizer }) => {
  const store = useStore();
  const tableState = useTableStateMolecule();
  const activeID = useAtomValue(tableState.activeID);

  useEffect(() => {
    const activeIndex = items.findIndex((item) => store.get(item).id === activeID);

    if (activeIndex === -1) return;

    const [offset, align] = virtualizer.getOffsetForIndex(activeIndex);

    if (offset) {
      virtualizer.scrollToIndex(activeIndex, { align });
    }
  }, [items, activeID]);

  return null;
};
