import type { IconName } from '@bync/icons';
import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { buttonRecipe } from './styles/Button.css';

export interface IButton
  extends BaseProps,
    React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonRecipe> {
  label?: string;
  iconName?: IconName | undefined;
  isLoading?: boolean;
}
