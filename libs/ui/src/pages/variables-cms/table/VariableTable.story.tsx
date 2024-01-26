import type { Meta, StoryObj } from '@storybook/react';

import { VariableTable } from './VariableTable.component';

type Story = StoryObj<typeof VariableTable>;

const meta: Meta<typeof VariableTable> = {
  title: 'Pages/VariableCMS/Variable Table',
  component: VariableTable,
};

export const Base: Story = {};

export default meta;
