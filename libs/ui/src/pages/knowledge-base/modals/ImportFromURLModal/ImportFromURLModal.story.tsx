import type { Meta, StoryObj } from '@storybook/react';

import { ImportFromURLModal } from './ImportFromURLModal.component';

type Story = StoryObj<typeof ImportFromURLModal>;

const meta: Meta<typeof ImportFromURLModal> = {
  title: 'Pages / KnowledgeBase / ImportFromURLModal',
  component: ImportFromURLModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
  },
};

export default meta;
