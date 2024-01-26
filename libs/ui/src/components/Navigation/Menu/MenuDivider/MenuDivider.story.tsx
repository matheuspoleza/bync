import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { MenuDivider } from './MenuDivider.component';
import type { IMenuDivider } from './types';

const meta: Meta<typeof MenuDivider> = {
  title: 'Navigation/Menu/Divider',
  component: MenuDivider,
};

export default meta;
type Story = StoryObj<typeof MenuDivider>;

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IMenuDivider>
      componentName={MenuDivider.name}
      Component={(props) => <MenuDivider {...props} />}
      combinations={{
        label: ['Label', ''],
        centeredLabel: [false, true],
        dashed: [false, true],
        onCloseClick: [undefined, () => null],
        breakDivider: [false, true],
        thick: [false, true],
      }}
    />
  ),
};

export const Solid: Story = {
  render: () => (
    <CartesianProduct<IMenuDivider>
      componentName={MenuDivider.name}
      Component={(props) => <MenuDivider {...props} />}
      combinations={{
        label: ['Label', ''],
        centeredLabel: [false, true],
        dashed: [false],
      }}
      isHidden={({ centeredLabel, label }) => (centeredLabel && label === '') || false}
    />
  ),
};
export const Dashed: Story = {
  render: () => (
    <CartesianProduct<IMenuDivider>
      componentName={MenuDivider.name}
      Component={(props) => <MenuDivider {...props} />}
      combinations={{
        label: [''],
        centeredLabel: [false],
        dashed: [true],
      }}
    />
  ),
};
export const Break: Story = {
  render: () => (
    <CartesianProduct<IMenuDivider>
      componentName={MenuDivider.name}
      Component={(props) => <MenuDivider {...props} />}
      combinations={{
        label: ['Used in 3 blocks'],
        onCloseClick: [() => null],
        centeredLabel: [false],
        breakDivider: [true],
      }}
    />
  ),
};
export const Thick: Story = {
  render: () => (
    <CartesianProduct<IMenuDivider>
      componentName={MenuDivider.name}
      Component={(props) => <MenuDivider {...props} />}
      combinations={{
        label: [''],
        thick: [true],
      }}
    />
  ),
};
