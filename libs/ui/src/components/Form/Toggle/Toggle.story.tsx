import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import { Toggle } from './Toggle.component';
import type { IToggle } from './types';

type Story = StoryObj<typeof Toggle>;

const meta: Meta<typeof Toggle> = {
  title: 'Form/Toggle',
  component: Toggle,
  args: {
    value: false,
  },
  decorators: [WithFormControlState],
};

export default meta;

export const Base: Story = {};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IToggle>
      componentName={Toggle.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value);

        return <Toggle {...props} value={value} onValueChange={setValue} />;
      }}
      combinations={{
        value: [true, false],
        disabled: [false, true],
        variant: ['light', 'dark'],
      }}
      isDark={({ variant }) => variant === 'dark'}
      columns={2}
    />
  ),
};
