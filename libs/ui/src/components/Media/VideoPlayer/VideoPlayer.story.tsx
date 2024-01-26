import type { Meta, StoryObj } from '@storybook/react';

import { CartesianProduct } from '@/storybook/CartesianProduct';

import type { IVideoPlayer } from './VideoPlayer.component';
import { VideoPlayer } from './VideoPlayer.component';

type Story = StoryObj<typeof VideoPlayer>;

const meta: Meta<typeof VideoPlayer> = {
  title: 'Media/VideoPlayer',
  component: VideoPlayer,
};

const VIDEO_FIXTURE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const CustomSize: Story = {
  args: {
    src: VIDEO_FIXTURE,
    controls: true,
    width: 300,
    height: 169,
  },
};
export const Examples: Story = {
  render: () => (
    <CartesianProduct<IVideoPlayer>
      componentName={VideoPlayer.name}
      Component={VideoPlayer}
      combinations={{
        src: [VIDEO_FIXTURE],
        cover: [true, false],
        width: [250],
        height: [140],
        controls: [true],
      }}
      columns={2}
      center
    />
  ),
};

export default meta;
