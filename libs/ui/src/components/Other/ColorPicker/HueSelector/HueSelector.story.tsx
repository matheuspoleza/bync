import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility';
import { WithFormControlState } from '@/storybook/decorators';

import { HueSelector } from './HueSelector.component';

const meta: Meta<typeof HueSelector> = {
  title: 'Color Picker/HueSelector',
  component: HueSelector,
  decorators: [WithFormControlState],
};

export default meta;
type Story = StoryObj<typeof HueSelector>;

export const Base: Story = {
  render: (args) => (
    <Box align="center" justify="center">
      <HueSelector {...args} />
    </Box>
  ),
};
