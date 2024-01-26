import type { Meta, StoryObj } from '@storybook/react';

import { ReviewURLsModal } from './ReviewURLsModal.component';

type Story = StoryObj<typeof ReviewURLsModal>;

const meta: Meta<typeof ReviewURLsModal> = {
  title: 'Pages / KnowledgeBase / ReviewURLsModal',
  component: ReviewURLsModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
    onBackClick: () => null,
  },
};

export default meta;
