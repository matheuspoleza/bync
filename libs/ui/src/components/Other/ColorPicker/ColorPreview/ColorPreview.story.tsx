import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IColorPreview } from './ColorPreview.component';
import { ColorPreview } from './ColorPreview.component';

type Story = StoryObj<typeof ColorPreview>;

const meta: Meta<typeof ColorPreview> = {
  title: 'Color Picker/Color Preview',
  component: ColorPreview,
};

const ExampleControlled = (props: IColorPreview) => {
  const [active, setActive] = useState(false);

  return <ColorPreview {...props} isActive={active} onClick={() => setActive(!active)} />;
};

export const Base: Story = {
  args: {
    variant: 'copper',
    isActive: true,
  },
};

export const Large: Story = {
  args: {
    variant: 'hibiscus',
    size: 'large',
  },
};

export const Custom: Story = {
  args: {
    color: '#59219f',
  },
};

export const CustomLight: Story = {
  args: {
    color: '#e3ff22',
  },
};

export const Wheel: Story = {
  args: {
    variant: 'wheel',
  },
  render: (args) => <ExampleControlled {...args} />,
};

export const Disabled: Story = {
  args: {
    variant: 'hibiscus',
    isDisabled: true,
  },
};

export const DisabledLarge: Story = {
  args: {
    variant: 'hibiscus',
    size: 'large',
    isDisabled: true,
  },
};

export const Controlled: Story = {
  args: {
    color: '#e3ff22',
  },
  render: (args) => <ExampleControlled {...args} />,
};

export const ExamplesCustom: Story = {
  render: () => (
    <CartesianProduct<IColorPreview>
      componentName={ColorPreview.displayName}
      combinations={{
        size: ['small', 'large'],
        color: ['#ff144f', '#e3ff22', '#c1c9e8', '#3c5bec', '#9dff5f', '#ff8f38'],
      }}
      Component={(args) => <ExampleControlled {...args} />}
      center
      columns={8}
      groupBy="size"
    />
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IColorPreview>
      componentName={ColorPreview.displayName}
      combinations={{
        variant: ['copper', 'hibiscus', 'fern', 'havelock', 'default', 'wheel'],
        size: ['small', 'large'],
        isDisabled: [true, false],
      }}
      Component={(args) => <ExampleControlled {...args} />}
      center
      columns={6}
      groupBy="size"
    />
  ),
};

export default meta;
