import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { ToolbarButton } from './ToolbarButton.component';
import type { IToolbarButton } from './ToolbarButton.interface';

type Story = StoryObj<typeof ToolbarButton>;

const meta: Meta<typeof ToolbarButton> = {
  title: 'Inputs/SlateEditor/ToolbarButton',
  component: ToolbarButton,
  args: {
    iconName: 'Bold',
  },
  render: (args) => (
    <div style={{ width: '50%' }}>
      <ToolbarButton {...args} />
    </div>
  ),
};

export default meta;

export const Base: Story = {
  args: {},
};

export const StylesApplied: Story = {
  args: {
    stylesApplied: true,
  },
};

export const Removable: Story = {
  args: {
    canRemove: true,
    stylesApplied: true,
  },
};

export const HoveringRemovable: Story = {
  args: {
    isHovering: true,
    canRemove: true,
    stylesApplied: true,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IToolbarButton>
      columns={2}
      Component={ToolbarButton}
      componentName={ToolbarButton.name}
      combinations={{
        isHovering: [false, true],
        iconName: ['Bold'],
        canRemove: [false, true],
        stylesApplied: [false, true],
      }}
    />
  ),
};
