import type { IHighlightLink } from '@/components/Navigation/Link';

export interface ITableCellLink extends IHighlightLink {
  isSelectable?: boolean;
}
