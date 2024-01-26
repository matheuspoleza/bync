import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { ModalHeaderLeftButton } from './components/ModalHeaderLeftButton';
import { ModalHeaderSecondaryButton } from './components/ModalHeaderSecondaryButton';
import type { IModalHeader } from './ModalHeader.component';
import { ModalHeader } from './ModalHeader.component';

type Story = StoryObj<typeof ModalHeader>;

const meta: Meta<typeof ModalHeader> = {
  title: 'Modal/Header',
  component: ModalHeader,
};

export const Base: Story = {
  args: {
    title: 'Modal title',
    onClose: () => {
      console.log('onClose');
    },
    leftButton: <ModalHeaderLeftButton onClick={() => console.log('LeftButton click')} iconName="Menu" />,
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IModalHeader>
      componentName={ModalHeader.name}
      Component={ModalHeader}
      combinations={{
        variant: ['basic', 'bold'],
        onClose: [() => console.log('onClose')],
        title: ['Modal title'],
        // eslint-disable-next-line react/jsx-key
        leftButton: [<ModalHeaderLeftButton onClick={() => null} iconName="Menu" />, undefined],
        // eslint-disable-next-line react/jsx-key
        secondaryButton: [<ModalHeaderSecondaryButton onClick={() => null} iconName="More" />, undefined],
      }}
      center
      groupBy="variant"
    />
  ),
};

export default meta;
