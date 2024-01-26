import { clsx } from '@bync/style';

import { Checkbox } from '@/components/Form/CheckboxControl/Checkbox';

import { deselectIconStyles } from './DeselectCheckboxControl.css';
import type { IDeselectCheckboxControl } from './DeselectCheckboxControl.interface';

export const DeselectCheckboxControl: React.FC<IDeselectCheckboxControl> = ({
  id,
  value,
  onValueChange,
  onChange,
  ...props
}) => {
  const isDeselect = value === 'deselect';

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(value === 'unchecked' ? 'checked' : 'unchecked');
  };

  return (
    <Checkbox
      id={id}
      value={value !== 'unchecked'}
      onChange={handleToggle}
      iconClassName={clsx({ [deselectIconStyles]: isDeselect })}
      {...props}
    >
      {isDeselect ? null : <Checkbox.Checkmark />}
    </Checkbox>
  );
};
