import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { HotKeys } from './HotKeys.component';
import type { IHotKeys } from './types';

const meta: Meta<typeof HotKeys> = {
  title: 'Other/HotKeys',
  component: HotKeys,
};

export default meta;
type Story = StoryObj<typeof HotKeys>;

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IHotKeys>
      componentName={HotKeys.name}
      Component={HotKeys}
      combinations={{
        hotKeys: [
          [{ iconName: 'Command' }, { iconName: 'Shift' }, { label: 'C' }],
          [{ iconName: 'Command' }, { label: 'K' }],
        ],
        variant: [undefined, 'dark', 'disabled'],
      }}
      columns={4}
    />
  ),
};
