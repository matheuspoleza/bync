import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import type { ICheckboxGroup } from '.';
import { CheckboxGroup } from '.';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Form/Checkbox Group',
  component: CheckboxGroup,
  args: {
    label: 'Checkbox Group',
    value: [1, 3],
    options: [
      { id: '203', label: 'First', value: 1, caption: 'First option', disabled: true },
      { id: '204', label: 'Second', value: 2 },
      { id: '205', label: 'Third', value: 3, caption: 'Third option' },
    ],
  },
  decorators: [WithFormControlState],
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Horizontal: Story = {
  args: {
    layout: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    layout: 'vertical',
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ICheckboxGroup<number>>
      componentName={CheckboxGroup.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value);

        return <CheckboxGroup {...props} value={value} onValueChange={setValue} />;
      }}
      combinations={{
        value: [[2]],
        label: ['Checkbox selection'],
        options: [
          [
            { id: 'id-0', label: 'first', value: 1 },
            { id: 'id-1', label: 'second', value: 2 },
          ],
        ],
        disabled: [false, true],
        layout: ['horizontal', 'vertical'],
      }}
      columns={2}
    />
  ),
};
