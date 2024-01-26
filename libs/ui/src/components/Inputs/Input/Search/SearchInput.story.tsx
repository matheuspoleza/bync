import type { Meta, StoryObj } from '@storybook/react';
import type { RefAttributes } from 'react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { SearchInput } from './SearchInput.component';
import { inputVariantStyles } from './styles/SearchInput.css';
import type { ISearchInput } from './types';

type Story = StoryObj<typeof SearchInput>;

const Component = (args: JSX.IntrinsicAttributes & ISearchInput & RefAttributes<HTMLInputElement>) => {
  const [value, setValue] = useState(args.value || '');
  const onClear = () => setValue('');

  return (
    <div style={{ width: '50%' }}>
      <SearchInput {...args} value={value} onClear={onClear} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  args: {
    value: '',
  },
  render: Component,
};

export default meta;

export const Base: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};
export const WithValue: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Howdy Folks',
  },
};

export const Autofocus: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Howdy Folks',
    autoFocus: true,
  },
};

export const Dark: Story = {
  args: {
    placeholder: 'Placeholder',
    value: 'Howdy Folks',
    variant: 'dark',
  },
};

const VARIANTS = Object.keys(inputVariantStyles) as ISearchInput['variant'][];

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISearchInput>
      componentName={SearchInput.name}
      Component={(props) => {
        const [value, setValue] = useState(props.value || '');

        return <SearchInput {...props} placeholder="Placeholder" value={value} onValueChange={setValue} />;
      }}
      combinations={{
        variant: VARIANTS,
        value: ['', 'Hello'],
      }}
      groupBy="variant"
      isDark={({ variant }) => variant === 'dark'}
      columns={2}
    />
  ),
};
