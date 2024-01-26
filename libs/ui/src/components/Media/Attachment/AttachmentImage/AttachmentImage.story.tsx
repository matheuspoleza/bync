import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { AttachmentImage } from './AttachmentImage.component';
import type { IAttachmentImage } from './types';

type Story = StoryObj<typeof AttachmentImage>;

const meta: Meta<typeof AttachmentImage> = {
  title: 'Media/Attachment/Image',
  component: AttachmentImage,
  args: {
    src: 'https://picsum.photos/seed/1/200',
  },
};

export const Base: Story = {};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IAttachmentImage>
      componentName={AttachmentImage.name}
      Component={AttachmentImage}
      combinations={{
        src: ['https://picsum.photos/seed/1/200'],
      }}
      columns={2}
    />
  ),
};

export default meta;
