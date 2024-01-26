import { useSortable } from '@dnd-kit/sortable';

import { Divider } from '@/components/Other/Divider';
import { Box } from '@/components/Utility/Box';

import { dividerStyleAfter, dividerStyleBefore } from './SortableItem.css';
import type { ISortableItem } from './SortableItem.interface';

export const SortableItem = <IItem,>({ item, activeIndex, renderItem, id }: ISortableItem<IItem>) => {
  const { attributes, listeners, setNodeRef, transition, over, index } = useSortable({ id });

  const isOver = over?.id === id;
  const isDragging = activeIndex === index;

  return (
    <Box direction="column" style={{ position: 'relative' }}>
      {isOver && index <= activeIndex && <Divider thick className={dividerStyleBefore} />}

      {renderItem({
        ref: setNodeRef,
        item,
        styles: { opacity: isDragging ? '75%' : '100%', transition },
        dragContainerProps: {
          ...listeners,
          ...attributes,
          disabled: !isDragging && activeIndex >= 0,
          isActive: isDragging,
          isVisible: isDragging,
        },
      })}

      {isOver && index > activeIndex && <Divider thick className={dividerStyleAfter} />}
    </Box>
  );
};
