import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility';
import { WithFormControlState } from '@/storybook/decorators';
import { Tokens } from '@/styles';

import { OpacitySelector } from './OpacitySelector.component';

const meta: Meta<typeof OpacitySelector> = {
  title: 'Color Picker/OpacitySelector',
  component: OpacitySelector,
  decorators: [WithFormControlState],
};

export default meta;
type Story = StoryObj<typeof OpacitySelector>;

export const Base: Story = {
  args: { color: Tokens.colors.success.success400 },
  render: (props) => (
    <Box align="center" justify="center">
      <OpacitySelector {...props} />
    </Box>
  ),
};
