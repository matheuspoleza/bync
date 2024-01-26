import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IContentLoader } from './ContentLoader.component';
import { ContentLoader } from './ContentLoader.component';

const meta: Meta<typeof ContentLoader> = {
  title: 'Other / Content Loader',
  component: ContentLoader,
};

export default meta;
type Story = StoryObj<typeof ContentLoader>;

const ImageContainer = (args: IContentLoader) => (
  <Box width="400px" height="280px" style={{ background: 'url("https://picsum.photos/seed/1/200")' }}>
    <ContentLoader {...args} />
  </Box>
);

export const Base: Story = {
  render: () => <ImageContainer />,
};

export const Small: Story = {
  render: () => <ImageContainer size="medium" />,
};

export const Dark: Story = {
  render: () => <ImageContainer variant="dark" />,
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IContentLoader>
      componentName={ContentLoader.name}
      Component={(props) => (
        <Box
          width="400px"
          height="280px"
          style={{
            background: 'url("https://picsum.photos/seed/1/200")',
            backgroundSize: 'cover',
          }}
        >
          <ContentLoader {...props} />
        </Box>
      )}
      combinations={{
        variant: ['light', 'dark'],
        size: ['medium', 'large'],
      }}
      columns={1}
      center
    />
  ),
};
