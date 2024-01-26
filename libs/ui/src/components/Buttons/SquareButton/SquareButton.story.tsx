import type { Meta, StoryObj } from '@storybook/react';

import type { ISquareButton } from '@/components/Buttons/SquareButton';
import { SquareButton } from '@/components/Buttons/SquareButton';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof SquareButton>;

const meta: Meta<typeof SquareButton> = {
  title: 'Buttons/Square Button',
  component: SquareButton,
};

export default meta;

export const Square: Story = {
  args: {
    iconName: 'Copy',
  },
};

const SIZES = Object.keys(SquareButton.css.squareButtonSizeVariants) as ISquareButton['size'][];

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ISquareButton>
      componentName={SquareButton.name}
      Component={(props) => <SquareButton {...props} iconName="Copy" />}
      combinations={{
        size: SIZES,
        isActive: [false, true],
        variant: ['light', 'dark'],
        disabled: [false, true],
        isHovering: [false, true],
        isLoading: [false, true],
      }}
      groupBy="variant"
      isDark={({ variant }) => variant === 'dark'}
      columns={4}
    />
  ),
};
