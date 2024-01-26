import type { Meta, StoryObj } from '@storybook/react';

import { ImportFileModal } from './ImportFileModal.component';

type Story = StoryObj<typeof ImportFileModal>;

const meta: Meta<typeof ImportFileModal> = {
  title: 'Pages / KnowledgeBase / ImportFileModal',
  component: ImportFileModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
  },
};

export default meta;
