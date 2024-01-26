import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import type { IButton } from '@/components/Buttons/Button';
import { Button } from '@/components/Buttons/Button';

import { activeVariants, hoveringVariants, widthVariants } from '../styles/Button.css';

describe.concurrent('Button', () => {
  const component = (props?: Partial<IButton>) => {
    const testID = 'test-id';
    const onClick = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <Button iconName="Copy" onClick={onClick} testID={testID} {...props} />
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

  it('prints an error to console with no label or icon', ({ expect }) => {
    const consoleErrorSpy = vi.spyOn(global.console, 'error').mockReturnValue();

    component({ label: undefined, iconName: undefined });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      '⚠️ You must provide either a label or an icon name to the button component'
    );
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

  it('renders the icon when provided', ({ expect }) => {
    const { spinner, icon } = component();

    expect(spinner).not.toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('displays hovering state', ({ expect }) => {
    const { button } = component({ isHovering: true });

    expect(button.className.includes(hoveringVariants.true)).toBeTruthy();
  });

  it('displays active state', ({ expect }) => {
    const { button } = component({ isActive: true });

    expect(button.className.includes(activeVariants.true)).toBeTruthy();
  });

  it('displays full width', ({ expect }) => {
    const { button } = component({ fullWidth: true });

    expect(button.className.includes(widthVariants.true)).toBeTruthy();
  });
});
