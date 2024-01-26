import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IVariableEntity } from '../types';
import { Variable } from '../Variable';
import { Entity } from './Entity.component';

const meta: Meta<typeof Entity> = {
  title: 'Other/Entity',
  component: Entity,
};

export default meta;

type Story = StoryObj<typeof Entity>;

export const BaseEntity: Story = {
  args: {
    label: 'Label',
    color: '#515A63',
  },
};

export const LargeBaseEntity: Story = {
  args: {
    label: 'Label',
    size: 'large',
    color: '#515A63',
  },
};

export const HibiscusEntity: Story = {
  args: {
    label: 'Label',
    color: '#CB627B',
  },
};

export const HavelockEntity: Story = {
  args: {
    label: 'Label',
    color: '#5B9FD7',
  },
};

export const CopperEntity: Story = {
  args: {
    label: 'Label',
    color: '#DC8879',
  },
};

export const FernEntity: Story = {
  args: {
    label: 'Label',
    color: '#56B365',
  },
};

export const ActiveEntity: Story = {
  args: {
    label: 'Label',
    isActive: true,
  },
};

export const EllipsisEntity: Story = {
  args: {
    label: 'Entity with a long name',
    color: '#5B9FD7',
    maxWidth: '70px',
  },
};

const SIZES = Object.keys(Variable.css.sizeVariants) as IVariableEntity['size'][];

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IVariableEntity>
      componentName={Entity.name}
      Component={(props) => <Entity {...props} label="Label" />}
      combinations={{
        size: SIZES,
        isActive: [false, true],
        color: ['#515A63', '#5B9FD7', '#CB627B', '#DC8879', '#56B365'],
      }}
      columns={2}
    />
  ),
};
