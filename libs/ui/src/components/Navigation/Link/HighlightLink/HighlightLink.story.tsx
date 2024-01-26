import type { Meta, StoryObj } from '@storybook/react';

import { HighLightLink } from './HighlightLink.component';

type Story = StoryObj<typeof HighLightLink>;

const meta: Meta<typeof HighLightLink> = {
  title: 'Navigation/Link/HighLightLink',
  component: HighLightLink,
};

export default meta;

export const Base: Story = {
  args: {
    label: 'HighlightLink',
    variant: 'primary',
    highlight: 'light',
  },
};
