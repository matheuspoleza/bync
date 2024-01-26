import { clsx } from '@bync/style';

import type { BaseProps, FormControlProps } from '@/types';

import { Checkmark } from './Checkbox.styled';
import { buttonStyles, containerStyles, iconStyles, inputStyles } from './styles';

export interface ICheckbox
  extends BaseProps,
    FormControlProps<boolean>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'label' | 'id' | 'value' | 'checked'> {
  id?: string;
  iconClassName?: string;
}

export const Checkbox: React.FC<ICheckbox> = ({
  id,
  value,
  disabled,
  onValueChange,
  testID,
  children = <Checkmark />,
  className,
  iconClassName,
  onChange,
  ...props
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(!value);
  };

  return (
    <div className={containerStyles}>
      <input
        {...props}
        className={clsx(inputStyles, className)}
        type="checkbox"
        onChange={handleChange}
        id={id}
        checked={value}
        disabled={disabled}
        data-testid={testID}
      />
      <div className={buttonStyles}>
        <div className={clsx(iconStyles, iconClassName)} data-testid={`${testID}--icon`}>
          {children}
        </div>
      </div>
    </div>
  );
};
