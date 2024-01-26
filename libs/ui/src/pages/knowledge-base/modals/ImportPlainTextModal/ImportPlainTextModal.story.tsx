import type { Meta, StoryObj } from '@storybook/react';

import { ImportPlainTextModal } from './ImportPlainTextModal.component';

type Story = StoryObj<typeof ImportPlainTextModal>;

const meta: Meta<typeof ImportPlainTextModal> = {
  title: 'Pages / KnowledgeBase / ImportPlainTextModal',
  component: ImportPlainTextModal,
};

export const Base: Story = {
  args: {
    onClose: () => null,
  },
};

export const WithLongText: Story = {
  args: {
    onClose: () => null,
    defaultText:
      'How much wood would a woodchuck chuck if a woodchuck could chuck wood? I think not much. He used to be a womuch wood would a woodchuck chuck if a woodchuck could chuck wood? I think not much. He used to be a woodchuck, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Ithen an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheean unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap ddd e 400 so that we got far into electronic typesetting, remaining essentially unchanged. It was popularised in the typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release How much wood would a woodchuck chuck if a woodchuck could chuck wood? I think not much. He used to be a woodchuck, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages. of Letraset sheets containing Lorem Ipsum passages.',
  },
};
export default meta;
