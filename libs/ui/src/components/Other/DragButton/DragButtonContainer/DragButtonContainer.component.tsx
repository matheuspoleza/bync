import { Box } from '@/components/Utility/Box/Box.component';
import { forwardRef } from '@/hocs';

import { DragButton } from '../DragButton.component';
import { dragButtonContainer, dragButtonPlacement } from './DragButtonContainer.css';
import type { IDragButtonContainer } from './DragButtonContainer.interface';

export const DragButtonContainer = forwardRef<HTMLDivElement, IDragButtonContainer>('DragButtonContainer')(
  ({ isVisible, variant, children, disabled, ...props }, ref) => (
    <Box ref={ref} className={dragButtonContainer} align="center">
      <div className={dragButtonPlacement({ variant, isVisible, disabled })}>
        <DragButton {...props} />
      </div>

      {children}
    </Box>
  )
);
