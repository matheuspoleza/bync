import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import { DeselectCheckboxControl } from './DeselectCheckboxControl.component';
import type { IDeselectCheckboxControl } from './DeselectCheckboxControl.interface';

const meta: Meta<typeof DeselectCheckboxControl> = {
  title: 'Form/Deselect Checkbox',
  component: DeselectCheckboxControl,
  args: {
    id: '00000',
    value: 'deselect',
  },
  decorators: [WithFormControlState],
};

export default meta;

type Story = StoryObj<typeof DeselectCheckboxControl>;

export const Base: Story = {};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IDeselectCheckboxControl>
      componentName={DeselectCheckboxControl.name}
      Component={DeselectCheckboxControl}
      combinations={{
        value: ['deselect', 'checked', 'unchecked'],
      }}
      columns={3}
      center
    />
  ),
};
