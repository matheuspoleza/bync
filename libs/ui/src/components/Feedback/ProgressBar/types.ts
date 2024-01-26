import type { BaseProps } from '@/types';

export interface IProgressBar extends BaseProps {
  className?: string;
  barClassName?: string;

  /**
   * @default 0
   * @description value between 0 and 100
   */
  value?: number;
}
