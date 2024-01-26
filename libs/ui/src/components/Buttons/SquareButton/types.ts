import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { squareButtonStyles } from './styles/SquareButton.css';

export interface ISquareButton
  extends BaseProps,
    VariantProps<typeof squareButtonStyles>,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'ref'> {
  iconName: IconName;
  disabled?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
  variant?: 'light' | 'dark';
  ref?: React.Ref<HTMLButtonElement>;
}
