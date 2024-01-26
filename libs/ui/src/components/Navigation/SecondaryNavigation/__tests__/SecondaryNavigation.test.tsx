import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';

import { SecondaryNavigation } from '@/components/Navigation/SecondaryNavigation';
import type { ISecondaryNavigationItem } from '@/components/Navigation/SecondaryNavigation/types';
import { Tokens } from '@/styles';

describe.concurrent('SecondaryNavigation', () => {
  const component = (itemProps?: Partial<ISecondaryNavigationItem>) => {
    const testID = 'secondary-navigation';
    const itemTestID = 'secondary-navigation-item';
    const labelFixture = 'Flows';
    const captionFixture = '42';
    const onClick = vi.fn();

    const { queryByText, getByTestId } = render(
      <SecondaryNavigation testID={testID}>
        <SecondaryNavigation.Section title="Agent">
          <SecondaryNavigation.Item
            label={labelFixture}
            icon="Choice"
            caption={captionFixture}
            {...itemProps}
            onClick={onClick}
            testID={itemTestID}
          />
        </SecondaryNavigation.Section>
      </SecondaryNavigation>
    );

    return {
      navigation: getByTestId(testID),
      item: getByTestId(itemTestID),
      label: queryByText(labelFixture),
      caption: queryByText(captionFixture),
      onClick,
    };
  };

  it('should render the left navigation with an item', ({ expect }) => {
    const { navigation, label, caption } = component();

    expect(navigation).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(caption).toBeInTheDocument();
  });

  it('should render an item with the "new" variant', ({ expect }) => {
    const { item } = component({ variant: 'new' });

    expect(item).toHaveStyle({ color: Tokens.colors.accent.accent50 });
  });

  it('should render an item with the "alert" variant', ({ expect }) => {
    const { item } = component({ variant: 'alert' });

    expect(item).toHaveStyle({ color: Tokens.colors.alert.alert50 });
  });

  it('should render an item with the active variant', ({ expect }) => {
    const { item } = component({ isActive: true });

    expect(item).toHaveStyle({
      color: Tokens.colors.neutralLight.neutralsLight50,
      background: Tokens.colors.neutralDark.neutralsDark300,
    });
  });

  it('should handle item click', ({ expect }) => {
    const { onClick, label } = component();

    userEvent.click(label!);

    expect(onClick).toHaveBeenCalled();
  });
});
