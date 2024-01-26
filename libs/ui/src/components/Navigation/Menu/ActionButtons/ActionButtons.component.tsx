import { clsx } from '@bync/style';

import { Box } from '@/components/Utility/Box';

import { container, divider } from './ActionButtons.css';
import type { IActionButtons } from './types';

export const ActionButtons: React.FC<IActionButtons> = ({ firstButton, secondButton, testID, className }) => {
  const hasBothButtons = firstButton && secondButton;

  return (
    <Box className={clsx(container, className)} testID={testID}>
      {firstButton}
      {hasBothButtons && (
        <>
          <span className={divider} />
          {secondButton}
        </>
      )}
    </Box>
  );
};
