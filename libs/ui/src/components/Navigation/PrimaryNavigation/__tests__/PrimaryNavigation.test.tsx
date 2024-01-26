import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { PrimaryNavigation } from '../index';

describe('PrimaryNavigation', () => {
  const component = () => {
    const testID = 'test-id';
    const onClick = vi.fn();

    const { queryByTestId, getByTestId } = render(
      <PrimaryNavigation testID={testID}>
        <PrimaryNavigation.Section testID={`${testID}--top-section`}>
          <PrimaryNavigation.Item
            iconName="Designer"
            isActive
            onClick={onClick}
            testID={`${testID}--top-section--item-1`}
          />
        </PrimaryNavigation.Section>
      </PrimaryNavigation>
    );

    return {
      leftMenu: getByTestId(testID),
      item: queryByTestId(`${testID}--top-section--item-1`),
    };
  };

  it('renders container and menu items', () => {
    const { leftMenu, item } = component();

    expect(leftMenu).toBeInTheDocument();
    expect(item).toBeInTheDocument();
  });
});
