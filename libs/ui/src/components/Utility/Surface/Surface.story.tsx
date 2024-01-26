import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '@/components/Text/Text.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Box } from '../Box';
import { Surface } from './Surface.component';
import type { ISurface } from './Surface.interface';

type Story = StoryObj<typeof Surface>;

const meta: Meta<typeof Surface> = {
  title: 'Utility/Surface',
  component: Surface,
};

export default meta;

export const Base: Story = {
  render: () => (
    <Surface>
      <Box px={20} py={20}>
        <Text>Surface</Text>
      </Box>
    </Surface>
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISurface>
      componentName={Surface.name}
      Component={({ children }) => <Surface>{children}</Surface>}
      combinations={{
        children: [
          <Box key={1} px={20} py={20}>
            <Text>Surface</Text>
          </Box>,
        ],
      }}
      columns={3}
      center
    />
  ),
};
