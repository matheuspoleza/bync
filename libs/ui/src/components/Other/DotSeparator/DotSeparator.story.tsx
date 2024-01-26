import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { DotSeparator } from './DotSeparator.component';
import type { IDotSeparator } from './types';

const meta: Meta<typeof DotSeparator> = {
  title: 'Other/DotSeparator',
  component: DotSeparator,
};

export default meta;
type Story = StoryObj<typeof DotSeparator>;

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IDotSeparator>
      componentName={DotSeparator.name}
      Component={(props) => <DotSeparator {...props} />}
      columns={4}
      combinations={{
        thick: [false, true],
        light: [false, true],
      }}
    />
  ),
};

export const Base: Story = {
  render: () => (
    <CartesianProduct<IDotSeparator>
      componentName={DotSeparator.name}
      Component={(props) => <DotSeparator {...props} />}
      combinations={{
        thick: [false],
      }}
    />
  ),
};

export const Thick: Story = {
  render: () => (
    <CartesianProduct<IDotSeparator>
      componentName={DotSeparator.name}
      Component={(props) => <DotSeparator {...props} />}
      combinations={{
        thick: [true],
      }}
    />
  ),
};
