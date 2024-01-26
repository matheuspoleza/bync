import type { Meta, StoryObj } from '@storybook/react';

import { defaultIntentInputStates } from '../fixtures';
import { CreateIntentModal } from './CreateIntent.component';

type Story = StoryObj<typeof CreateIntentModal>;

const meta: Meta<typeof CreateIntentModal> = {
  title: 'Pages / Intents / CreateIntentModal',
  component: CreateIntentModal,
  args: {
    data: [
      {
        value: [{ children: [{ text: 'Howdy' }] }],
        error: false,
      },
    ],
    errorExample: false,
    entities: [],
  },
  parameters: {
    layout: 'centered',
  },
};

export const Base: Story = {};

export const Populated: Story = {
  args: {
    data: defaultIntentInputStates,
    entities: ['howdy', 'folks'],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    entities: [],
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
    errorExample: true,
  },
};

export default meta;
