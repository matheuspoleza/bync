import type { Meta, StoryObj } from '@storybook/react';
import { Slack } from '@bync/icons';

import { AlertIndicator } from './AlertIndicator.component';

type Story = StoryObj<typeof AlertIndicator>;

const meta: Meta<typeof AlertIndicator> = {
  title: 'Other/Alert Indicator',
  component: AlertIndicator,
};

export const Base: Story = {
  args: {
    children: <Slack />,
  },
};

export default meta;
