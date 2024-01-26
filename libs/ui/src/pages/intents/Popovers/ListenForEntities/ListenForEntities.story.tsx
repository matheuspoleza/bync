import type { Meta, StoryObj } from '@storybook/react';

import { ListenForEntities } from './ListenForEntities.component';

type Story = StoryObj<typeof ListenForEntities>;

const meta: Meta<typeof ListenForEntities> = {
  title: 'Pages / Intents / CreateIntentModal / ListenForEntities',
  component: ListenForEntities,
};

export const Base: Story = {};

export default meta;
