import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { DragButton } from './DragButton.component';
import type { IDragButton } from './DragButton.interface';

const meta: Meta<typeof DragButton> = {
  title: 'Other/DragButton',
  component: DragButton,
};

export default meta;

type Story = StoryObj<typeof DragButton>;

export const Base: Story = {
  args: {},
};

export const Hovering: Story = {
  args: {
    isHovering: true,
  },
};

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IDragButton>
      componentName={DragButton.name}
      Component={DragButton}
      combinations={{
        isActive: [false, true],
        isHovering: [false, true],
      }}
      columns={2}
    />
  ),
};
