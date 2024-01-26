import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@bync/icons';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IIcon } from './Icon.component';
import { Icon } from './Icon.component';

type Story = StoryObj<typeof Icon>;

const meta: Meta<typeof Icon> = {
  title: 'Media/Icon',
  component: Icon,
};

export default meta;

export const Base: Story = {
  args: {
    name: 'Copy',
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IIcon>
      componentName={Icon.name}
      Component={(props) => <Icon {...props} style={{ width: 64, height: 64 }} />}
      combinations={{
        name: Object.keys(Icons) as Icons.IconName[],
      }}
      columns={4}
      center
    />
  ),
};
