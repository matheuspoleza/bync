import type { Meta, StoryObj } from '@storybook/react';

import { ChipsInput } from './ChipsInput.component';

const meta: Meta<typeof ChipsInput> = {
  title: 'Inputs / ChipsInput',
  component: ChipsInput,
};

export default meta;
type Story = StoryObj<typeof ChipsInput>;

export const Base: Story = {
  args: {
    value: [],
    width: '302px',
    suggestions: [
      'Clusters',
      'Next big release',
      'Broad',
      'IoT articles',
      'new version',
      'Standard kit',
      'Standardize',
    ],
  },
};

export const WithChips: Story = {
  args: { value: ['FAQs', 'Feedback responses', 'News updates', 'AI', 'CMS', 'Standard lib'], width: '302px' },
};

export const WithChipsAndSuggestions: Story = {
  args: {
    value: ['FAQs', 'Feedback responses', 'News updates', 'AI', 'CMS', 'Standard lib'],
    width: '302px',
    suggestions: [
      'Clusters',
      'Next big release',
      'Broad',
      'IoT articles',
      'new version',
      'Standard kit',
      'Standardize',
      'Standard flow',
      'Standard library',
      'new standard version',
      "Tag to test searching for 'standard'",
      'And another one',
      'Testing menu height',
    ],
  },
};
