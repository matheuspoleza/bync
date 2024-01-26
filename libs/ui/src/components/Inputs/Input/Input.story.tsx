import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';
import { WithFormControlState } from '@/storybook/decorators';

import { Input } from './Input.component';
import { inputVariantStyles } from './styles/Input.css';
import type { IInput } from './types';

type Story = StoryObj<typeof Input>;

const longTextFixture =
  'This is a very long text that should be truncated. This is a very long text that should be truncated. This is a very long text that should be truncated.';

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  args: {
    value: '',
  },
  decorators: [WithFormControlState],
  render: (args) => (
    <div style={{ width: '50%' }}>
      <Input {...args} />
    </div>
  ),
};

export default meta;

export const Base: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const Ellipsis: Story = {
  args: {
    placeholder: 'Placeholder',
    value: longTextFixture,
    ellipsis: true,
  },
};

const VARIANTS = Object.keys(inputVariantStyles) as IInput['variant'][];

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IInput>
      componentName={Input.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value);

        return <Input {...props} value={value} onValueChange={setValue} />;
      }}
      combinations={{
        variant: VARIANTS,
        value: ['', 'Hello'],
        placeholder: ['Placeholder'],
        suffixIconOnClick: [() => null],
        prefixIconOnClick: [() => null],
        error: [false, true],
        disabled: [false, true],
        prefixIconName: [undefined, 'Intent'],
        suffixIconName: [undefined, 'Copy'],
      }}
      groupBy="variant"
      isDark={({ variant }) => variant === 'dark'}
      columns={2}
    />
  ),
};
