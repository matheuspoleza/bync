import type { Meta, StoryObj } from '@storybook/react';

import type { IGauge } from '@/components/Other/Gauge';
import { Gauge } from '@/components/Other/Gauge';
import { Box } from '@/components/Utility/Box';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof Gauge>;

const meta: Meta<typeof Gauge> = {
  title: 'Other/Gauge',
  component: Gauge,
};

const VARIANTS = Object.keys(Gauge.css.gaugeVariants) as IGauge['variant'][];

export const Base: Story = {
  render: (args) => <Gauge {...args} />,
  args: {
    progress: 60,
    variant: VARIANTS[0],
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IGauge>
      componentName={Gauge.name}
      Component={(props) => (
        <Box width="100%">
          <Gauge {...props} />
        </Box>
      )}
      combinations={{
        variant: VARIANTS,
        progress: [25, 50, 75, 100],
      }}
      groupBy="variant"
      isDark={({ variant }) => !!variant?.includes('notification')}
      columns={4}
    />
  ),
};

export default meta;
