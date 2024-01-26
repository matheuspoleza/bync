import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Text } from '../../Text/Text.component';
import { Toast } from './Toast.component';
import type { IToast } from './types';

type Story = StoryObj<typeof Toast>;

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  render: (args) => <Toast {...args} />,
};

export const Base: Story = {
  args: {
    text: 'Toast description',
    actionButtonProps: {
      label: 'Label',
      onClick: () => console.log('Action button clicked'),
    },
  },
};

export const WithNodeText: Story = {
  args: {
    text: (
      <Text>
        Description and a <strong> bold element</strong>
      </Text>
    ),
    actionButtonProps: {
      label: 'Label',
      onClick: () => console.log('Action button clicked'),
    },
  },
};

export const Examples: Story = {
  render: () => (
    <CartesianProduct<IToast>
      componentName={Toast.name}
      Component={(props) => <Toast {...props} text="System message description" onClose={() => console.log('close')} />}
      combinations={{
        variant: ['success', 'alert', 'default'],
        isClosable: [false, true],
        showIcon: [false, true],
        isLoading: [false, true],
        actionButtonProps: [undefined, Base.args?.actionButtonProps],
      }}
      groupBy="variant"
      columns={2}
    />
  ),
};

export default meta;
