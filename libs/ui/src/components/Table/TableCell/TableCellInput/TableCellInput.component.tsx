import React from 'react';

import { Input } from '@/components/Inputs/Input/Input.component';
import { Box } from '@/components/Utility/Box/Box.component';

import { containerStyle, inputStyles } from './TableCellInput.css';
import type { ITableCellInput } from './TableCellInput.interface';

export const TableCellInput: React.FC<ITableCellInput> = ({ value, onSave, transform = (v) => v }) => {
  const [inputValue, setInputValue] = React.useState<string>(value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onSave(inputValue);
    }
  };

  return (
    <Box className={containerStyle}>
      <Input
        value={inputValue}
        onBlur={() => onSave(inputValue)}
        onFocus={(e) => e.target.select()}
        onClick={(e) => e.stopPropagation()}
        fullWidth
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className={inputStyles}
        onKeyDown={handleKeyDown}
        onValueChange={(value) => setInputValue(transform(value))}
      />
    </Box>
  );
};
