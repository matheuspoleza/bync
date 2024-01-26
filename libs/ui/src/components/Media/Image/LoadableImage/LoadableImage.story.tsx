import type { Meta, StoryObj } from '@storybook/react';

import { LoadableImage } from './LoadableImage.component';

type Story = StoryObj<typeof LoadableImage>;

const meta: Meta<typeof LoadableImage> = {
  title: 'Media/Image/LoadableImage',
  component: LoadableImage,
};

export const Base: Story = {
  args: {
    src: 'https://picsum.photos/seed/1/200',
    alt: 'loadable image',
    width: '200px',
    height: '200px',
  },
};

export default meta;
