import type { VariantProps } from '@bync/style';

import type { dividerStyle, labelStyles } from '@/components/Other/Divider/Divider.css';

export interface IMenuDivider extends VariantProps<typeof dividerStyle>, VariantProps<typeof labelStyles> {
  fullWidth?: boolean;
  label?: string;
  onCloseClick?: () => void;
  className?: string;
}
