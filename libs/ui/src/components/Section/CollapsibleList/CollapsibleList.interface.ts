import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import type { BaseProps } from '@/types';

export interface ICollapsibleList<Item> extends BaseProps {
  items: Item[];
  overscan?: number;
  renderItem: (props: {
    item: Item;
    virtualItem: VirtualItem;
    virtualizer: Virtualizer<HTMLDivElement, Element>;
  }) => React.ReactNode;
  getItemKey?: (item: Item) => string | number;
  itemsLimit?: number;
  stickyFooter?: boolean;
  collapseLabel: string;
  footerClassName?: string;
  estimatedItemSize: number;
}
