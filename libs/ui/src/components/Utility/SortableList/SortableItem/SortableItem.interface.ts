import type { DraggableAttributes, UniqueIdentifier } from '@dnd-kit/core';

interface RenderItemProps<IItem> {
  ref: React.Ref<any>;
  item: IItem;
  styles: React.CSSProperties;
  dragContainerProps: DraggableAttributes & {
    disabled: boolean;
    isActive: boolean;
    isVisible: boolean;
  };
}

export interface IRenderItem<IItem> {
  renderItem: (props: RenderItemProps<IItem>) => React.ReactElement;
}

export interface ISortableItem<IItem> extends IRenderItem<IItem> {
  id: UniqueIdentifier;
  item: IItem;
  activeIndex: number;
}
