import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Input } from '../../Inputs/Input';
import { InputFormControl } from './InputFormControl.component';
import type { IInputFormControl } from './types';

type Story = StoryObj<typeof InputFormControl>;

const meta: Meta<typeof InputFormControl> = {
  title: 'Form/Input Form Control',
  component: InputFormControl,
};

export default meta;

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IInputFormControl>
      componentName={InputFormControl.name}
      Component={(props) => {
        const [value, setValue] = useState('Intent');

        return (
          <InputFormControl {...props}>
            <Input value={value} onValueChange={setValue} />
          </InputFormControl>
        );
      }}
      combinations={{
        label: ['Label', ''],
        caption: ['Caption', ''],
        errorMessage: ['Error', ''],
      }}
      columns={2}
    />
  ),
};
