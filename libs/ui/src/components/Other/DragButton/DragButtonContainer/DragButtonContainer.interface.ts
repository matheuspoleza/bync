import type { VariantProps } from '@bync/style';

import type { IDragButton } from '../DragButton.interface';
import type { dragButtonPlacement } from './DragButtonContainer.css';

export interface IDragButtonContainer
  extends IDragButton,
    React.PropsWithChildren,
    VariantProps<typeof dragButtonPlacement> {}
