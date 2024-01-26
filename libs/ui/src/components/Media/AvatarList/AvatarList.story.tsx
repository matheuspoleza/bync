import type { Meta, StoryObj } from '@storybook/react';

import type { IAvatarList } from '@/components/Media/AvatarList';
import { AvatarList } from '@/components/Media/AvatarList';
import { CartesianProduct } from '@/storybook/CartesianProduct';

type Story = StoryObj<typeof AvatarList>;

const meta: Meta<typeof AvatarList> = {
  title: 'Media/AvatarList',
  component: AvatarList,
};

export default meta;

export const Base: Story = {
  args: {
    onButtonClick: () => null,
    list: [
      {
        src: 'https://picsum.photos/seed/1/200',
        alt: 'avatar',
        variant: 'darkHavelock',
        name: 'Antonio Banderas',
      },
      {
        src: 'https://picsum.photos/seed/2/200',
        alt: 'avatar',
        variant: 'darkHibiscus',
        name: 'Brad Pitt',
      },
      {
        variant: 'darkFern',
        name: ' Catherine Zeta-Jones',
      },
      {
        variant: 'dark',
        name: 'Denzel Washington',
      },
    ],
  },
};

export const NoButton: Story = {
  args: {
    list: [
      {
        src: 'https://picsum.photos/seed/1/200',
        alt: 'avatar',
        variant: 'darkHavelock',
        name: 'Antonio Banderas',
      },
      {
        src: 'https://picsum.photos/seed/2/200',
        alt: 'avatar',
        variant: 'darkHibiscus',
        name: 'Brad Pitt',
      },
      {
        variant: 'darkFern',
        name: ' Catherine Zeta-Jones',
      },
      {
        variant: 'dark',
        name: 'Denzel Washington',
      },
    ],
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IAvatarList>
      componentName={AvatarList.name}
      Component={AvatarList}
      groupBy="onButtonClick"
      combinations={{
        onButtonClick: [undefined, () => null],
        list: [
          [
            {
              src: 'https://picsum.photos/seed/1/200',
              alt: 'avatar',
              variant: 'darkHavelock',
              name: 'Antonio Banderas',
            },
            {
              src: 'https://picsum.photos/seed/2/200',
              alt: 'avatar',
              variant: 'darkHibiscus',
              name: 'Brad Pitt',
            },
            {
              variant: 'darkFern',
              name: ' Catherine Zeta-Jones',
            },
            {
              variant: 'dark',
              name: 'Denzel Washington',
            },
          ],
        ],
      }}
      columns={1}
      center
    />
  ),
};
