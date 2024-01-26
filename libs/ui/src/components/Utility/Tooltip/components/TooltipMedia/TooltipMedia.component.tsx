import { clsx } from '@bync/style';

import { Box } from '@/components/Utility/Box';

import { mediaRecipe } from './TooltipMedia.css';
import type { ITooltipMedia } from './TooltipMedia.interface';

export const TooltipMedia: React.FC<ITooltipMedia> = ({ children, className, variant = 'bottom', ...props }) => {
  return (
    <Box {...props} direction="column" className={clsx(mediaRecipe({ variant }), className)}>
      {children}
    </Box>
  );
};
