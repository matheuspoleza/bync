import type { VariantProps } from '@bync/style';
import type React from 'react';

import type { BaseProps } from '@/types';

import type { linkRecipe } from './Link.css';

export interface ILink
  extends BaseProps,
    NonNullable<VariantProps<typeof linkRecipe>>,
    React.ComponentPropsWithoutRef<'a'> {
  theme?: 'light' | 'dark';
  label: React.ReactNode;
  isActive?: boolean;
  weight?: 'regular' | 'semiBold' | 'inherit';
  overflow?: boolean;
  className?: string;
  inline?: boolean;
  disabled?: boolean;
}
