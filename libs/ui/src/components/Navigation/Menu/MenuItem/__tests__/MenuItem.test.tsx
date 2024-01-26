import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { MenuItem } from '../MenuItem.component';
import type { IMenuItem } from '../types';

const testLabel = 'Label';
const testCaption = 'Caption';

describe('MenuItem', () => {
  const component = (props?: Partial<IMenuItem>) => {
    const testID = 'test-id';
    const onClick = vi.fn();

    const { getByTestId } = render(
      <MenuItem label={testLabel} caption={testCaption} onClick={onClick} testID={testID} {...props} />
    );

    return {
      menuItem: getByTestId(testID),
    };
  };

  it('renders', () => {
    const { menuItem } = component();

    expect(menuItem).toBeInTheDocument();
  });
});
