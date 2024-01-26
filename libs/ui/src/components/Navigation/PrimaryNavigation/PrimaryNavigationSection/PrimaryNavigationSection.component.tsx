import React from 'react';

import { Box } from '@/components/Utility/Box';

import type { IPrimaryNavigationSection } from '../types';

export const PrimaryNavigationSection: React.FC<IPrimaryNavigationSection> = ({ testID, className, children }) => {
  return (
    <Box direction="column" className={className} testID={testID}>
      {children}
    </Box>
  );
};
