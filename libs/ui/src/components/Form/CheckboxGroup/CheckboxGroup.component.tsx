import { useExternalID } from '@/hooks';
import type { FormControlProps } from '@/types';

import { CheckboxControl } from '../CheckboxControl';
import type { IFormControlGroup, IFormControlGroupOption } from '../FormControlGroup';
import { FormControlGroup, useOptionMap } from '../FormControlGroup';

export interface ICheckboxGroup<T> extends FormControlProps<T[]>, Omit<IFormControlGroup, 'children'> {
  options: IFormControlGroupOption<T>[];
  disabled?: boolean;
  id?: string;
}

export const CheckboxGroup = <T extends any>({
  label,
  layout,
  value,
  options,
  disabled,
  onValueChange,
  testID,
  ...props
}: ICheckboxGroup<T>) => {
  const id = useExternalID(props.id);
  const optionMap = useOptionMap(options);

  const handleChange = (id: string) => () => {
    const target = optionMap[id].value;

    if (value.includes(target)) {
      onValueChange?.(value.filter((item) => item !== target));
    } else {
      onValueChange?.([...value, target]);
    }
  };

  return (
    <FormControlGroup id={id} testID={testID} label={label} layout={layout}>
      {options.map((option, index) => {
        const isChecked = value.includes(option.value);

        return (
          <FormControlGroup.Option key={option.id}>
            <CheckboxControl
              id={`${id}--${option.id}`}
              testID={`${testID}--checkbox-${index}`}
              label={option.label}
              caption={option.caption}
              value={isChecked}
              disabled={disabled || option.disabled}
              onValueChange={handleChange(option.id)}
            />
          </FormControlGroup.Option>
        );
      })}
    </FormControlGroup>
  );
};
