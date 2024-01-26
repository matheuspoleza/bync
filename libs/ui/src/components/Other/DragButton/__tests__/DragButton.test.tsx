import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { DragButton } from '../DragButton.component';
import type { IDragButton } from '../DragButton.interface';

describe('DragButton', () => {
  const component = (props: IDragButton) => {
    const testID = 'test-id';
    const { getByTestId } = render(<DragButton testID={testID} {...props} />);

    return {
      button: getByTestId(testID),
    };
  };

  it('renders DragButton with drag handlers when passed', () => {
    const onDragStart = vi.fn();
    const onDrag = vi.fn();
    const onDragEnd = vi.fn();

    const dragButtonProps = { onDrag, onDragEnd, onDragStart };
    const { button } = component(dragButtonProps);

    expect(button).toBeInTheDocument();

    button.dispatchEvent(new MouseEvent('dragstart', { bubbles: true }));
    button.dispatchEvent(new MouseEvent('drag', { bubbles: true }));
    button.dispatchEvent(new MouseEvent('dragend', { bubbles: true }));

    expect(onDragStart).toHaveBeenCalled();
    expect(onDrag).toHaveBeenCalled();
    expect(onDragEnd).toHaveBeenCalled();
  });
});
