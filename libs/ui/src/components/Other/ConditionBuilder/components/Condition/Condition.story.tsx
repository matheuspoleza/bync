import type { Meta, StoryObj } from '@storybook/react';

import { SlateEditor } from '@/components/Inputs';

import { conditionsList, DEFAULT_LEFT_VALUE, DEFAULT_RIGHT_VALUE, variablesMap } from '../../fixtures';
import { Condition } from './Condition.component';

type Story = StoryObj<typeof Condition>;

const meta: Meta<typeof Condition> = {
  title: 'Other / Condition',
  component: Condition,
  args: {
    conditionsList,
    variablesMap,
    onConditionRemove: () => console.log('remove'),
  },
};

export const Base: Story = {
  args: {
    leftValue: DEFAULT_LEFT_VALUE,
    rightValue: SlateEditor.StaticEditor.getEmptyState(),
  },
};

export const WithVariablesAndActions: Story = {
  args: {
    leftValue: DEFAULT_LEFT_VALUE,
    rightValue: DEFAULT_RIGHT_VALUE,
    onValueChange: () => console.log('change left'),
    onBlur: () => {
      console.log('blur');
    },
    onEmptied: () => {
      console.log('emptied');
    },
  },
};

export default meta;
