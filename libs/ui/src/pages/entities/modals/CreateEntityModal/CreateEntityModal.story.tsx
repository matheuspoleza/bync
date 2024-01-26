import type { Meta, StoryObj } from '@storybook/react';

import { CreateEntityModal } from './CreateEntityModal.component';

type Story = StoryObj<typeof CreateEntityModal>;

const meta: Meta<typeof CreateEntityModal> = {
  title: 'Pages / Entities / CreateEntityModal',
  component: CreateEntityModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
  },
};

export default meta;
