import type { Meta, StoryObj } from '@storybook/react';

import type { IAvatar } from '@/components/Media/Avatar';
import { Avatar } from '@/components/Media/Avatar';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof Avatar>;

const meta: Meta<typeof Avatar> = {
  title: 'Media/Avatar',
  component: Avatar,
};

export default meta;

export const AvatarDark: Story = {
  args: {
    variant: 'dark',
    children: 'A',
    size: 'medium',
  },
};

const VARIANTS = Object.keys(Avatar.css.avatarVariants) as IAvatar['variant'][];

export const Examples: Story = {
  render: () => (
    <>
      <CartesianProduct<IAvatar>
        componentName={Avatar.name}
        Component={(props) => (
          <Avatar {...props} src="https://picsum.photos/seed/1/200">
            C
          </Avatar>
        )}
        combinations={{
          size: ['small', 'medium'],
        }}
        isDark={({ variant }) => !!variant?.startsWith('dark')}
        columns={2}
        center
      />
      <CartesianProduct<IAvatar>
        componentName={Avatar.name}
        Component={(props) => <Avatar {...props}>C</Avatar>}
        combinations={{
          size: ['small', 'medium'],
          variant: VARIANTS,
        }}
        isDark={({ variant }) => !!variant?.startsWith('dark')}
        columns={5}
        groupBy="size"
        center
      />
    </>
  ),
};
