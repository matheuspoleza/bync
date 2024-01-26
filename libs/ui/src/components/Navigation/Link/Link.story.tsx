import type { Meta, StoryObj } from '@storybook/react';

import { Popper } from '@/components/Utility/Popper/Popper.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { MenuItem } from '../Menu';
import { Menu } from '../Menu/Menu.component';
import { Link } from './Link.component';
import type { ILink } from './types';

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
};

export default meta;

export const Base: Story = {
  args: {
    label: 'Link',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Link',
    variant: 'secondary',
  },
};

export const Dotted: Story = {
  args: {
    label: 'Link',
    variant: 'dotted',
  },
};

export const DottedActive: Story = {
  args: {
    label: 'Link',
    variant: 'dotted',
    isActive: true,
  },
};

export const SmallPrimary: Story = {
  args: {
    label: 'Link',
    variant: 'primary',
    size: 'small',
  },
};

export const SemiBoldPrimary: Story = {
  args: {
    label: 'Link',
    variant: 'primary',
    weight: 'semiBold',
  },
};

export const SemiBoldPrimaryDisabled: Story = {
  args: {
    label: 'Link',
    variant: 'primary',
    weight: 'semiBold',
    disabled: true,
  },
};

const WithDropdown = (args: ILink) => {
  return (
    <Popper
      placement="bottom-start"
      referenceElement={({ ref, onToggle, isOpen }) => (
        <Link onClick={onToggle} ref={ref} isActive={isOpen} {...args} />
      )}
    >
      {() => (
        <Menu>
          <MenuItem label="Test" />
        </Menu>
      )}
    </Popper>
  );
};

export const AsDropdownPrimary: Story = {
  args: {
    label: 'Link',
    variant: 'primary',
  },
  render: (args) => <WithDropdown {...args} />,
};

export const AsDropdownDotted: Story = {
  args: {
    label: 'Link',
    variant: 'dotted',
  },
  render: (args) => <WithDropdown {...args} />,
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ILink>
      componentName={Link.name}
      Component={(props) => (
        <Link
          {...props}
          label={`${props.variant}-${props.size}-${props.weight}${props.disabled === true ? '-disabled' : ''}`}
          onClick={() => console.log('click')}
        />
      )}
      combinations={{
        size: ['small', 'medium'],
        disabled: [false, true],
        weight: ['regular', 'semiBold'],
        variant: ['primary', 'secondary', 'dotted'],
      }}
      columns={4}
    />
  ),
};

export const DarkExamples: Story = {
  render: () => (
    <CartesianProduct<ILink>
      componentName={Link.name}
      isDark={true}
      Component={(props) => (
        <Link
          {...props}
          label={`${props.variant}-${props.size}-${props.weight}${props.disabled === true ? '-disabled' : ''}`}
          onClick={() => console.log('click')}
        />
      )}
      combinations={{
        size: ['small', 'medium'],
        weight: ['regular', 'semiBold'],
        variant: ['primary', 'secondary', 'dotted'],
        disabled: [false, true],
        theme: ['dark'],
      }}
      columns={4}
    />
  ),
};
