import { clsx } from '@bync/style';

import { forwardRef } from '@/hocs';

import { Box } from '../Box';
import { surfaceStyles } from './Surface.css';
import type { ISurface } from './Surface.interface';

export const Surface = forwardRef<HTMLDivElement, ISurface>('Surface')(
  ({ className, children, direction = 'column', ...props }, ref) => (
    <Box {...props} ref={ref} direction={direction} className={clsx(surfaceStyles, className)}>
      {children}
    </Box>
  )
);
