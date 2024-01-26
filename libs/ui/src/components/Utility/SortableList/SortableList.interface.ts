import type { PointerActivationConstraint, UniqueIdentifier } from '@dnd-kit/core';

import type { IRenderItem } from './SortableItem/SortableItem.interface';

export interface ISortableList<IItem> extends IRenderItem<IItem> {
  items: IItem[];
  getItemKey: (item: IItem) => UniqueIdentifier;
  onItemsReorder: (items: IItem[]) => void;
  activationConstraint?: PointerActivationConstraint;
}
