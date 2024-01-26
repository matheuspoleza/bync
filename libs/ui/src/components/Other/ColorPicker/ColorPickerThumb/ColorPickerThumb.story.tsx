import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility';

import { ColorPickerThumb } from './ColorPickerThumb.component';

const meta: Meta<typeof ColorPickerThumb> = {
  title: 'Color Picker/ColorPickerThumb',
  component: ColorPickerThumb,
};

export default meta;
type Story = StoryObj<typeof ColorPickerThumb>;

export const Base: Story = {
  render: () => (
    <Box
      align="center"
      justify="center"
      height="12px"
      style={{
        background: 'linear-gradient(90deg, rgba(36,190,204,1) 0%, rgba(227,253,29,1) 69%, rgba(252,176,69,1) 100%)',
      }}
    >
      <Box height="20px" width="20px" style={{ position: 'relative' }}>
        <ColorPickerThumb />
      </Box>
    </Box>
  ),
};
