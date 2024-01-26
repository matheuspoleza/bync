import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/components/Utility/Box';

import { ResolvedPathModal } from './ResolvedPathModal/ResolvedPathModal.component';
import { TestFunctionModal } from './TestFunctionModal.component';

type Story = StoryObj<typeof TestFunctionModal>;

const ModalFlow = ({ children }: any) => (
  <Box
    id="mock-modal-flow"
    direction="column"
    gap={16}
    maxHeight="calc(100vh - 64px)"
    align="center"
    alignSelf="center"
    justify="center"
  >
    {children}
  </Box>
);

const meta: Meta<typeof TestFunctionModal> = {
  title: 'Pages / Functions / TestFunctionModal',
  component: TestFunctionModal,
  render: (args) => (
    <ModalFlow>
      <TestFunctionModal {...args} />
    </ModalFlow>
  ),
};

export const Base: Story = {
  args: {
    secondarySection: (isDisabled: boolean) => <ResolvedPathModal disabled={isDisabled} />,
  },
};

export const ErrorState: Story = {
  args: {
    secondarySection: (isDisabled: boolean) => <ResolvedPathModal error disabled={isDisabled} />,
  },
};

export const DisabledState: Story = {
  args: {
    secondarySection: () => <ResolvedPathModal disabled />,
  },
};

export default meta;
