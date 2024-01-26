import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IVariableEntity } from '../types';
import { sizeVariants } from './styles/Variable.css';
import { Variable } from './Variable.component';

const meta: Meta<typeof Variable> = {
  title: 'Other/Variable',
  component: Variable,
};

export default meta;

type Story = StoryObj<typeof Variable>;

export const BaseVariable: Story = {
  args: {
    label: 'Label',
  },
};

export const ActiveVariable: Story = {
  args: {
    label: 'Label',
    isActive: true,
  },
};

export const Ellipsis: Story = {
  args: {
    label: 'Long_Interesting_Label',
    maxWidth: '70px',
  },
};

const SIZES = Object.keys(sizeVariants) as IVariableEntity['size'][];

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IVariableEntity>
      componentName={Variable.name}
      Component={(props) => <Variable {...props} label="Label" />}
      combinations={{
        size: SIZES,
        isActive: [false, true],
        color: ['#515A63', '#5B9FD7', '#CB627B', '#DC8879', '#56B365'],
      }}
      columns={2}
    />
  ),
};
