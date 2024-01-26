import type { Meta, StoryObj } from '@storybook/react';

import { WithFormControlState } from '@/storybook/decorators';

import { RadioControl } from '.';

const meta: Meta<typeof RadioControl> = {
  title: 'Form/Radio Control',
  component: RadioControl,
  args: {
    value: false,
  },
  decorators: [WithFormControlState],
};

export default meta;

type Story = StoryObj<typeof RadioControl>;

export const Base: Story = {
  args: {
    label: 'Radio Control',
  },
};
