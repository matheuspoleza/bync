import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import type { ISquareButton } from '@/components/Buttons/SquareButton';
import { SquareButton } from '@/components/Buttons/SquareButton';

describe.concurrent('Square Button', () => {
  const component = (props?: Partial<ISquareButton>) => {
    const testID = 'test-id';
    const onClick = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <SquareButton iconName="Copy" onClick={onClick} testID={testID} {...props} />
    );

    return {
      button: getByTestId(testID),
      spinner: queryByTestId(`${testID}--loading-spinner`),
      icon: queryByTestId(`${testID}--icon`),
      onClick,
    };
  };

  it('should render successfully', ({ expect }) => {
    const { button } = component();

    expect(button).toBeInTheDocument();
  });

  it('triggers onClick when clicked', ({ expect }) => {
    const { button, onClick } = component();

    userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it("display a spinning loading icon while loading & doesn't display the icon", ({ expect }) => {
    const { spinner, icon } = component({ isLoading: true });

    expect(icon).not.toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it('renders the icon when not loading', ({ expect }) => {
    const { spinner, icon } = component();

    expect(spinner).not.toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });
});
