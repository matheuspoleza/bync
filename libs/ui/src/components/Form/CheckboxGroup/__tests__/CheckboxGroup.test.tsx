import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { IFormControlGroupOption } from '../../FormControlGroup';
import type { ICheckboxGroup } from '../CheckboxGroup.component';
import { CheckboxGroup } from '../CheckboxGroup.component';

const OPTIONS: IFormControlGroupOption<string>[] = [
  {
    id: '1',
    label: 'Option 1',
    value: 'option-1',
  },
  {
    id: '2',
    label: 'Option 2',
    value: 'option-2',
  },
];

describe.concurrent('Checkbox Group', () => {
  const component = ({
    value: initialValue = [OPTIONS[0].value],
    label = 'Select multiple options',
    ...props
  }: Partial<ICheckboxGroup<string>> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(CheckboxGroup, initialValue);

    const { getByTestId } = render(
      <Controlled id={testID} testID={testID} options={OPTIONS} label={label} {...props} />
    );

    return {
      checkboxGroup: getByTestId(testID),
      checkbox: (index: number) => getByTestId(`${testID}--checkbox-${index}`),
      onValueChange,
    };
  };

  it('should render with initial value', ({ expect }) => {
    const { checkboxGroup, checkbox } = component();

    expect(checkboxGroup).toBeInTheDocument();
    expect(checkbox(0)).toBeChecked();
    expect(checkbox(1)).not.toBeChecked();
  });

  it('should call onValueChange on checking checkbox', ({ expect }) => {
    const { checkbox, onValueChange } = component();

    act(() => userEvent.click(checkbox(1)));

    expect(onValueChange).toHaveBeenCalledWith([OPTIONS[0].value, OPTIONS[1].value]);
    expect(checkbox(0)).toBeChecked();
    expect(checkbox(1)).toBeChecked();
  });

  it('should call onValueChange on unchecking checkbox', ({ expect }) => {
    const { checkbox, onValueChange } = component();

    act(() => userEvent.click(checkbox(0)));

    expect(onValueChange).toHaveBeenCalledWith([]);
    expect(checkbox(0)).not.toBeChecked();
    expect(checkbox(1)).not.toBeChecked();
  });
});
