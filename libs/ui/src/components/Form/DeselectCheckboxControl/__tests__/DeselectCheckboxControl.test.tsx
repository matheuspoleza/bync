import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import { DeselectCheckboxControl } from '../DeselectCheckboxControl.component';
import { deselectIconStyles } from '../DeselectCheckboxControl.css';
import type { IDeselectCheckboxControl } from '../DeselectCheckboxControl.interface';

describe.concurrent('Deselect Checkbox', () => {
  const component = ({ value: initialValue = 'deselect', ...props }: Partial<IDeselectCheckboxControl> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(DeselectCheckboxControl, initialValue);

    const { getByTestId } = render(<Controlled id={testID} testID={testID} {...props} />);

    return {
      checkbox: getByTestId(testID),
      icon: getByTestId(`${testID}--icon`),
      onValueChange,
    };
  };

  it('should render checked', ({ expect }) => {
    const { checkbox } = component({ value: 'checked' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('should render unchecked', ({ expect }) => {
    const { checkbox } = component({ value: 'unchecked' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should render deselect', ({ expect }) => {
    const { checkbox, icon } = component({ value: 'deselect' });

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(icon).toHaveClass(deselectIconStyles);
  });

  it('should check unchecked checkbox on click', ({ expect }) => {
    const { checkbox, onValueChange } = component({ value: 'unchecked' });

    act(() => userEvent.click(checkbox));

    expect(onValueChange).toHaveBeenCalledWith('checked');
    expect(checkbox).toBeChecked();
  });

  it('should uncheck checked checkbox on click', ({ expect }) => {
    const { checkbox, onValueChange } = component({ value: 'checked' });

    act(() => userEvent.click(checkbox));

    expect(onValueChange).toHaveBeenCalledWith('unchecked');
    expect(checkbox).not.toBeChecked();
  });

  it('should uncheck deselect checkbox on click', ({ expect }) => {
    const { checkbox, onValueChange } = component({ value: 'deselect' });

    act(() => userEvent.click(checkbox));

    expect(onValueChange).toHaveBeenCalledWith('unchecked');
    expect(checkbox).not.toBeChecked();
  });
});
