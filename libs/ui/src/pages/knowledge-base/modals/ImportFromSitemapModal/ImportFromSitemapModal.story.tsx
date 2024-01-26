import type { Meta, StoryObj } from '@storybook/react';

import { ImportFromSitemapModal } from './ImportFromSitemapModal.component';

type Story = StoryObj<typeof ImportFromSitemapModal>;

const meta: Meta<typeof ImportFromSitemapModal> = {
  title: 'Pages / KnowledgeBase / ImportFromSitemapModal',
  component: ImportFromSitemapModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
    onNextClick: () => null,
  },
};

export default meta;
