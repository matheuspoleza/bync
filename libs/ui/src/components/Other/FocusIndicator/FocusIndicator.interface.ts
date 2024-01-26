import type { VariantProps } from '@bync/style';

import type { focusIndicator } from './FocusIndicator.css';

export interface IFocusIndicator extends VariantProps<typeof focusIndicator> {
  focusIndicatorRef?: React.Ref<any>;
}
