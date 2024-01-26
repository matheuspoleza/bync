import { clsx } from '@bync/style';

import { Box } from '@/components/Utility/Box/Box.component';

import { FocusIndicator } from '../FocusIndicator.component';
import { focusIndicatorContainer, focusIndicatorPlacement } from './FocusIndicatorContainer.css';
import type { IFocusIndicatorContainer } from './FocusIndicatorContainer.interface';

export const FocusIndicatorContainer: React.FC<IFocusIndicatorContainer> = ({
  pl = 2,
  error,
  children,
  isVisible,
  className,
  focusIndicatorRef,
  ...props
}) => (
  <Box {...props} pl={pl} direction="column" className={clsx(focusIndicatorContainer, className)}>
    <div className={focusIndicatorPlacement({ isVisible: error || isVisible })}>
      <FocusIndicator error={error} ref={focusIndicatorRef} />
    </div>

    {children}
  </Box>
);
