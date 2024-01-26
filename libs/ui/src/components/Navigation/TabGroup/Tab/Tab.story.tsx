import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from './Tab.component';

type Story = StoryObj<typeof Tab>;

const meta: Meta<typeof Tab> = {
  title: 'Navigation/Tab',
  component: Tab,
};

export const Base: Story = {
  args: {
    label: 'Tab 1',
    counter: 8,
  },
};

export default meta;
