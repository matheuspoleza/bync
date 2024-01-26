import type { Meta, StoryObj } from '@storybook/react';

import { ResolvedPathModal } from './ResolvedPathModal.component';

type Story = StoryObj<typeof ResolvedPathModal>;

const meta: Meta<typeof ResolvedPathModal> = {
  title: 'Pages / Functions / ResolvedPathModal',
  component: ResolvedPathModal,
};

export const Base: Story = {};

export const ErrorState: Story = {
  args: {
    error: true,
  },
};

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledOpenTracesState: Story = {
  args: {
    disabled: true,
    isTracesOpen: true,
  },
};

export default meta;
