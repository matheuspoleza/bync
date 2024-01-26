import { clsx } from '@bync/style';

import type { BaseProps, FormControlProps } from '@/types';

import { buttonStyles, containerStyles, inputStyles } from './styles';

export interface IRadio
  extends BaseProps,
    FormControlProps<boolean>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'label' | 'id' | 'value' | 'checked'> {
  id: string;
}

export const Radio: React.FC<IRadio> = ({ value, onValueChange, id, className, testID, onChange, ...props }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event);
    onValueChange?.(!value);
  };

  return (
    <div className={containerStyles} data-testid={`${testID}--container`}>
      <input
        {...props}
        className={clsx(inputStyles, className)}
        checked={value}
        type="radio"
        onChange={handleChange}
        id={id}
        data-testid={testID}
      />
      <span className={buttonStyles} data-testid={`${testID}--button`} />
    </div>
  );
};
