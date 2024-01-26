import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { IUploadArea } from './types';
import { UploadArea } from './UploadArea.component';

type Story = StoryObj<typeof UploadArea>;

const UploadAreaComponent = (props: IUploadArea) => <UploadArea {...props} />;

const Component = (args: IUploadArea) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onUpload = (files: File[]) => {
    console.log({ files });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessful(true);
    }, 1000);
  };
  return (
    <UploadAreaComponent
      caption="Caption"
      {...args}
      onUpload={onUpload}
      isLoading={isLoading}
      isSuccessful={isSuccessful}
      onCloseButtonClick={() => null}
    />
  );
};

const meta: Meta<typeof UploadArea> = {
  title: 'Inputs/UploadArea',
  component: UploadArea,
  render: Component,
};

export default meta;

export const Base: Story = {};

export const MultipleUploads: Story = {
  args: {
    maxFiles: undefined,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    caption: 'Secondary variant.',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    caption: 'Loading variant.',
  },
  render: (args) => <UploadAreaComponent caption="Caption" {...args} onUpload={() => null} isLoading={true} />,
};

export const ErrorState: Story = {
  args: {
    error: true,
    caption: 'Error variant.',
    errorMessage: 'Error message.',
  },
};

export const PDFOnly: Story = {
  args: {
    acceptedFileTypes: { 'application/pdf': [] },
    caption: 'PDF only.',
    isSuccessful: true,
    onUpload: (files: File[]) => console.log({ files }),
  },
};

const PDFComponent = (args: IUploadArea) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mockFile = new File([''], 'very-long-file-name-from-somewhere-on-the-internet.pdf', {
    type: 'application/pdf',
  });
  const mockUpload = (files: File[]) => {
    console.log('howdy folks');
    console.log({ files });
    setIsLoading(true);
    setTimeout(() => {
      setIsSuccessful(true);
      setIsLoading(false);
    }, 1000);
  };
  return (
    <UploadAreaComponent
      caption="Caption."
      files={[mockFile]}
      isLoading={isLoading}
      isSuccessful={isSuccessful}
      {...args}
      onUpload={mockUpload}
    />
  );
};

export const CloseButton: Story = {
  args: {
    caption: 'Dismissable.',
    onCloseButtonClick: () => console.log('close button clicked'),
  },
  render: PDFComponent,
};

export const SuccessfulDisabled: Story = {
  args: {
    caption: 'Disabled.',
    disabled: true,
    onCloseButtonClick: () => console.log('close button clicked'),
  },
  render: PDFComponent,
};
export const SuccessfulPDF: Story = {
  args: {
    caption: 'Successful PDF.',
    onCloseButtonClick: () => console.log('close button clicked'),
  },
  render: PDFComponent,
};

const ExisitingImageComponent = (args: IUploadArea) => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileContent, setFileContent] = useState<File[] | undefined>(undefined);

  const fauxUpload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessful(true);
    }, 1200);
  };

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch('/img/imageFixture.avif');
        const blob = await response.blob();
        const file = new File([blob], 'imageFixture.avif', { type: 'image/png' });
        setFileContent([file]);
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };

    fetchFile();
  }, []);

  return (
    <UploadAreaComponent
      caption="Caption."
      {...args}
      files={fileContent}
      onUpload={fauxUpload}
      isLoading={isLoading}
      isSuccessful={isSuccessful}
    />
  );
};

export const ExistingImage: Story = {
  render: ExisitingImageComponent,
};

export const DisplayErrorStateWithOnlyMessage: Story = {
  args: {
    caption: '',
    onCloseButtonClick: () => console.log('close button clicked'),
    errorMessage: 'Error message.',
  },
  render: (args) => {
    return <UploadAreaComponent caption="Caption." {...args} />;
  },
};
