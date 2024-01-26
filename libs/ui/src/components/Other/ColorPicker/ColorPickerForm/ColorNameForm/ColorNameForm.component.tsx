/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

import { Button } from '@/components/Buttons';
import { Input } from '@/components/Inputs';
import { Box } from '@/components/Utility';
import { Surface } from '@/components/Utility/Surface';

import type { IColorNameForm } from './ColorNameForm.interface';

export const ColorNameForm: React.FC<IColorNameForm> = ({ value = '', onClose, onSave }) => {
  const [name, setName] = useState(value);

  const onSubmit = () => {
    onSave(name.trim());
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    onSubmit();
  };

  return (
    <Surface width="224px" direction="column" gap={8} px={20} pt={5} pb={15}>
      <Input
        value={name}
        variant="ghost"
        onKeyDown={onKeyDown}
        autoFocus
        placeholder="Enter color label (optional)"
        onValueChange={setName}
      />

      <Box gap={8} justify="end">
        <Button variant="secondary" onClick={onClose} label="Cancel" size="medium" />

        <Button size="medium" label={value === '' ? 'Add' : 'Update'} variant="primary" onClick={onSubmit} />
      </Box>
    </Surface>
  );
};
