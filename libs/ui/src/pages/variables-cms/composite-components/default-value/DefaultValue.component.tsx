import { forwardRef } from 'react';

import { Box, TextField } from '@/components';

const TEST_ID = 'variable__default-value';

interface IVariableDefaultValue {
  label?: string;
  value: string;
  setValue: (value: string) => void;
}

export const VariableDefaultValue = forwardRef<HTMLInputElement, IVariableDefaultValue>(
  ({ label, value, setValue }, ref) => {
    return (
      <Box pb={24} px={24} direction="column">
        <TextField
          value={value}
          onValueChange={setValue}
          placeholder="Enter intent name"
          label={label}
          testID={TEST_ID}
          ref={ref}
        />
      </Box>
    );
  }
);
