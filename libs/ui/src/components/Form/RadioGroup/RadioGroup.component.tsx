import { useExternalID } from '@/hooks';
import type { FormControlProps } from '@/types';

import type { IFormControlGroup, IFormControlGroupOption } from '../FormControlGroup';
import { FormControlGroup, useOptionMap } from '../FormControlGroup';
import { RadioControl } from '../RadioControl';

export interface IRadioGroup<T> extends FormControlProps<T>, Omit<IFormControlGroup, 'children'> {
  options: IFormControlGroupOption<T>[];
  disabled?: boolean;
  id?: string;
}

export const RadioGroup = <T extends any>({
  label,
  layout,
  value,
  options,
  disabled,
  onValueChange,
  testID,
  ...props
}: IRadioGroup<T>) => {
  const id = useExternalID(props.id);
  const optionMap = useOptionMap(options);

  const handleChange = (id: string) => () => onValueChange?.(optionMap[id].value);

  return (
    <FormControlGroup id={id} testID={testID} label={label} layout={layout}>
      {options.map((option, index) => {
        const isChecked = value === option.value;

        return (
          <FormControlGroup.Option key={option.id}>
            <RadioControl
              id={`${id}--${option.id}`}
              testID={`${testID}--radio-${index}`}
              label={option.label}
              caption={option.caption}
              value={isChecked}
              disabled={disabled || option.disabled}
              readOnly={isChecked}
              onValueChange={handleChange(option.id)}
            />
          </FormControlGroup.Option>
        );
      })}
    </FormControlGroup>
  );
};
