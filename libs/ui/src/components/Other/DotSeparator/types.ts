import type { VariantProps } from '@bync/style';

import type { separatorStyle } from './DotSeparator.css';

export interface IDotSeparator extends VariantProps<typeof separatorStyle> {
  className?: string;
  px?: number;
}
