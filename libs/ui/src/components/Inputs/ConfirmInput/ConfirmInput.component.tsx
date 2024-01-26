import { Box } from '@/components/Utility/Box';

import { inputFieldStyle } from './ConfirmInput.css';
import type { IConfirmInput } from './ConfirmInput.interface';

export const ConfirmInput: React.FC<IConfirmInput> = ({ children, disabled, isLoading }) => {
  const isDisabled = isLoading ?? disabled;
  return (
    <Box direction="column" style={{ width: '100%' }}>
      {children({ disabled: isDisabled, isLoading, inputFieldClassName: inputFieldStyle })}
    </Box>
  );
};
