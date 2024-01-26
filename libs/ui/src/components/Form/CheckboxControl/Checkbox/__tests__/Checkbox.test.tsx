import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { ICheckbox } from '../Checkbox.component';
import { Checkbox } from '../Checkbox.component';

describe.concurrent('Checkbox', () => {
  const component = ({ value: initialValue = false, ...props }: Partial<ICheckbox> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(Checkbox, initialValue);

    const { getByTestId } = render(<Controlled id={testID} testID={testID} {...props} />);

    return {
      checkbox: getByTestId(testID),
      onValueChange,
    };
  };

  it('should render checked', ({ expect }) => {
    const { checkbox } = component({ value: true });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('should render unchecked', ({ expect }) => {
    const { checkbox } = component();

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should check checkbox on click', ({ expect }) => {
    const { checkbox, onValueChange } = component();

    act(() => userEvent.click(checkbox));

    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(checkbox).toBeChecked();
  });

  it('should uncheck checkbox on click', ({ expect }) => {
    const { checkbox, onValueChange } = component({ value: true });

    act(() => userEvent.click(checkbox));

    expect(onValueChange).toHaveBeenCalledWith(false);
    expect(checkbox).not.toBeChecked();
  });
});
