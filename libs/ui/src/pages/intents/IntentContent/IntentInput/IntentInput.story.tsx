import type { Meta, StoryObj } from '@storybook/react';

import { IntentUtteranceInput } from './IntentInput.component';

type Story = StoryObj<typeof IntentUtteranceInput>;

const meta: Meta<typeof IntentUtteranceInput> = {
  title: 'Pages / Intents / IntentUtteranceInput',
  component: IntentUtteranceInput,
  args: {
    value: [
      {
        children: [{ text: 'This is a sample phrase' }],
      },
    ],
    error: false,
  },
};

export const Base: Story = {};

export const ErrorExample: Story = {
  args: {
    value: [
      {
        children: [{ text: 'This is a sample phrase' }],
      },
    ],
    error: true,
  },
};

export default meta;
