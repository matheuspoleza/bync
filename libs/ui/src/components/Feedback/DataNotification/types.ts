import type { BaseProps } from '@/types';
import type { QualityLevel } from '@/utils/quality-level.util';

export interface IDataNotification extends BaseProps {
  className?: string;
  score: number;
  text?: string;
  type?: 'clarity' | 'confidence';
  level?: QualityLevel;

  /**
   * @description callback when the button is clicked
   */
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}
