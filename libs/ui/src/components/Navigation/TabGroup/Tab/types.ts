import type { IconName } from '@bync/icons';

import type { BaseProps } from '@/types';

export interface ITab extends BaseProps {
  isActive: boolean;
  index: number;
  onChange?: (tab: number) => void;
  label?: string;
  iconName?: IconName;
  counter?: number;
  width?: 'hug' | 'fill';
  children?: React.ReactNode;
  className?: string;
}
