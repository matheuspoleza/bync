import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { FocusIndicator } from './FocusIndicator.component';
import type { IFocusIndicator } from './FocusIndicator.interface';

type Story = StoryObj<typeof FocusIndicator>;

const meta: Meta<typeof FocusIndicator> = {
  title: 'Other/FocusIndicator',
  component: FocusIndicator,
};

export default meta;

export const Base: Story = {
  render: () => (
    <div style={{ height: '24px' }}>
      <FocusIndicator />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ height: '24px' }}>
      <FocusIndicator error />
    </div>
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IFocusIndicator>
      componentName={FocusIndicator.name}
      Component={(props) => (
        <div style={{ height: '24px' }}>
          <FocusIndicator {...props} />
        </div>
      )}
      combinations={{
        error: [false, true],
      }}
      columns={3}
      center
    />
  ),
};
