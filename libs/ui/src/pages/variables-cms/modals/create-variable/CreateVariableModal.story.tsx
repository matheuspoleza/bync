import type { Meta, StoryObj } from '@storybook/react';

import { CreateVariableModal } from './CreateVariableModal.component';

type Story = StoryObj<typeof CreateVariableModal>;

const meta: Meta<typeof CreateVariableModal> = {
  title: 'Pages/VariableCMS/Create Variable Modal',
  component: CreateVariableModal,
};

export const Base: Story = {};

export default meta;
