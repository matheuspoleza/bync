import type { Meta, StoryObj } from '@storybook/react';

import { StaticEditor } from '@/components/Inputs/SlateEditor';
import { Box } from '@/components/Utility/Box/Box.component';
import { CartesianProduct } from '@/storybook/CartesianProduct';

import { Attachment } from './Attachment.component';
import type { IAttachment } from './types';

type Story = StoryObj<typeof Attachment>;

const meta: Meta<typeof Attachment> = {
  title: 'Media/Attachment',
  component: Attachment,
};

export const Base: Story = {
  args: {
    attachment: { type: 'image', filename: 'filename.png', src: 'https://picsum.photos/seed/1/200' },
  },
};

export const Examples: Story = {
  render: () => (
    <>
      <CartesianProduct<IAttachment>
        componentName={Attachment.name}
        Component={(props) => (
          <Box style={{ width: 232 }}>
            <Attachment {...props} />
          </Box>
        )}
        combinations={{
          attachment: [
            {
              src: 'https://picsum.photos/seed/1/200',
              type: 'image',
              filename: 'filename.png',
            },
            {
              src: 'https://picsum.photos/seed/1/200',
              type: 'image',
              filename: 'loooong-filename-name-nameloooong-filename-name-name.png',
            },
            {
              src: undefined,
              type: 'image',
              filename: 'filename.png',
            },
            {
              src: 'https://picsum.photos/seed/{variableName}/200',
              type: 'image',
              filename: 'loooong-filename-name-nameloooong-filename-name-name.png',
            },
            {
              src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
              type: 'audio',
              title: 'Track Name',
            },
            {
              src: undefined,
              type: 'audio',
              title: 'Track Name',
            },
            {
              src: 'https://picsum.photos/seed/1/200',
              type: 'card',
              description: StaticEditor.createTextState('Card description'),
              title: StaticEditor.createTextState('Card title'),
            },
            {
              src: 'https://picsum.photos/seed/1/200',
              type: 'card',
              description: StaticEditor.createTextState(''),
              title: StaticEditor.createTextState(''),
            },
          ],
          isActive: [false, true],
        }}
        columns={2}
      />
    </>
  ),
};

export default meta;
