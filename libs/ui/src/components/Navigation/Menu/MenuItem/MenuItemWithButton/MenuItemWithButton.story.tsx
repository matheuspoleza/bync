import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { MenuItemWithButton } from './MenuItemWithButton.component';
import type { IMenuItemWithButton } from './types';

const meta: Meta<typeof MenuItemWithButton> = {
  title: 'Navigation/Menu/MenuItem/WithButton',
  component: MenuItemWithButton,
};

export default meta;
type Story = StoryObj<typeof MenuItemWithButton>;

export const Base: Story = {
  render: () => (
    <CartesianProduct<IMenuItemWithButton>
      componentName={MenuItemWithButton.name}
      Component={(props) => <MenuItemWithButton {...props} onClick={() => null} />}
      combinations={{
        label: ['With Suffix Button'],
        suffixButton: [{ iconName: 'EditS', onClick: () => null }],
        prefixIconName: [undefined, 'EditS'],
        isHovering: [undefined, true],
      }}
      columns={1}
    />
  ),
};
