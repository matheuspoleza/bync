import type { Accept } from 'react-dropzone';

export interface IUploadArea {
  files?: File[];
  onUpload: (file: File[]) => void;
  acceptedFileTypes?: Accept;
  maxFileSize?: number;
  maxFiles?: number;
  isLoading?: boolean;
  isSuccessful?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  caption?: string;
  onCloseButtonClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  testID?: string;
  imagePreview?: string;
  className?: string;
}
