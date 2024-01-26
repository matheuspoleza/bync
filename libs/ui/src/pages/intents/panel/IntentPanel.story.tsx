import type { Meta, StoryObj } from '@storybook/react';

import { IntentPanel } from './IntentPanel.component';

type Story = StoryObj<typeof IntentPanel>;

const meta: Meta<typeof IntentPanel> = {
  title: 'Pages/Intents/Panel',
  component: IntentPanel,
};

export const Base: Story = {};

export default meta;
