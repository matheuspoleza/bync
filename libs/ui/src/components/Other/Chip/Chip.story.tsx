import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './Chip.component';

const meta: Meta<typeof Chip> = {
  title: 'Other / Chip',
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Base: Story = {
  args: { value: 'Extensibility' },
};

export const Long: Story = {
  args: { value: 'Custom files with more features', onDelete: () => null },
};
