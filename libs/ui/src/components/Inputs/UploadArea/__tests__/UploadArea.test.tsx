import { render } from '@testing-library/react';
import { vi } from 'vitest';

import type { IUploadArea } from '../types';
import { UploadArea } from '../UploadArea.component';

describe('UploadArea', () => {
  const component = (props?: Partial<IUploadArea>) => {
    vi.mock('react-dropzone', () => {
      return {
        useDropzone: vi.fn(() => ({
          acceptedFiles: [],
          getRootProps: vi.fn(() => ({})),
          getInputProps: vi.fn(() => ({})),
          open: vi.fn(),
        })),
      };
    });
    const testID = 'test-id';
    const onUploadMock = vi.fn();
    const { queryByTestId, getByTestId, getByText, container } = render(
      <UploadArea onUpload={onUploadMock} testID={testID} {...props} />
    );

    return {
      uploadArea: getByTestId(testID),
      container,
      onUploadMock,
      browseButton: () => getByTestId(testID),
      input: () => getByTestId(`${testID}--upload-input`),
      previewImage: () => queryByTestId(`${testID}--preview-image`),
      getByText,
      getByTestId,
    };
  };

  it('should render default state with "Browse" button', () => {
    const { getByText } = component();
    expect(getByText('Upload XYZ file here or')).toBeInTheDocument();
    expect(getByText('Browse')).toBeInTheDocument();
  });

  it('should show loading state when isLoading is true', () => {
    const { getByText } = component({ isLoading: true });
    expect(getByText('Uploading...')).toBeInTheDocument();
  });
});
