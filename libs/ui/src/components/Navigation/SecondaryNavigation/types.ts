import type { IconName } from '@bync/icons';

import type { BaseProps } from '@/types';
import { IAvatar } from '@/main';

export interface ISecondaryNavigationItem extends BaseProps {
  label: string;
  caption?: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
  icon: IconName;
  variant?: 'default' | 'new' | 'alert';
}

export interface ISecondaryNavigation extends BaseProps {
  title?: string;
  avatar?: IAvatar['variant'];
  rightAction?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ISecondaryNavigationSection {
  isCollapsible?: boolean;
  children?: React.ReactNode;
  title?: string;
}
