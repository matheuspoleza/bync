import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';

import type { IVideoPlayer } from '../VideoPlayer.component';
import { VideoPlayer } from '../VideoPlayer.component';

const VIDEO_SRC = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

describe('VideoPlayer', () => {
  const component = (props?: Partial<IVideoPlayer>) => {
    const testID = 'test-id';

    const { queryByTestId, getByRole, getByTestId } = render(
      <VideoPlayer {...props} testID={testID} controls={true} />
    );

    return {
      findLoader: () => queryByTestId(`${testID}--video-loader`),
      getByRole,
      video: getByTestId(testID),
      source: getByTestId(`${testID}--video-source`),
    };
  };

  it('renders video with correct src', () => {
    const { video, source } = component({ src: VIDEO_SRC });

    expect(video).toBeInTheDocument();
    expect(source).toHaveAttribute('src', VIDEO_SRC);
  });

  it("renders content loader while video isn't available", async () => {
    const { findLoader, video } = component();

    expect(await findLoader()).toBeInTheDocument();

    const event = new Event('canplaythrough');
    fireEvent(video, event);

    expect(await findLoader()).not.toBeInTheDocument();
  });
});
