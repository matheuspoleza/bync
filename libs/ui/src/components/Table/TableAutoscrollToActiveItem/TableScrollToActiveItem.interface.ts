import type { Virtualizer } from '@tanstack/react-virtual';
import type { Atom } from 'jotai';

import type { TableItem } from '../Table.interface';

export interface ITableScrollToActiveItem {
  items: Atom<TableItem>[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}
