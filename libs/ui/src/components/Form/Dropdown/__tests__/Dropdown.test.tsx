import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { Dropdown } from '../Dropdown.component';
import type { IDropdown } from '../Dropdown.interface';

describe('Input Form Control', () => {
  const component = (props: Partial<IDropdown>) => {
    const testID = 'test-id';

    const { queryByTestId } = render(
      <Dropdown variant="dark" fontSize="caption" weight="semiBold" isSmall value="En" testID={testID} {...props}>
        {() => <></>}
      </Dropdown>
    );
    return {
      label: queryByTestId(`${testID}--label`),
      prefixIcon: queryByTestId(`${testID}--prefix-icon`),
    };
  };

  it('triggers the prefix onClick when provided', () => {
    const mockOnClick = vi.fn();
    const { prefixIcon } = component({ prefixIconName: 'CloseS', onPrefixIconClick: mockOnClick });

    userEvent.click(prefixIcon!);

    expect(prefixIcon).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
