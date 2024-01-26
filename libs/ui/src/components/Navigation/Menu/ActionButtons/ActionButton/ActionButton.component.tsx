import { Text } from '@/components/Text';

import { actionButtonStyles } from './ActionButton.css';
import type { IActionButton } from './types';

export const ActionButton: React.FC<IActionButton> = ({ label, testID, isHovering, ...props }) => {
  return (
    <button className={actionButtonStyles({ isHovering })} {...props} data-testid={testID}>
      <Text testID={`${testID}--label`}>{label}</Text>
    </button>
  );
};
