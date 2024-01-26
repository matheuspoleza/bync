import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';

import { mockFormControl } from '@/testing';

import { Input } from '../Input.component';
import type { IInput } from '../types';

describe.concurrent('Input', () => {
  const component = ({ value: initialValue = 'Hello', ...props }: Partial<IInput> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(Input, initialValue);

    const { getByTestId, queryByTestId } = render(<Controlled id={testID} testID={testID} {...props} />);

    return {
      input: getByTestId(testID),
      prefixIcon: queryByTestId(`${testID}--prefix-icon`),
      suffixIcon: queryByTestId(`${testID}--suffix-icon`),
      onValueChange,
    };
  };

  it('renders with an initial value', ({ expect }) => {
    const value = 'Hello, world!';

    const { input } = component({ value });

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  it('renders with a placeholder', ({ expect }) => {
    const placeholder = 'Placeholder';

    const { input } = component({ placeholder });

    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('renders with an prefix icon', ({ expect }) => {
    const { prefixIcon } = component({ prefixIconName: 'Copy' });

    expect(prefixIcon).toBeInTheDocument();
  });

  it('renders with an suffix icon', ({ expect }) => {
    const { suffixIcon } = component({ suffixIconName: 'Copy' });

    expect(suffixIcon).toBeInTheDocument();
  });

  it('updates value on change', ({ expect }) => {
    const text = 'Howdy World!';
    const { input, onValueChange } = component({ value: '' });

    act(() => userEvent.type(input, text));

    expect(onValueChange).toHaveBeenNthCalledWith(text.length, text);
    expect(input).toHaveValue(text);
  });

  it('wont allow typing on disabled state', ({ expect }) => {
    const { input, onValueChange } = component({ disabled: true });

    act(() => userEvent.type(input, 'Howdy'));

    expect(onValueChange).not.toBeCalled();
  });

  it('triggers the prefix icon on click correctly', ({ expect }) => {
    const prefixIconOnClick = vi.fn();
    const { prefixIcon } = component({
      disabled: true,
      prefixIconOnClick,
      prefixIconName: 'Abc',
    });

    userEvent.click(prefixIcon!);

    expect(prefixIconOnClick).toBeCalled();
  });

  it('triggers the suffix icon on click correctly', ({ expect }) => {
    const suffixIconOnClick = vi.fn();
    const { suffixIcon } = component({
      disabled: true,
      suffixIconOnClick,
      suffixIconName: 'Abc',
    });

    userEvent.click(suffixIcon!);

    expect(suffixIconOnClick).toBeCalled();
  });
});
