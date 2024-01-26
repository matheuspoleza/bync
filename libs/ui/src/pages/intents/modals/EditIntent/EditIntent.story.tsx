import type { Meta, StoryObj } from '@storybook/react';

import { defaultIntentInputStates } from '../fixtures';
import { EditIntentModal } from './EditIntent.component';

type Story = StoryObj<typeof EditIntentModal>;

const meta: Meta<typeof EditIntentModal> = {
  title: 'Pages / Intents / EditIntentModal',
  component: EditIntentModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    data: [
      {
        value: [{ children: [{ text: 'Howdy' }] }],
        error: false,
      },
    ],
    entities: ['howdy'],
  },
};

export const Base: Story = {};

export const Empty: Story = {
  args: {
    data: [],
    entities: [],
  },
};

export const MixedUtterances: Story = {
  args: {
    data: defaultIntentInputStates,
  },
};

export const LongLine: Story = {
  args: {
    data: [
      {
        value: [
          {
            children: [
              { text: 'Howdy Folks, Howdy Folks Howdy Folks Howdy Folks Howdy Folks Howdy Folks Howdy Folks' },
            ],
          },
        ],
        error: false,
      },
    ],
  },
};

export const ErrorExample: Story = {
  args: {
    data: [
      {
        value: [{ children: [{ text: '' }] }],
        error: true,
      },
    ],
    entities: ['howdy'],
    errorExample: true,
  },
};

export default meta;
