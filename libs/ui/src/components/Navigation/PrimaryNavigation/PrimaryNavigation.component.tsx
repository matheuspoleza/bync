import { Box } from '@/components/Utility/Box/Box.component';

import { containerStyle } from './PrimaryNavigation.css';
import type { IPrimaryNavigation } from './types';

export const PrimaryNavigation: React.FC<IPrimaryNavigation> = ({ testID, children }) => {
  return (
    <Box as="section" direction="column" justify="space-between" className={containerStyle} testID={testID}>
      {children}
    </Box>
  );
};
