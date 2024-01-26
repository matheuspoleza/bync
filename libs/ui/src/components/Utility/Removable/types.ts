import type { BaseProps } from '@/types';

import type { IBox } from '../Box/types';

export interface IRemovable extends React.PropsWithChildren, BaseProps, IBox {
  className?: string;

  /**
   * @description A callback function that is executed when the close button is clicked
   */
  onRemove: () => void;

  /**
   * @description The gap size (in pixels) between the wrapped children and the close button
   * @default 12
   */
  gap?: number;

  /**
   * @description Whether the close button is disabled
   * @default false
   */
  disabled?: boolean;
}
