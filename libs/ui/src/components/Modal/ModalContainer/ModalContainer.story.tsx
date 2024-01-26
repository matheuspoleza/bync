import type { Meta, StoryObj } from '@storybook/react';

import { Box, Text } from '@/components';

import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { ModalContainer } from './ModalContainer.component';

type Story = StoryObj<typeof ModalContainer>;

const meta: Meta<typeof ModalContainer> = {
  title: 'Modal/Container',
  component: ModalContainer,
};

const Child = () => (
  <Box style={{ padding: '24px' }} direction="column">
    <Text>Modal Contents</Text>
  </Box>
);

export const Base: Story = {
  args: {
    children: (
      <>
        <ModalHeader title="Title" onClose={() => null} />
        <Child />
        <ModalFooter>
          <ModalFooter.Button label="Close" onClick={() => null} variant="secondary" />
          <ModalFooter.Button label="Agree" onClick={() => null} variant="primary" />
        </ModalFooter>
      </>
    ),
  },
};

export const NoHeader: Story = {
  args: {
    children: (
      <>
        <Child />
        <ModalFooter>
          <ModalFooter.Button label="Close" onClick={() => null} variant="secondary" />
          <ModalFooter.Button label="Agree" onClick={() => null} variant="primary" />
        </ModalFooter>
      </>
    ),
  },
};

export const NoFooter: Story = {
  args: {
    children: (
      <>
        <ModalHeader title="Title" onClose={() => null} />
        <Child />
      </>
    ),
  },
};

export const StackedModal: Story = {
  render: () => (
    <Box direction="column" gap={16} maxHeight="100vh" justify="center" align="center" alignSelf="center">
      <ModalContainer>
        <ModalHeader title="Part one" onClose={() => null} />
        <Child />
        <ModalFooter>
          <ModalFooter.Button label="Re-use last question" onClick={() => null} variant="secondary" />
          <ModalFooter.Button label="Send" onClick={() => null} variant="primary" />
        </ModalFooter>
      </ModalContainer>
      <ModalContainer>
        <Child />
        <ModalFooter>
          <ModalFooter.Button label="Copy" onClick={() => null} variant="primary" />
        </ModalFooter>
      </ModalContainer>
    </Box>
  ),
};

export default meta;
