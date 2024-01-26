import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { ImageAttachment } from '../ImageAttachment.component';
import type { IImageAttachment } from '../types';

describe.concurrent('ImageAttachment', () => {
  const component = ({ testID = 'test-id', ...props }: IImageAttachment) => {
    const { getByText, queryByTestId, getByTestId } = render(<ImageAttachment {...props} testID={testID} />);

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
    const { image } = component({ attachment: { type: 'image', filename: 'filename.png', src: 'image.png' } });

    expect(image).toBeInTheDocument();
  });

  it('renders the provided filename in the caption when src prop is provided and there are no variables', ({
    expect,
  }) => {
    const { caption } = component({ attachment: { type: 'image', filename: 'customfilename.png', src: 'image.png' } });

    expect(caption).toHaveTextContent('customfilename.png');
  });

  it('renders the "Uploading..." message in the caption when src prop is not provided', ({ expect }) => {
    const { caption, spinner } = component({
      attachment: { type: 'image', filename: 'customfilename.png', src: undefined },
    });

    expect(spinner).toBeInTheDocument();
    expect(caption).toHaveTextContent('Uploading...');
  });

  it('renders not previewable state when src prop contains variables', ({ expect }) => {
    const { caption, notPreviewable } = component({
      attachment: { type: 'image', filename: 'filename.png', src: 'image-{width}.jpg' },
    });

    expect(notPreviewable).toBeInTheDocument();
    expect(caption).toHaveTextContent('Includes variable, no preview');
  });
});
