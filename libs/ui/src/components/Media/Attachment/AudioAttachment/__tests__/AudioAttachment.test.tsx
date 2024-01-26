import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { AudioAttachment } from '../AudioAttachment.component';
import type { IAudioAttachment } from '../types';

const DEFAULT_ATTACHMENT = {
  type: 'audio',
  src: 'audio.mp3',
  title: 'Audio Title',
} as const;

describe.concurrent('AudioAttachment', () => {
  const component = ({
    testID = 'test-id',
    attachment = DEFAULT_ATTACHMENT,
    ...props
  }: Partial<IAudioAttachment & { testID?: string }> = {}) => {
    const { getByText, getByTestId, queryByTestId } = render(
      <AudioAttachment {...props} attachment={attachment} testID={testID} />
    );

    return {
      container: getByTestId(testID),
      spinner: queryByTestId(`${testID}--spinner`),
      notPreviewable: queryByTestId(`${testID}--not-previewable`),
      preview: queryByTestId(`${testID}--preview`),
      title: getByTestId(`${testID}--title`),
      caption: getByTestId(`${testID}--caption`),
      progressBar: queryByTestId(`${testID}--progress-bar`),
      getByText,
    };
  };

  it('renders the provided title', ({ expect }) => {
    const { title } = component();

    expect(title).toBeInTheDocument();
  });

  it('renders an uploading state when src prop is not provided', ({ expect }) => {
    const { spinner, caption } = component({
      attachment: { ...DEFAULT_ATTACHMENT, src: undefined },
    });

    expect(spinner).toBeInTheDocument();
    expect(caption.textContent).toBe('Uploading...');
  });

  it('renders a preview icon when src prop is provided and there are no variables', ({ expect }) => {
    const { preview } = component();

    expect(preview).toBeInTheDocument();
  });

  it('renders a Not Previewable state when src prop is provided and contains variables', ({ expect }) => {
    const { notPreviewable, caption } = component({ attachment: { ...DEFAULT_ATTACHMENT, src: 'audio-{width}.mp3' } });

    expect(notPreviewable).toBeInTheDocument();
    expect(caption.textContent).toBe('Includes variable, no preview');
  });

  it('renders the formatted duration in the caption when src prop is provided and there are no variables', ({
    expect,
  }) => {
    const { caption } = component();

    expect(caption.textContent).toBe('0:00');
  });

  it('renders the progress bar when src prop is provided and there are no variables', ({ expect }) => {
    const { progressBar } = component();

    expect(progressBar).toBeInTheDocument();
  });
});
