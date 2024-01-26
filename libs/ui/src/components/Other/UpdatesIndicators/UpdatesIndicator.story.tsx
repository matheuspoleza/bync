import type { Meta, StoryObj } from '@storybook/react';
import { EventMedium } from '@bync/icons';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Text } from '../../Text/Text.component';
import { Box } from '../../Utility/Box';
import type { IUpdatesIndicator } from './UpdatesIndicator.component';
import { UpdatesIndicator } from './UpdatesIndicator.component';

type Story = StoryObj<typeof UpdatesIndicator>;

const meta: Meta<typeof UpdatesIndicator> = {
  title: 'Other/Updates Indicator',
  component: UpdatesIndicator,
};

export const Base: Story = {
  args: {
    children: <Text>Howdy Folks</Text>,
    label: '2',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <Box style={{ background: 'pink', borderRadius: '8px' }} py={10} px={10}>
        <EventMedium />
      </Box>
    ),
    label: '2',
    outline: 'pink',
    top: 6,
    left: 8,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IUpdatesIndicator>
      Component={(props: IUpdatesIndicator) => <UpdatesIndicator {...props} />}
      componentName="UpdatesIndicator"
      combinations={{
        top: [-3, 8],
        left: [-3],
        label: ['2'],
        outline: ['white'],
        // eslint-disable-next-line react/jsx-key
        children: [<Text>Howdy Folks</Text>],
      }}
    />
  ),
};

export default meta;
