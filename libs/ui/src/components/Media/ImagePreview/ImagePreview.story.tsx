import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/Buttons';
import type { PopperReferenceProps } from '@/components/Utility/Popper';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { ImagePreview } from './ImagePreview.component';
import type { IImagePreview } from './types';

type Story = StoryObj<typeof ImagePreview>;

const meta: Meta<typeof ImagePreview> = {
  title: 'Media/ImagePreview',
  component: ImagePreview,
};

const SMALL_IMAGE_PATH = 'https://picsum.photos/seed/1/200/300';
const LARGE_IMAGE_PATH = 'https://picsum.photos/seed/2/600/600';

const referenceImage = ({ ref, onOpen, onClose }: PopperReferenceProps) => (
  <Button
    ref={ref}
    label=""
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
    style={{
      cursor: 'zoom-in',
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      padding: '0',
      background: `url(${LARGE_IMAGE_PATH}) no-repeat`,
      backgroundSize: 'cover',
      boxShadow: '0 -1px 0 0 #0000000A inset',
    }}
  />
);

export const Base: Story = {
  render: () => <ImagePreview referenceElement={referenceImage} image={SMALL_IMAGE_PATH} />,
};

export const FixedSize: Story = {
  render: () => <ImagePreview referenceElement={referenceImage} image={LARGE_IMAGE_PATH} isExpanded={false} />,
};

export const CustomMaxSize: Story = {
  render: () => (
    <ImagePreview referenceElement={referenceImage} image={LARGE_IMAGE_PATH} maxHeight={100} maxWidth={100} />
  ),
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IImagePreview>
      componentName={ImagePreview.name}
      Component={(props) => <ImagePreview {...props} referenceElement={referenceImage} image={LARGE_IMAGE_PATH} />}
      combinations={{
        isExpanded: [true, false],
      }}
      columns={2}
      center
    />
  ),
};

export default meta;
