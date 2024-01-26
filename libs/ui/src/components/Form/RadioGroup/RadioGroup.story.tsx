import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import type { IRadioGroup } from '.';
import { RadioGroup } from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/Radio Group',
  component: RadioGroup,
  args: {
    label: 'Radio Group',
    value: 1,
    options: [
      { id: '203', label: 'First', value: 0, caption: 'First option', disabled: true },
      { id: '204', label: 'Second', value: 1, caption: 'First option' },
      { id: '205', label: 'Third', value: 2, caption: 'Third option' },
    ],
  },
  decorators: [WithFormControlState],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

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
    <CartesianProduct<IRadioGroup<number>>
      componentName={RadioGroup.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value);

        return <RadioGroup {...props} value={value} onValueChange={setValue} />;
      }}
      combinations={{
        value: [2],
        label: ['Radio selection'],
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
