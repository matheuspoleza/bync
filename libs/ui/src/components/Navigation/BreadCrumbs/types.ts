import type { BaseProps } from '@/types';

export interface IBreadCrumbItem extends BaseProps {
  label: string;
  isLast?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface IBreadCrumbs extends BaseProps {
  items: Omit<IBreadCrumbItem, 'isLast'>[];
}
