import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { textStyles } from './Text.css';

export interface IText
  extends BaseProps,
    React.ComponentPropsWithoutRef<'p'>,
    VariantProps<typeof textStyles>,
    React.PropsWithChildren {
  underlined?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
  color?: string;
  as?: React.ElementType;
}
