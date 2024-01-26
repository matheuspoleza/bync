import { act, fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Removable } from '../Removable.component';
import type { IRemovable } from '../types';

describe.concurrent('Utility/Removable', () => {
  const component = ({ testID = 'test-id', ...props }: Partial<IRemovable & { testID?: string }> = {}) => {
    const onRemove = vi.fn();

    const { getByText, getByTestId } = render(<Removable onRemove={onRemove} {...props} testID={testID} />);

    return {
      closeButton: getByTestId(`${testID}--removal-button`),
      container: getByTestId(testID),
      getByText,
      onRemove,
    };
  };

  it('renders children', ({ expect }) => {
    const { getByText } = component({ children: <div>Child</div> });

    expect(getByText('Child')).toBeInTheDocument();
  });

  it('renders the close button', ({ expect }) => {
    const { closeButton } = component();

    expect(closeButton).toBeInTheDocument();
  });

  it('calls onRemove when the close button is clicked', ({ expect }) => {
    const { closeButton, onRemove } = component();

    act(() => fireEvent.click(closeButton));

    expect(onRemove).toHaveBeenCalled();
  });

  it('does not call onRemove when it is disabled', ({ expect }) => {
    const { closeButton, onRemove } = component({ disabled: true });

    act(() => fireEvent.click(closeButton));

    expect(onRemove).not.toHaveBeenCalled();
  });
});
