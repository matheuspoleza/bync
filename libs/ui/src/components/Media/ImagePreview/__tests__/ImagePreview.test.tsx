import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { describe, it } from 'vitest';

import { ImagePreview } from '../ImagePreview.component';
import type { IImagePreview } from '../types';

describe('ImagePreview', () => {
  const component = (props?: Partial<IImagePreview>) => {
    const testID = 'test-id';
    const SMALL_IMAGE_PATH = 'https://picsum.photos/200/300';

    const { findByTestId, getByRole } = render(
      <ImagePreview
        referenceElement={({ onToggle, attributes }) => (
          <button onClick={onToggle} {...attributes}>
            click me
          </button>
        )}
        image={SMALL_IMAGE_PATH}
        testID={testID}
        {...props}
      />
    );

    return {
      findReference: () => findByTestId(`${testID}--popper-reference`),
      getByRole,
    };
  };

  it('renders', async () => {
    const { getByRole, findReference } = component();

    await act(() => findReference().then(userEvent.click));

    const imagePreview = getByRole('img');

    expect(imagePreview).toBeInTheDocument();

    await act(() => findReference().then(userEvent.click));

    expect(imagePreview).not.toBeInTheDocument();
  });

  it('renders correct expanded width rule when isExpanded is true', async () => {
    const { getByRole, findReference } = component({ isExpanded: true });

    await act(() => findReference().then(userEvent.click));

    const imagePreview = getByRole('img');

    expect(imagePreview).toHaveStyle('width: auto');
    expect(imagePreview).toHaveStyle('height: auto');
  });
});
