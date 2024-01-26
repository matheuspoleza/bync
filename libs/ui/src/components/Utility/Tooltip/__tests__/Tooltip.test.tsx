import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip } from '../Tooltip.component';
import type { ITooltip } from '../Tooltip.interface';

describe('Popper component tests', () => {
  const component = ({ children = () => 'tooltip content', ...props }: Partial<ITooltip> = {}) => {
    const testID = 'tooltip-test';

    const { findByTestId } = render(
      <Tooltip
        testID={testID}
        referenceElement={({ onToggle, attributes }) => (
          <button {...attributes} onClick={onToggle}>
            click me
          </button>
        )}
        {...props}
      >
        {children}
      </Tooltip>
    );

    return {
      tooltip: findByTestId(`${testID}--tooltip--popper-reference`),
      content: findByTestId(`${testID}--tooltip--popper-content`),
      innerBox: findByTestId(`${testID}--tooltip-inner-box`),
    };
  };

  it('should render a text tooltip', async () => {
    const { content } = component({ isOpen: true });

    expect(await content).toBeInTheDocument();
  });

  it("should render a tooltip only when it's toggler is clicked", async () => {
    const { content, tooltip } = component({ isOpen: false });

    await userEvent.click(await tooltip);

    expect(await content).toBeInTheDocument();

    await userEvent.click(await tooltip);

    expect(await content).not.toBeInTheDocument();
  });

  it('should render correct width and height', async () => {
    const { innerBox } = component({ isOpen: true, width: 200, height: 200 });

    expect(await innerBox).toHaveStyle('width: 200px');
    expect(await innerBox).toHaveStyle('height: 200px');
  });
});
