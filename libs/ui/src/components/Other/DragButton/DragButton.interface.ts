import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { dragButtonStyles } from './DragButton.css';

export interface IDragButton
  extends BaseProps,
    React.ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof dragButtonStyles> {}
