import { clsx } from '@bync/style';

import { ProgressBar } from '@/components/Feedback/ProgressBar';
import { getQualityLevel } from '@/utils/quality-level.util';

import { gaugeContainerStyle, gaugeStyle } from './Gauge.css';
import type { IGauge } from './types';

export const Gauge: React.FC<IGauge> = ({ progress, variant = 'table', level, testID, className }) => {
  const gaugeLevel = level || getQualityLevel(progress);

  return (
    <ProgressBar
      className={clsx(className, gaugeContainerStyle({ variant }))}
      barClassName={gaugeStyle({ variant, level: gaugeLevel })}
      value={progress}
      testID={testID}
    />
  );
};
