import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { containerStyle } from './MenuItem.css';

export interface IMenuItem
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'ref'>,
    VariantProps<typeof containerStyle> {
  label: React.ReactNode;
  caption?: string;
  checkbox?: JSX.Element;
  prefixIconName?: IconName;
  suffixIconName?: IconName;
  suffixText?: string;
  className?: string;
  hotKeys?: JSX.Element;
  searchValue?: string;
  maxWidth?: number | string;
}
