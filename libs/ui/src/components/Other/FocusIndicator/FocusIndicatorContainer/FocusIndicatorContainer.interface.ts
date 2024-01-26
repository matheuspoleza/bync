import type { VariantProps } from '@bync/style';

import type { IBox } from '@/components/Utility/Box/types';

import type { IFocusIndicator } from '../FocusIndicator.interface';
import type { focusIndicatorPlacement } from './FocusIndicatorContainer.css';

export interface IFocusIndicatorContainer
  extends IFocusIndicator,
    IBox,
    VariantProps<typeof focusIndicatorPlacement>,
    React.PropsWithChildren {}
