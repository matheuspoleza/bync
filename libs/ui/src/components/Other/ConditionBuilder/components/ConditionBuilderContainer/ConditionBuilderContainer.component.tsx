import type { IBox } from '@/components/Utility';
import { Box } from '@/components/Utility';

import { surfaceContainerStyles } from './ConditionBuilderContainer.css';

export interface IConditionBuilderContainer extends IBox {}

export const ConditionBuilderContainer: React.FC<IConditionBuilderContainer> = ({ children, ...props }) => (
  <Box {...props} direction="column" width="350px" className={surfaceContainerStyles}>
    {children}
  </Box>
);
