import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Input } from '../../../Inputs/Input/Input.component';
import { InputFormControl } from '../InputFormControl.component';
import type { IInputFormControl } from '../types';

describe('Input Form Control', () => {
  const component = (props?: Partial<IInputFormControl>) => {
    const testID = 'test-id';
    const onChange = vi.fn();

    const { queryByTestId } = render(
      <InputFormControl id={testID} testID={testID} {...props}>
        <Input onChange={onChange} value="Hello" id={testID} />
      </InputFormControl>
    );

    return {
      label: queryByTestId(`${testID}--label`),
      caption: queryByTestId(`${testID}--caption`),
      errorMessage: queryByTestId(`${testID}--error-message`),
    };
  };

  it('renders with a label, caption, and errorMessage when provided', () => {
    const label = 'label';
    const caption = 'caption';
    const errorMessage = 'error-message';

    const result = component({ label, caption, errorMessage });

    expect(result.label).toBeInTheDocument();
    expect(result.label).toHaveTextContent(label);

    expect(result.caption).toBeInTheDocument();
    expect(result.caption).toHaveTextContent(caption);

    expect(result.errorMessage).toBeInTheDocument();
    expect(result.errorMessage).toHaveTextContent(errorMessage);
  });
});
