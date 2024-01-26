import { clsx } from '@bync/style';
import React from 'react';

import { Box } from '@/components/Utility/Box';

import { barStyles, trackStyles } from './ProgressBar.css';
import type { IProgressBar } from './types';

export const ProgressBar: React.FC<IProgressBar> = ({ value = 0, className, barClassName, testID }) => (
  <Box className={clsx(trackStyles, className)} testID={testID} width="100%">
    <Box className={clsx(barStyles, barClassName)} data-testid={`${testID}--bar`} style={{ width: `${value}%` }} />
  </Box>
);
