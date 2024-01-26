import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { StatusIndicator } from './StatusIndicator.component';
import type { IStatusIndicator } from './types';

type Story = StoryObj<typeof StatusIndicator>;

const meta: Meta<typeof StatusIndicator> = {
  title: 'Other/Status Indicator',
  component: StatusIndicator,
};

export default meta;

export const Base: Story = {
  args: {
    status: 'in-progress',
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IStatusIndicator>
      componentName={StatusIndicator.name}
      Component={(props) => (
        <Box mx={10}>
          <StatusIndicator status={props.status} />
        </Box>
      )}
      combinations={{
        status: ['default', 'todo', 'in-progress', 'done'],
      }}
      columns={4}
      center
    />
  ),
};
