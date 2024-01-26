import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility/Box';

import { Chunk } from './Chunk.component';

type Story = StoryObj<typeof Chunk>;

const longTextFixture =
  'Tattooed hashtag cloud bread as same. flexorganic. Cold-pressed graigluten-free tumblr yuccie pour-over single-origin coffee.';

const meta: Meta<typeof Chunk> = {
  title: 'Other/Chunk',
  component: Chunk,
};

export default meta;

export const Base: Story = {
  args: {
    label: 'voiceflow.com',
    content: longTextFixture,
  },
  render: (props) => (
    <Box width="352px" height="100px" my={20}>
      <Chunk {...props} />
    </Box>
  ),
};

export const LinkOverflow: Story = {
  args: {
    label: 'voiceflow.com/more-specific-link-with-many-letters-to-overflow',
    content: longTextFixture,
  },
  render: (props) => (
    <Box width="352px" height="100px" my={20}>
      <Chunk {...props} />
    </Box>
  ),
};

export const NoHeader: Story = {
  args: {
    content: longTextFixture,
  },
  render: (props) => (
    <Box width="352px" my={20}>
      <Chunk {...props} />
    </Box>
  ),
};
