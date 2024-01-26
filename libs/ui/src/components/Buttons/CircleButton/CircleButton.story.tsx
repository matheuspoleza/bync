import type { Meta, StoryObj } from '@storybook/react';

import type { ICircleButton } from '@/components/Buttons/CircleButton';
import { CircleButton } from '@/components/Buttons/CircleButton';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof CircleButton>;

const meta: Meta<typeof CircleButton> = {
  title: 'Buttons/Circle Button',
  component: CircleButton,
};

export default meta;

export const Base: Story = {
  args: {
    iconName: 'PlayS',
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<ICircleButton>
      componentName={CircleButton.name}
      Component={(props) => <CircleButton {...props} iconName="PlayS" onClick={() => null} />}
      combinations={{
        disabled: [false, true],
        isLoading: [false, true],
      }}
      columns={2}
    />
  ),
};
