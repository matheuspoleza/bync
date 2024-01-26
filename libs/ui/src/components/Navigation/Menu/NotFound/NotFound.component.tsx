import { Text } from '@/components/Text/Text.component';
import { Box } from '@/components/Utility/Box/Box.component';

import { container, textStyles } from './NotFound.css';
import type { INotFound } from './NotFound.interface';

export const NotFound: React.FC<INotFound> = ({ label }) => (
  <Box className={container}>
    <Text className={textStyles}>No {label} found.</Text>
  </Box>
);
