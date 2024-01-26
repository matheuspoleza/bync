import type { IBreadCrumbItem } from '@/components/Navigation/BreadCrumbs/types';
import type { BaseProps } from '@/types';

export interface ITableNavigation extends BaseProps {
  breadCrumbsItems?: Omit<IBreadCrumbItem, 'isLast'>[];
  onImportClick?: () => void;
  onSettingsClick?: () => void;
  leftHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
