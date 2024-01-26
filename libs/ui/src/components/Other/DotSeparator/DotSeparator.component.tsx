import { Box } from '@/components/Utility/Box';

import { separatorStyle } from './DotSeparator.css';
import type { IDotSeparator } from './types';

export const DotSeparator: React.FC<IDotSeparator> = ({ px, thick, light, className }) => {
  const separatorClassName = separatorStyle({ thick, light });

  return (
    <Box align="center" px={px} className={className}>
      <span className={separatorClassName} />
    </Box>
  );
};
