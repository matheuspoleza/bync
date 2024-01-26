import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { IFormControlGroupOption } from '../../FormControlGroup';
import type { IRadioGroup } from '../RadioGroup.component';
import { RadioGroup } from '../RadioGroup.component';

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

describe.concurrent('Radio Group', () => {
  const component = ({
    value: initialSelected = OPTIONS[0].value,
    label = 'Select an option',
    ...props
  }: Partial<IRadioGroup<string>> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(RadioGroup, initialSelected);

    const { getByTestId } = render(
      <Controlled id={testID} testID={testID} options={OPTIONS} label={label} {...props} />
    );

    return {
      radioGroup: getByTestId(testID),
      radio: (index: number) => getByTestId(`${testID}--radio-${index}`),
      onValueChange,
    };
  };

  it('should render with initial value', ({ expect }) => {
    const { radioGroup, radio } = component();

    expect(radioGroup).toBeInTheDocument();
    expect(radio(0)).toBeChecked();
    expect(radio(1)).not.toBeChecked();
  });

  it('should call onValueChange on radio on click', ({ expect }) => {
    const { radio, onValueChange } = component();

    act(() => userEvent.click(radio(1)));

    expect(onValueChange).toHaveBeenCalledWith(OPTIONS[1].value);
    expect(radio(0)).not.toBeChecked();
    expect(radio(1)).toBeChecked();
  });
});
