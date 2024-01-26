import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { MenuItemWithButton } from '../MenuItemWithButton.component';
import type { IMenuItemWithButton } from '../types';

const testLabel = 'Label';

describe('MenuItemWithButton', () => {
  const component = (props?: Partial<IMenuItemWithButton>) => {
    const testID = 'test-id';
    const onClick = vi.fn();
    const suffixButtonOnClick = vi.fn();
    const { getByTestId } = render(
      <MenuItemWithButton
        label={testLabel}
        suffixButton={{ iconName: 'BuiltIn', onClick: suffixButtonOnClick }}
        onClick={onClick}
        testID={testID}
        {...props}
      />
    );

    return {
      menuItem: getByTestId(testID),
      onClick,
      suffixButtonOnClick,
      suffixButton: getByTestId(`${testID}--suffix-button`),
    };
  };

  it('renders', () => {
    const { menuItem } = component();

    expect(menuItem).toBeInTheDocument();
  });
  it('renders the suffix button', () => {
    const { suffixButton } = component();

    expect(suffixButton).toBeInTheDocument();
  });
  it('handles the menu item click without triggering suffix button', () => {
    const { menuItem, onClick, suffixButtonOnClick } = component();

    menuItem.click();

    expect(onClick).toHaveBeenCalled();
    expect(suffixButtonOnClick).not.toHaveBeenCalled();
  });
  it('handles the suffix button click without triggering the menu item click', () => {
    const { suffixButton, onClick, suffixButtonOnClick } = component();

    suffixButton.click();

    expect(suffixButtonOnClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
