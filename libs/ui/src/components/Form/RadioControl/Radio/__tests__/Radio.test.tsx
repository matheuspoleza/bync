import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { mockFormControl } from '@/testing';

import type { IRadio } from '../Radio.component';
import { Radio } from '../Radio.component';

describe.concurrent('Radio', () => {
  const component = ({ value: initialValue = false, ...props }: Partial<IRadio> = {}) => {
    const testID = 'test-id';
    const [onValueChange, Controlled] = mockFormControl(Radio, initialValue);

    const { getByTestId } = render(<Controlled id={testID} testID={testID} {...props} />);

    return {
      radio: getByTestId(testID),
      onValueChange,
    };
  };

  it('should render checked', ({ expect }) => {
    const { radio } = component({ value: true });

    expect(radio).toBeInTheDocument();
    expect(radio).toBeChecked();
  });

  it('should render unchecked', ({ expect }) => {
    const { radio } = component();

    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it('should call onValueChange on radio on click', ({ expect }) => {
    const { radio, onValueChange } = component();

    act(() => userEvent.click(radio));

    expect(onValueChange).toHaveBeenCalled();
    expect(radio).toBeChecked();
  });
});
