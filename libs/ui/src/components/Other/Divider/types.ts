import type { VariantProps } from '@bync/style';

import type { dividerContainer, dividerStyle, labelStyles } from './Divider.css';

export interface IDivider
  extends VariantProps<typeof dividerStyle>,
    VariantProps<typeof labelStyles>,
    VariantProps<typeof dividerContainer> {
  label?: string;
  onLabelClick?: (() => void) | ((event: React.SyntheticEvent) => void);
  onCloseClick?: () => void;
  className?: string;
}
