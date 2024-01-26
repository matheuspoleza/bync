import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import { Toggle } from '../Toggle.component';
import type { IToggle } from '../types';

describe.concurrent('Toggle', () => {
  const component = ({ value: initialValue = false, ...props }: Partial<IToggle> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(Toggle, initialValue);

    const { getByTestId } = render(<Controlled testID={testID} {...props} />);

    return {
      toggleElement: getByTestId(testID),
      label: getByTestId(`${testID}--label`),
      onValueChange,
    };
  };

  it('renders', ({ expect }) => {
    const { toggleElement } = component();

    expect(toggleElement).toBeInTheDocument();
  });

  it('updates value on click', ({ expect }) => {
    const { toggleElement, label, onValueChange } = component();

    act(() => userEvent.click(label));

    expect(onValueChange).toBeCalledWith(true);
    expect(toggleElement).toBeChecked();
  });

  it("doesn'nt update value on click when disabled", ({ expect }) => {
    const { label, onValueChange } = component({ disabled: true });

    act(() => userEvent.click(label));

    expect(onValueChange).not.toBeCalled();
  });
});
