import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { AttachmentImagePlaceholder } from './AttachmentImagePlaceholder.component';
import type { IImagePlaceholder } from './types';

type Story = StoryObj<typeof AttachmentImagePlaceholder>;

const meta: Meta<typeof AttachmentImagePlaceholder> = {
  title: 'Media/Attachment/ImagePlaceholder',
  component: AttachmentImagePlaceholder,
};

export const Base: Story = {};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IImagePlaceholder>
      componentName="AttachmentImagePlaceholder"
      Component={AttachmentImagePlaceholder}
      combinations={{
        testID: ['placeholder'],
      }}
      columns={2}
    />
  ),
};

export default meta;
