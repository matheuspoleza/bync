import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';

import { mockFormControl } from '@/testing';

import { TextAreaAutoSize } from '../TextAreaAutoSize.component';
import type { ITextAreaAutoSize } from '../types';

const component = ({ value: initialValue = 'Hello', ...props }: Partial<ITextAreaAutoSize> = {}) => {
  const testID = 'test-id';
  const [onValueChange, Controlled] = mockFormControl(TextAreaAutoSize, initialValue);

  const { getByTestId, queryByTestId } = render(
    <Controlled testID={testID} onValueChange={onValueChange} {...props} />
  );

  return {
    textArea: getByTestId(testID),
    icon: queryByTestId(`${testID}--icon`),
    onValueChange,
  };
};

describe('TextAreaAutoSize', () => {
  it('renders', () => {
    const { textArea } = component();

    expect(textArea).toBeInTheDocument();
  });

  it('updates value to parent on input', () => {
    const { textArea, onValueChange } = component({ value: '' });

    act(() => {
      userEvent.type(textArea, 'World');
    });

    expect(onValueChange).lastCalledWith('World');
  });

  it('trigger icon click callback', () => {
    const onIconClick = vi.fn();
    const { icon } = component({ onIconClick, iconName: 'Abc' });

    act(() => {
      userEvent.click(icon!);
    });

    expect(onIconClick).toHaveBeenCalled();
  });
});
