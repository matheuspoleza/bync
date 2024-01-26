import type { Meta, StoryObj } from '@storybook/react';

import { WithFormControlState } from '@/storybook/decorators';

import { CheckboxControl } from './CheckboxControl.component';

const meta: Meta<typeof CheckboxControl> = {
  title: 'Form/Checkbox Control',
  component: CheckboxControl,
  args: {
    value: false,
  },
  decorators: [WithFormControlState],
};

export default meta;

type Story = StoryObj<typeof CheckboxControl>;

export const Base: Story = {
  args: {
    label: 'Checkbox Control',
    caption: 'Caption',
  },
};
