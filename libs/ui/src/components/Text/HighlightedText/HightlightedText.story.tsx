import type { Meta, StoryObj } from '@storybook/react';

import { HighlightedText } from './HighlightedText.component';

type Story = StoryObj<typeof HighlightedText>;

const meta: Meta<typeof HighlightedText> = {
  title: 'Text/Highlighted',
  component: HighlightedText,
};

export default meta;

export const SingleWord: Story = {
  args: {
    text: 'Unimaginatively',
    highlight: 'imagin',
  },
};

export const MultipleWords: Story = {
  args: {
    text: 'Howdy folks, how are you all doing?',
    highlight: 'folk',
  },
};

export const ComplexMatching: Story = {
  args: {
    text: 'Howdy folks. ShouldfolksHighlighted folksbe highlighted?',
    highlight: 'folk',
  },
};
