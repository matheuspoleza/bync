import type { Meta, StoryObj } from '@storybook/react';

import { EditVariableModal } from './EditVariableModal.component';

type Story = StoryObj<typeof EditVariableModal>;

const meta: Meta<typeof EditVariableModal> = {
  title: 'Pages/VariableCMS/Edit Variable Modal',
  component: EditVariableModal,
};

export const Base: Story = {};

export default meta;
