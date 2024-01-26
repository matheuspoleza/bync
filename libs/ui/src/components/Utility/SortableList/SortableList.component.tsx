import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';

import { useDocumentCursor } from '@/hooks/document.hook';

import { SortableItem } from './SortableItem/SortableItem.component';
import type { ISortableList } from './SortableList.interface';

export const SortableList = <IItem,>({
  items,
  renderItem,
  getItemKey,
  onItemsReorder,
  activationConstraint = { distance: 8 },
}: ISortableList<IItem>) => {
  const documentCursor = useDocumentCursor();
  const [activeID, setActiveID] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint }));

  const sortableItemIDs = useMemo(() => items.map((item) => getItemKey(item)), [items]);

  const getItemIndex = (id: UniqueIdentifier) => sortableItemIDs.indexOf(id);

  const activeIndex = useMemo(() => (activeID ? getItemIndex(activeID) : -1), [activeID, sortableItemIDs]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveID(active.id);

    documentCursor.set('grabbing');
  };

  const handleDragCancel = () => {
    setActiveID(null);

    documentCursor.reset();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = getItemIndex(active.id);
      const overIndex = getItemIndex(over.id);
      onItemsReorder(arrayMove(items, activeIndex, overIndex));
    }

    handleDragCancel();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={sortableItemIDs} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem
            id={getItemKey(item)}
            key={getItemKey(item)}
            item={item}
            renderItem={renderItem}
            activeIndex={activeIndex}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
