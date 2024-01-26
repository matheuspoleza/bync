import { clsx } from '@bync/style';
import type { ChangeEventHandler } from 'react';

import { useExternalID } from '@/hooks';

import { pillStyles, toggleCircleStyles, toggleContainer, toggleInput } from './styles/Toggle.css';
import * as ToggleTheme from './styles/ToggleTheme.css';
import type { IToggle } from './types';

export const Toggle: React.FC<IToggle> = ({
  value,
  onValueChange,
  variant = 'light',
  testID,
  disabled,
  id: propID,
}) => {
  const id = useExternalID(propID);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange?.(e.target.checked);
  };

  return (
    <label htmlFor={id} className={clsx(ToggleTheme[variant], toggleContainer)} data-testid={`${testID}--label`}>
      <input
        className={toggleInput}
        data-testid={testID}
        checked={value}
        onChange={handleChange}
        type="checkbox"
        id={id}
        disabled={disabled}
      />
      <span className={pillStyles}>
        <span className={toggleCircleStyles} />
      </span>
    </label>
  );
};
