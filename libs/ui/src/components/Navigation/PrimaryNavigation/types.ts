import type { IconName } from '@bync/icons';

import type { IIcon } from '@/components/Media/Icon';
import type { BaseProps } from '@/types';

import type { IMenu } from '../Menu/types';

export interface IPrimaryNavigationItem extends BaseProps {
  iconName: IconName;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
  className?: string;
  iconProps?: Omit<IIcon, 'name'>;
  renderIcon?: () => React.ReactNode;
}

export interface IPrimaryNavigationHeader extends React.PropsWithChildren {
  menuProps?: IMenu;
}

export interface IPrimaryNavigationSection extends BaseProps {
  children?: React.ReactNode;
  className?: string;
}

export interface IPrimaryNavigation extends BaseProps {
  children?: React.ReactNode;
}
