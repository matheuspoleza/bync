import type { Meta, StoryObj } from '@storybook/react';

import { EditEntityModal } from './EditEntityModal.component';

type Story = StoryObj<typeof EditEntityModal>;

const meta: Meta<typeof EditEntityModal> = {
  title: 'Pages / Entities / EditEntityModal',
  component: EditEntityModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
    entity: {
      name: 'Car brands',
      dataType: 'Custom text',
      values: [
        {
          id: '0',
          firstLine: { value: 'BMW' },
          secondLine: { value: 'German car, european car' },
        },
      ],
    },
  },
};

export default meta;
