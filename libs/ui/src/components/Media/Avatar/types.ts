import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { avatarRecipe } from './styles/Avatar.css';

export interface IAvatar extends BaseProps, VariantProps<typeof avatarRecipe>, React.ComponentPropsWithoutRef<'div'> {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}
