import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { actionButtonStyles } from './ActionButton.css';

export interface IActionButton
  extends BaseProps,
    Omit<React.ComponentPropsWithoutRef<'button'>, 'ref'>,
    VariantProps<typeof actionButtonStyles> {
  label: string;
}
