import type { Meta, StoryObj } from '@storybook/react';

import { VariableEditorPanel } from './VariableEditorPanel.component';

type Story = StoryObj<typeof VariableEditorPanel>;

const meta: Meta<typeof VariableEditorPanel> = {
  title: 'Pages/VariableCMS/Variable Edit Panel',
  component: VariableEditorPanel,
};

export const Base: Story = {};

export default meta;
