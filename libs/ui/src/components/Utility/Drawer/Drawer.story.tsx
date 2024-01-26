import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/Buttons/Button/Button.component';
import { Text } from '@/components/Text/Text.component';

import { Box } from '../Box';
import { Drawer } from './Drawer.component';
import type { IDrawer } from './types';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: 'Utility/Drawer',
  component: Drawer,
};

export default meta;

const ChildrenFixture = (
  <Box px={16} py={16}>
    <Text>The quick brown fox jumps over the lazy dog. Design, prototype and launch voice & chat bots.</Text>
  </Box>
);

const Component = (props: IDrawer) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box mb={20}>
      <Button
        label={props.width ? 'Toggle custom width drawer' : 'Toggle drawer'}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <Drawer {...props} isOpen={isOpen} />
    </Box>
  );
};

export const Base: Story = {
  args: {
    children: ChildrenFixture,
  },
  render: (args) => <Component {...args} />,
};

export const CustomWidth: Story = {
  args: {
    children: ChildrenFixture,
    isOpen: false,
    width: 700,
  },
  render: (args) => <Component {...args} />,
};
