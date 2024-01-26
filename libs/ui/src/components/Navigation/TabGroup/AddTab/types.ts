import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';

import type { addTabStyles } from './AddTab.css';

export interface IAddTab extends BaseProps, VariantProps<typeof addTabStyles> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
