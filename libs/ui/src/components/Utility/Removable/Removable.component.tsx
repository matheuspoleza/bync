import { SquareButton } from '@/components/Buttons/SquareButton';

import { Box } from '../Box/Box.component';
import { removeButtonStyles } from './Removable.css';
import type { IRemovable } from './types';

export const Removable: React.FC<IRemovable> = ({
  onRemove,
  children,
  gap = 12,
  testID,
  className,
  disabled,
  ...props
}) => {
  return (
    <Box
      className={className}
      gap={gap}
      testID={testID}
      align="center"
      grow={1}
      style={{ maxWidth: '100%' }}
      {...props}
    >
      <Box direction="column" grow={1}>
        {children}
      </Box>
      <SquareButton
        onClick={onRemove}
        className={removeButtonStyles}
        variant="light"
        iconName="Minus"
        size="medium"
        testID={`${testID}--removal-button`}
        disabled={disabled}
      />
    </Box>
  );
};
