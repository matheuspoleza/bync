import type { VariantProps } from '@bync/style';

import type { BaseProps } from '@/types';
import type { QualityLevel } from '@/utils/quality-level.util';

import type { gaugeStyle } from './Gauge.css';

export interface IGauge extends BaseProps, VariantProps<typeof gaugeStyle> {
  /**
   * value between 0 and 100
   */
  progress: number;
  className?: string;
  level?: QualityLevel;
}
