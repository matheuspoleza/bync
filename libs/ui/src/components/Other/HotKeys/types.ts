import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { colorVariants } from './HotKeys.css';

export interface IHotKeys extends BaseProps, VariantProps<typeof colorVariants> {
  hotKeys: IHotKey[];
}

export interface IHotKey {
  label?: string;
  iconName?: IconName;
}
