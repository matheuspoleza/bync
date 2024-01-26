import { useState } from 'react';
import { vi } from 'vitest';

import type { FormControlProps } from './types';

export const mockFormControl = <Type, Props extends Record<string, any>>(
  Component: React.FC<Props & FormControlProps<Type>>,
  initialValue: Type
) => {
  const onValueChange = vi.fn();

  const Controlled: React.FC<Omit<Props, keyof FormControlProps<Type>>> = (props) => {
    const [value, setValue] = useState(initialValue);
    onValueChange.mockImplementation(setValue);

    return <Component {...(props as Props)} value={value} onValueChange={onValueChange} />;
  };

  return [onValueChange, Controlled] as const;
};
