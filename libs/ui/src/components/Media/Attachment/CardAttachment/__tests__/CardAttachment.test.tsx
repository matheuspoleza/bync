import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { CardAttachment } from '../CardAttachment.component';
import type { ICardAttachment } from '../types';

describe.concurrent('CardAttachment', () => {
  const component = ({ testID = 'test-id', ...props }: ICardAttachment) => {
    const { getByText, queryByTestId, getByTestId } = render(<CardAttachment {...props} testID={testID} />);

    return {
      container: getByTestId(testID),
      notPreviewable: queryByTestId(`${testID}--not-previewable`),
      image: queryByTestId(`${testID}--image`),
      title: getByTestId(`${testID}--title`),
      caption: getByTestId(`${testID}--caption`),
      spinner: queryByTestId(`${testID}--spinner`),
      getByText,
    };
  };

  it('renders a preview image when src prop is provided and there are no variables', ({ expect }) => {
    const { image } = component({
      attachment: {
        type: 'card',
        title: [{ text: 'title' }],
        description: [{ text: 'description' }],
        src: 'image.png',
      },
    });

    expect(image).toBeInTheDocument();
  });

  it('renders the provided descripition in the caption when src prop is provided and there are no variables', ({
    expect,
  }) => {
    const { caption } = component({
      attachment: {
        type: 'card',
        title: [{ text: 'title' }],
        description: [{ text: 'custom description' }],
        src: 'image.png',
      },
    });

    expect(caption).toHaveTextContent('custom description');
  });

  it('renders the "Uploading..." message in the caption when isUploading prop is true', ({ expect }) => {
    const { caption, spinner } = component({
      attachment: {
        type: 'card',
        title: [{ text: 'title' }],
        description: [{ text: 'custom description' }],
        src: undefined,
        isUploading: true,
      },
    });

    expect(spinner).toBeInTheDocument();
    expect(caption).toHaveTextContent('Uploading...');
  });

  it('renders not previewable state when src prop contains variables', ({ expect }) => {
    const { caption, notPreviewable } = component({
      attachment: {
        type: 'card',
        title: [{ text: 'title' }],
        description: [{ text: 'custom description' }],
        src: 'image-{width}.jpg',
      },
    });

    expect(notPreviewable).toBeInTheDocument();
    expect(caption).toHaveTextContent('Includes variable, no preview');
  });
});
